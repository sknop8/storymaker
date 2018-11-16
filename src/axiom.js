import React, { Component } from 'react'
import PropTypes from 'prop-types'

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

  export default Axiom