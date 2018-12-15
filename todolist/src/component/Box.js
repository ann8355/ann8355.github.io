import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Box.css';


class Box extends Component {
  state = {
    // checkBox:{
    //   male: false,
    //   female: false
    // },
    // checkBoxArray: ["male","female"],
    // radio: "male",
    isOpen : false,
    data: {
      "id": this.props.task.id,
      "name": this.props.task.name,
      "date": this.props.task.date,
      "time": this.props.task.time,
      "file": this.props.task.file,
      "comment": this.props.task.comment,
      "isComplete": this.props.task.isComplete,
      "isStar": this.props.task.isStar
    },
    file: null
  }
  open = () => {
    this.setState({
      isOpen : true
    })
  }
  close = () => {
    this.setState({
      isOpen : false
    })
  }
  cancel = () => {
    let data  = JSON.parse(JSON.stringify(this.props.task)); //深拷貝複製物件,或Object.assign({}, this.state.data)
    this.setState({
      data: data
    })
    this.close();
  }
  deleteTask = () => {
    if(!this.state.isOpen){
      this.props.delete(this.props.task.id);
    }
  }
  addFile = () => {
    this.refs.file.click()
  }
  loadFile = (e) => {
    const file = e.target.files[0];//選中的第一個檔案
    const fr = new FileReader();//讀取瀏覽器選中的檔案
    fr.addEventListener('load',this.fileLoad)
    fr.readAsDataURL(file)//將此檔案變成DataURL(base64)
    this.setState({
      file: file
    })
  }
  fileLoad = (e) => {
    const file = this.state.file;
    if(file != null){
      const kb = file.size/1024;
      const round = Math.round(kb*100)/100;
      const today=new Date();
      let fileArray = this.state.data.file.slice(0); //複製全部元素到新陣列.slice(start,end)
      fileArray.push({
        "info": file.name+" ("+round+" KB)",//file.type
        "uploadTime": today.getFullYear()+ "/" + (today.getMonth()+1) + "/" + today.getDate()+ " " + today.getHours()+ ":" + today.getMinutes()+ ":" + today.getSeconds(),
        "img": e.target.result //=fr.readAsDataURL(file)的結果
      });
      this.dataProcess(fileArray,'file');
      console.log("Uploading: "+file.name+" ("+round+" KB)");
    }
  }
  dataProcess = (ele,key) => {
    let data = this.state.data;
    data[key] = ele;
    this.setState({
      data: data
    });
  }
  changeCheckbox = (e) => {
    const key = e.target.value;
    this.dataProcess(!this.state.data[key],key);
    // this.save();
  }
  // changeRadio = (e) => {
  //   this.setState({
  //     radio: e.target.value
  //   },() => {
  //     console.log(this.state.radio)
  //   });
  // }
  save = () => {
    // axios.post('/img', {img: this.state.img}) //json格式

    // const form = new FormData();
    // form.append(this.state.file)
    // axios.post('/img', {form}) //form格式

    let data  = JSON.parse(JSON.stringify(this.state.data)); //深拷貝複製物件,或Object.assign({}, this.state.data)
    this.props.update(data)
    this.close();
  }
  render() {
    return (
      <div className={`editBox ${this.state.isOpen ? 'open' : ''}`}>
        <div name="title">
          {/* <input type="radio" value="male" onChange={this.changeRadio} checked={this.state.radio === "male"}/>
          <input type="radio" value="female" onChange={this.changeRadio} checked={this.state.radio === "female"}/> */}
          <input className="customCheckBox" type="checkbox" onChange={this.changeCheckbox} value="isComplete" checked={this.state.data.isComplete}/><label></label>
          <input className="bold" name="taskName" type="text" placeholder="Type Something Here..." value={this.state.data.name} onChange={(e) => this.dataProcess(e.target.value, 'name')}/>
          <input id={`starCheck${this.state.data.id}`} className="starCheck" type="checkbox" onChange={this.changeCheckbox} value="isStar" checked={this.state.data.isStar}/>
          <label htmlFor={`starCheck${this.state.data.id}`}><FontAwesomeIcon icon={['far', 'star']} size="2x" className="icon"/></label>
          <FontAwesomeIcon icon="pencil-alt" size="2x" className="editing icon" onClick={this.open}/>
          <FontAwesomeIcon icon="trash" size="2x" className="not-allowed" onClick={this.deleteTask}/>
          <div style={{transform: "translate(50px,-50px)"}}>
            {this.state.data.date === "" ? null : (<FontAwesomeIcon icon={['far', 'calendar-alt']} className="littleIcon icon"/>)}
            {this.state.data.file.length === 0 ? null : (<FontAwesomeIcon icon={['far', 'folder-open']} className="littleIcon icon"/>)}
            {this.state.data.comment === "" ? null : (<FontAwesomeIcon icon={['far', 'comment-dots']} className="littleIcon icon"/>)}
          </div>
        </div>
        <div name="body">
          <div className="bold subTitle">
            <FontAwesomeIcon icon={['far', 'calendar-alt']}/>
            <p>Deadline</p>
          </div>
          <div className="writeItem">
            <input className="writeArea" name="date" type="date" placeholder="yyyy/mm/dd" value={this.state.data.date} onChange={(e) => this.dataProcess(e.target.value, 'date')}/>
            <input className="writeArea" name="time" type="time" placeholder="hh:mm" value={this.state.data.time} onChange={(e) => this.dataProcess(e.target.value, 'time')}/>
            {/* this.onChange.bind(this, 'time') */}
          </div>
          <div className="bold subTitle">
            <FontAwesomeIcon icon={['far', 'folder-open']}/>
            <p>File</p>
          </div>      
          <div title="Add File" className="writeItem">
            <div name="fileArea" className="fileSpan">
              {this.state.data.file.map((item,idx,array) => 
              <div className="fileInfo" key={item.uploadTime}>
                {/* <img width="100%" height="200" src={item.img} alt="img" /> */}
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
            <textarea className="writeArea" placeholder="Type your memo here..." value={this.state.data.comment} onChange={(e) => this.dataProcess(e.target.value, 'comment')}></textarea>
          </div>
        </div>
        <div name="footer">
          <div name="cancel" className="footBottom" onClick={this.cancel}>
            <FontAwesomeIcon icon="times" size="lg" className="icon"/>
            Cancel
          </div>      
          <div name="save" className="footBottom" onClick={this.save}>
            <FontAwesomeIcon icon="plus" size="lg" className="icon"/>
            Add Task
          </div>  
        </div>
      </div>
    );
  }
}

export default Box;
