import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import HTN from './htn'
import DomainOne from './domain_one'

// Constants
const DEBUG_MODE = true


// TODO: Add character attributes that influence decisions
//        - failure aversity (daring-ness)
//        - sociability 



// Initialize the HTN
ReactDOM.render(
  <HTN domain={ DomainOne } debugMode={ DEBUG_MODE }/>,
  document.getElementById('root'));