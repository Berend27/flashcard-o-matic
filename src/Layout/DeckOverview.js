import React from "react";
import {
    useHistory,
} from "react-router-dom";

function DeckOverview({ deck }) {
    const history = useHistory();

    const handleView = () => history.push(`/decks/${deck.id}`);
    // todo: handleStudy

    return (
        <div class="row">
            <div class="card col-5 m-3 pl-0 pr-0">
            <div class="card-header d-flex justify-content-between">
                <h3>{deck.name}</h3>
                <p>{deck.count} cards</p>
            </div>
            <div class="card-body">
                <p>{deck.description}</p>
                <div class="d-flex justify-content-between">
                <div >
                    <button type="button" class="btn btn-secondary mr-2" onClick={handleView}>
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button type="button" class="btn btn-primary"><i class="fas fa-book"></i> Study</button>
                </div>
                <button type="button" class="btn btn-danger"><i class="far fa-trash-alt"></i></button>
                </div>
            </div>
            </div>
        </div>
    );
}

export default DeckOverview;