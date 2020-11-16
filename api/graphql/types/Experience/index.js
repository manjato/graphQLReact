export default `
  type Experience {
    _id: String
    titre: String!
    description: String
  }
  type Query {
    experience(_id: String!): Experience
    experiences: [Experience]
  }
`;