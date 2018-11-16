import React, { Component } from 'react'

import { AddExtraProps } from './util'
import Task from './task'
import Operator from './operator'
import Method from './method'
import Axiom from './axiom'
import Domain from './domain'
import HTN from './htn'

/**
 * ========== DOMAIN DESCRIPTION ====================
 */

// Primitive tasks
const walkTask = <Task name={ "walk" } isPrimitive={ true } arguments={ ["location"] } />
const runTask =  <Task name={ "run" } isPrimitive={ true } arguments={ ["location"] } />
const flyTask =  <Task name={ "fly" } isPrimitive={ true } arguments={ [ "location"] } />
const gallopTask = <Task name={ "gallop" } isPrimitive={ true } arguments={ ["location"] } />
const hikeTask = <Task name={ "hike" } isPrimitive={ true } arguments={ ["location"] } />

// Compound tasks
const goTask = <Task name={ "go" } isPrimitive={ false } arguments={ ["location"] }  />
const goToSummitTask = <Task name={ "goToSummit" } isPrimitive={ false } arguments={ ["location"] } />
const climbMountainTask = <Task name={ "climbMountain" } isPrimitive={ false } arguments={ ["location"] } />

// Tasks to complete
const taskList = [
  // AddExtraProps(goTask, {location: "mountain"}),
  goToSummitTask,
  // goTask,
  // goTask
  // walkTask,
  // walkTask,
  // flyTask
]

const isBird = <Axiom name="animal" operator="==" value="bird" />
const isHuman = <Axiom name="animal" operator="==" value="human" />
const isHorse = <Axiom name="animal" operator="==" value="horse" />
const atMountain = <Axiom name="location" operator="==" value="mountain" />

const operatorList = [
  <Operator
    task={ walkTask }
    preconditions={ [isHuman] }
    addList={ ["location"] }
    deleteList={ ["place1" ]} 
    />,
  <Operator
    task={ runTask }
    addList={ ["location"] }
    deleteList={ ["place1" ]} 
    />,
  <Operator 
    task={ flyTask }
    preconditions={ [isBird] }
    addList={ ["location"] }
    deleteList={ ["place1" ]} 
    />,
  <Operator 
    task={ gallopTask }
    preconditions={ [isHorse] }
    addList={ ["location"] }
    deleteList={ ["place1" ]} 
    />,
  <Operator 
    task={ hikeTask }
    preconditions={ [atMountain] }
    addList={ ["location"] }
    deleteList={ ["place1" ]} 
    />
]


const methodList = [
  <Method 
    task={ goToSummitTask }
    subtasks={ [
      AddExtraProps(goTask, {location: "desert"}),
      AddExtraProps(goTask, {location: "forest"}),
      AddExtraProps(goTask, {location: "mountain"}),
      climbMountainTask
    ] }
    preconditions={ [] } 
  />,
  <Method 
    task={ goTask }
    subtasks={ [walkTask] }
    preconditions={ [] } 
  />,
  <Method 
    task={ goTask }
    subtasks={ [runTask] }
    preconditions={ [] } 
  />,
  <Method 
    task={ climbMountainTask }
    subtasks={ [hikeTask] }
    preconditions={ [atMountain] } 
  />
]

const storyState = [
  <Axiom name={ "animal" } operator={ "==" } value={ "human" } />,
  <Axiom name={ "location" } operator={ "==" } value={ "desert" } />,
]


const DomainOne = 
    <Domain 
        taskList={ taskList }
        operatorList={ operatorList }
        methodList={ methodList }
        storyState={ storyState }
    />

export default DomainOne