import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Home from './Home.js';
import Form from './Form.js';
import Board from './Board.js';

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      fields: Array(24).fill(""),
    }
  }

  handleChange(fields) {
    this.setState({
      fields: fields,
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">Bingo</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
            </Navbar.Collapse>
          </Navbar>
          <Route exact path="/" component={Home} />
          <Route
            path='/form'
            render={(props) => <Form {...props} fields={this.state.fields} handleUpdate={this.handleChange}/>}
          />
          <Route
            path='/board'
            render={(props) => <Board {...props} fields={this.state.fields} handleUpdate={this.handleChange}/>}
          />
        </div>
      </Router>
    );
  }
}

export default App;
