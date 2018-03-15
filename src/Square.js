import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './Square.css';

class Square extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.handleUpdate(this.props.index);
    }

    render() {
        return (
            <div className="Square" onClick={this.handleChange} >
                {this.props.field}
            </div>
        );
    }
}

export default Square;
