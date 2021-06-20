import React, { useContext } from 'react'
import { ThemeContext } from './contexts/ThemeContext'
import { Link } from 'react-router-dom'

import ThemeButton from './ThemeButton'

import './Error.css'

const Error = () => {
    const { darkMode } = useContext(ThemeContext);

    let errorRootTheme, errorTheme, spanTheme; 
    if (darkMode) {
        errorRootTheme = "error-root-dark";
        errorTheme = "error-text error-dark";
        spanTheme = "span-color-dark";
    } else {
        errorRootTheme = "error-root-light";
        errorTheme = "error-text error-light";
        spanTheme = "span-color-light";
    }

    return (
        <div id="error-page" className={errorRootTheme}>
            <div id="error-theme-button">
                <ThemeButton />
            </div>
            <div id="error-card">
                <div className={errorTheme}>
                    <h1>
                        <span className={spanTheme}>404: Error</span>
                    </h1>
                    <p>
                        Oops! Looks like the page or meet-link you
                        are looking for doesn't exist :(
                    </p>
                    <Link to="/">
                        <p>Go back to Home</p>
                    </Link>
                </div>
            </div>
        </div>
                        );
}

export default Error
