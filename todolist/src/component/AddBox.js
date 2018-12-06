import React, { Component } from 'react';
import './AddBox.css';

class AddBox extends Component {
  render() {
    return (
      <div className="addBox">
        <a href="#">
          <i className="fa fa-plus fa-2x"></i>
        </a>
        <input name="taskName" type="text" placeholder="Add Task"/>
      </div>
    );
  }
}

export default AddBox;
