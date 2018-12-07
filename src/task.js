import React, { Component } from 'react'
import PropTypes from 'prop-types'

const TaskStyle = ({ isPrimitive }) => ({
  'background-color': isPrimitive ? '#bbeeff' : '#ddddff',
  width: '250px',
  margin: '10px',
  padding: '5px'

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
          <div className="text-info">Task</div>
          <span><strong>{ this.props.name }</strong></span>
          <br/>
          { this.props.arguments.map((a) => {
            return (<div> {a}: {this.props[a]}</div>)
          })}
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