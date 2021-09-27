import React from "react";
import { 
    Link,
    useHistory,
    useParams, 
} from "react-router-dom";

function AddCard({ deck }) {
    const deckId = useParams().deckId;  // todo: can this be gotten from deck.id?
    const history = useHistory();
    const previous = `/decks/${deckId}`;

    const handleChange = ({ target }) => {
        const value = target.value;
        
    };
    const handleSubmit = async () => {};

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={previous}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Add Card</li>
                </ol>
            </nav>
            <div className="row">
                <h2 className="ml-3">{deck.name}: Add Card</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label for="front">Front</label> {/* todo: warning: for instead of htmlFor */}
                    <textarea
                        className="form-control"
                        id="front"
                        name="front"
                        onChange={handleChange}
                        placeholder="Front side of card"
                        required
                        rows="3"
                    />
                </div>
                <div className="form-group">
                    <label for="back">Back</label>
                    <textarea
                        className="form-control"
                        id="back"
                        name="back"
                        onChange={handleChange}
                        placeholder="Back side of card"
                        required
                        rows="3"
                    />
                </div>
                <button type="button" className="btn btn-secondary mr-2" >Done</button>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </>
    );
}

export default AddCard;