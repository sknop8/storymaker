import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * Domain: Set of methods, operators, and axioms defining the domain.
 */
class Domain extends Component {
    render() {
      return (
        <div>
          {/* TODO: render domain */}
        </div>
      )
    }
  }

Domain.propTypes = {
    taskList: PropTypes.array.isRequired,
    operatorList: PropTypes.array.isRequired,
    methodList: PropTypes.array.isRequired,
    storyState: PropTypes.array.isRequired
}