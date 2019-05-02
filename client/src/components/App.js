import React, { Component } from 'react'
import Participants from './Participants'
import '../styles/App.css'

class App extends Component {
  render() {
    return (
      <div className="content">
        <Participants></Participants>
      </div>
    )
  }
}

export default App