import React from 'react'

import './user-blogs.css'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'

class BlogContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            objecturl: '',
            reports: [],
            chosenReport: 0
        }
    }

    componentDidMount() {
        this.getData()
    }

    componentWillUnmount() {
        this.state.reports.forEach((report, index) => {
            if (index !== this.state.chosenReport) {
                URL.revokeObjectURL(report.image)
            }
        })
    }

    getData = () => {
        const urlData = `http://localhost:8080/seproject/services/rest/reports/getreports/${this.getUsername()}`

        axios.get(urlData)
            .then(res => {
                this.getImages(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    getImages = (reports) => {

        reports.forEach((report) => {
            const urlImages = `http://localhost:8080/seproject/services/rest/photos/${report.reportNumber}`
            axios.get(urlImages, { responseType: 'blob' })
                .then(res => {
                    let blob = new Blob([res.data], { type: "image/jpeg" })
                    const ObjectUrl = URL.createObjectURL(blob)
                    const completeReport = Object.assign(report, {"imageBlob": blob, "imageUrl": ObjectUrl })
                    this.setState({ reports: this.state.reports.concat(completeReport) })
                }).catch(err => {
                    console.log(err)
                })
        })
    }

    getUsername = () => {
        const user =  JSON.parse(localStorage.getItem('user'))
        return user['username']
    }

    setData = (data) => {
        this.setState({ reports: data })
    }

 

    render() {
        return (
            <div>
                {this.state.reports.map((report, index) => (
                    <div key={index} className="blog-container">
                        <img src={report.imageUrl} alt="plane" />
                        <form className="blog-data">
                            <fieldset disabled>
                                <input type="text" defaultValue="blogId" hidden />
                                <label>Title</label>
                                <input defaultValue={report.title} />
                                <label>Date</label>
                                <input defaultValue={report.timestamp} />
                                <label>Rated</label>
                                <input defaultValue={report.ranking} />
                            </fieldset>
                        </form>
                        <div className="blog-data-buttons">
                            <Link to={"/blogs/" + report.reportNumber} className="blog-edit-btn">SEE</Link>
                            <Link to={{
                                pathname: this.props.currentPath + "/edit",
                                state: { report: this.state.reports[index] }
                            }}
                                className="blog-edit-btn">EDIT</Link>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}


class UserBlogs extends React.Component {
    constructor(props) {
        super(props)
        this.currentPath = props.location.pathname
    }

    render() {
        return (
            <div className="blog-overview-container">
                <div className="blog-overview-buttons">
                    <button className="filter-btn">FILTER</button>
                    <Link to={this.currentPath + "/new"} className="new-blog-btn">NEW</Link>
                </div>
                <BlogContainer currentPath={this.currentPath} />
            </div>
        )
    }
}

export default withRouter(UserBlogs)