import React, { Component } from 'react';
import './AddBox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class AddBox extends Component {
  render() {
    return (
      <div className="addBox">
        <a href="#">
          <FontAwesomeIcon icon="plus" size="2x" className="icon"/>
        </a>
        <input name="taskName" type="text" placeholder="Add Task"/>
      </div>
    );
  }
}

export default AddBox;
