import React from 'react'
import logo from '../assets/images/brandlogo.png';
import Navbar from './navbar'
import { withRouter, Link } from 'react-router-dom'

import './header.css'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loginMenuActive: false,
      menuName: ''
    }
    this.menuRef = React.createRef(null)
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.closeLoginMenu, { passive: true })
    if (!this.props.isLoggedIn) {
      //Deze functie moet aangeroepen worden na inloggen. Echter doet hij dat niet omdat de header 
      //component niet opnieuw wordt gerenderd. Oplossing voor bedenken.
      this.getFirstName()
    }

    let user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      this.props.setIsLoggedIn(true)
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.closeLoginMenu)
  }

  closeLoginMenu = (event) => {
    if (this.menuRef.current && !this.menuRef.current.contains(event.target)) {
      this.setState({ loginMenuActive: false })
    }
  }

  toggleLoginMenu = () => {
    this.setState(prevstate => ({
      loginMenuActive: !prevstate.loginMenuActive
    }))
  }

  getFirstName = () => {
    let user = JSON.parse(localStorage.getItem("user"))
    if(user){
      if(user['firstname']) {
        this.setState({ menuName: user['firstname'] })
      } else {
        this.setState({ menuName: user['username'] })
      }      
    } else {
      this.setState({ menuName: "Account" })
    }
  }


  logout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    this.toggleLoginMenu()
    this.props.history.push("/")
  }


  render() {
    return (
      <div className="header">
        <div className="logo-container">
          <img id="app-logo" src={logo} alt="brand logo" />
        </div>
        <div className="socialmedia-container">
          <p>socialmedia items</p>
        </div>
        <Navbar routes={this.props.routes} />
        <div className="login-btn-container">
          {!this.props.isLoggedIn ?
            <Link to="/login" className="login-btn">
              <div id="login" className="">Login</div>
            </Link>
            :
            <div>
              <div onClick={this.toggleLoginMenu} className="login-btn">{this.state.menuName}</div>
              {this.state.loginMenuActive &&
                <div ref={this.menuRef} className="login-menu">
                  <div className="account-info-container">
                    <img src={require(`../assets/images/img_avatar.png`)} className="avatar-image" alt="avatar" />
                    <p className="account-name">Username</p>
                  </div>
                  <div className="login-menu-breakline" />
                  <Link onClick={this.toggleLoginMenu} to="/user" className="login-menu-link">Personal</Link>
                  <Link onClick={this.toggleLoginMenu} to="/user/blogs" className="login-menu-link">Blogs</Link>
                  <Link onClick={this.toggleLoginMenu} to="/user/other" className="login-menu-link">Other</Link>
                  <div className="login-menu-breakline" />
                  <button onClick={() => { this.logout(); this.props.setIsLoggedIn(false) }} className="logout-btn">Logout</button>
                </div>
              }
            </div>
          }
        </div>
      </div>
    )
  }
}

export default withRouter(Header)