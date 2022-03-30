import { useState } from "react";

const AddGrocery = (props) => {
    /* ---------------------------------- Hooks --------------------------------- */
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [quantity, setQuantity] = useState(0);

    /* --------------------------- FORM EVENT HANDLERS -------------------------- */

    const handleNewName = (event) => {
        setName(event.target.value);
    };

    const handleNewImage = (event) => {
        setImage(event.target.value);
    };

    const handleNewQuantity = (event) => {
        console.log(event.target.value);
        setQuantity(event.target.value);
    };

    // Add new log submit, pass state up to App.js
    const handleFormSubmit = (event) => {
        //this takes off the default action that submitting the form does
        event.preventDefault();
        props.handleNewGrocerySubmit(name, image, quantity);
        document.getElementById("addForm").reset();
    };

    const handleFormHide = (event) => {
        event.preventDefault();
        props.toggleShowAddGroceryForm(event);
    };

    return (
        <div>
            <section className="formContainer">
                <form id="addForm" className="box" onSubmit={handleFormSubmit}>
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input className="input" type="text" onChange={handleNewName} />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Image</label>
                        <div className="control">
                            <input className="input" type="text" onChange={handleNewImage} />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Quantity</label>
                        <div className="control">
                            <input className="input" type="number" onChange={handleNewQuantity} />
                        </div>
                    </div>

                    <div className="field is-grouped">
                        <div id="submitBtn" className="control">
                            <input className="button is-info" type="submit"></input>
                        </div>

                        <div className="control">
                            <button className="button is-info" onClick={handleFormHide}>
                                Cancel
                            </button>
                        </div>
                    </div>

                    <div className="fiel"></div>
                </form>
            </section>
        </div>
    );
};

export default AddGrocery;
