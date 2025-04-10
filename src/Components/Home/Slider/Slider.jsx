import "../Home.css";

export default function Slider() {
  return (
    <>
      <div className="HomeSlider">
        <div
          id="carouselExampleAutoplaying"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="./Images/slider-bg.jpg"
                className="d-block w-100"
                alt="..."
              />
              <div className="carousel-caption d-none d-md-block caption">
                <i className="fa-regular fa-heart"></i>
                <h5>Morning first coffee</h5>
                <h1>makes you love</h1>
                <img src="./Images/lines.png" alt="" />
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="./Images/slider-bg1.jpg"
                className="d-block w-100"
                alt="..."
              />
              <div className="carousel-caption d-none d-md-block caption">
                <i className="fa-regular fa-heart"></i>
                <h5>Morning first coffee</h5>
                <h1>makes you love</h1>
                <img src="./Images/lines.png" alt="" />
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="./Images/slider-bg2.jpg"
                className="d-block w-100"
                alt="..."
              />
              <div className="carousel-caption d-none d-md-block caption">
                <i className="fa-regular fa-heart"></i>
                <h5>Morning first coffee</h5>
                <h1>makes you love</h1>
                <img src="./Images/lines.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
