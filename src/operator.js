import React, { Component } from 'react'
import PropTypes from 'prop-types'

const style = {
  'background-color': '#ffeda5',
  'width': '250px',
  margin: '10px',
  // display:'inline-block'
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
    <div style={ style }>
      <div style={{'color':'#d8b131'}}>Operator</div>
      <span>{ this.props.task }</span>
      <span>{ this.props.preconditions } </span>
      {/* <span>deleteList: [{ this.props.deleteList }], </span> */}
      {/* <span>addList: [{ this.props.addList }] )</span> */}
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