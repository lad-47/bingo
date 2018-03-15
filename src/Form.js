import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FormGroup, ControlLabel, FormControl, HelpBlock, Col, Button, ButtonGroup, Glyphicon, ProgressBar } from 'react-bootstrap';
import './Form.css';

class Form extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRightClick = this.handleRightClick.bind(this);

        this.state = {
            currentStep: 0,
            currentProgress: 0,
            leftDisabled: true,
            rightDisabled: true,
        }
    }

    getValidationState() {
    }

    handleChange(e) {
        const fields = this.props.fields.slice();
        const rightDisabled = e.target.value.length === 0;
        fields[this.state.currentStep] = e.target.value;
        this.setState({
            rightDisabled: rightDisabled,
        });
        this.props.handleUpdate(fields);
    }

    handleLeftClick() {
        const step = this.state.currentStep;
        const leftDisabled = step === 1;
        const rightDisabled = this.props.fields[step - 1] === "";
        this.setState({
            rightDisabled: rightDisabled,
            leftDisabled: leftDisabled,
            currentStep: step - 1,
            currentProgress: ((step - 1) / 24) * 100,
        });
    }

    handleRightClick() {
        const step = this.state.currentStep;
        const rightDisabled = this.props.fields[step + 1] === "" || step === 23;
        this.setState({
            rightDisabled: rightDisabled,
            leftDisabled: false,
            currentStep: step + 1,
            currentProgress: ((step + 1) / 24) * 100,
        });
    }

    handleSubmit(e) {
        if (this.state.currentStep < 23) {
            this.handleRightClick();
        } 
        e.preventDefault();
    }

    render() {
        return (
            <div className="Form">
                <ProgressBar active now={this.state.currentProgress} />
                <form onSubmit={this.handleSubmit}>
                    <FormGroup
                        controlId="formBasicText"
                        validationState={this.getValidationState()}
                    >
                        <ControlLabel>Working example with validation</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.props.fields[this.state.currentStep]}
                            placeholder="Enter text"
                            onChange={this.handleChange}
                            autoFocus
                        />
                        <FormControl.Feedback />
                    </FormGroup>
                    <ButtonGroup>
                        <Button disabled={this.state.leftDisabled} onClick={() => this.handleLeftClick()}>
                            <Glyphicon glyph="circle-arrow-left" />
                        </Button>
                        <Next currentStep={this.state.currentStep} rightDisabled={this.state.rightDisabled} onClick={this.handleRightClick} />
                    </ButtonGroup>
                </form>
            </div>
        );
    }
}

function Next(props) {
    if (props.currentStep === 23) {
        return (
            <Link to="/board">
                <Button disabled={props.rightDisabled} onClick={props.onClick}>
                    <Glyphicon glyph="ok" />
                </Button>
            </Link>
        );
    }
    return (
        <Button disabled={props.rightDisabled} onClick={props.onClick}>
            <Glyphicon glyph="circle-arrow-right" />
        </Button>
    );
}

export default Form;
