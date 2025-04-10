import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Home.css";

export default function BlogPart() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const toBlog = () => {
    navigate("/blog");
  };
  useEffect(() => {
    fetch("./POSTS.json")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) =>
        console.log("Error fetching data from your API file", error)
      );
  });
  return (
    <>
      <div className="fromBlog">
        <div className="container">
          <div className="head">
            <h2>from our blog</h2>
          </div>
          <div className="posts row">
            {posts
              .filter((post) => post.home === true)
              .map((post) => {
                return (
                  <div
                    className="post col-3 col-md-5 col-sm-10"
                    key={post.id}
                    onClick={toBlog}
                  >
                    <div className="postInfo">
                      <h4>{post.title}</h4>
                      <p>
                        by: <strong>{post.creator}</strong>
                      </p>
                      <p>
                        <i className="fa-regular fa-calendar"></i>
                        {post.date}, <i className="fa-solid fa-comments"></i>
                        {post.comments_counter}
                      </p>
                      <h6>{post.short}</h6>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
