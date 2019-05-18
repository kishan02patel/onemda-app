import React, { Component, Fragment } from 'react'
import FilterList from '../../components/FilterList'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import './styles.scss'
import { EngagmentSelector } from '../../components/EngagementSelector';
import { Formik } from 'formik';



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


const formDefinition = {
  participantFeedback: "ENGAGEMENT",
  trainerFeedback: [
    {
      serviceID: "5cd8dd57a06604360152edd7",
      engagement: ""
    },
    {
      serviceID: "5cd8dd5da06604360152edd8",
      engagement: "2"
    },
    {
      serviceID: "5cd8dd65a06604360152edd9",
      engagement: "1"
    }
  ],
  comment: "this is a test comment"
}

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
    const { id, value, selectedID } = data
  }

  render() {
    return (
      <Query query={FEEDBACK_QUERY}>
        {({ error, loading, data }) => {
          if (loading) return <div>Fetching data...</div>
          if (error) return <div>Error</div>
          const activities = data.activities.map(a => { return a.name })
          const users = data.users.map(u => { return u.email })

          return (

            <Mutation
              mutation={CREATE_FEEDBACK_MUTATION}
              onCompleted={() => {
                console.log('complete')
              }}
            >
              {(feedback, { loading, error }) => {

                if (error) {
                  console.log(error)
                  console.log(error)
                }

                return (
                  <div>

                    <Formik
                      initialValues={{
                        comment: "test",
                      }}
                      onSubmit={(values, formikBag) => {
                        console.log(values);
                        //Values from form come in here. 

                        //NB. there's still a question of matching the correct IDs to the form 
                        //Below. 

                        //Mutate graphql here. 
                        feedback({
                          variables:
                          {
                            activityID: "5cd96d9e04eea39344ab82b2",
                            trainerID: "5cd2cace363cfe4bd9ef981b",
                            participantID: "5cd2ca8b363cfe4bd9ef9816",
                            participantFeedback: "2",
                            trainerFeedback: [
                              {
                                serviceID: "5cd8dd57a06604360152edd7",
                                engagement: "2"
                              },
                              {
                                serviceID: "5cd8dd5da06604360152edd8",
                                engagement: "2"
                              },
                              {
                                serviceID: "5cd8dd65a06604360152edd9",
                                engagement: "1"
                              }
                            ],
                            comment: "this is a test comment"
                          }
                        })
                      }}
                    >{({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,

                      setFieldValue,

                      /* and other goodies */
                    }) => {

                      const handleEngagementChange = (id) => (value) => {
                        setFieldValue(id, value); 
                      }
                      return (
                        <form onSubmit={handleSubmit}>
                          <p>Submit Feedback</p>
                          <div>Activities</div>
                          <FilterList values={activities} />
                          <div>Users</div>
                          <FilterList values={users} />
                          <div className='feedback_form'>
                            <div>Social</div>
                            <EngagmentSelector id='0'
                              handleSelect={handleEngagementChange('0')}
                            />
                            <div>Health and fitness</div>
                            <EngagmentSelector id='1'
                              handleSelect={handleEngagementChange('1')}
                            />
                            <div>Learning</div>
                            <EngagmentSelector id='2'
                              handleSelect={handleEngagementChange('2')}
                            />
                            <div>Participant feedback</div>
                            <EngagmentSelector id='3'
                              handleSelect={handleEngagementChange('3')}
                            />
                            <div>Comments</div>
                            <input
                              type='text'
                              id="comment"
                              value={values.comment}
                              onChange={handleChange} />
                            <button
                              type="submit"
                            >Submit</button>
                          </div>
                        </form>
                      )
                    }}
                    </Formik>
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