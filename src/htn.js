import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { AddExtraProps } from './util'
import Axiom from './axiom'
import Method from './method'

class HTN extends Component {
    constructor(props) {
      super(props)
      this.state = {
        goal: props.domain.props.taskList.slice(0), // Copy
        tasks: props.domain.props.taskList,
        operators: props.domain.props.operatorList,
        storyState: props.domain.props.storyState,
        methods: props.domain.props.methodList,
        plan: [],
        debugMode: props.debugMode
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
          for (let m of this.state.methods) {
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
      
      if (!task) return
  
      if (task.props.isPrimitive) {
        // Apply the operator to the state by applying the addList and deleteList
        let op = this.findOperatorWithTask(task)
        for (let key of op.props.addList) {
          let val = task.props[key]
          if (!val) break
          let axiom = <Axiom name={ key } operator={ "==" } value={ val }/>
  
          // Remove the old axiom if it exists in the current state
          let filtered = this.state.storyState.filter( s => s.props.name != key)
          this.setState({ storyState: filtered}, () => {
            // Add the new axiom (setState is async so this needs to be in a callback)
            this.setState({storyState: [...this.state.storyState, axiom]})
          })
        }
  
        // TODO: What to do with deleteList? Do we need this?
  
        this.setState({plan: [...this.state.plan, op]}) // Adds op to the plan
        this.setState({ // Removes this task from tasks
          tasks: this.state.tasks.filter( (_, i) => i !== this.state.tasks.indexOf(task)) 
        })
      } else {
        // Find all methods that can decompose task into subtasks
        let methods = []
        for (let m of this.state.methods) {
          if (m.props.task.props.name == task.props.name) {
            methods.push(m)
          }
        }
        if (methods.length == 0) return
        
        // Pick a viable method nondeterministically 
        let i = Math.floor(Math.random() * methods.length)
        const method = methods[i]
        
        // Decompose the task using the chosen method
        let taskList = this.state.tasks
        let pos = taskList.indexOf(task)
        for (let subt of method.props.subtasks) {
          let op = this.findOperatorWithTask(subt)
  
          // Pass in any arguments that apply
          for (let arg of task.props.arguments) {
            let val = task.props[arg]
            if (val && subt.props.arguments.indexOf(arg) > -1) {
              subt = AddExtraProps(subt, {[arg]: val})
            }
          }
          
          // Add subtasks to tasks
          taskList.splice(pos, 0, subt)
          pos++
        }
  
        // Remove this task
        taskList = taskList.filter( (_, i) => i !== taskList.indexOf(task)) 
  
        this.setState({
          tasks: taskList
        })
        
      }
      
    }
  
    SHOP2() {
      if (this.state.tasks.length > 0) {
        this.processTasks(this.findValidTasks(this.state.tasks) )
      }
    }
  
    reset() { 
      this.setState({
        tasks: this.state.goal,
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
          
          <div>
          { this.state.debugMode && 
            <div>
              <button onClick={ this.SHOP2 }> go! </button>
              <button onClick={ this.reset }>reset</button>
              <h3>state (debug mode)</h3>
              tasks: { this.state.tasks } <br/>
              {/* valid tasks: { this.state.validTasks }<br/> */}
              goal: { this.state.goal }
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
  
  
          <h3>Goal: </h3>
          { this.state.goal }
  
          <h3>All Operators: </h3>
          { this.state.operators }
          
        </div>
      )
    }
  }
  
  HTN.propTypes = {
    domain: PropTypes.element.isRequired
  }

  export default HTN
  
  