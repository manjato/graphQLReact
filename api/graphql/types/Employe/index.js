// On définit le types de l'employe 
export default `
  input ExperienceInput {
    _id: String
    titre: String!
    description: String
  }
  type Employe {
    _id: String
    nom: String!
    prenom: String
    age: Int
    poste: String
    experiences: [Experience]
  }
  type Query {
    employe(_id: String!): Employe
    employes: [Employe]
  }
  type Mutation {
    addEmploye(nom: String!, prenom: String, age: Int, poste: String, experiences: [ExperienceInput] ): Employe
    editEmploye(_id: String,nom: String!, prenom: String, age: Int, poste: String, experiences: [ExperienceInput] ): Employe
    deleteEmploye(_id: String!): Employe
  }
`;
