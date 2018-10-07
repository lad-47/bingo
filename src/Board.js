import React, { Component } from 'react';
import './Board.css';
import Square from './Square.js';

class Board extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(index) {
        const fields = this.props.fields.slice();
        const clicked = this.props.clicked.slice();
        // fields[index] = "X";
        clicked[index]=!clicked[index];
        this.props.handleUpdate(fields,clicked);
    }

    render() {
        return (
            <div className="Board">
                <ul className="flex-container">
                    {this.props.fields.map((field, index) => <Square key={field+" "+index} field={field} index={index} clicked={this.props.clicked[index]} handleUpdate={this.handleChange}/>)}
                    <div id="free-space"><Square key={25} field="Free" handleUpdate={this.handleChange} clicked/></div>
                </ul>
            </div>
        );
    }
}

export default Board;
