import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Row, Col } from 'reactstrap'
import { ImagePaths } from './util'

const style = {
  'background-color': '#ffeda5',
  'width': '350px',
  margin: '10px'
}

/**
 * Operator: How a primitive task can be performed.
 */
class Operator extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const split = this.props.task.props.arguments.length > 0
    const imgLeft = this.props.task.props.image
    let imgRight = ''
    if (split) {
      const arg = this.props.task.props.arguments[0]
      const val = this.props.task.props[arg]
      imgRight = ImagePaths[val]
      console.log(val)
    }
    
    return (
    <div style={ style }>
      <Card style={{'background-color':'#ffeda5', border:'none'}}>

        { split && 
          <Row>
            <Col md="6" style={{padding:0}}>
              <CardImg top src={ require('./images/' + imgLeft) } alt="Card image cap" />
            </Col>
            <Col md="6" style={{padding:0}}>
              <CardImg top src={ require('./images/' + imgRight) } alt="Card image cap" />
            </Col>
          </Row>
        }

        { !split && 
          <CardImg top src={ require('./images/' + imgLeft) } alt="Card image cap" />
        }


        <CardText className="text-warning" style={{margin:0}}>Operator</CardText>
        <div>{ this.props.task }</div>
        {/* { this.props.addList.map((a) => {
          return (<div> {a}: {this.props.task.props[a]}</div>)
        })} */}
      </Card>
    </div>
    )
  }
}

Operator.propTypes = {
  task: PropTypes.element.isRequired,
  preconditions: PropTypes.array,
  deleteList: PropTypes.array,
  addList: PropTypes.array
}
Operator.defaultProps = {
  preconditions: [],
  deleteList: [],
  addList: []
}

export default Operator