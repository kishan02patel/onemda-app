import React, { Component } from 'react'
import Service from '../Service'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const SERVICES_QUERY = gql`
  {
    services {
      id
      name
    }
  }
`

class Services extends Component {
  render() {
    return (
      <Query query={SERVICES_QUERY}>
        {({loading, error, data }) => {
          if (loading) return <div>Fetching data...</div>
          if (error) return <div>Error</div>

          const services = data.services
          return (
            <div className="services">
              Services
              {services.map(service => <Service key={service.id} service={service} />)}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default Services