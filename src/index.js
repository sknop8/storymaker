import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allTasks: props.taskList,
      validTasks: [],
      operators: props.operatorList,
      storyState: [
         "Philadelphia"
      ], // TODO: Find out how to do this
      plan: []
    }
  }

  findOperatorWithTask(task) {
    return this.state.operators.find( o => o.props.taskName == task.props.name)
  }

  SHOP2() {
    // Initialize validTasks with tasks that have no preconditions.
    for (const t of this.state.allTasks) {
      if (t.props.isPrimitive) {
        let op = this.findOperatorWithTask(t)
        if (op && op.props.preconditions.length == 0)
          this.state.validTasks.push(t)
      } else {
        // TODO: Find the corresponding method and check for preconditions
      }
    }

    // Nondeterministically choose a task in validTasks
    let rand = Math.floor(Math.random() * this.state.validTasks.length)
    let task = this.state.validTasks[rand]

    console.log("chosen task: " + task.props.name)

    if (task.props.isPrimitive) {
      let op = this.findOperatorWithTask(task)
      console.log(op)
      // Apply the operator to the state by applying the addList and deleteList
      // (TODO)

      this.state.plan.push(op)

    }
    
  }


  render() {
    const primitiveTask = <Task name={"primitive-task"} isPrimitive={true} />
    const compoundTask = <Task name={"compound-task"} isPrimitive={false} />
    this.SHOP2()

    return (
      <div>
        <div>
          SHOP2 HTN algorithm implementation
        </div>
        <h3>Tasks: </h3>
        { this.state.allTasks }

        <br />

        <h3>The Plan: </h3>
        { this.state.plan }
        <br />
      
        {/* <p>All Operators: </p>
        { this.state.operators } */}

        {/* <Operator task={ primitiveTask } /> */}

        {/* <Method task={ compoundTask } subtasks={ [primitiveTask] }/> */}
        
      </div>
    )
  }
}

App.propTypes = {
  taskList: PropTypes.array.isRequired,
  operatorList: PropTypes.array.isRequired
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
        <span>Task(  </span>
        <span>name: { this.props.name }, </span>
        <span>isPrimitive: { this.props.isPrimitive.toString() }, </span>
        <span>arguments: [{ this.props.arguments.toString() }] )</span>
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
  render() {
    return (
      <div>
        <span>Operator( </span>
        <span>task: { this.props.taskName }, </span>
        <span>preconditions: [{ this.props.preconditions }], </span>
        <span>deleteList: [{ this.props.deleteList }], </span>
        <span>addList: [{ this.props.addlist }] )</span>
        <br />
      </div>
    )
  }
}
Operator.propTypes = {
  taskName: PropTypes.string.isRequired,
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
  render() {
    return (
      <div>
        <div>Method</div>
        <div>Task it decomposes: { this.props.task.props.name }</div>
        <div>preconditions: {this.props.preconditions }</div>
        <div>subtasks: { this.props.subtasks.map((t) => {return t.props.name}) }</div>
      </div>
    )
  }
}
Method.propTypes = {
  task: PropTypes.element.isRequired,
  preconditions: PropTypes.array,
  subtasks: PropTypes.array.isRequired
}
Method.defaultProps = {
  preconditions: []
}

/**
 * Axiom: Used to specify preconditions ot methods and operators
 */
class Axiom extends Component {
  // TODO
}



const taskList = [
  <Task name={ "go" }
    isPrimitive={ false } 
    arguments={ ["place1", "place2"] }/>,
  <Task name={ "walk" }
    isPrimitive={ true } 
    arguments={ ["place1", "place2"] }/>,
  <Task name={ "run" }
    isPrimitive={ true } 
    arguments={ ["place1", "place2"] }/>,
  <Task name={ "fly" }
    isPrimitive={ true } 
    arguments={ ["place1", "place2"] }/>
]

const operatorList = [
  <Operator taskName={ "walk" } 
    addlist={ ["place2"] }
    deleteList={ ["place1" ]} />,
  <Operator taskName={ "run" }
    addlist={ ["place2"] }
    deleteList={ ["place1" ]} />,
  <Operator taskName={ "fly" } preconditions={ ["is-bird"] }
    addlist={ ["place2"] }
    deleteList={ ["place1" ]} />
]

ReactDOM.render(
  <App taskList={ taskList } operatorList={ operatorList }/>,
  document.getElementById('root'));