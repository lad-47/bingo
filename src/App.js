import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  // NavbarToggler,
  NavbarBrand} from 'reactstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Home from './Home.js';
import BingoForm from './Form.js';
import Board from './Board.js';

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      fields: Array(24).fill(""),
      clicked: Array(24).fill(false)
    }
  }

  handleChange(fields, clicked) {
    this.setState({
      fields: fields,
      clicked: clicked
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar light>
              <NavbarBrand href="/">Bingo
              </NavbarBrand>
              {/* <NavbarToggler /> */}
            <Collapse>
            </Collapse>
          </Navbar>
          <Route exact path="/" component={Home} />
          <Route
            path='/form'
            render={(props) => <BingoForm {...props} fields={this.state.fields} clicked={this.state.clicked} handleUpdate={this.handleChange}/>}
          />
          <Route
            path='/board'
            render={(props) => <Board {...props} fields={this.state.fields} clicked={this.state.clicked} handleUpdate={this.handleChange}/>}
          />
        </div>
      </Router>
    );
  }
}

export default App;
