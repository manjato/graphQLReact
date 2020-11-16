import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { GET_EMPLOYES } from "../EmployeList";
// import { GET_EMPLOYES } from "../EmployeList";

const DELETE_EMPLOYE = gql`
    mutation deleteEmploye($_id: String!) {
        deleteEmploye(_id: $_id) {
            _id
            nom
            prenom
            age
            poste
            experiences {
                _id
                titre
                description
            }
        }
    }
`;

class DeleteModal extends React.Component {
    deleteEmployeFromForm = (deleteEmploye) => {
        return (evt) => {
            const _id = this.props.employe._id;
            deleteEmploye({
                variables: {
                    _id
                }
            });
        }
    }

    render() {
        return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}><span className="titre">Confirmation</span></ModalHeader>
                <ModalBody>
                    <div className="info">Supprimer l'employé <b>{this.props.employe.nom}</b> ?</div>
                </ModalBody>
                <ModalFooter>
                    <Mutation
                        mutation={DELETE_EMPLOYE}
                        onCompleted={() => {
                            this.props.toggle();
                        }}
                        update={(cache, { data: { deleteEmploye } }) => {
                            const { employes } = cache.readQuery({ query: GET_EMPLOYES });
                            cache.writeQuery({
                              query: GET_EMPLOYES,
                              data: { employes: employes.filter((employe) => (employe._id !== deleteEmploye._id)) },
                            });
                          }}
                        >
                        {(deleteEmploye) => (
                            <button type="submit" className="btn btn-sm btn-danger" onClick={this.deleteEmployeFromForm(deleteEmploye)}>Supprimer</button>
                        )}
                    </Mutation>
                </ModalFooter>
            </Modal>
        )
    }
}

export default DeleteModal;