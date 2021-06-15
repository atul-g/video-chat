import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import { ThemeContext } from './contexts/ThemeContext'

import ThemeButton from './ThemeButton'

import './Home.css'

const Home = () => {
    const history = useHistory();
    const { darkMode } = useContext(ThemeContext);
    console.log(darkMode)

    const handleJoinMeet = () => {
        let inputMeetId = document.querySelector('[name="input-meetid"]').value;
        history.push(`/meet/${inputMeetId}`)
    }

    return (
        <>
            <ThemeButton />
            <div id="home-card" className={darkMode ? "home" : "home-dark"}>
                <Row>
                    <Col sm={12} lg={6}>
                        <div className="intro-text">
                            <h1>
                                <span className="span-color-text">Connect</span>
                                &nbsp;with your friends instantly!
                            </h1>
                            <p>
                                It's as simple as creating a new meet room or
                                joining an existing one.
                            </p>
                        </div>
                    </Col>
                    <Col sm={12} lg={6}>
                        <div className="meet-join">
                            <Link to={`/meet/${uuidv4()}`}>
                                <Button variant="primary" size="lg" block>Create new meet</Button>
                            </Link>
                            <p className="meet-join-or"> or </p>

                            <input id="input-meetid" type="text" name="input-meetid" placeholder=" Enter a Meet ID" />
                            <br />
                            <Button variant="outline-primary" size="lg" block type="button" onClick={handleJoinMeet}>Join meet</Button>
                        </div>
                    </Col>
                </Row>
            </div>
            {/* I changed viewbox height from 320 to 315 in the below svg tag
            to get rid of the white thin line between svg and the following div
            tag */}
            <svg className="svg-curves" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#0d6efd" fillOpacity="1" d="M0,32L60,53.3C120,75,240,117,360,154.7C480,192,600,224,720,218.7C840,213,960,171,1080,138.7C1200,107,1320,85,1380,74.7L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z">
                </path>
            </svg>
        </>
    );
}

export default Home
