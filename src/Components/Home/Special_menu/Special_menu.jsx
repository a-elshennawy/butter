import  { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import './Special_menu.css'

export default function Special_menu() {

    const [drinks, setDrinks] = useState([])

    useEffect(() => {
        fetch("./API.json")
            .then((response) => response.json())
            .then((data) => setDrinks(data))
            .catch((error) => console.log("Error fetching data from your API file", error));
    })
    return <>
        <div className="special">
            <div className="container">
                <h2>special menu</h2>
                <div className="menu">
                    {drinks.filter((drink) => drink.special === true).map((drink) => {
                        return (
                            <div className="item row" key={drink.id}>
                                <h5 className='col-7'>{drink.name}</h5>
                                <h6 className='col-4'>$ {drink.price}</h6>
                                <p className='col-8'>{drink.description}</p>
                            </div>
                        )
                    })}
                </div>
                <button className="goShop">
                    <Link to={'/shop'}>visit our shop</Link>
                </button>
            </div>
        </div>
    </>
}
