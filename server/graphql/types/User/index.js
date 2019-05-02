export default `
  type User {
    id: String!
    name: String!
    email: String!
  }
  type Query {
    user(id: String!): User
    users: [User]
    hello: String
  }
  type Mutation {
    addUser(id: String!, name: String!, email: String!): User
    editUser(id: String, name: String, email: String): User
    deleteUser(id: String, name: String, email: String): User
  }
`;