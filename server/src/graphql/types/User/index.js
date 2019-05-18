export default `
  type User {
    id: String!
    email: String!
  }
  type Query {
    user(id: String!): User
    users: [User]
    hello: String
  }
  type Mutation {
    createUser(email: String!, password: String!, roles: [Role]): User
    editUser(id: String, email: String, password: String, roles: [Role]): User
    deleteUser(id: String): User
  }
`;