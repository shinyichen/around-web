import React from "react";
import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";
import {Switch, Route, Redirect} from "react-router-dom";
import Home from "./Home";

class Main extends React.Component {

  getLogin = () => {
    return this.props.isLoggedIn? 
      <Redirect to="/home" /> : <LoginForm handleLoginSucceed={this.props.handleLoginSucceed} />
  }

  getHome = () => {
    return this.props.isLoggedIn? 
      <Home /> : <Redirect to="/login" />
  }

  render() {
    return (
      <div className="main">
        <Switch>
          <Route path="/register" component={RegistrationForm} />
          <Route path="/login" render={this.getLogin} />
          <Route path="/home" render={this.getHome} />
          <Route render={this.getLogin} />
        </Switch>
      </div>
    )
  }
}

export default Main;