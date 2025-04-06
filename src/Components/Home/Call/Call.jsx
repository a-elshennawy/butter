import "../Home.css";
import { Link } from "react-router-dom";
export default function Call() {
  return (
    <>
      <div className="call">
        <div className="container">
          <h2>
            You can also call us: <span>+1 123 4567 890</span> to make a
            reservation
          </h2>
          <button className="btn">
            <Link to={"/Reservations"}>online reservation</Link>
          </button>
        </div>
      </div>
    </>
  );
}
