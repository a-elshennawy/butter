import { useEffect, useState } from "react";
import "./PostsSlider.css"


export default function PostsSlider() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch("./POSTS.json")
            .then((response) => response.json())
            .then((data) => setPosts(data))
            .catch((error) => console.log("Error fetching data from your API file", error));
    })

    return <>
        <div className="ppl">
            <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carouselBG"></div>
                    <div className="headerIn">
                        <h2>what people says</h2>
                    </div>
                    <div className="carousel-item active">
                        {posts.filter((post) => post.id == 0).map((post) => {
                            return (
                                <div className="carousel-caption d-none d-md-block" key={post.id}>
                                    <h5>{post.short}</h5>
                                    <h6>{post.creator}<p> / from examedia</p></h6>
                                    <p>{post.date}</p>
                                </div>
                            )
                        })}
                    </div>
                    <div className="carousel-item">
                        {posts.filter((post) => post.id == 1).map((post) => {
                            return (
                                <div className="carousel-caption d-none d-md-block" key={post.id}>
                                    <h5>{post.short}</h5>
                                    <h6>{post.creator}<p> / from examedia</p></h6>
                                    <p>{post.date}</p>
                                </div>
                            )
                        })}
                    </div>
                    <div className="carousel-item">
                        {posts.filter((post) => post.id == 2).map((post) => {
                            return (
                                <div className="carousel-caption d-none d-md-block" key={post.id}>
                                    <h5>{post.short}</h5>
                                    <h6>{post.creator}<p> / from examedia</p></h6>
                                    <p>{post.date}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    </>
}
