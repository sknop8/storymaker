import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import PropTypes from 'prop-types'

import HTN from './htn'
import DomainOne from './domain_one'

import './index.css'

// Constants (default)
const DEBUG_MODE = false

const style = {
  'fontFamily': 'Source Sans Pro',
  display:'bootstrap'
}

// TODO: Create an Argument component (to be used mainly for state updates) that supports:
//    - uniqueness/non-uniquenss
//    - different data types (e.g. arrays)


// TODO: Add character attributes that influence decisions
//        - failure aversity (daring-ness)
//        - sociability 



// Initialize the HTN
ReactDOM.render(
  <HTN domain={ DomainOne } debugMode={ DEBUG_MODE }/>,
  document.getElementById('root'));