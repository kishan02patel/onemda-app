import React, { Component } from 'react'
import Services from './Services'
import LoginScreen from '../screens/Login'
import NavBar from './NavBar'
import '../styles/App.css'
import { Route, Switch, withRouter } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <main>
        <NavBar/>
        <Switch>
          <Route exact path="/" component={LoginScreen} />
          <Route exact path="/login" component={LoginScreen} />  
          <Route exact path="/services" component={Services} />
        </Switch>
      </main>
    )
  }
}

export default withRouter(App)