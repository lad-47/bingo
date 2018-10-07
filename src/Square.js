import React, { Component } from 'react';
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
            <div className={"Square "+(this.props.clicked ? 'clicked' : 'unclicked')} onClick={this.handleChange} >
                <p className="fieldValue">{this.props.field}</p>
            </div>
        );
    }
}

export default Square;
