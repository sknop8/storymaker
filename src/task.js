import React, { Component } from 'react'
import PropTypes from 'prop-types'

const TaskStyle = ({ isPrimitive }) => ({
  'background-color': isPrimitive ? '#bbeeff' : '#ddddff',
  'width': '200px',
  margin: '10px',
  // display: 'inline-block'
})


/**
 * Task: An activity to perform.
 */
class Task extends Component {
    constructor(props) {
      super(props) 
    }
  
    render() {
      let isPrimitive = this.props.isPrimitive
      return (
        <div style={ TaskStyle({ isPrimitive }) } >
          <span style={{'color':'#878fdd'}}>Task</span><br/>
          <span><strong>{ this.props.name }</strong></span>
          {/* <span>isPrimitive: { this.props.isPrimitive.toString() }, </span> */}
          <br/>
          {/* <span>arguments: [{ this.props.arguments.toString() }]</span> */}
          { this.props.arguments.map((a) => {
            return (<div> {a}: {this.props[a]}</div>)
          })}
          <br />
        </div>
      )
    }
  }
  Task.propTypes = {
    name: PropTypes.string.isRequired,
    isPrimitive: PropTypes.bool.isRequired,
    arguments: PropTypes.array,
    isWildCard: PropTypes.bool
  }
  Task.defaultProps = {
    arguments: []
  }




  export default Task