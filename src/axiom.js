import React, { Component } from 'react'
import PropTypes from 'prop-types'

const style = {
  'background-color': '#ffc9c1',
  width: '180px',
  margin: '10px',
  padding: '5px'
}

/**
 * Axiom: Used to specify preconditions to methods and operators
 */
class Axiom extends Component {
    render() {
      return (
        <div style={ style }>
          <div style={{color:'#d67864'}}>Axiom</div>
          <span>{this.props.name} </span>
          <span>{this.props.operator} </span>
          <span>{this.props.value} </span>
        </div>
      )
    }
  
    // attributes to compare in the state --> e.g. { isHuman: true }
    // attrName: "isHuman", "location", "money"
    // operator: "==", ">", or "<" for now
    // value: "true", "philadelphia", "100", etc
  
  }

  export default Axiom