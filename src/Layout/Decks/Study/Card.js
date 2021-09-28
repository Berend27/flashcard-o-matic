import React from "react";

function Card() {

    return (
        <div className="row">
            <div className="card col m-3 pl-0 pr-0">
                <div className="card-body">
                    <h3>Card 1 of 3</h3>
                    <p>Card Text</p>
                    <button type="button" class="btn btn-secondary">Flip</button>
                </div>
            </div>
        </div>
    )
}

export default Card;