import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css'

class StarsFrame extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var numberOfStars = this.props.numberOfStars;
    var stars = [];

    for(let i=0 ; i < numberOfStars; i++) {
      stars.push(
        <span key={i} className="glyphicon glyphicon-star"></span>
      );
    }

    return (
      <div id="stars-frame">
        <div className="well">
         {stars}
        </div>
      </div>
    );
  }
}

class ButtonFrame extends React.Component {
  render() {
    var disabled, button, correct = this.props.correct;

    switch(correct) {
      case true:
        button = (
          <button className="btn btn-success btn-lg ok">
            <span className="glyphicon glyphicon-ok" onClick={this.props.acceptAnswer} ></span>
          </button>
        );
        break;
      case false:
        button = (
          <button className="btn btn-danger btn-lg remove">
            <span className="glyphicon glyphicon-remove"></span>
          </button>
        );
        break;
      default:
        disabled = (this.props.selectedNumbers.length === 0);
        button = (
          <button className="btn btn-primary btn-lg equal" disabled={disabled}
                  onClick={this.props.checkAnswer} >
            =
          </button>
        )
    }
    var redraws = this.props.redraws;
    return (
      <div id="button-frame">
        {button}
        <br /><br />
        <button className="btn btn-warning refresh" onClick={this.props.redraw}
                disabled={redraws === 0}>
          <span className="glyphicon glyphicon-refresh"></span>
          &nbsp;
          {redraws}
        </button>
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
    var usedNumbers = this.props.usedNumbers;
    var className;
    for(let i=1; i < 10; i++) {
      if (usedNumbers.indexOf(i)>=0) {
        className = "number used-" + (usedNumbers.indexOf(i)>=0);
      } else {
        className = "number selected-" + (selectedNumbers.indexOf(i)>=0);
      }
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

class DoneFrame extends React.Component {
  render() {
    return (
      <div className="well text-center">
        <h2>{this.props.doneStatus}</h2>
        <button className="btn btn-default" onClick={this.props.resetGame} >Play again</button>
      </div>
    );
  }
}

var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }

  var listSize = arr.length, combinationsCount = (1 << listSize);
  for (let i=1; i < combinationsCount; i++) {
    var combinationSum = 0;
    for(let j=0; j < listSize; j++) {
      if(i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this._initState = {
      numberOfStars: this.randomNumber(),
      selectedNumbers: [],
      usedNumbers: [],
      redraws: 10,
      doneStatus: null,
      correct: null,
    };

    this.state = this._initState;

    this.selectNumber = this.selectNumber.bind(this);
    this.unselectNumber = this.unselectNumber.bind(this);
    this.sumOfSelectedNumbers = this.sumOfSelectedNumbers.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.acceptAnswer = this.acceptAnswer.bind(this);
    this.redraw = this.redraw.bind(this);
    this.updateDoneStatus = this.updateDoneStatus.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  resetGame() {
    this.setState(this._initState);
  }

  selectNumber(clickedNumber) {
    if (this.state.selectedNumbers.indexOf(clickedNumber) < 0){
      this.setState(
        { selectedNumbers: this.state.selectedNumbers.concat(clickedNumber),
          correct: null }
      );
    }
  }

  unselectNumber(clickedNumber) {
    var selectedNumbers = this.state.selectedNumbers,
        indexOfNumber = selectedNumbers.indexOf(clickedNumber);

    selectedNumbers.splice(indexOfNumber, 1);
    this.setState({selectedNumbers: selectedNumbers, correct: null});
  }

  sumOfSelectedNumbers() {
    return this.state.selectedNumbers.reduce(function(p, n) {
      return p+n;
    }, 0);
  }

  checkAnswer() {
    var correct = (this.state.numberOfStars === this.sumOfSelectedNumbers());
    this.setState({correct: correct});
  }

  acceptAnswer() {
    var usedNumbers = this.state.usedNumbers.concat(this.state.selectedNumbers);
    this.setState({
      selectedNumbers: [],
      usedNumbers: usedNumbers,
      correct: null,
      numberOfStars: this.randomNumber()
    }, function() {
      this.updateDoneStatus();
    });
  }

  redraw() {
    this.setState({
      numberOfStars: this.randomNumber(),
      redraws: this.state.redraws - 1,
      correct: null
    }, function() {
      this.updateDoneStatus();
    });
  }

  randomNumber() {
    return Math.floor(Math.random() * 9) + 1;
  }

  possibleSolutions() {
    var numberOfStars = this.state.numberOfStars,
      possibleNumbers = [],
      usedNumbers = this.state.usedNumbers;

    for (let i=1; i<=9; i++) {
      if(usedNumbers.indexOf(i) < 0) {
        possibleNumbers.push(i)
      }
    }
    return possibleCombinationSum(possibleNumbers, numberOfStars);
  }

  updateDoneStatus() {
    if (this.state.usedNumbers.length === 9) {
      this.setState({ doneStatus: "Congrats! You win."})
      return;
    }

    if (this.state.redraws === 0 && !this.possibleSolutions()) {
      this.setState({doneStatus: 'Game Over'});
    }
  }

  render() {
    var selectedNumbers = this.state.selectedNumbers,
        numberOfStars = this.state.numberOfStars,
        correct = this.state.correct,
        usedNumbers = this.state.usedNumbers,
        redraws = this.state.redraws,
        doneStatus = this.state.doneStatus,
        bottomFrame;

    if (doneStatus) {
      bottomFrame = <DoneFrame doneStatus={doneStatus} resetGame={this.resetGame} />;
    } else {
      bottomFrame = (
        <NumbersFrame selectedNumbers={selectedNumbers}
                      usedNumbers={usedNumbers}
                      selectNumber={this.selectNumber} />
      )
    }

    return (
      <div id="game">
        <h2>Play Nine</h2>
        <hr />
        <div className="clearfix">
          <StarsFrame numberOfStars={numberOfStars} />
          <ButtonFrame selectedNumbers={selectedNumbers}
                       correct={correct}
                       checkAnswer={this.checkAnswer}
                       acceptAnswer={this.acceptAnswer}
                       redraws={redraws}
                       redraw={this.redraw} />
          <AnswerFrame selectedNumbers={selectedNumbers}
                       unselectNumber={this.unselectNumber} />
        </div>
        {bottomFrame}
      </div>
    )
  }
}


ReactDOM.render(<Game />, document.getElementById("root"));
