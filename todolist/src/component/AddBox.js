import React, { Component } from 'react';
import './AddBox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class AddBox extends Component {
  addTask = () => {
    this.props.taskChange({
      "id": "",
      "name": "",
      "date": "",
      "time": "",
      "file": "",
      "comment": ""
    })
  }
  render() {
    return (
      <div className="addBox">
        <FontAwesomeIcon icon="plus" size="2x" className="icon" onClick={this.addTask}/>
        <input name="taskName" type="text" placeholder="Add Task"/>
      </div>
    );
  }
}

export default AddBox;
