import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Créer experience schema.
const ExperienceSchema = new Schema({
  titre: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  
});

// const Experience = mongoose.model("Experience", ExperienceSchema);

// On exporte le schema de l experience
export default ExperienceSchema;