import React, { Component } from 'react';
import './AddBox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class AddBox extends Component {
  addTask = () => {
    this.props.taskChange({
      "id": new Date().getMilliseconds(),
      "name": this.refs.newTitle.value,
      "date": "",
      "time": "",
      "file": [],
      "comment": "",
      "isComplete": false,
      "isStar": false,
    })
  }
  render() {
    return (
      <div className="addBox">
        <FontAwesomeIcon icon="plus" size="2x" className="icon" onClick={this.addTask}/>
        <input name="taskName" type="text" placeholder="Add Task" autoFocus={true} ref="newTitle"/>
      </div>
    );
  }
}

export default AddBox;
