import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faArrowDown } from '@fortawesome/free-solid-svg-icons'

import './user-personal.css'

class UserPersonal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editUsername: false,
            editPassword: false,
            editEmail: false,
            editPhone: false,
            user: {}
        }
    }

    componentDidMount() {
        this.setState({user: JSON.parse(localStorage.getItem('user'))})
    } 



    saveChange = (e, type) => {
        e.preventDefault()
        const user = Object.assign({}, this.state.user)
        const id = type + "-data"
        user[type] = document.getElementById(id).value
 
        
        this.setState({user: user},  () => {console.log(this.state.user)
          })     
    }

    toggleEditBtn = (e, type) => {
        e.preventDefault()
        document.getElementById(type).disabled = !document.getElementById(type).disabled
        document.getElementById(type + "-data").focus()

        if (type === "username") {
            this.setState(prevState => ({
                editUsername: !prevState.editUsername
            }))
              } else if (type === "password") {
            this.setState(prevState => ({
                editPassword: !prevState.editPassword
            }))
        } else if (type === "email") {
            this.setState(prevState => ({
                editEmail: !prevState.editEmail
            }))
        } else if (type === "phone") {
            this.setState(prevState => ({
                editPhone: !prevState.editPhone
            }))
        } else {
            return
        }

    }


    render() {
        return (
            <div className="personal-container">
                <div className="avatar-container">
                    <img className="avatar" src={require(`../assets/images/img_avatar.png`)} alt="avatar" />
                </div>
                <div className="personal-data-container">
                    <form className="data-container about">
                        <h2>About</h2>
                        <h4>This info is visible for other people</h4>
                        <fieldset>
                            <div className="data">
                                <label>NAME</label>
                                <input type="text" defaultValue={this.state.user['firstname']} />
                            </div>
                            <div className="data">
                                <label>BIRTHDAY</label>
                                <input type="text" defaultValue="test" />
                            </div>
                            <div className="data">
                                <label>GENDER</label>
                                <input type="text" defaultValue={this.state.user['gender']} />
                            </div>
                            <div className="data">
                                <label>CURRENT RESIDENT</label>
                                <input type="text" defaultValue="test" />
                            </div>
                            <div className="data">
                                <label>BIO</label>
                                <textarea type="text" />
                            </div>
                        </fieldset>
                        <div className="data-btn">
                            <button type="submit">SAVE</button>
                        </div>

                    </form>
                    <form className="data-container account">
                        <h3>Account</h3>
                        <fieldset id="username" disabled>
                            <div className="data">
                                <label>USERNAME</label>
                                <input id="username-data" type="text" defaultValue={this.state.user['username']} autoComplete="none" />
                                {this.state.editUsername ?
                                    <button onClick={(e) => { this.saveChange(e, "username"); this.toggleEditBtn(e, "username") }} ><FontAwesomeIcon icon={faArrowDown} /></button>
                                    :
                                    <button onClick={(e) => { this.toggleEditBtn(e, "username") }} ><FontAwesomeIcon icon={faPen} /></button>
                                }
                            </div>
                        </fieldset>
                        <fieldset id="password" disabled>
                            <div className="data">
                                <label>PASSWORD</label>
                                <input id="password-data" type="password" defaultValue={this.state.user['password']} autoComplete="current-password" />
                                {this.state.editPassword ?
                                    <div>
                                        <button onClick={(e) => { this.saveChange(e, "password"); this.toggleEditBtn(e, "password") }}><FontAwesomeIcon icon={faArrowDown} /></button>
                                        <input id="username-hidden-data" type="text" defaultValue="test" hidden autoComplete="username" />
                                        <label>REPEAT PASSWORD</label>
                                        <input id="repeat-password-data" type="password" autoComplete="new-password" />
                                    </div>
                                    :
                                    <button onClick={(e) => { this.toggleEditBtn(e, "password") }} ><FontAwesomeIcon icon={faPen} /></button>
                                }
                            </div>
                        </fieldset>
                    </form>
                    <form className="data-container contact">
                        <h3>Contact</h3>
                        <fieldset id="email" disabled>
                            <div className="data">
                                <label>EMAIL</label>
                                <input id="email-data" type="text" defaultValue={this.state.user['email']} autoComplete="none" />
                                {this.state.editEmail ?
                                    <button onClick={(e) => { this.saveChange(e, "email"); this.toggleEditBtn(e, "email") }} ><FontAwesomeIcon icon={faArrowDown} /></button>
                                    :
                                    <button onClick={(e) => { this.toggleEditBtn(e, "email") }} ><FontAwesomeIcon icon={faPen} /></button>
                                }
                            </div>
                        </fieldset>
                        <fieldset id="phone" disabled>
                            <div className="data">
                                <label>PHONE NUMBER</label>
                                <input id="phone-data" type="text" defaultValue="" autoComplete="none" />
                                {this.state.editPhone ?
                                    <button onClick={(e) => { this.saveChange(e, "phone"); this.toggleEditBtn(e, "phone") }} ><FontAwesomeIcon icon={faArrowDown} /></button>
                                    :
                                    <button onClick={(e) => { this.toggleEditBtn(e, "phone") }} ><FontAwesomeIcon icon={faPen} /></button>
                                }
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        )
    }

}


export default UserPersonal