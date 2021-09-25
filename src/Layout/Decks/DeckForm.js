import React from "react";

function DeckForm({ deck, setDeck, handleCancel, handleSubmit}) {
    const handleChange = ({ target }) => {
        const value = target.type === "checkbox" ? target.checked : target.value;
        setDeck({
            ...deck,
            [target.name]: value,
        });
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <div class="form-group">
                <label for="name">Name</label>
                <input 
                    class="form-control"
                    id="name"
                    type="text"
                    name="name"
                    onChange={handleChange}
                    placeholder="Deck Name"
                    required
                    value={deck.name}
                />
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea
                    class="form-control"
                    id="description"
                    name="description"
                    onChange={handleChange}
                    placeholder="Brief description of the deck"
                    required
                    rows="3"
                    value={deck.description}
                />
            </div>
            <button type="button" class="btn btn-secondary mr-2" onClick={handleCancel}>Cancel</button>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    );
}

export default DeckForm;