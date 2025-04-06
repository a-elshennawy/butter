import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import './Footer.css'

export default function Footer() {
    const [posts, setPosts] = useState([])
    const [pics, setPics] = useState([])

    const navigate = useNavigate()
    const toBlog = (() => {
        navigate('/blog');
    })

    const toGallery = (() => {
        navigate('./gallery')
    })

    useEffect(() => {
        fetch("./POSTS.json")
            .then((response) => response.json())
            .then((data) => setPosts(data))
            .catch((error) => console.log("Error fetching data from your API file", error));
    });

    useEffect(() => {
        fetch("./Gallery.json")
            .then((response) => response.json())
            .then((data) => setPics(data))
            .catch((error) => console.log("Error fetching data from your API file", error));
    });

    return <>
        <div className="footer">
            <div className="container">
                <div className="row">
                    <div className="about col-4">
                        <h3>about company</h3>
                        <p> Pellentesque mi purus, eleifend sedt commodo vel, sagittis elts vestibulum dui sagittis mlste sagittis elts.</p>
                        <ul>
                            <li><i className="fa-solid fa-location-dot"></i>15 Barnes Wallis Way, 358744, USA</li>
                            <li><i className="fa-solid fa-phone"></i>+1 (012) 345 6789</li>
                            <li><i className="fa-solid fa-envelope"></i>nfo@yourdomain.com</li>
                        </ul>
                    </div>
                    <div className="recent col-4">
                        <h3>recent posts</h3>
                        {posts.filter((post) => post.recent === true).map((post) => {
                            return (
                                <div className="post row" key={post.id} onClick={toBlog}>
                                    <div className="info col-12">
                                        <h6>{post.title}</h6>
                                        <p>{post.short} <br />
                                            By <strong>{post.creator}</strong> / {post.date}</p>
                                    </div>
                                </div>
                            )
                        })}
                        <hr />
                    </div>
                    <div className="ourGallery col-4">
                        <h3>our gallery</h3>
                        <div className="images row">
                            {pics.filter((pic) => pic.home === true).map((pic) => {
                                return (
                                    <div className="gallerySample col-5" key={pic.id} onClick={toGallery}>
                                        <img src={pic.image} alt="" />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="banner">
                <div className="container">
                    <div className="inner row">
                        <p className='col-5'>Copyright © 2016 yourdomian. All rights reserved.</p>
                        <div className="socials col-5">
                            <span><i className="fa-brands fa-facebook-f"></i></span>
                            <span><i className="fa-brands fa-twitter"></i></span>
                            <span><i className="fa-brands fa-instagram"></i></span>
                            <span><i className="fa-brands fa-pinterest-p"></i></span>
                            <span><i className="fa-brands fa-youtube"></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
}
