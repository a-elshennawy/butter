import React, { useState, useEffect } from 'react';
import "./Orders.css";
import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Cart() {
    const loggedUser = localStorage.getItem('login');
    const currentUser = loggedUser ? JSON.parse(loggedUser).username : null;

    const orders = JSON.parse(localStorage.getItem('orderedDrinks')) || {};
    const userOrders = currentUser ? orders[currentUser] || [] : [];

    const [currOrders, setOrders] = useState(userOrders);

    useEffect(() => {
        const interval = setInterval(() => {
            setOrders((prevOrders) => [...prevOrders]);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const getRemainingTime = (order) => {
        const now = Date.now();
        const endTime = new Date(order.startTime).getTime() + order.duration * 1000;
        return Math.max(Math.floor((endTime - now) / 1000), 0);
    };

    const handleRecieved = (index) => {
        const completedOrder = currOrders[index];


        const updatedOrders = currOrders.filter((_, i) => i !== index);
        setOrders(updatedOrders);

        const updatedStoredOrders = { ...orders, [currentUser]: updatedOrders };
        localStorage.setItem('orderedDrinks', JSON.stringify(updatedStoredOrders));


        const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || {};
        if (!orderHistory[currentUser]) {
            orderHistory[currentUser] = [];
        }
        orderHistory[currentUser].push({ ...completedOrder, status: 'Received' });
        localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
    };

    const handleCancel = (index) => {
        const updatedOrders = currOrders.filter((_, i) => i !== index);
        setOrders(updatedOrders);

        const updatedStoredOrders = { ...orders, [currentUser]: updatedOrders };
        localStorage.setItem('orderedDrinks', JSON.stringify(updatedStoredOrders));
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Butter - cart</title>
                    <meta name='description' content='here is your cart where all your orders go' />
                </Helmet>
            </HelmetProvider>
            <div className="cart">
                <div className="container-fluid">
                    <div className="header row">
                        <div className="col-5 left">
                            <h2>Cart</h2>
                            <h6>Your Orders</h6>
                        </div>
                        <div className="col-5 right">
                            <p><Link to={"/"}>home</Link> / cart</p>
                        </div>
                    </div>
                    <div className="orders row">
                        <h3><strong>Active</strong> Orders</h3>
                        {currOrders.length > 0 ? (
                            currOrders.map((order, index) => {
                                const timeLeft = getRemainingTime(order);
                                const status =
                                    timeLeft > 0
                                        ? 'Pending'
                                        : 'Waiting to Pick Up';

                                return (
                                    <div className="order-card col-3 col-lg-5 col-md-10" key={index}>
                                        <div className="img">
                                            <img src={order.image} alt="" />
                                        </div>
                                        <div className="info row">
                                            <h3 className='col-10'>{order.name}</h3>
                                            <h5 className='col-10'>$ {order.price}</h5>
                                            <p className='col-10'>{order.description}</p>
                                            <p className='col-7'><strong>Status :</strong> {status}</p>
                                            <p className='timer col-5'>{timeLeft > 0 ? formatTime(timeLeft) : 'Ready for Pickup'}</p>
                                            <p className='col-10 notice'>
                                                Kindly head to the bar to receive your order #
                                                {order.orderNumber}
                                            </p>
                                            <button
                                                className="doneBtn col-5 btn"
                                                onClick={() => handleRecieved(index)}
                                            >
                                                Mark as Received
                                            </button>
                                            <button
                                                className="CancelBtn col-5 btn"
                                                onClick={() => handleCancel(index)}
                                            >
                                                Cancel Order
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (<p className='no-orders'>No orders</p>)}
                    </div>
                    <div className="order-history row">
                        <h3><strong>Orders</strong> History</h3>
                        <div className="hisotry-items row">
                            {JSON.parse(localStorage.getItem('orderHistory'))?.[currentUser]?.map((order, index) => (
                                <div className="recievedItem-card col-3 col-lg-5 col-md-10" key={index}>
                                    <div className="img">
                                        <img src={order.image} alt="" />
                                    </div>
                                    <div className="info row">
                                        <h3 className='col-10'>{order.name}</h3>
                                        <h5 className='col-10'>$ {order.price}</h5>
                                        <p className='col-10'>{order.description}</p>
                                        <p className='col-7'><strong>Status :</strong> {order.status}</p>
                                    </div>
                                </div>
                            )) || <p className='no-orders'>No order history</p>}
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}
