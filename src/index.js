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
        <span key={i} className="glyphicon glyphicon-star"></span>
      );
    }
    this.state = { stars };
  }

  render() {
    return (
      <div id="stars-frame">
        <div className="well">
         {this.state.stars}
        </div>
      </div>
    );
  }
}

class ButtonFrame extends React.Component {
  render() {
    return (
      <div id="button-frame">
        <button className="btn btn-primary btn-lg">=</button>
      </div>
    );
  }
}

class AnswerFrame extends React.Component {
  render() {
    var unselectNumber = this.props.unselectNumber;
    var numbers = this.props.selectedNumbers.map(function(num, i) {
      return <span key={i} onClick={unselectNumber.bind(null, num)}>{num}</span> ;
    });

    return (
      <div id="answer-frame">
        <div className="well">
          {numbers}
        </div>
      </div>
    );
  }
}

class NumbersFrame extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var numbers = [];
    var selectNumber = this.props.selectNumber;
    var selectedNumbers = this.props.selectedNumbers;
    for(let i=1; i < 10; i++) {

      var className = "number selected-" + (selectedNumbers.indexOf(i)>=0);
      numbers.push(<div key={i} className={className} onClick={selectNumber.bind(null, i)}>{i}</div>)
    }

    return (
      <div id="numbers-frame">
        <div className="well">
          {numbers}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedNumbers: []};
    this.selectNumber = this.selectNumber.bind(this);
    this.unselectNumber = this.unselectNumber.bind(this);
  }

  selectNumber(clickedNumber) {
    if (this.state.selectedNumbers.indexOf(clickedNumber) < 0){
      this.setState(
        { selectedNumbers: this.state.selectedNumbers.concat(clickedNumber) }
      );
    }
  }

  unselectNumber(clickedNumber) {
    var selectedNumbers = this.state.selectedNumbers,
        indexOfNumber = selectedNumbers.indexOf(clickedNumber);

    selectedNumbers.splice(indexOfNumber, 1);
    this.setState({selectedNumbers: selectedNumbers});
  }

  render() {
    return (
      <div id="game">
        <h2>Play Nine</h2>
        <hr />
        <div className="clearfix">
          <StarsFrame />
          <ButtonFrame />
          <AnswerFrame selectedNumbers={this.state.selectedNumbers}
                       unselectNumber={this.unselectNumber} />
        </div>
        <NumbersFrame selectedNumbers={this.state.selectedNumbers}
                      selectNumber={this.selectNumber} />
      </div>
    )
  }
}


ReactDOM.render(<Game />, document.getElementById("root"));
