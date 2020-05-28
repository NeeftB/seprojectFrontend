import React from 'react'
import axios from 'axios'

import { Link, withRouter } from 'react-router-dom'

function BlogContainer({ blog }) {


    return (
        <div>test</div>
    )
}


class BlogOverview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            reports: []
        }
    }
    componentDidMount() {
        this.getBlogs()
    }

    componentWillUnmount() {
        this.state.reports.forEach((report, index) => {
            if (index !== this.state.chosenReport) {
                URL.revokeObjectURL(report.image)
            }
        })
    }

    getBlogs = () => {
        const urlData = `http://localhost:8080/seproject/services/rest/reports/allpublishedreports`

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
            const urlImages = `http://localhost:8080/seproject/services/rest/photos/getphotos/${report.reportNumber}`
            axios.get(urlImages, { responseType: 'blob' })
                .then(res => {
                    let blob = new Blob([res.data], { type: "image/jpeg" })
                    const ObjectUrl = URL.createObjectURL(blob)
                    const completeReport = Object.assign(report, { "imageBlob": blob, "imageUrl": ObjectUrl })
                    this.setState({ reports: this.state.reports.concat(completeReport) })
                }).catch(err => {
                    console.log(err)
                })
        })
    }


    render() {
        return (
            <div className="blog-overview-container">
                {this.state.reports.map((report, index) => (
                    <div key={index} className="blog-container">
                        <img src={report.imageUrl} alt="plane" />
                        <div className="content-item-text-container">

                            <p className="content-item-text-category">{report.category}</p>
                            <p className="content-item-text-title">{report.title}</p>
                            <p className="content-item-text-date">{report.date}</p>
                            <p className="content-item-text-text">
                                {report.paragraphOne}
                            </p>
                            <div className="content-item-btn-container">
                                <button className="">Read More</button>
                            </div>
                            <p className="content-item-text-username">By User</p>
                            <p className="content-item-text-rating">{report.amountOfVotes}</p>
                            <p className="content-item-text-views">{report.views}</p>
                        </div>
                    </div>
                ))}
            </div>
        )
    }


}


export default withRouter(BlogOverview)