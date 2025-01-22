import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Shop.css'
import UpBtn from '../UpBtn/UpBtn';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import PostsSlider from '../PostsSlider/PostsSlider';


export default function Shop() {
    const [Drinks, setDrinks] = useState([]);
    const loggedUser = localStorage.getItem('login');
    const currentUser = loggedUser ? JSON.parse(loggedUser).username : null;
    const navigate = useNavigate()


    useEffect(() => {
        fetch("./API.json")
            .then((response) => response.json())
            .then((data) => setDrinks(data))
            .catch((error) => console.log("Error fetching data from your API file", error));
    }, []);

    const orderClick = (drink) => {
        if (!currentUser) {
            alert("Kindly login / register to place an order.");
            navigate('/login');
            return;
        }

        const storedOrders = JSON.parse(localStorage.getItem('orderedDrinks')) || {};

        if (!storedOrders[currentUser]) {
            storedOrders[currentUser] = [];
        }


        if (!storedOrders[currentUser].find((item) => item.id === drink.id)) {
            const newOrder = {
                ...drink,
                startTime: Date.now(),
                duration: 300,
                orderNumber: Math.floor(Math.random() * 10000) + 1,
            };
            storedOrders[currentUser].push(newOrder);
        }

        localStorage.setItem('orderedDrinks', JSON.stringify(storedOrders));
        alert(`Drink "${drink.name}" has been added to your orders!`);
    };

    return <>
        <HelmetProvider>
            <Helmet>
                <title>butter - Shop</title>
                <meta name='description' content='in the butter shop, you can order your drink without asking anyone' />
            </Helmet>
        </HelmetProvider>
        <div className="shop">
            <div className="container-fluid">
                <div className="header row">
                    <div className="left col-5">
                        <h2>Shop</h2>
                        <h6>our drinks</h6>
                    </div>
                    <div className="right col-5">
                        <p> <Link to={"/"}>home</Link> / shop</p>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="items row">
                    <div className="col-10 category">
                        <h3>Cappucinos</h3>
                    </div>
                    {Drinks.filter((drink) => drink.tag === "Cappucino").map((drink) => {
                        return (
                            <div className="drink col-sm-10 col-md-5 col-lg-4" key={drink.id}>
                                <div className="img">
                                    <img src={drink.image} alt={drink.name} />
                                </div>
                                <div className="info">
                                    <h5>{drink.name}</h5>
                                    <h6>$ {drink.price}</h6>
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
                        )
                    })}
                    <div className="col-10 category">
                        <h3>Iced Coffees</h3>
                    </div>
                    {Drinks.filter((drink) => drink.tag === "iced coffee").map((drink) => {
                        return (
                            <div className="drink col-sm-10 col-md-5 col-lg-4" key={drink.id}>
                                <div className="img">
                                    <img src={drink.image} alt={drink.name} />
                                </div>
                                <div className="info">
                                    <h5>{drink.name}</h5>
                                    <h6>$ {drink.price}</h6>
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
                        )
                    })}
                </div>

                <button className="toOrders">
                    <Link to={'/orders'}>check your orders</Link>
                </button>
            </div>
        </div>
        <PostsSlider />
        <UpBtn />
    </>
}
