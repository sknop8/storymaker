import React, { Component } from 'react'
import PropTypes from 'prop-types'

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

  export default Method