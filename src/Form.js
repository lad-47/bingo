import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { ButtonGroup, Button, FormGroup, FormFeedback, Label, Input, Progress } from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faArrowAltCircleLeft, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './Form.css';

library.add(faArrowAltCircleRight, faArrowAltCircleLeft, faCheckCircle);

class BingoForm extends Component {
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
        this.props.handleUpdate(fields, this.props.clicked);
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
        e.preventDefault();
        if (this.state.currentStep < 23) {
            this.handleRightClick();
        } else {
            this.props.history.push('/board')
        }
    }

    render() {
        return (
            <div className="Form">
                <Progress color="success" value={this.state.currentProgress} />
                <form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label>Enter your bingo fields</Label>
                        <Input
                            type="text"
                            value={this.props.fields[this.state.currentStep]}
                            placeholder="Enter text"
                            onChange={this.handleChange}
                            autoFocus
                        />
                        <FormFeedback />
                    </FormGroup>
                    <ButtonGroup>
                        <Button disabled={this.state.leftDisabled} onClick={() => this.handleLeftClick()}>
                            <FontAwesomeIcon icon="arrow-alt-circle-left" />
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
            <Link to="./board">
                <Button disabled={props.rightDisabled} onClick={props.onClick}>
                    <FontAwesomeIcon icon="check-circle" />
                </Button>
            </Link>
        );
    }
    return (
        <Button disabled={props.rightDisabled} onClick={props.onClick}>
            <FontAwesomeIcon icon="arrow-alt-circle-right" />
        </Button>
    );
}

export default BingoForm;
