import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
      <span>addList: [{ this.props.addList }] )</span>
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

export default Operator