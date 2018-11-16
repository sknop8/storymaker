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
const walk = <Task name={ "walk" } isPrimitive={ true } arguments={ ["location"] } />
const run =  <Task name={ "run" } isPrimitive={ true } arguments={ ["location"] } />
const fly =  <Task name={ "fly" } isPrimitive={ true } arguments={ [ "location"] } />
const gallop = <Task name={ "gallop" } isPrimitive={ true } arguments={ ["location"] } />
const hike = <Task name={ "hike" } isPrimitive={ true } arguments={ ["location"] } />
const love = <Task name={ "love" } isPrimitive={ true } arguments={ ["person"] } />
const transform = <Task name={ "transform" } isPrimitive={ true } arguments={ ["animal"]} />
const talk = <Task name={ "talk" } isPrimitive={ true } arguments={ ["person"]} />
const argue = <Task name={ "argue" } isPrimitive={ true } arguments={ ["person"]} />

// Compound tasks
const go = <Task name={ "go" } isPrimitive={ false } arguments={ ["location"] }  />
const goToSummit = <Task name={ "goToSummit" } isPrimitive={ false } arguments={ ["location"] } />
const climbMountain = <Task name={ "climbMountain" } isPrimitive={ false } arguments={ ["location"] } />
const meetPerson = <Task name={ "meetPerson" } isPrimitive={ false } arguments={ ["person"] } />
const snowStorm = <Task name={ "snowStorm" } isPrimitive={ false } arguments={ [] } />
const findShelter = <Task name={ "findShelter" } isPrimitive={ false } arguments={[]} />
const prayToGod = <Task name={ "prayToGod" } isPrimitive={ false } arguments={[]} />

// Tasks to complete
const taskList = [
  goToSummit
]


const wildCardIndicator = <Task name={ "WILD CARD" } isWild={ true } isPrimitive={ true } />

const wildCardTaskList = [
  AddExtraProps(meetPerson, {person: "All-Seeing Tree"}),
  AddExtraProps(meetPerson, {person: "Blind Moon"}),
  AddExtraProps(meetPerson, {person: "Grandmother K."}),
  snowStorm
]

const isBird = <Axiom name="animal" operator="==" value="bird" />
const isHuman = <Axiom name="animal" operator="==" value="human" />
const isHorse = <Axiom name="animal" operator="==" value="horse" />
const atMountain = <Axiom name="location" operator="==" value="mountain" />

const operatorList = [
  <Operator
    task={ walk }
    preconditions={ [isHuman] }
    addList={ ["location"] }
    deleteList={ [ ]} 
    />,
  <Operator
    task={ run }
    addList={ ["location"] }
    deleteList={ [ ]} 
    />,
  <Operator 
    task={ fly }
    preconditions={ [isBird] }
    addList={ ["location"] }
    deleteList={ [ ]} 
    />,
  <Operator 
    task={ gallop }
    preconditions={ [isHorse] }
    addList={ ["location"] }
    deleteList={ [ ]} 
    />,
  <Operator 
    task={ hike }
    preconditions={ [atMountain] }
    addList={ ["location"] }
    deleteList={ [ ]}
    />,
  <Operator 
      task={ love }
      preconditions={ [] }
      addList={ ["anxiety", "confidence", "person"] }
      deleteList={ [] }
      />,
  <Operator 
    task={ talk }
    preconditions={ [] }
    addList={ ["anxiety", "confidence", "person"] }
    deleteList={ [] }
    />,
  <Operator 
    task={ argue }
    preconditions={ [] }
    addList={ ["anxiety", "confidence", "person"] }
    deleteList={ [] }
    />
  
]


const methodList = [
  <Method 
    task={ goToSummit }
    subtasks={ [
      AddExtraProps(go, {location: "desert"}),
      wildCardIndicator,
      AddExtraProps(go, {location: "forest"}),
      AddExtraProps(go, {location: "mountain"}),
      climbMountain
    ] }
    preconditions={ [] } 
  />,
  <Method 
    task={ go }
    subtasks={ [walk] }
    preconditions={ [] } 
  />,
  <Method 
    task={ go }
    subtasks={ [run] }
    preconditions={ [] } 
  />,
  <Method 
    task={ go }
    subtasks={ [fly] }
    preconditions={ [isBird] } 
  />,
  <Method 
    task={ go }
    subtasks={ [gallop] }
    preconditions={ [isHorse] } 
  />,
  <Method 
    task={ go }
    subtasks={ [wildCardIndicator] }
    preconditions={ [] } 
  />,
  <Method 
    task={ climbMountain }
    subtasks={ [hike] }
    preconditions={ [atMountain] } 
  />,
  <Method 
    task={ meetPerson }
    subtasks={ [
      AddExtraProps(talk, {anxiety: 0.4, confidence: 0.6})
    ] }
    preconditions={ [] } 
  />,
  <Method 
    task={ meetPerson }
    subtasks={ [
      AddExtraProps(love, {anxiety: 0.6, confidence: 0.6})
    ] }
    preconditions={ [] } 
  />,
  <Method 
    task={ meetPerson }
    subtasks={ [
      AddExtraProps(argue, {anxiety: 0.7, confidence: 0.4})
    ] }
    preconditions={ [] } 
  />,
  <Method 
    task={ snowStorm }
    subtasks={ [ findShelter ] }
    preconditions={ [] } 
  />,
  <Method 
    task={ snowStorm }
    subtasks={ [prayToGod] }
    preconditions={ [] } 
  />,
  <Method 
    task={ prayToGod }
    subtasks={ [ 
      AddExtraProps(transform, {animal: "bird"}),
      AddExtraProps(go, {location: "forest"})
    ] }
    preconditions={ [] } 
  />,
  <Method 
    task={ prayToGod }
    subtasks={ [ 
      AddExtraProps(transform, {animal: "horse"}),
      AddExtraProps(go, {location: "desert"})
    ] }
    preconditions={ [] } 
  />,
  <Method 
    task={ prayToGod }
    subtasks={ [ wildCardIndicator ] }
    preconditions={ [] } 
  />

]

const storyState = [
  <Axiom name={ "animal" } operator={ "==" } value={ "human" } />,
  <Axiom name={ "location" } operator={ "==" } value={ "desert" } />,
  <Axiom name={ "anxiety" } operator={ "==" } value={ 0.5 } />, // 0.0-1.0 scale
  <Axiom name={ "confidence" } operator={ "==" } value={ 0.3 } />

]


const DomainOne = 
    <Domain 
        taskList={ taskList }
        operatorList={ operatorList }
        methodList={ methodList }
        storyState={ storyState }
        wildCardTaskList={ wildCardTaskList }
    />

export default DomainOne