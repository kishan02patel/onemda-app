import React, { Component } from 'react'
import Services from './Services'
import LoginScreen from '../screens/Login'
import FeedbackScreen from '../screens/Feedback'
import NavBar from './NavBar'
import '../styles/App.css'
import { Route, Switch, withRouter } from 'react-router-dom'
import { TrainerFeedback } from '../screens/Feedback/TrainerFeedback';

class App extends Component {
  render() {
    return (
      <main>
        <NavBar/>
        <Switch>
          <Route exact path="/" component={LoginScreen} />
          <Route exact path="/login" component={LoginScreen} />  
          <Route exact path="/services" component={Services} />
          <Route exact path="/feedback" component={FeedbackScreen} />
          <Route exact path="/trainerfeedback" component={TrainerFeedback} />

        </Switch>
      </main>
    )
  }
}

export default withRouter(App)