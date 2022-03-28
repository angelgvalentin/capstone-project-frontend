import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
    const [allGroceries, setAllGroceries] = useState([]);

    useEffect(() => {
        axios.get("https://agile-shelf-33236.herokuapp.com/api/v1/grocery").then((response) => {
            setAllGroceries(response.data);
            // console.log(allGroceries);
        });
    }, []);

    return (
        <>
            <h1>Hello World</h1>

            <main>
                <section className="cardContainer">
                    {allGroceries.map((grocery) => {
                        return (
                            <>
                                <div key={grocery._id}>
                                    <div className="card">
                                        <div className="cardImage">
                                            <img className="imgFit" src={grocery.image} alt=""></img>
                                        </div>
                                        <div className="cardBody">
                                            <p className="cardTitle">{grocery.name}</p>
                                            <p className="cardDescription">Quantity: {grocery.quantity}</p>
                                            <div className="cardActions">
                                                <button className="button">Add</button>
                                                <button className="button">Subtract</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        );
                    })}
                </section>
            </main>
        </>
    );
}

export default App;
