import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: []
    }
    // this.createTasks()
  }

  componentDidMount() {
    this.createTasks()
  }

  createTasks() {
    const taskList = [
      {
        taskSymbol:"go",
        isPrimitive:false,
        arguments:["place1", "place2"]
      },
      {
        taskSymbol:"walk",
        isPrimitive:true,
        arguments:["place1", "place2"]
      }
    ]
    this.setState({tasks: taskList})
  }

  getTasks() {
    const taskList = this.state.tasks.map( 
      (t) => { 
        return (
          <Task 
            taskSymbol={ t.taskSymbol }
            isPrimitive={ t.isPrimitive }
            arguments={ t.arguments } /> 
        )
     })
     return taskList
  }


  render() {
    return (
      <div>
        <div>
          SHOP2 HTN algorithm implementation
        </div>
        <br />
        <p>Tasks: </p>
        { this.getTasks() }

        {/* <Operator */}
          {/* /> */}
      </div>
    )
  }
}

// TODO: Move major components into separate files


/**
 * Task: An activity to perform.
 */
class Task extends Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    return (
      <div>
        <div>taskSymbol: { this.props.taskSymbol }</div>
        <div>isPrimitive: { this.props.isPrimitive.toString() }</div>
        <div>arguments: { this.props.arguments.toString() }</div>
        <br />
      </div>
    )
  }
}

Task.propTypes = {
  taskSymbol: PropTypes.string.isRequired,
  isPrimitive: PropTypes.bool.isRequired,
  arguments: PropTypes.array
}

/**
 * Operator: How a primitive task can be performed.
 */
class Operator extends Component {
  render() {
    return (
      <div>

      </div>
    )
  }
}

Operator.propTypes = {
  taskSymbol: PropTypes.string.isRequired,
  preconditions: PropTypes.array,
  deleteList: PropTypes.array,
  addList: PropTypes.array
}

ReactDOM.render(
  <App />,
  document.getElementById('root'));