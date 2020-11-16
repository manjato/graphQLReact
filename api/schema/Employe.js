import mongoose from "mongoose";
import Experience from "./Experience"

const Schema = mongoose.Schema;

// On définit le schema Employe
const EmployeSchema = new Schema({
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
  },
  age: {
    type: Number,
  },
  poste: {
    type: String
  },
  experiences : [Experience]
});

// Puis on crée le model
const Employe = mongoose.model("Employe", EmployeSchema);

export default Employe;