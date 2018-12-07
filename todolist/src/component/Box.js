import React, { Component } from 'react';
import './Box.css';

class Box extends Component {
  render() {
    return (
      <div className="editBox">
        <div id="title">
          <input className="customCheckBox" type="checkbox"/><label></label>
          <input className="bold" name="taskName" type="text" placeholder="Type Something Here..."/>
          <input className="starCheck" type="checkbox"/>
          <label id="star" className="fa fa-star-o fa-2x icon" htmlFor="star"></label>
          <i id="pencil" className="fa fa-pencil fa-2x editing icon"></i>
          <i className="fa fa-trash fa-2x icon not-allowed"></i>
          <div></div>
        </div>
        <div id="body">
          <div className="bold subTitle">
            <i className="fa fa-calendar"></i>
            <p>Deadline</p>
          </div>
          <div className="writeItem">
            <input className="writeArea" id="date" name="date" type="text" placeholder="yyyy/mm/dd"/>
            <input className="writeArea" id="time" name="time" type="text" placeholder="hh:mm"/>   
          </div>
          <div id="fileTitle" className="bold subTitle">
            <i className="fa fa-folder-open-o"></i>
            <p>File</p>
          </div>      
          <div id="dialog-message" title="Add File" className="writeItem">
            <div name="fileArea">
              <input type="file"/>
            </div>
            <i id="addFile" className="fa fa-plus-square fa-3x gray"></i>
          </div>
          <div className="bold subTitle">
            <i className="fa fa-commenting-o"></i>
            <p>Comment</p>
          </div>
          <div className="writeItem">
            <textarea className="writeArea" id="comment" placeholder="Type your memo here..."></textarea>
          </div>
        </div>
        <div id="footer">
          <div id="cancel" className="footBottom">
            <i className="fa fa-close fa-lg"></i>
            Cancel
          </div>      
          <div id="save" className="footBottom">
            <i className="fa fa-plus fa-lg"></i>
            Add Task
          </div>  
        </div>
      </div>
    );
  }
}

export default Box;
