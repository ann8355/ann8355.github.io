import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="container">
          <ul>
            <li className="active"><a className="bold" href="#">My Tasks</a></li>
            <li><a className="bold" href="#">In Progress</a></li>
            <li><a className="bold" href="#">Completed</a></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Header;
