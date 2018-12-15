import React, { Component } from 'react';
import './Content.css';
import AddBox from './AddBox';
import Box from './Box';

class Content extends Component {
  state = {
      data: [{
          "id": "1",
          "name": "work",
          "date": "2018-12-11",
          "time": "12:10",
          "file": [{
              "info": "故障通知單 (3).xls (27.5 KB)",
              "uploadTime": "2018/12/11 13:11",
              "img": ""
          },{
            "info": "故障.xls (200 KB)",
            "uploadTime": "2018/12/13 19:11",
            "img": ""
            }],
          "comment": "test123",
          "isComplete": false,
          "isStar": true,
        },{
            "id": "2",
            "name": "work2",
            "date": "2018-12-15",
            "time": "17:30",
            "file": [],
            "comment": "testabc",
            "isComplete": false,
            "isStar": false,
        }
      ]
  }
  newTask = (task) => {
    this.state.data.push(task)
    this.setState({
        data: this.state.data
    })
  }
  delTask = (id) => {
    this.state.data.forEach(function (element, index,array) {
        if (element.id === id) {
            array.splice(index, 1)
        }
    })
    this.setState({
        data: this.state.data
    })
  }
  updateTask = (task) => {
    this.state.data.forEach(function (element, index,array) {
        if (element.id === task.id) {
            array[index] = task //注意！！不是element = task
        }
    })
    this.setState({
        data: this.state.data
    })
  }
  getCount = () => {
    const array = this.state.data.filter(item => item.isComplete === false);
    return array.length;
  }
  render() {
    return (
        <div className="container">
            <AddBox taskChange={this.newTask}/>
            {this.state.data.map((item,idx,array) => <Box task={item} key={item.id} delete={this.delTask} update={this.updateTask}/>)}
            <span className="countTask">{this.getCount()}</span>
            <span className="countTask" style={{"paddingLeft":"8px"}}>tasks left</span>
        </div>
    );
  }
}

export default Content;
