import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import AddGrocery from "./components/AddGrocery/AddGrocery";
import EditGrocery from "./components/EditGrocery/EditGrocery";

function App() {
    //Hooks
    const [allGroceries, setAllGroceries] = useState([]);
    const [selectedGrocery, setSelectedGrocery] = useState(null);
    const [showAddGroceryForm, setShowAddGroceryForm] = useState(false);
    const [showUpdateGroceryForm, setShowUpdateGroceryForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [showAddGroceryButton, setShowAddGroceryButton] = useState(false);

    const [inputText, setInputText] = useState("");

    // Create new log, tied to specific user (logs component)
    const handleNewGrocerySubmit = (name, image, quantity) => {
        // default image if user doesn't add one
        if (image === "") {
            image = "https://www.svgrepo.com/show/3868/groceries.svg";
        }
        axios
            .post("https://agile-shelf-33236.herokuapp.com/api/v1/grocery", {
                name: name,
                image: image,
                quantity: quantity,
            })
            .then(() => {
                axios.get("https://agile-shelf-33236.herokuapp.com/api/v1/grocery").then((response) => {
                    setAllGroceries(response.data);
                    // setShowAdd(false);
                });
            });
    };

    const handleUpdateGrocery = (name, image, quantity, id) => {
        // default image if user doesn't add one
        if (image === "") {
            image = "https://www.svgrepo.com/show/3868/groceries.svg";
        }
        axios
            .put(`https://agile-shelf-33236.herokuapp.com/api/v1/grocery/${id}`, {
                name: name,
                image: image,
                quantity: quantity,
            })
            .then((response) => {
                setSelectedGrocery(response.data);
                axios.get("https://agile-shelf-33236.herokuapp.com/api/v1/grocery").then((response) => {
                    setAllGroceries(response.data);
                });
            });
    };

    const handleAddQuantity = (id, quantity, name, image) => {
        axios
            .put(`https://agile-shelf-33236.herokuapp.com/api/v1/grocery/${id}`, {
                name: name,
                image: image,
                quantity: quantity + 1,
            })
            .then((response) => {
                setSelectedGrocery(response.data);
                axios.get("https://agile-shelf-33236.herokuapp.com/api/v1/grocery").then((response) => {
                    setAllGroceries(response.data);
                });
            });
    };

    //  ! Playing around with the idea of having the font color of the item name turn red when quantity is zero. So far no dice.
    // const outOfStockRed = () => {
    //     document.getElementById("cardTitle").style.color = "red";
    // };

    const handleSubtrackQuantity = (id, quantity, name, image) => {
        if (quantity > 0) {
            axios
                .put(`https://agile-shelf-33236.herokuapp.com/api/v1/grocery/${id}`, {
                    name: name,
                    image: image,
                    quantity: quantity - 1,
                })

                .then((response) => {
                    // console.log(id);
                    setSelectedGrocery(response.data);
                    axios.get("https://agile-shelf-33236.herokuapp.com/api/v1/grocery").then((response) => {
                        setAllGroceries(response.data);
                    });
                    console.log("this is minus button");
                    // console.log(response.data);
                });
        } else {
            return (quantity = 0);
        }
    };

    const mutationUpdateGrocery = handleUpdateGrocery();

    // Delete selected grocery, and clear display log view (details component)
    const handleGroceryDelete = (grocery_id) => {
        // setSelectedGrocery(null);
        axios.delete(`https://agile-shelf-33236.herokuapp.com/api/v1/grocery/${grocery_id}`).then((response) => {
            axios.get("https://agile-shelf-33236.herokuapp.com/api/v1/grocery").then((response) => {
                setAllGroceries(response.data);
                console.log("it made to after the setAllGroceries");
            });
        });
    };

    // Set user log choice (logs component)
    const handleGrocerySelect = (grocery) => {
        setSelectedGrocery(grocery);
        console.log("the selected grocery is " + grocery.name);
    };

    const toggleShowAddGroceryForm = (event) => {
        setShowAddGroceryForm(!showAddGroceryForm);
    };

    const toggleShowUpdateGroceryForm = (event, id) => {
        setIsEditing(!isEditing);
        // setShowUpdateGroceryForm(!setAllGroceries);
    };

    const toggleIsEditing = (event, id) => {
        console.log("the id of the card being edited is " + id);
        setIsEditing(!isEditing);
    };

    // const updateQuantity = (id, newQuantity) => {
    //     if (newQuantity < 0) {
    //         return;
    //     }
    //     mutationUpdateGrocery.mutate({ id, quantity: newQuantity });
    // };

    /* -------------------------------------------------------------------------- */
    /*                               SearchBar CODE                               */
    /* -------------------------------------------------------------------------- */

    const handleSearchInput = (event) => {
        let lowerCase = event.target.value.toLowerCase();
        setInputText(lowerCase);
        // console.log(lowerCase);
    };

    // * I have to sort the data before I map it. In this case it's being sorted by quantity so the lowest quantity item moves to the top.
    const sortedGroceries = allGroceries.sort((a, b) => a.quantity - b.quantity);

    const filteredData = sortedGroceries.filter((x) => {
        //if no input the return the original
        if (inputText === "") {
            return x;
        }
        //return the item which contains the user input
        else {
            return x.name.toLowerCase().includes(inputText);
        }
    });

    /* -------------------------- END OF SEARCHBAR CODE ------------------------- */
    useEffect(() => {
        axios.get("https://agile-shelf-33236.herokuapp.com/api/v1/grocery").then((response) => {
            setAllGroceries(response.data);
            // console.log(allGroceries);
        });
    }, []);

    return (
        <>
            {/* <h1>Stocked.IO</h1> */}

            <nav>
                <div className="searchBar">
                    <input id="input" className="input is-rounded" type="text" placeholder="Search" onChange={handleSearchInput} />
                </div>

                <div className="searchBar">
                    {showAddGroceryForm === false ? (
                        <button id="addBtn" className="button" onClick={toggleShowAddGroceryForm}>
                            Add New Grocery Item
                        </button>
                    ) : (
                        <AddGrocery handleNewGrocerySubmit={handleNewGrocerySubmit} toggleShowAddGroceryForm={toggleShowAddGroceryForm} />
                    )}
                </div>
            </nav>

            <main>
                <section className="cardContainer">
                    {filteredData.map((grocery, index) => {
                        return (
                            <div key={index}>
                                {isEditing === false ? (
                                    <div className="card">
                                        <div className="cardImage">
                                            <img className="imgFit" src={grocery.image} alt=""></img>
                                        </div>
                                        <div className="cardBody">
                                            <p className="cardTitle">{grocery.name}</p>
                                            <div>
                                                <p className="cardDescription">Quantity: {grocery.quantity}</p>
                                                <div className="cardActions">
                                                    <button onClick={() => handleAddQuantity(grocery.id, grocery.quantity, grocery.name, grocery.image)}>
                                                        <i class="fa-solid fa-plus"></i>
                                                    </button>
                                                    <button onClick={() => handleSubtrackQuantity(grocery.id, grocery.quantity, grocery.name, grocery.image)}>
                                                        <i class="fa-solid fa-minus"></i>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="cardActions">
                                                <button
                                                    onClick={() => {
                                                        handleGroceryDelete(grocery.id);
                                                    }}
                                                >
                                                    DELETE
                                                </button>
                                                <button
                                                    onClick={(event) => {
                                                        toggleIsEditing(event, grocery.id);
                                                    }}
                                                    // onClick={(event) => {
                                                    //     handleGrocerySelect(grocery);
                                                    // }}
                                                >
                                                    EDIT
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="card">
                                            <EditGrocery
                                                className="editForm"
                                                index={index}
                                                allGroceries={allGroceries[index]}
                                                handleUpdateGrocery={handleUpdateGrocery}
                                                selectedGrocery={selectedGrocery}
                                                toggleShowUpdateGroceryForm={toggleShowUpdateGroceryForm}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </section>
            </main>
        </>
    );
}

export default App;
