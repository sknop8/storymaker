import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
          <span>name: <strong>{ this.props.name }</strong>, </span>
          <span>isPrimitive: { this.props.isPrimitive.toString() }, </span>
          <span>arguments: [{ this.props.arguments.toString() }]</span>
          { this.props.arguments.map((a) => {
            return (<span> {a}: {this.props[a]}</span>)
          })})
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

  export default Task