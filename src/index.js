/* global $ */
import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css'

class StarsFrame extends React.Component {
  constructor(props) {
    super(props);
    const numberOfStars = Math.floor(Math.random() * 9) + 1;
    const stars = [];
    for(let i=0 ; i < numberOfStars; i++) {
      stars.push(
        <span class="glyphicon glyphicon-star"></span>
      );
    }
    this.state = { stars };
  }

  render() {
    return (
      <div id="stars-frame">
        <div class="well">
         {this.state.stars}
        </div>
      </div>
    );
  }
}

class ButtonFrame extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="button-frame">
        <button class="btn btn-primary btn-lg">=</button>
      </div>
    );
  }
}

class AnswerFrame extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="answer-frame">
        <div class="well">

        </div>
      </div>
    );
  }
}

class NumbersFrame extends React.Component {
  constructor(props) {
    super(props);
    const numbers =[];
    for(let i=1; i < 10; i++) {
      numbers.push(<div class="number">{i}</div>)
    }
    this.state = {numbers};
  }

  render() {
    return (
      <div id="numbers-frame">
        <div class="well">
          {this.state.numbers}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="game">
        <h2>Play Nine</h2>
        <hr />
        <div class="clearfix">
          <StarsFrame />
          <ButtonFrame />
          <AnswerFrame />
        </div>
        <NumbersFrame />
      </div>
    )
  }
}


ReactDOM.render(<Game />, document.getElementById("root"));
