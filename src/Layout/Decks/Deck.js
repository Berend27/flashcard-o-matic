import React from "react";
import { readDeck } from "../../utils/api";
import { useHistory, useParams } from "react-router-dom";

function Deck() {

    /*
        // todo: something along the lines of 
        const [user, setUser] = useState({});

    // Use `useParams()` and `useEffect()`
    // Load profile data from https://jsonplaceholder.typicode.com/users/${userId}
    const userId = useParams().userId;
    useEffect(() => {
        async function loadUser() {
            const response = await fetch(
                `https://jsonplaceholder.typicode.com/users/${userId}`
            );
            const userFromAPI = await response.json();
            setUser(userFromAPI);
        }
        loadUser();
    }, [userId]);

    */

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li class="breadcrumb-item active" aria-current="page">Create Deck</li>
                </ol>
            </nav>
        </>
    )
}

export default Deck;