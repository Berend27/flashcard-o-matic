import React from "react";
// todo: Edit button functionality
function Card({ card }) {
    if (card) {
        return (
            <div className="card row ml-0 mr-0">
                <div className="card-body d-flex">
                    <div className="col-6">
                        <p>{card.front}</p>
                    </div>
                    <div className="col-6">
                        <p>{card.back}</p>
                        <br />
                        <div className="d-flex justify-content-end" style={{position: "absolute", right: "0px", bottom: "0px"}}>
                            <button type="button" className="btn btn-secondary mr-2">Edit</button>
                            <button type="button" className="btn btn-danger"><i className="far fa-trash-alt"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return <div></div>;  // todo: is this necessary?
    }
    
}

export default Card;