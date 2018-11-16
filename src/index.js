import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allTasks: props.taskList.slice(0), // Copy
      tasks: props.taskList,
      operators: props.operatorList,
      storyState: props.storyState,
      plan: [],
      debugMode: true
    }

    this.SHOP2 = this.SHOP2.bind(this)
    this.processTasks = this.processTasks.bind(this)
    this.reset = this.reset.bind(this)
  }

  findOperatorWithTask(task) {
    return this.state.operators.find( o => o.props.task.props.name == task.props.name)
  }

  preconditionMet(p) {
    const state = this.state.storyState.find( s => s.props.name == p.props.name)
    return state && state.props.value == p.props.value
  }

  findValidTasks(taskList) {
    let result = []
    for (const task of taskList) {
      if (task.props.isPrimitive) {
        let op = this.findOperatorWithTask(task)
        if (op && op.props.preconditions.length == 0) {
          result.push(task)
        } else {
          // Check state to see if preconditions are met
          let pass = true
          for (const p of op.props.preconditions) {
            pass &= this.preconditionMet(p)
          }
          if (pass) {
            result.push(task)
          }
        }
      } else { // Compound tasks
        // Find the corresponding method and check for preconditions
        let method = null
        for (let m of methodList) {
          if (m.props.task.props.name == task.props.name) {
            method = m
          }
        }
        if(!method) break
        let pass = true
        for (const p of method.props.preconditions) {
          pass &= this.preconditionMet(p)
        }
        if (pass) {
          result.push(task)
        }
      }
    }
    return result
  }

  processTasks(validTasks) {      
    // Nondeterministically choose a task in validTasks
    let rand = Math.floor(Math.random() * validTasks.length)
    let task = validTasks[rand]
    
    if (!task) return;
    console.log("chosen task: " + task.props.name)

    if (task.props.isPrimitive) {
      let op = this.findOperatorWithTask(task)
      // TODO: Apply the operator to the state by applying the addList and deleteList

      this.setState({plan: [...this.state.plan, op]}) // Adds op to the plan
      this.setState({ // Removes this task from tasks
        tasks: this.state.tasks.filter( (_, i) => i !== this.state.tasks.indexOf(task)) 
      })
    } else {
      // Find all methods that can decompose task into subtasks
      let methods = []
      for (let m of this.props.methodList) {
        if (m.props.task.props.name == task.props.name) {
          methods.push(m)
        }
      }
      if (methods.length == 0) return
      
      // Pick a viable method nondeterministically 
      let i = Math.floor(Math.random() * methods.length)
      const method = methods[i]
      
      // Decompose the task using the chosen method
      for(let subt of method.props.subtasks) {
        let op = this.findOperatorWithTask(subt)
        this.setState({plan: [...this.state.plan, op]}) // Adds op to the plan
        this.setState({ // Removes this task from tasks
          tasks: this.state.tasks.filter( (_, i) => i !== this.state.tasks.indexOf(task)) 
        })
      }


      // TODO: Set validTasks to all tasks in the subtasks with no preconditions

    }
    
  }

  SHOP2() {
    // Initialize validTasks with tasks that have no preconditions.
    
    if (this.state.tasks.length > 0) {
      this.processTasks(this.findValidTasks(this.state.tasks) )
    }
  }

  reset() { 
    this.setState({
      tasks: this.state.allTasks,
      plan: []
    })
  }

  render() {
    // const primitiveTask = <Task name={"primitive-task"} isPrimitive={true} />
    // const compoundTask = <Task name={"compound-task"} isPrimitive={false} />

    if (!this.state.debugMode)
      this.SHOP2() // Calculates the whole plan at once


    return (
      <div>
        <div>
          SHOP2 HTN algorithm implementation
        </div>
 

        <br />
        <button onClick={ this.SHOP2 }> go! </button>
        <button onClick={ this.reset }>reset</button>

        <div>
        { this.state.debugMode && 
          <div>
            <h3>state (debug mode)</h3>
            {/* tasks: { this.state.validTasks } <br/> */}
            {/* valid tasks: { this.state.validTasks }<br/> */}
            goal: { this.state.allTasks }
          </div>
        }
        </div>
        <br />
      

        <h3>The Plan: </h3>
        { this.state.plan }
        <br />

        <h3>Story State:</h3>
        { this.state.storyState.map((s) => {
          return (<div>{s}</div>)
        })}


        <h3>All Tasks: </h3>
        { this.state.allTasks }

        <h3>All Operators: </h3>
        { this.state.operators }

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
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <span>Operator( </span>
        <span>task: { this.props.task }, </span>
        <span>preconditions: [{ this.props.preconditions }], </span>
        <span>deleteList: [{ this.props.deleteList }], </span>
        <span>addList: [{ this.props.addlist }] )</span>
        <br />
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
 * Method: Specifies how to decompose a compound task into a partially ordered set of subtasks
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
 * Axiom: Used to specify preconditions to methods and operators
 */
class Axiom extends Component {
  render() {
    return (
      <div>
        <span>Axiom( </span>
        <span>name: {this.props.name}, </span>
        <span>operator: {this.props.operator}, </span>
        <span>value: {this.props.value} ) </span>
      </div>
    )
  }

  // attributes to compare in the state --> e.g. { isHuman: true }
  // attrName: "isHuman", "location", "money"
  // operator: "==", ">", or "<" for now
  // value: "true", "philadelphia", "100", etc

}

function AddExtraProps(Component, extraProps) {
  return <Component.type {...Component.props} {...extraProps} />;
}


/**
 * ========== DOMAIN DESCRIPTION ====================
 */

// Primitive tasks
const walkTask = <Task name={ "walk" } isPrimitive={ true } arguments={ ["place2"] } />
const runTask =  <Task name={ "run" } isPrimitive={ true } arguments={ ["place2"] } />
const flyTask =  <Task name={ "fly" } isPrimitive={ true } arguments={ [ "place2"] } />
const gallopTask = <Task name={ "gallop" } isPrimitive={ true } arguments={ ["place2"] } />
const hikeTask = <Task name={ "hike" } isPrimitive={ true } arguments={ ["place2"] } />

// Compound tasks
const goTask = <Task name={ "go" } isPrimitive={ false } arguments={ ["place2"] } />
const goToSummitTask = <Task name={ "goToSummit" } isPrimitive={ false } arguments={ ["place2"] } />
const climbMountainTask = <Task name={ "climbMountain" } isPrimitive={ false } arguments={ ["place2"] } />

// Tasks to complete
const taskList = [
  // AddExtraProps(goTask, {arguments:[ <Axiom name="location" operator="==" value="topOfMountain" />]})
  // goToSummitTask
  goTask
  // walkTask,
  // walkTask,
  // flyTask
]

const isBird = <Axiom name="animal" operator="==" value="bird" />
const isHuman = <Axiom name="animal" operator="==" value="human" />
const isHorse = <Axiom name="animal" operator="==" value="horse" />
const atMountain = <Axiom name="location" operator="==" value="mountain" />

const operatorList = [
  <Operator
    task={ walkTask }
    preconditions={ [isHuman] }
    addlist={ ["place2"] }
    deleteList={ ["place1" ]} 
    />,
  <Operator
    task={ runTask }
    addlist={ ["place2"] }
    deleteList={ ["place1" ]} 
    />,
  <Operator 
    task={ flyTask }
    preconditions={ [isBird] }
    addlist={ ["place2"] }
    deleteList={ ["place1" ]} 
    />,
  <Operator 
    task={ gallopTask }
    preconditions={ [isHorse] }
    addlist={ ["place2"] }
    deleteList={ ["place1" ]} 
    />,
  <Operator 
    task={ hikeTask }
    preconditions={ [atMountain] }
    addlist={ ["place2"] }
    deleteList={ ["place1" ]} 
    />
]


const methodList = [
  <Method 
    task={ goToSummitTask }
    subtasks={ [
      AddExtraProps(goTask, {arguments:[ <Axiom name="location" operator="==" value="desert" />]}),
      AddExtraProps(goTask, {arguments:[ <Axiom name="location" operator="==" value="forest" />]}),
      climbMountainTask
    ] }
    preconditions={ [] } 
  />,
  <Method 
    task={ goTask }
    subtasks={ [walkTask] }
    preconditions={ [] } 
  />,
  <Method 
    task={ goTask }
    subtasks={ [runTask] }
    preconditions={ [] } 
  />,
  <Method 
    task={ climbMountainTask }
    subtasks={ [hikeTask] }
    preconditions={ [atMountain] } 
  />
]

const storyState = [
  <Axiom name={ "animal" } operator={ "==" } value={ "human" } />,
  <Axiom name={ "location" } operator={ "==" } value={ "desert" } />,
]

// TODO: Add character attributes that influence decisions
//        - failure aversity (daring-ness)
//        - sociability 

ReactDOM.render(
  <App taskList={ taskList } operatorList={ operatorList } methodList={ methodList } storyState={ storyState } />,
  document.getElementById('root'));