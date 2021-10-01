import React from "react";

function CardForm({ card, setCard, handleDone, handleSave }) {

    const handleChange = ({ target }) => {
        const value = target.value;
        setCard({
            ...card,
            [target.name]: value,
        });
    };
    
    return (
        <form onSubmit={handleSave}>
            <div className="form-group">
                <label htmlFor="front">Front</label>
                <textarea
                    className="form-control"
                    id="front"
                    name="front"
                    onChange={handleChange}
                    placeholder="Front side of card"
                    required
                    rows="3"
                    value={card.front}
                />
            </div>
            <div className="form-group">
                <label htmlFor="back">Back</label>
                <textarea
                    className="form-control"
                    id="back"
                    name="back"
                    onChange={handleChange}
                    placeholder="Back side of card"
                    required
                    rows="3"
                    value={card.back}
                />
            </div>
            <button type="button" className="btn btn-secondary mr-2" onClick={handleDone}>Done</button>
            <button type="submit" className="btn btn-primary">Save</button>
        </form>
    );
    
}

export default CardForm;