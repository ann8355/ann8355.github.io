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
          "file": "",
          "comment": "test123"
        },{
            "id": "2",
            "name": "work2",
            "date": "2018-12-15",
            "time": "17:30",
            "file": "",
            "comment": "testabc"
        }
      ]
  }
  newTask = (task) => {
    this.state.data.push(task)
    this.setState({
        data: this.state.data
    })
  }
  delTask = (task) => {
    this.state.data.forEach(function (element, index,array) {
        if (element.id === task) {
            array.splice(index, 1)
        }
    })
    this.setState({
        data: this.state.data
    })
  }
  render() {
    return (
        <div className="container">
            <AddBox taskChange={this.newTask}/>
            <div className="draggable"></div>
            {this.state.data.map((item,idx,array) => <Box task={item} key={item.id} delete={this.delTask}/>)}
            <span className="countTask">tasks left</span>
        </div>
    );
  }
}

export default Content;
