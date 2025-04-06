import { useEffect, useState } from 'react';
import './Blog.css';
import UpBtn from '../UpBtn/UpBtn';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Blog() {
    const [Posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [selectedTag, setSelectedTag] = useState('all');

    useEffect(() => {
        fetch('./POSTS.json')
            .then((response) => response.json())
            .then((data) => {
                setPosts(data);
                setFilteredPosts(data);
            })
            .catch((error) =>
                console.log('Error fetching data from your API file', error)
            );
    }, []);

    const handleTagClick = (tag) => {
        setSelectedTag(tag);
        if (tag === 'all') {
            setFilteredPosts(Posts);
        } else {
            setFilteredPosts(Posts.filter((post) => post.tags.includes(tag)));
        }
    };

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
                                            <div className="col-5">
                                                <i className="fa-solid fa-user"></i>
                                                by <span>{post.creator}</span> on{' '}
                                                {post.date}, {post.time}
                                            </div>
                                            <div className="col-5">
                                                <i className="fa-solid fa-comments"></i>
                                                {post.comments_counter} /{' '}
                                                {post.tags.includes(',')
                                                    ? post.tags.split(',').join(' - ')
                                                    : post.tags}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="sideBar col-4">
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
                            <h4>tags</h4>
                            <button
                                className={`btn ${selectedTag === 'all' ? 'active' : ''}`}
                                onClick={() => handleTagClick('all')}
                            >
                                all
                            </button>
                            <button
                                className={`btn ${selectedTag === 'Business' ? 'active' : ''}`}
                                onClick={() => handleTagClick('Business')}
                            >
                                Business
                            </button>
                            <button
                                className={`btn ${selectedTag === 'coffee' ? 'active' : ''}`}
                                onClick={() => handleTagClick('coffee')}
                            >
                                coffee
                            </button>
                            <button
                                className={`btn ${selectedTag === 'drink' ? 'active' : ''}`}
                                onClick={() => handleTagClick('drink')}
                            >
                                drink
                            </button>
                            <button
                                className={`btn ${selectedTag === 'food' ? 'active' : ''}`}
                                onClick={() => handleTagClick('food')}
                            >
                                food
                            </button>
                            <button
                                className={`btn ${selectedTag === 'sweet' ? 'active' : ''}`}
                                onClick={() => handleTagClick('sweet')}
                            >
                                sweet
                            </button>
                        </div>
                    </div>
                </div>
                <UpBtn />
            </div>
        </>
    );
}
