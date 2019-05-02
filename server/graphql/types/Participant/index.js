export default `
  type Participant {
    participantId: String!
    participantName: String!
  }
  type Query {
    participant(participantId: String!): Participant
    participants: [Participant]
  }
`;