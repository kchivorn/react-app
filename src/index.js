/* global $ */
import React from 'react';
import ReactDOM from 'react-dom';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    var component = this;
    $.get("https://api.github.com/users/" + this.props.login, function(data){
      component.setState(data);
    });
  }

  render() {
    return (
      <div>
        <img src={this.state.avatar_url} width="80" />
        <h3>{this.state.name}</h3>
        <hr/>
      </div>
    )
  }
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var loginInput = ReactDOM.findDOMNode(this.refs.login);
    this.props.addCard(loginInput.value);
    loginInput.value = '';
  }
  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <input placehoder="github login" ref="login" />
        <button>Add</button>
      </form>
    )
  }
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {logins: ['zpao', 'fisherwebdev']};
    this.addCard = this.addCard.bind(this);
  }

  addCard(val) {
    this.setState({logins: this.state.logins.concat(val)});
  }

  render() {
    var cards = this.state.logins.map(function(login) {
      return (<Card login={login} />);
    });

    return (
      <div>
        <Form addCard={this.addCard} />
        {cards}
      </div>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById("root"));
