import React from 'react'

import './blog-edit.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class EditBlog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            headImagePresent: false,
            imageLoaded: false,
            images: [],
            published: false,
            report: {}
        }
    }

    componentDidMount() {
        const report = Object.assign({}, this.props.location.state.report)
        if (report.imageBlob) {
            const objectUrl = URL.createObjectURL(report.imageBlob);
            // document.getElementById('head-image').style.backgroundImage = "url(" + objectUrl + ")";
            report['imageUrl'] = objectUrl;
            this.setState({ headImagePresent: true });
        }

        this.setState({
            report: report,
            published: report.published
        })
    }

    componentWillUnmount() {
        URL.revokeObjectURL(this.state.report['imageUrl'])
    }

    deleteImage = (e) => {
        e.preventDefault()
        const report = Object.assign({}, this.props.location.state.report)
        // document.getElementById('head-image').style.backgroundImage = ""
        URL.revokeObjectURL(this.state.report['imageUrl'])
        report['imageUrl'] = ""
        this.setState({ report: report, headImagePresent: false })
    }


    changeImage = (e) => {
        //Check if user canceled the action
        if (e.target.value.length !== 0) {
            //Clone current report  
            const report = Object.assign({}, this.props.location.state.report)
            const images = this.state.images.slice()
            //create new objectURL for new picture
            const objectUrl = URL.createObjectURL(e.target.files[0])

            //set new image
            // document.getElementById('head-image').style.backgroundImage = "url(" + objectUrl + ")"

            //revoke the URL of the old image for memory saving
            URL.revokeObjectURL(this.state.report['imageUrl'])

            //add new URL to the cloned report
            report['imageUrl'] = objectUrl

            if (images.length > 0) {
                images.shift()
            }
            images.push(e.target.files[0])

            //set new report
            this.setState({ report: report, imageLoaded: false, images: images })
        }
    }


    setImage = (e) => {
        const report = Object.assign({}, this.props.location.state.report)
        const images = this.state.images.slice()
        const objectUrl = URL.createObjectURL(e.target.files[0])

        report['imageUrl'] = objectUrl
        if (images.length > 0) {
            images.shift()
        }
        images.push(e.target.files[0])

        this.setState({
            headImagePresent: true,
            images: images,
            report: report
        })
    }

    getJSONFromForm = () => {
        let form = document.getElementById("edit-blog")
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
        const user = JSON.parse(localStorage.getItem('user'))
        return user['username']
    }



    handleUpdate = e => {
        e.preventDefault()
        let JSONform = this.getJSONFromForm()
        let formData = new FormData()
        for (var key in JSONform) {
            formData.append(key, JSONform[key])
        }
        formData.append('report-number', this.state.report['reportNumber'])
        if (this.state.images.length > 0) {
            formData.append('head-image', this.state.images[0])
        }
        formData.append('published', this.state.published)
        axios.put(`http://localhost:8080/seproject/services/rest/reports`, formData)
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
        this.setState(prevstate => ({ published: !prevstate.published }), () => this.handleUpdate(e))
    }

    handleCancel = () => {
        this.props.history.push("/user/blogs")
    }

    render() {
        const report = this.state.report
        return (
            <div className="edit-container">
                <form id="edit-blog" className="edit-blog-form">
                    <div id="head-image" className="head-image-container">
                        {this.state.headImagePresent ?
                            <>
                                <img src={this.state.report['imageUrl']} style={this.state.imageLoaded ? {} : { display: "none" }}
                                    alt="test" onLoad={() => this.setState({ imageLoaded: true })} className="image-test" />
                                <div className="image-container-buttons">
                                    <label className="edit-image-label" htmlFor="edit-image">
                                        <span className="edit-button"><FontAwesomeIcon icon={faPen} /></span>
                                        <input onChange={this.changeImage} type="file" className="edit-image" id="edit-image" />
                                    </label>
                                    <button onClick={this.deleteImage} className="delete-image"><FontAwesomeIcon icon={faTrash} /></button>
                                </div>
                            </>
                            :
                            <label className="new-image-label" htmlFor="file-input">
                                <span className="file-label">+</span>
                                <input onChange={this.setImage} type="file" className="file-input" id="file-input" />
                            </label>
                        }
                    </div>
                    <div className="edit-blog-data-container">
                        <div className="blog-data-section">
                            <label htmlFor="title">TITLE</label>
                            <input id="title" name="title" defaultValue={report.title} />
                        </div>
                        <div className="blog-data-section">
                            <label htmlFor="country">COUNTRY</label>
                            <input id="country" name="country" defaultValue={report.country} />
                        </div>
                        <div className="blog-data-section">
                            <label htmlFor="region" >REGION</label>
                            <input id="region" name="region" defaultValue={report.region} />
                        </div>
                        <div className="blog-data-section">
                            <label htmlFor="category" >CATEGORY</label>
                            <input id="category" name="area" defaultValue={report.category} />
                        </div>

                        <div className="blog-data-section">
                            <label htmlFor="paragraph-one" >BLOG</label>
                            <textarea id="paragraph-one" name="paragraph-one" defaultValue={report.paragraphOne} />
                        </div>
                    </div>
                    <div className="new-blog-buttons">
                        <button type="button" onClick={this.handleCancel} className="cancel-edit-blog-btn">CANCEL</button>
                        <button type="submit" onClick={this.handleUpdate} className="save-edit-blog-btn" name="save_btn">UPDATE</button>
                        {this.state.published ?
                            <button type="submit" onClick={this.handlePublish} className="publish-edit-blog-btn" name="unpublish_btn">UNPUBLISH</button> :

                            <button type="submit" onClick={this.handlePublish} className="publish-edit-blog-btn" name="publish_btn">PUBLISH</button>
                        }
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(EditBlog)