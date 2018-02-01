import React from 'react';
import ReactDOM from 'react-dom';

class Button extends React.Component{
  constructor(props) {
    super(props);
    this.localHandleClick = this.localHandleClick.bind(this);
  }

  localHandleClick() {
    this.props.localHandleClick(this.props.increment);
  }

  render() {
    return <button onClick={this.localHandleClick}> +{this.props.increment} </button>;
  }
}

class Result extends React.Component {
  render() {
    return <div>{this.props.localCounter}</div>
  }
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: this.props.initialCount};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(increment) {
    this.setState({ count: this.state.count + increment });
  }

  render() {
    return (
      <div>
        <Button localHandleClick={this.handleClick} increment={1} />
        <Button localHandleClick={this.handleClick} increment={5} />
        <Button localHandleClick={this.handleClick} increment={20} />
        <Button localHandleClick={this.handleClick} increment={100} />
        <Result localCounter={this.state.count} />
      </div>
    )
  }
}

ReactDOM.render(<Main initialCount={7}/>, document.getElementById("root"));
