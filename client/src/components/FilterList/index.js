import React, { Component } from 'react'
import ListItem from '../ListItem'

class FilterList extends Component {
  constructor(props) {
    super(props)
    const { values } = props
    this.state = {
      fullItems: values,
      displayItems: [] 
    }
  }

  handleChange = (e) => {
    const filteredItems = this.state.fullItems.filter(item => item.includes(e.target.value))
    if (e.target.value !== '') {
      this.setState({displayItems: filteredItems})
    } else {
      this.setState({displayItems: []})
    }
  }

  render() {
    return (
      <div>
          <input type="text" onChange={(e) => this.handleChange(e)}/>
          {this.state.displayItems.map(item => {return (<ListItem value={item}/>)})}
      </div>
    )
  }
}

export default FilterList