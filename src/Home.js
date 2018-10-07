import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './Home.css';

class Home extends Component {
    render() {
        return (
            <div className="Home">
                <Jumbotron>
                    <h1>Welcome to Bingo!</h1>
                    <p>
                        Here you can create a custom bingo board to play with your friends!
                    </p>
                    <p>
                        <Link to="/form">
                            <Button color="primary">Create a board</Button>
                        </Link>
                    </p>
                </Jumbotron>
            </div>
        );
    }
}

export default Home;
