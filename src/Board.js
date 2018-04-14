import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './Board.css';
import Square from './Square.js';

class Board extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(index) {
        const fields = this.props.fields.slice();
        fields[index] = "X";
        this.props.handleUpdate(fields);
    }

    render() {
        return (
            <div className="Board">
                <ul className="flex-container">
                    {this.props.fields.map((field, index) => <Square key={field+" "+index} field={field} index={index} handleUpdate={this.handleChange}/>)}
                    <div id="free-space"><Square key={25} field="Free" handleUpdate={this.handleChange}/></div>
                </ul>
            </div>
        );
    }
}

export default Board;
