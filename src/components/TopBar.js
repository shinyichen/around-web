import React from "react";
import logo from '../assets/images/icon.png';
import "../styles/TopBar.css";
import { Icon } from 'antd';

class TopBar extends React.Component {

  render() {
    return (
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
        <div className="app-title"><p>Around</p></div>

        {this.props.isLoggedIn?
          <span className="logout" onClick={this.props.handleLogout}>
            <Icon type="logout" />{" "}Logout
          </span> : null }
      </header>
    )
  }
}

export default TopBar;