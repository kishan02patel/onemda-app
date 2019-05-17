import React, { Component } from 'react'
import FilterList from '../../components/FilterList'
import SelectableButtonGroup from '../../common/SelectableButtonGroup'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import './styles.scss'

const Engagement = Object.freeze({
  Low: 'Low',
  Minimal: 'Minimal',
  Average: 'Average',
  High: 'High',
})

const FEEDBACK_QUERY = gql`
  query activities {
    activities {
      name
    }
    users {
      email
    }
  }
`

const CREATE_FEEDBACK_MUTATION = gql`
  mutation createFeedback($activityID: String!, $trainerID: String!, $participantID: String!, $participantFeedback: String!, $trainerFeedback: [TrainerFeedbackInput]!, $comment: String!) {
    createFeedback(activityID: $activityID, trainerID: $trainerID, participantID: $participantID, participantFeedback: $participantFeedback, trainerFeedback: $trainerFeedback, comment: $comment) {
      id
    }
  }
`

class FeedbackScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
  }

  handleChange = (e) => {
    console.log(e)
  }

  handleSubmit = (e) => {
    e.preventDefault()

  }

  handleSelect = (data) => {
    const {id, value, selectedID} = data
  }

  render() {
    return (
      <Query query={FEEDBACK_QUERY}>
        {({ error, loading, data }) => {
          if (loading) return <div>Fetching data...</div>
          if (error) return <div>Error</div>
          const activities = data.activities.map(a => {return a.name})
          const users = data.users.map(u => {return u.email})

          return (

            <Mutation
            mutation={CREATE_FEEDBACK_MUTATION}
            onCompleted={() => {
              console.log('complete')
            }}
          >
           {(feedback, {loading, error}) => {

             if (error) {
               console.log(error)
               console.log(error)
             }

            return (
            <div>
              <p>Submit Feedback</p>
              <div>Activities</div>
              <FilterList values={activities}/>
              <div>Users</div>
              <FilterList values={users}/>
              <div className='feedback_form'>
                <div>Social</div>
                <SelectableButtonGroup id='0' handleSelect={this.handleSelect} values={[Engagement.Low, Engagement.Minimal, Engagement.Average, Engagement.High]}/>
                <div>Health and fitness</div>
                <SelectableButtonGroup id='1' handleSelect={this.handleSelect} values={[Engagement.Low, Engagement.Minimal, Engagement.Average, Engagement.High]}/>
                <div>Learning</div>
                <SelectableButtonGroup id='2' handleSelect={this.handleSelect} values={[Engagement.Low, Engagement.Minimal, Engagement.Average, Engagement.High]}/>
                <div>Participant feedback</div>
                <SelectableButtonGroup id='3' handleSelect={this.handleSelect} values={[Engagement.Low, Engagement.Minimal, Engagement.Average, Engagement.High]}/>
                <div>Comments</div>
                <input type='text'/>
                <button onClick={(e) => feedback({variables: {activityID: "5cd96d9e04eea39344ab82b2", trainerID: "5cd2cace363cfe4bd9ef981b", participantID: "5cd2ca8b363cfe4bd9ef9816", participantFeedback: "2", trainerFeedback: [{serviceID: "5cd8dd57a06604360152edd7", engagement: "2"}, {serviceID: "5cd8dd5da06604360152edd8", engagement: "2"}, {serviceID: "5cd8dd65a06604360152edd9", engagement: "1"}], comment: "this is a test comment"}})}>Submit</button>
              </div>
            </div>
            )
           }}
            </Mutation>
          )
        }}
      </Query>
    )
  }
}

export default FeedbackScreen