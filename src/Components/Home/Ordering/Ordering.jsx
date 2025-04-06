import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Home.css";

export default function Ordering() {
  const [Drinks, setDrinks] = useState([]);
  const loggedUser = localStorage.getItem("login");
  const currentUser = loggedUser ? JSON.parse(loggedUser).username : null;
  const navigate = useNavigate();

  useEffect(() => {
    fetch("./API.json")
      .then((response) => response.json())
      .then((data) => setDrinks(data))
      .catch((error) =>
        console.log("Error fetching data from your API file", error)
      );
  }, []);

  const orderClick = (id) => {
    if (!currentUser) {
      alert("kindly login / register to place an order.");
      navigate("/login");
      return;
    }

    const storedOrders =
      JSON.parse(localStorage.getItem("orderedDrinks")) || {};

    if (!storedOrders[currentUser]) {
      storedOrders[currentUser] = [];
    }

    if (!storedOrders[currentUser].includes(id)) {
      storedOrders[currentUser].push(id);
    }

    localStorage.setItem("orderedDrinks", JSON.stringify(storedOrders));
    alert(`Drink has been added to your orders!`);
  };

  return (
    <div className="orderNow">
      <div className="container">
        <div className="samples row">
          {Drinks.filter((drink) => drink.home === true).map((drink) => {
            return (
              <div className="drink col-lg-3 col-10" key={drink.id}>
                <div className="img">
                  <img src={drink.image} alt={drink.name} />
                  <span>$ {drink.price}</span>
                </div>
                <div className="info">
                  <h5>{drink.name}</h5>
                  <p>{drink.description}</p>
                  <button
                    className="btn"
                    onClick={() => {
                      orderClick(drink);
                    }}
                  >
                    order now!
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
