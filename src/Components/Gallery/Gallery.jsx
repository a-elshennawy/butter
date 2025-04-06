import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Gallery.css";
import UpBtn from "../UpBtn/UpBtn";
import { Helmet, HelmetProvider } from "react-helmet-async";
import PostsSlider from "../PostsSlider/PostsSlider";

export default function Gallery() {
  const [Photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch("./Gallery.json")
      .then((response) => response.json())
      .then((data) => setPhotos(data))
      .catch((error) =>
        console.log("error fetching data from API File", error)
      );
  }, []);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Butter - Gallery</title>
          <meta
            name="description"
            content="here some pictures from our place, have a look"
          />
        </Helmet>
      </HelmetProvider>
      <div className="gallery">
        <div className="container-fluid">
          <div className="header row">
            <div className="left col-5">
              <h2>gallery</h2>
              <h5>our photo gallery</h5>
            </div>
            <div className="right col-5">
              <p>
                {" "}
                <Link to={"/"}>home</Link> / gallery
              </p>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="photos row">
            {Photos.map((photo) => {
              return (
                <div className="photo col-3 col-md-3 col-sm-5" key={photo.id}>
                  <div className="overlay">
                    <h6>our gallery</h6>
                  </div>
                  <div className="img">
                    <img src={photo.image} alt="" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <PostsSlider />
      <UpBtn />
    </>
  );
}
