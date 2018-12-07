import React, { Component } from 'react'

import { AddExtraProps } from './util'
import Task from './task'
import Operator from './operator'
import Method from './method'
import Axiom from './axiom'
import Domain from './domain'
// import HTN from './htn'

/**
 * ========== DOMAIN DESCRIPTION ====================
 */

// Primitive tasks
const walk = <Task name={ "walk" } isPrimitive={ true } arguments={ ["location"] } displayText={ "walked to"} image={ "walk.jpg" }/>
const run = <Task name={ "run" } isPrimitive={ true } arguments={ ["location"] } displayText={ "ran to"} image={ "run.jpg" }/>
const fly = <Task name={ "fly" } isPrimitive={ true } arguments={ ["location"] } displayText={ "flew to"} image={ "fly.jpg" }/>
const gallop = <Task name={ "gallop" } isPrimitive={ true } arguments={ ["location"] } displayText={ "galloped to" } />
const hike = <Task name={ "hike" } isPrimitive={ true } arguments={ [] } displayText={ "hiked up the mountain"} image={ "hike.jpg" }/>
const love = <Task name={ "love" } isPrimitive={ true } arguments={ ["person"] } displayText={ "felt love toward" } image={ "love.jpg" }/>
const transform = <Task name={ "transform" } isPrimitive={ true } arguments={ ["animal"]} displayText={ "transformed into" } image={ "transform.jpg" }/>
const talk = <Task name={ "talk" } isPrimitive={ true } arguments={ ["person"]} displayText={ "talked to" } image={ "talk.jpg" }/>
const encounter = <Task name={ "encounter" } isPrimitive={ true } arguments={ ["person"]} displayText={ "encountered" } image={ "encounter.jpg" }/>
const argue = <Task name={ "argue" } isPrimitive={ true } arguments={ ["person"]} displayText={ "argued with" } image={ "argue.jpg" }/>
const swim = <Task name={ "swim" } isPrimitive={ true } arguments={ ["location"]} displayText={ "swam in the water" } image={ "swim.jpg" }/>
const floodEvent = <Task name={ "floodEvent" } isPrimitive={ true } arguments={ []} displayText={ "was hit by a flood" } image={ "flood.jpg" }/>
const pray = <Task name={ "pray" } isPrimitive={ true } arguments={ []} displayText={ "prayed" } image={ "pray.jpg" }/>
const snowStormEvent = <Task name={ "snowStormEvent" } isPrimitive={ true } arguments={ []} displayText={ "was hit by a snow storm" } image={ "snowstorm.jpg" }/>

// Compound tasks
const go = <Task name={ "go" } isPrimitive={ false } arguments={ ["location"] }  />
const goToSummit = <Task name={ "goToSummit" } isPrimitive={ false } arguments={ [] } />
const climbMountain = <Task name={ "climbMountain" } isPrimitive={ false } arguments={ [] } />
const meetPerson = <Task name={ "meetPerson" } isPrimitive={ false } arguments={ ["person"] } />
const snowStorm = <Task name={ "snowStorm" } isPrimitive={ false } arguments={ [] } />
const flood = <Task name={ "flood" } isPrimitive={ false } arguments={ [] } />
const findShelter = <Task name={ "findShelter" } isPrimitive={ false } arguments={[]} />
const prayToGod = <Task name={ "prayToGod" } isPrimitive={ false } arguments={[]} />

// Tasks to complete
const taskList = [
  goToSummit
]


const wildCardIndicator = <Task name={ "WILD CARD" } isWild={ true } isPrimitive={ false } />

const wildCardTaskList = [
  AddExtraProps(meetPerson, {person: "All-Seeing Tree"}),
  AddExtraProps(meetPerson, {person: "Blind Moon"}),
  AddExtraProps(meetPerson, {person: "Grandmother K."}),
  // AddExtraProps(meetPerson, {person: "Billie Holiday"}),
  AddExtraProps(meetPerson, {person: "Fern of the Forest"}),
  AddExtraProps(meetPerson, {person: "Lily of the Valley"}),
  // AddExtraProps(meetPerson, {person: "Seventh Moon"}),
  AddExtraProps(meetPerson, {person: "Faradays Cloud"}),
  AddExtraProps(meetPerson, {person: "Pale-skinned Man"}),
  // AddExtraProps(meetPerson, {person: "Gabriel"}),
  // AddExtraProps(meetPerson, {person: "Astrid"}),
  snowStorm,
  flood
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
    task={ encounter }
    preconditions={ [] }
    addList={ ["anxiety", "confidence", "person"] }
    deleteList={ [] }
    />,
  <Operator 
    task={ argue }
    preconditions={ [] }
    addList={ ["anxiety", "confidence", "person"] }
    deleteList={ [] }
    />,
  <Operator 
    task={ transform }
    preconditions={ [] }
    addList={ [] }
    deleteList={ [] }
    />,
  <Operator 
    task={ swim }
    preconditions={ [isHuman] }
    addList={ [] }
    deleteList={ [] }
  />,
  <Operator 
    task={ floodEvent }
    preconditions={ [] }
    addList={ [] }
    deleteList={ [] }
  />,
  <Operator 
    task={ snowStormEvent }
    preconditions={ [] }
    addList={ [] }
    deleteList={ [] }
  />,
  <Operator 
    task={ pray }
    preconditions={ [] }
    addList={ [] }
    deleteList={ [] }
  />,
  
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
      AddExtraProps(encounter, {anxiety: 0.4, confidence: 0.6}),
      AddExtraProps(talk, {anxiety: 0.4, confidence: 0.6})
    ] }
    preconditions={ [] } 
  />,
  <Method 
    task={ meetPerson }
    subtasks={ [
      AddExtraProps(encounter, {anxiety: 0.4, confidence: 0.6}),
      AddExtraProps(love, {anxiety: 0.6, confidence: 0.6})
    ] }
    preconditions={ [] } 
  />,
  <Method 
    task={ meetPerson }
    subtasks={ [
      AddExtraProps(encounter, {anxiety: 0.4, confidence: 0.6}),
      AddExtraProps(argue, {anxiety: 0.7, confidence: 0.4})
    ] }
    preconditions={ [] } 
  />,
  <Method 
    task={ snowStorm }
    subtasks={ [ snowStormEvent, findShelter ] }
    preconditions={ [] } 
  />,
  <Method 
    task={ snowStorm }
    subtasks={ [ snowStormEvent, prayToGod ] }
    preconditions={ [] } 
  />,
  <Method 
    task={ flood }
    subtasks={ [floodEvent, prayToGod] }
    preconditions={ [] } 
  />,
  <Method 
    task={ flood }
    subtasks={ [floodEvent, hike] }
    preconditions={ [atMountain] } 
  />,
  <Method 
    task={ flood }
    subtasks={ [
      floodEvent,
      AddExtraProps(swim, {location: "mountain"})
    ] }
    preconditions={ [isHuman] } 
  />,
  <Method 
    task={ prayToGod }
    subtasks={ [ 
      pray,
      AddExtraProps(transform, {animal: "bird"}),
      AddExtraProps(go, {location: "forest"})
    ] }
    preconditions={ [] } 
  />,
  <Method 
    task={ prayToGod }
    subtasks={ [
      pray,
      AddExtraProps(transform, {animal: "horse"}),
      AddExtraProps(go, {location: "desert"})
    ] }
    preconditions={ [] } 
  />,
  <Method 
    task={ prayToGod }
    subtasks={ [ pray, wildCardIndicator ] }
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