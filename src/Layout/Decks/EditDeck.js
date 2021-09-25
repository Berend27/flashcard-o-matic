import React, { useEffect, useState } from "react";
import { 
    Link,
    useHistory, 
    useParams, 
} from "react-router-dom";
import { 
    readDeck,
    updateDeck, 
} from "../../utils/api";

function EditDeck() {
    const [deck, setDeck] = useState({});
    const [name, setName] = useState("");
    const [description, setDescription] = useState("")

    const deckId = useParams().deckId;
    const history = useHistory();
    const previous = `/decks/${deckId}`;

    const handleCancel = () => history.goBack();
    const handleNameChange = (event) => setName(event.target.value);
    const handleDescriptionChange = (event) => setDescription(event.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();
        deck.name = name;
        deck.description = description;
        await updateDeck(deck);
        history.goBack();
    }

    useEffect(() => {
        async function loadDeck() {
            const deckFromAPI = await readDeck(deckId);
            setDeck(deckFromAPI);
        }
        loadDeck();
    }, [deckId])

    // todo: prefill the fields with what the existing data

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li class="breadcrumb-item"><Link to={previous}>{deck.name}</Link></li>
                    <li class="breadcrumb-item active" aria-current="page">Edit Deck</li>
                </ol>
            </nav>
            <div class="row">
                <h2 class="ml-3">Edit Deck</h2>
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

export default EditDeck;