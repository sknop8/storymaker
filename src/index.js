import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class SHOP2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: props.taskList
    }
  }

  getTasks() {
    const taskList = this.state.tasks.map( 
      (t) => { 
        return (
          <Task 
            name={ t.name }
            isPrimitive={ t.isPrimitive }
            arguments={ t.arguments } /> 
        )
     })
     return taskList
  }


  render() {
    var sampleTask = <Task name={"sample"} isPrimitive={true} />
    return (
      <div>
        <div>
          SHOP2 HTN algorithm implementation
        </div>
        <br />
        <p>Tasks: </p>
        { this.getTasks() }

        <Operator task={ sampleTask } />
        
      </div>
    )
  }
}

SHOP2.propTypes = {
  taskList: PropTypes.array.isRequired
}




// TODO: Move major components into separate files

/**
 * Domain: Set of methods, operators, and axioms defining the domain.
 */
class Domain extends Component {
  render() {
    return (
      <div>

      </div>
    )
  }
}


/**
 * Task: An activity to perform.
 */
class Task extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div>Task</div>
        <div>name: { this.props.name }</div>
        <div>isPrimitive: { this.props.isPrimitive.toString() }</div>
        <div>arguments: { this.props.arguments.toString() }</div>
        <br />
      </div>
    )
  }
}
Task.propTypes = {
  name: PropTypes.string.isRequired,
  isPrimitive: PropTypes.bool.isRequired,
  arguments: PropTypes.array
}
Task.defaultProps = {
  arguments: []
}



/**
 * Operator: How a primitive task can be performed.
 */
class Operator extends Component {
  constructor(props) {
    super(props)
    // console.log(this.props.task.props.name)
  }
  
  render() {
    return (
      <div>
        <div>Operator</div>
        <div>Associated task: { this.props.task.props.name }</div>
        <div>preconditions: {this.props.preconditions}</div>
        <div>deleteList: {}</div>
        <div>addList: {}</div>
      </div>
    )
  }
}
Operator.propTypes = {
  task: PropTypes.element.isRequired,
  preconditions: PropTypes.array,
  deleteList: PropTypes.array,
  addList: PropTypes.array
}
Operator.defaultProps = {
  preconditions: [],
  deleteList: [],
  addList: []
}

/**
 * Method: Specifies how to decompose a compount task into a partially ordered set of subtasks
 */
class Method extends Component {

}

/**
 * Axiom: Used to specify preconditions ot methods and operators
 */
class Axiom extends Component {

}




const taskList = [
  {
    name: "go",
    isPrimitive: false,
    arguments: ["place1", "place2"]
  },
  {
    name: "walk",
    isPrimitive: true,
    arguments: ["place1", "place2"]
  }
]

ReactDOM.render(
  <SHOP2 taskList={ taskList } />,
  document.getElementById('root'));