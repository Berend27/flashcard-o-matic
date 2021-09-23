import React from "react";

function Card({ card }) {
    if (card) {
        return (
            <div class="card row ml-0 mr-0">
                <div class="card-body d-flex">
                    <div class="col-6">
                        <p>{card.front}</p>
                    </div>
                    <div class="col-6">
                        <p>{card.back}</p>
                        <br />
                        <div class="d-flex justify-content-end" style={{position: "absolute", right: "0px", bottom: "0px"}}>
                            <button type="button" class="btn btn-secondary mr-2">Edit</button>
                            <button type="button" class="btn btn-danger"><i class="far fa-trash-alt"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return <div></div>;
    }
    
}

export default Card;