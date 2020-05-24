import React from 'react'

import './blog-new.css'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

class NewBlog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            headImagePresent: false,
            headImage: '',
            published: false,
            objectUrl: ''
        }
    }

    setImage = (e) => {
        const objectUrl = URL.createObjectURL(e.target.files[0])       
        document.getElementById('head-image').style.backgroundImage = "url(" + objectUrl + ")"
        this.setState({
            headImage: e.target.files[0],
            headImagePresent: true,
            objectUrl: objectUrl
        })
    }

    getJSONFromForm = () => {
        let form = document.getElementById("new-blog")
        var obj = {};
        var elements = form.querySelectorAll("input, select, textarea");
        for (var i = 0; i < elements.length; ++i) {
            var element = elements[i];
            var name = element.name;
            var value = element.value;

            if (name) {
                obj[name] = value;
            }
        }
        return obj
    }

    getUsername = () => {
        const user =  JSON.parse(localStorage.getItem('user'))
        return user['username']
    }

    handleSave = e => {
        e.preventDefault()
        let JSONform = this.getJSONFromForm()
        let formData = new FormData()
        for (var key in JSONform) {
            formData.append(key, JSONform[key])
        }
        formData.append('head-image', this.state.headImage)
        formData.append('published', this.state.published)

        axios.post(`http://localhost:8080/seproject/services/rest/users/${this.getUsername()}/report`, formData)
            .then(res => {
                if (res.status === 201) {
                    this.props.history.push("/user/blogs")
                    URL.revokeObjectURL(this.state.objectUrl)
                }
            }).catch(error => {
                console.log(error)
            })
    }


    handlePublish = e => {
        e.persist()
        this.setState({ published: true }, () => this.handleSave(e))
    }

    handleCancel = () => {
        this.props.history.push("/user/blogs")
    }

    render() {
        return (
            <div className="new-blog-container">
                <form id="new-blog" className="new-blog-form">
                    <div id="head-image" className="head-image-container">
                        {!this.state.headImagePresent &&
                            <label className="new-image-label" htmlFor="file-input">
                                <span className="file-label">+</span>
                                <input onChange={this.setImage} type="file" className="file-input" id="file-input" />
                            </label>
                        }
                    </div>
                    <div className="new-blog-data-container">
                        <div className="blog-data-section">
                            <label htmlFor="title">TITLE</label>
                            <input id="title" name="title" defaultValue="title" />
                        </div>
                        <div className="blog-data-section">
                            <label htmlFor="country">COUNTRY</label>
                            <input id="country" name="country" defaultValue="country" />
                        </div>
                        <div className="blog-data-section">
                            <label htmlFor="region" >REGION</label>
                            <input id="region" name="region" defaultValue="region" />
                        </div>
                        <div className="blog-data-section">
                            <label htmlFor="category" >CATEGORY</label>
                            <input id="category" name="category" defaultValue="category" />
                        </div>

                        <div className="blog-data-section">
                            <label htmlFor="paragraph-one" >BLOG</label>
                            <textarea id="paragraph-one" name="paragraph-one" defaultValue="dit is een test" />
                        </div>
                    </div>
                    <div className="new-blog-buttons">
                        <button type="button" onClick={this.handleCancel} className="cancel-new-blog-btn">CANCEL</button>
                        <button type="submit" onClick={this.handleSave} className="save-new-blog-btn" name="save_btn">SAVE</button>
                        <button type="submit" onClick={this.handlePublish} className="publish-new-blog-btn" name="publish_btn">PUBLISH</button>
                    </div>
                </form>
            </div>
        )
    }
}


export default withRouter(NewBlog)