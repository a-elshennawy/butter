import { useEffect, useState } from "react";
import "./Blog.css";
import UpBtn from "../UpBtn/UpBtn";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedTag, setSelectedTag] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/POSTS.json");
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        setPosts(data);
        setFilteredPosts(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    if (tag === "all") {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter((post) => post.tags.includes(tag)));
    }
  };

  if (loading) return <div className="loading">Loading posts...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Butter - Blog</title>
          <meta
            name="description"
            content="Here what makes us special, our own social place the BUTTER BLOG"
          />
        </Helmet>
      </HelmetProvider>
      <div className="blog">
        <div className="container-fluid">
          <div className="header row">
            <div className="left col-5">
              <h2>blog</h2>
              <h6>News and Events</h6>
            </div>
            <div className="right col-5">
              <p>home / blog</p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="insideBody row">
            <div className="posts col-8 row">
              {filteredPosts.map((post) => (
                <div className="post col-12" key={post.id}>
                  <div className="img">
                    <img src={post.image} alt="" />
                  </div>
                  <div className="details">
                    <div className="h3">{post.title}</div>
                    <div className="content">{post.content}</div>
                    <div className="bottomBar row">
                      <div className="col-lg-5 col-12">
                        <i className="fa-solid fa-user"></i>
                        by <span>{post.creator}</span> on {post.date},{" "}
                        {post.time}
                      </div>
                      <div className="col-lg-5 col-12">
                        <i className="fa-solid fa-comments"></i>
                        {post.comments_counter} /{" "}
                        {post.tags.includes(",")
                          ? post.tags.split(",").join(" - ")
                          : post.tags}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <aside className="sideBar col-4">
              <section>
                <h4>working hours</h4>
                <div className="day">
                  <h5>Monday</h5>
                  <h6>11 am - 3 pm, 5 pm - 9 pm</h6>
                </div>
                <div className="day">
                  <h5>Tuesday</h5>
                  <h6>11 am - 3 pm, 5 pm - 9 pm</h6>
                </div>
                <div className="day">
                  <h5>Wednesday</h5>
                  <h6>11 am - 3 pm, 5 pm - 9 pm</h6>
                </div>
                <div className="day">
                  <h5>Thursday</h5>
                  <h6>11 am - 3 pm, 5 pm - 9 pm</h6>
                </div>
                <div className="day">
                  <h5>Friday</h5>
                  <h6>11 am - 3 pm, 5 pm - 11 pm</h6>
                </div>
                <div className="day">
                  <h5>Saturday</h5>
                  <h6>11 am - 3 pm, 5 pm - 11 pm</h6>
                </div>
                <div className="day">
                  <h5>Sunday</h5>
                  <h6>11 am - 3 pm, 5 pm - 10 pm</h6>
                </div>
              </section>
              <section>
                <h4>tags</h4>
                <div className="tags-container">
                  {["all", "Business", "coffee", "drink", "food", "sweet"].map(
                    (tag) => (
                      <button
                        key={tag}
                        className={`btn ${selectedTag === tag ? "active" : ""}`}
                        onClick={() => handleTagClick(tag)}
                        aria-pressed={selectedTag === tag}
                      >
                        {tag}
                      </button>
                    )
                  )}
                </div>
              </section>
            </aside>
          </div>
        </div>
        <UpBtn />
      </div>
    </>
  );
}
