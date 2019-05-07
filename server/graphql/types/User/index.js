export default `
  type User {
    id: String!
    email: String!
  }
  type Query {
    user(id: String!): User
    users: [User]
    hello: String
    me: User
  }
  type Mutation {
    addUser(email: String!): User
    editUser(id: String, email: String): User
    deleteUser(id: String): User
    signup (email: String!, password: String!): String
    login (email: String!, password: String!): String
  }
`;