// importer le model de l'employe.
import Employe from "../../../schema/Employe";

export default {
    Query: {
        employe: (root, args) => {
            return new Promise((resolve, reject) => {
                Employe.findOne(args).exec((err, res) => {
                err ? reject(err) : resolve(res);
                });
            });
        },
        employes: () => {
            return new Promise((resolve, reject) => {
                Employe.find({})
                .populate()
                .exec((err, res) => {
                    err ? reject(err) : resolve(res);
                });
            });
        }
    },
    Mutation: {
        addEmploye: (root, { nom, prenom, age, poste, experiences }) => {
            const newEmploye = new Employe({ nom, prenom, age, poste, experiences });
            return new Promise((resolve, reject) => {
                newEmploye.save((err, res) => {
                err ? reject(err) : resolve(res);
                });
            });
        },
        editEmploye: (root, { _id, nom, prenom, age, poste, experiences }) => {
            return new Promise((resolve, reject) => {
                Employe.findOneAndUpdate({ _id }, { $set: { nom, prenom, age, poste, experiences } }, {new : true}).exec(
                (err, res) => {
                    err ? reject(err) : resolve(res);
                }
                );
            });
        },
        deleteEmploye: (root, {_id}) => {
            return new Promise((resolve, reject) => {
                Employe.findOneAndDelete({ _id: _id }).exec((err, res) => {
                err ? reject(err) : resolve(res);
                });
            });
        }
    }
};