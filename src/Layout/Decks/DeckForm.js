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
            <div className="form-group">
                <label for="name">Name</label>  {/* todo: warning: for instead of htmlFor */}
                <input 
                    className="form-control"
                    id="name"
                    type="text"
                    name="name"
                    onChange={handleChange}
                    placeholder="Deck Name"
                    required
                    value={deck.name}
                />
            </div>
            <div className="form-group">
                <label for="description">Description</label>
                <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    onChange={handleChange}
                    placeholder="Brief description of the deck"
                    required
                    rows="3"
                    value={deck.description}
                />
            </div>
            <button type="button" className="btn btn-secondary mr-2" onClick={handleCancel}>Cancel</button>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}

export default DeckForm;