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
        <div className="content row">
          <i className="fa-solid fa-gears col-12"></i>
          <h1 className="col-12">Error 404</h1>
          <h3 className="col-12">
            hmmm .. i guess this page is not found or not available at this
            moment
          </h3>
          <Link className="goHome col-10" to={"/"}>
            back to home page
          </Link>
        </div>
      </div>
    </>
  );
}
