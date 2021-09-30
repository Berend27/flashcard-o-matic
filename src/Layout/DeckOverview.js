import React from "react";
import {
    useHistory,
} from "react-router-dom";

function DeckOverview({ deck, handleDelete }) {
    const history = useHistory();

    const handleStudy = () => history.push(`/decks/${deck.id}/study`)
    const handleView = () => history.push(`/decks/${deck.id}`);

    return (
        <div className="row">
            <div className="card col-6 m-3 pl-0 pr-0">
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h3>{deck.name}</h3>
                    <p>{deck.count} cards</p>
                </div>
                <p>{deck.description}</p>
                <div className="d-flex justify-content-between">
                    <div >
                        <button type="button" className="btn btn-secondary mr-2" onClick={handleView}>
                            <i className="fas fa-eye"></i> View
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handleStudy}><i className="fas fa-book"></i> Study</button>
                    </div>
                    <button 
                        type="button" 
                        className="btn btn-danger" 
                        onClick={(event) => {
                            handleDelete(deck.id)
                            event.currentTarget.blur();
                        }}>
                        <i className="far fa-trash-alt"></i>
                    </button>
                </div>
            </div>
            </div>
        </div>
    );
}

export default DeckOverview;