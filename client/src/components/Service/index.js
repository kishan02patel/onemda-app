import React, { Component } from 'react'

class Service extends Component {
  render() {
    return (
      <div className="service">
        {this.props.service.id} {this.props.service.name}
      </div>
    )
  }
}

export default Service