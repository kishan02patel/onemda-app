import React, { Component } from 'react'
import Services from './Services'
import '../styles/App.css'

class App extends Component {
  render() {
    return (
      <div className="content">
        <Services></Services>
      </div>
    )
  }
}

export default App