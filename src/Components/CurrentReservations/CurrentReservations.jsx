import React, { useState } from 'react';
import './CurrentReservations.css';
import { Link } from 'react-router-dom';

export default function CurrentReservations() {
    const ResDetails = localStorage.getItem('User_Reservations');
    const [CurrRes, setCurrRes] = useState(ResDetails ? JSON.parse(ResDetails) : []);

    const handleCancellation = (index) => {
        const updatedReservations = CurrRes.filter((_, i) => i !== index)

        setCurrRes(updatedReservations);

        localStorage.setItem('User_Reservations', JSON.stringify(updatedReservations));
    };


    return <>
        <div className="currRes">
            <div className="container-fluid">
                <div className="header row">
                    <div className="col-5 left">
                        <h2>your Reservations</h2>
                        <h6>booked tables</h6>
                    </div>
                    <div className="col-5 right">
                        <p><Link to={"/"}>home</Link> / <Link to={'/reservations'}>reservations</Link> / your Reservations</p>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="booked row">
                    {CurrRes.length > 0 ? (
                        CurrRes.map((reservation, index) => (
                            <div key={index} className="reservation-card col-3 col-md-5 col-sm-10">
                                <h5>reservation #{index + 1}</h5>
                                <p><strong>guest full name:</strong> {reservation.FullName}</p>
                                <p><strong>phone number:</strong> {reservation.Phone}</p>
                                <p><strong>number of guests:</strong> {reservation.Guests}</p>
                                <p><strong>date:</strong> {reservation.Date}</p>
                                {reservation.additional_notes && (
                                    <p><strong>notes:</strong> {reservation.additional_notes}</p>
                                )}
                                <button className="cancel" onClick={() => { handleCancellation(index) }}>
                                    cancel reservation
                                </button>
                            </div>
                        ))
                    ) : (<p className='emptyRes'>no reservations yet</p>
                    )}
                </div>
                <button className='goToRes'>
                    <Link to={'/reservations'}>make a reservation !</Link>
                </button>
            </div>
        </div>
    </>
}
