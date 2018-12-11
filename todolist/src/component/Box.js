import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Box.css';


class Box extends Component {
  state = {
    isOpen : false
  }
  toggleOpen = () => {
    this.setState({
      isOpen : !this.state.isOpen
    })
  }
  deleteTask = () => {
    this.props.delete(this.props.task.id)
  }
  addFile = () => {
    this.refs.file.click()
  }
  loadFile = () => {
    const file = this.refs.file.files[0];
    console.log(file)
    if(file != null){
      const kb = file.size/1024;
      const round = Math.round(kb*100)/100;
      const today=new Date();
      this.props.task.file.push({
        "info": file.name+" ("+round+" KB)",//file.type
        "uploadTime": today.getFullYear()+ "/" + (today.getMonth()+1) + "/" + today.getDate()+ " " + today.getHours()+ ":" + today.getMinutes()+ ":" + today.getSeconds()
      })
      this.props.update(this.props.task)
      console.log("Uploading: "+file.name+" ("+round+" KB)");
    }
  }
  completeTask = () => {
    this.props.task.isComplete = true
    this.props.update(this.props.task)
  }
  render() {
    return (
      <div className={`editBox ${this.state.isOpen ? 'open' : ''}`}>
        <div name="title">
          <input className="customCheckBox" type="checkbox" onClick={this.completeTask}/><label></label>
          <input className="bold" name="taskName" type="text" placeholder="Type Something Here..." defaultValue={this.props.task.name}/>
          <input id={`starCheck${this.props.task.id}`} className="starCheck" type="checkbox"/>
          <label htmlFor={`starCheck${this.props.task.id}`}><FontAwesomeIcon icon={['far', 'star']} size="2x" className="icon"/></label>
          <FontAwesomeIcon icon="pencil-alt" size="2x" className="editing icon" onClick={this.toggleOpen}/>
          <FontAwesomeIcon icon="trash" size="2x" className="not-allowed" onClick={this.deleteTask}/>
          <div style={{transform: "translate(50px,-50px)"}}>
            {this.props.task.date === "" ? null : (<FontAwesomeIcon icon={['far', 'calendar-alt']} className="littleIcon icon"/>)}
            {this.props.task.file.length === 0 ? null : (<FontAwesomeIcon icon={['far', 'folder-open']} className="littleIcon icon"/>)}
            {this.props.task.comment === "" ? null : (<FontAwesomeIcon icon={['far', 'comment-dots']} className="littleIcon icon"/>)}
          </div>
        </div>
        <div name="body">
          <div className="bold subTitle">
            <FontAwesomeIcon icon={['far', 'calendar-alt']}/>
            <p>Deadline</p>
          </div>
          <div className="writeItem">
            <input className="writeArea" name="date" type="date" placeholder="yyyy/mm/dd" defaultValue={this.props.task.date}/>
            <input className="writeArea" name="time" type="time" placeholder="hh:mm" defaultValue={this.props.task.time}/>   
          </div>
          <div className="bold subTitle">
            <FontAwesomeIcon icon={['far', 'folder-open']}/>
            <p>File</p>
          </div>      
          <div title="Add File" className="writeItem">
            <div name="fileArea" className="fileSpan">
              {this.props.task.file.map((item,idx,array) => 
              <div className="fileInfo" key={item.uploadTime}>
                <div>{item.info}</div>
                <div name="filetime">{item.uploadTime}</div>
              </div>)}
              <input type="file" ref="file" onChange={this.loadFile}/>
            </div>
            <FontAwesomeIcon icon="plus-square" size="3x" className="gray" onClick={this.addFile}/>
          </div>
          <div className="bold subTitle">
            <FontAwesomeIcon icon={['far', 'comment-dots']}/>
            <p>Comment</p>
          </div>
          <div className="writeItem">
            <textarea className="writeArea" placeholder="Type your memo here..." defaultValue={this.props.task.comment}></textarea>
          </div>
        </div>
        <div name="footer">
          <div name="cancel" className="footBottom" onClick={this.toggleOpen}>
            <FontAwesomeIcon icon="times" size="lg" className="icon"/>
            Cancel
          </div>      
          <div name="save" className="footBottom">
            <FontAwesomeIcon icon="plus" size="lg" className="icon"/>
            Add Task
          </div>  
        </div>
      </div>
    );
  }
}

export default Box;
