import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import HTN from './htn'
import DomainOne from './domain_one'

// Constants (default)
const DEBUG_MODE = true

const style = {
  'fontFamily': 'Source Sans Pro',
}

// TODO: Create an Argument component (to be used mainly for state updates) that supports:
//    - uniqueness/non-uniquenss
//    - different data types (e.g. arrays)


// TODO: Add character attributes that influence decisions
//        - failure aversity (daring-ness)
//        - sociability 



// Initialize the HTN
ReactDOM.render(
  <HTN style={ style } domain={ DomainOne } debugMode={ DEBUG_MODE }/>,
  document.getElementById('root'));