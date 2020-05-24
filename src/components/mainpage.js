import React from 'react'

import Slider from "react-slick";
import './mainpage.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './main-image-slider.css'

function MainImageSlider() {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 6000,
        speed: 1500,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <Slider {...settings}>
            <div className="slider-container">
                <div className="slider-content-container">
                    <div className="slider-image-container">
                        <img src={require(`../assets/images/photo1.jpg`)} className="" alt="blog item"/>
                    </div>
                    <div className="slider-text-container">
                        <p>Hier komt tekst over een blog.</p>
                    </div>
                </div>
            </div>
            <div className="slider-container">
                <div className="slider-content-container">
                    <div className="slider-image-container">
                        <img src={require(`../assets/images/photo2.jpg`)} className="" alt="blog item"/>
                    </div>
                    <div className="slider-text-container">
                        <p>Hier komt tekst over een blog.</p>
                    </div>
                </div>
            </div>            <div className="slider-container">
                <div className="slider-content-container">
                    <div className="slider-image-container">
                        <img src={require(`../assets/images/photo3.jpg`)} className="" alt="blog item"/>
                    </div>
                    <div className="slider-text-container">
                        <p>Hier komt tekst over een blog.</p>
                    </div>
                </div>
            </div>
        </Slider>
    );

}

function Mainpage() {

    return (
        <div className="mainpage">
            <div className="carousel-container">
                <MainImageSlider />
            </div>
            <div className="main-buttons-container">
                <button className="main-button">Categorie<span>Hier komt de titel</span></button>
                <button className="main-button">Categorie<span>Hier komt de titel</span></button>
                <button className="main-button">Categorie<span>Hier komt de titel</span></button>
                <button className="main-button">Categorie<span>Hier komt de titel</span></button>
                <button className="main-button">Categorie<span>Hier komt de titel</span></button>
            </div>
            <div className="content-container">
                <div className="content-item">
                    <img src={require(`../assets/images/photo2.jpg`)} className="" alt="blog item"/>
                    <div className="content-item-text-container">

                        <p className="content-item-text-category">Germany</p>
                        <p className="content-item-text-title">My first trip to Berlin, Germany</p>
                        <p className="content-item-text-date">2 March 20202</p>
                        <p className="content-item-text-text">I went to Berlin this year.
                            This was my first time
                            in Europe. Berlin is the capital of Germany.
                            Berlin is very pretty and I liked the so called Braadworst.

                        </p>
                        <div className="content-item-btn-container">
                            <button className="">Read More</button>
                        </div>
                        <p className="content-item-text-username">By User</p>
                        <p className="content-item-text-rating">Ratings</p>
                        <p className="content-item-text-views">Views</p>
                    </div>
                </div>
                <div className="content-item">
                    <img src={require(`../assets/images/photo2.jpg`)} className="" alt="blog item"/>
                    <div className="content-item-text-container">

                        <p className="content-item-text-category">Germany</p>
                        <p className="content-item-text-title">My first trip to Berlin, Germany</p>
                        <p className="content-item-text-date">2 March 2020</p>
                        <p className="content-item-text-text">I went to Berlin this year.
                            This was my first time
                            in Europe. Berlin is the capital of Germany.
                            Berlin is very pretty and I liked the so called Braadworst.

                        </p>
                        <div className="content-item-btn-container">
                            <button className="">Read More</button>
                        </div>
                        <p className="content-item-text-username">By User</p>
                        <p className="content-item-text-rating">Ratings</p>
                        <p className="content-item-text-views">Views</p>
                    </div>
                </div>
               
            </div>
        </div>
    )

}

export default Mainpage