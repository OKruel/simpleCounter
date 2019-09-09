import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      negative: 0,
      counter: 0,
      msg: 'Counter can not be negative'
    }
  }

  render() {
    return (
      <div data-test='component-app'>
        <h1 data-test='counter-display'>The counter is currently: {this.state.counter}</h1>
        {this.state.negative > -1? <p></p>: <p data-test='error-message'>{this.state.msg}</p>}
        <button
          onClick={() => this.setState({ counter: this.state.counter + 1, negative: 0 })}
          data-test='increment-button'
        > Increment </button>

        <button
          onClick={() => this.state.counter === 0 ? this.setState({ counter: 0, negative: -1 }) : this.setState({ counter: this.state.counter - 1 })}
          data-test='decrement-button'
        > Decrement </button>

      </div>
    );
  }
}

export default App;
