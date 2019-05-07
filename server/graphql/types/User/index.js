export default `
  type User {
    id: String!
    username: String!
    email: String!
  }
  type Query {
    user(id: String!): User
    users: [User]
    hello: String
    me: User
  }
  type Mutation {
    addUser(username: String!, email: String!): User
    editUser(id: String, username: String, email: String): User
    deleteUser(id: String): User
    signup (username: String!, email: String!, password: String!): String
    login (email: String!, password: String!): String
  }
`;