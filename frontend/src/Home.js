import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

const Home = () => {
    const history = useHistory();

    const handleJoinMeet = () => {
        let inputMeetId = document.querySelector('[name="input-meetid"]').value;
        
        if (uuidValidate(inputMeetId)) {
            history.push(`/meet/${inputMeetId}`)
        } else {
            history.push('/Error')
        }
    }

    return (
        <>
            <p>Welcome! Start a meet or join a new meet instantly!</p>
            <br />
            <Link to={`/meet/${uuidv4()}`}>
                <button>Create new meet</button>
            </Link>
            <br />
            <p>or</p>
            <br />

            <label htmlFor="input-meetid">Enter a meet ID to join</label>
            <input id="input-meetid" type="text" name="input-meetid" />
            <button type="button" onClick={handleJoinMeet}>Join meet</button>
        </>
    );
}

export default Home
