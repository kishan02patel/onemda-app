export default `
  type Query {
    me: User
    roles: [Role]
  }
  enum Role {
    admin,
    supporter,
    trainer,
    participant,
    none
  }
  type Mutation {
    signup (email: String!, password: String!): String
    login (email: String!, password: String!): String
  }
`;