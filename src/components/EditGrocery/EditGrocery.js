import { useState } from "react";
import "/Users/angelvalentin/dev/Unit Projects/Capstone Final Project/capstone-frontend/capstone-project-frontend/src/App.css";

const EditGrocery = (props) => {
    /* ---------------------------------- Hooks --------------------------------- */
    const [editGrocery, setEditGrocery] = useState(false);
    const [name, setNewName] = useState(props.allGroceries.name);
    const [image, setNewImage] = useState(props.allGroceries.image);
    const [quantity, setNewQuantity] = useState(props.allGroceries.quantity);

    // console.log(props.allGroceries.id);

    /* --------------------------- FORM EVENT HANDLERS -------------------------- */

    const handleNewName = (event) => {
        setNewName(event.target.value);
    };

    const handleNewImage = (event) => {
        setNewImage(event.target.value);
    };

    const handleNewQuantity = (event) => {
        // console.log(props.allGroceries);
        setNewQuantity(event.target.value);
    };

    // Handle Edit grocery submit, pass state up to App.js
    const handleFormSubmit = (event) => {
        //this takes off the default action that submitting the form does
        event.preventDefault();
        props.handleUpdateGrocery(name, image, quantity, props.allGroceries.id);
        // document.getElementById("addForm").reset();
        // toggleEdit();
        handleEditFormHide(event);
    };

    // Clear log selected state so display window closes, pass state up to App.js
    const closeSelected = () => {
        props.handleLogSelectClear();
    };

    // Toggle edit view
    // const toggleEdit = () => {
    //     if (editGrocery) {
    //         setEditGrocery(false);
    //     } else {
    //         setEditGrocery(true);
    //     }
    // };

    // Upon Edit button select, update states and toggle edit view
    // const editSelected = () => {
    //     setNewName(props.selectedGrocery.name);
    //     setNewImage(props.selectedGrocery.image);
    //     setNewQuantity(props.selectedGrocery.quantity);

    //     // toggleEdit();
    // };

    const handleEditFormHide = (event) => {
        event.preventDefault();
        console.log("Cancel button is working");
        props.toggleShowUpdateGroceryForm(event);
    };

    return (
        <div>
            <section className="formContainer">
                <form id="editForm" className="box" onSubmit={handleFormSubmit}>
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input className="input" type="text" onChange={handleNewName} value={name} />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Image</label>
                        <div className="control">
                            <input className="input" type="text" onChange={handleNewImage} value={image} />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Quantity</label>
                        <div className="control">
                            <input className="input" type="number" onChange={handleNewQuantity} value={quantity} />
                        </div>
                    </div>

                    <div className="field is-grouped">
                        <div id="submitBtn" className="control">
                            <input className="button is-info" type="submit"></input>
                        </div>

                        <div className="control">
                            <button className="button is-info" onClick={handleEditFormHide}>
                                Cancel
                            </button>
                        </div>
                    </div>

                    <div className="field"></div>
                </form>
            </section>
        </div>
    );
};

export default EditGrocery;
