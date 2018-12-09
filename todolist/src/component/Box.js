import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Box.css';


class Box extends Component {
  render() {
    return (
      <div className="editBox">
        <div id="title">
          <input className="customCheckBox" type="checkbox"/><label></label>
          <input className="bold" name="taskName" type="text" placeholder="Type Something Here..."/>
          <input id="starCheck" className="starCheck" type="checkbox"/>
          <label htmlFor="starCheck"><FontAwesomeIcon icon={['far', 'star']} size="2x" className="icon"/></label>
          <FontAwesomeIcon icon="pencil-alt" size="2x" className="editing icon"/>
          <FontAwesomeIcon icon="trash" size="2x" className="not-allowed"/>
          <div style={{transform: "translate(50px,-50px)"}}>
            <FontAwesomeIcon icon={['far', 'calendar-alt']} className="littleIcon icon"/>
            <FontAwesomeIcon icon={['far', 'folder-open']} className="littleIcon icon"/>
            <FontAwesomeIcon icon={['far', 'comment-dots']} className="littleIcon icon"/>
          </div>
        </div>
        <div id="body">
          <div className="bold subTitle">
            <FontAwesomeIcon icon={['far', 'calendar-alt']}/>
            <p>Deadline</p>
          </div>
          <div className="writeItem">
            <input className="writeArea" id="date" name="date" type="text" placeholder="yyyy/mm/dd"/>
            <input className="writeArea" id="time" name="time" type="text" placeholder="hh:mm"/>   
          </div>
          <div id="fileTitle" className="bold subTitle">
            <FontAwesomeIcon icon={['far', 'folder-open']}/>
            <p>File</p>
          </div>      
          <div id="dialog-message" title="Add File" className="writeItem">
            <div name="fileArea">
              <input type="file"/>
            </div>
            <FontAwesomeIcon id="addFile" icon="plus-square" size="3x" className="gray"/>
          </div>
          <div className="bold subTitle">
            <FontAwesomeIcon icon={['far', 'comment-dots']}/>
            <p>Comment</p>
          </div>
          <div className="writeItem">
            <textarea className="writeArea" id="comment" placeholder="Type your memo here..."></textarea>
          </div>
        </div>
        <div id="footer">
          <div id="cancel" className="footBottom">
            <FontAwesomeIcon icon="times" size="lg" className="icon"/>
            Cancel
          </div>      
          <div id="save" className="footBottom">
            <FontAwesomeIcon icon="plus" size="lg" className="icon"/>
            Add Task
          </div>  
        </div>
      </div>
    );
  }
}

export default Box;
