import React, { useState } from "react";
import { 
    Link,
    useHistory,
    useParams, 
} from "react-router-dom";
import { createCard } from "../../../utils/api";
import BreadcrumbBar from "../../BreadcrumbBar";
function AddCard({ deck }) {
    const deckId = deck.id 
    const history = useHistory();
    const navLinks = [
        {text: "Home", url: "/"},
        {text: deck.name, url: `/decks/${deck.id}`},
    ]
    const PAGE_NAME = "Add Card";

    const initialFormState = {
        front: "",
        back: "",
    }

    const [card, setCard] = useState(initialFormState);

    const handleChange = ({ target }) => {
        const value = target.value;
        setCard({
            ...card,
            [target.name]: value,
        });
    };

    const handleDone = () => {
        history.push(`/decks/${deckId}`);
        history.go(0);
    }

    const handleSave = async (event) => {
        event.preventDefault();
        card.deckId = deckId;
        card.id = Math.floor(Math.random() * 100000);
        await createCard(deckId, card);
        history.go(0);
    }

    return (
        <div>
            <BreadcrumbBar links={navLinks} currentPage={PAGE_NAME} />
            <div className="row">
                <h2 className="ml-3">{deck.name}: {PAGE_NAME}</h2>
            </div>
            <form onSubmit={handleSave}>
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
                <button type="button" className="btn btn-secondary mr-2" onClick={handleDone}>Done</button>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    );
}

export default AddCard;