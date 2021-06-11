import React from 'react'
import { Link } from 'react-router-dom'

const InvalidMeet = () => {
    return (
        <>
            <h1>This meeting id is either invalid or doesn't exist.</h1>
            <Link to="/">
                <p>Go back to Home</p>
            </Link>
        </>
    )
}

export default InvalidMeet
