import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import "./Error_404.css";

export default function Error_404() {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Error 404</title>
        </Helmet>
      </HelmetProvider>

      <div className="error">
        <img src="Images/404.webp" alt="" />
        <div className="content">
          <i className="fa-solid fa-gears"></i>
          <h1>Error 404</h1>
          <h3>
            hmmm .. i guess this page is not found or not available at this
            moment
          </h3>
          <Link className="goHome" to={"/"}>
            back to home page
          </Link>
        </div>
      </div>
    </>
  );
}
