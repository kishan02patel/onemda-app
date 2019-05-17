import React, { Component } from 'react'

class ListItem extends Component {
  render() {
    const { value } = this.props
    return (
      <div>{value}</div>
    )
  }
}

export default ListItem