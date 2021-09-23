import React, { useState } from "react";
import { createDeck } from "../../utils/api";
import { 
    Link,
    useHistory, 
} from "react-router-dom";
import { v1 as uuidv1 } from "uuid";

function CreateDeck() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const create = () => {
        const deck = {};
        deck.name = name;
        deck.description = description;
        deck.id = uuidv1();
        return deck;
    }

    const history = useHistory();

    const handleNameChange = (event) => setName(event.target.value);
    const handleDescriptionChange = (event) => setDescription(event.target.value);

    const handleCancel = () => history.push("/");

    const handleSubmit = (event) => {
        event.preventDefault();
        const deck = create();
        createDeck(deck);
        setName("");
        setDescription("");
        history.push(`/decks/${deck.id}`);
    }

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li class="breadcrumb-item active" aria-current="page">Create Deck</li>
                </ol>
            </nav>
            <div class="row">
                <h2 class="ml-3">Create Deck</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input 
                        class="form-control"
                        id="name"
                        type="text"
                        name="name"
                        onChange={handleNameChange}
                        placeholder="Deck Name"
                        required
                    />
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea
                        class="form-control"
                        id="description"
                        onChange={handleDescriptionChange}
                        placeholder="Brief description of the deck"
                        required
                        rows="3"
                    />
                </div>
                <button type="button" class="btn btn-secondary mr-2" onClick={handleCancel}>Cancel</button>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default CreateDeck;