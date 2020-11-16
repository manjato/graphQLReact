import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Table, Container } from 'reactstrap';
import DetailsModal from "./Modals/DetailsModal";
import FormModal from "./Modals/FormModal";
import DeleteModal from "./Modals/DeleteModal";

export const GET_EMPLOYES = gql`{
    employes {
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
}`;


const ADD_EMPLOYE = gql`
    mutation addEmploye($nom: String!, $prenom: String, $age: Int, $poste: String, $experiences: [ExperienceInput]) {
        addEmploye(nom: $nom, prenom: $prenom, age: $age, poste: $poste,experiences : $experiences) {
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


const EDIT_EMPLOYE = gql`
    mutation editEmploye($id: String!, $nom: String!, $prenom: String, $age: Int, $poste: String, $experiences: [ExperienceInput]) {
        editEmploye(_id: $id, nom: $nom, prenom: $prenom, age: $age, poste: $poste,experiences : $experiences) {
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

class EmployeList extends React.Component {
    state = {
        showModalDetails: false,
        showModalAdd: false,
        showModalDelete: false,
        showEditModal: false,
        employe: {},
    }

    showDetails = (employe) => {
        return () => { this.setState({ showModalDetails: true, employe }); }
    }

    hideDetails = () => {
        this.setState({ showModalDetails: false, employe: {} });
    }

    showForm = () => {
        this.setState({ showModalAdd: !this.state.showModalAdd });
    }

    showComfirmDelete = (employe) => {
        return () => { this.setState({ showModalDelete: true, employe }); }
    }

    hideConfirmDelete = () => {
        this.setState({ showModalDelete: false, employe: {} });
    }

    handleShowEditModal = (employe) => {
        return () => { this.setState({ showEditModal: true, employe }); }
    }

    hideEditModal = () => {
        this.setState({ showEditModal: false, employe: {} })
    }

    render() {
        return (
            <Query
                query={GET_EMPLOYES}
            >
                {({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error</p>;
                    return (
                        <Container>
                            <h1>Liste des employés</h1>

                            <div className="float-right m-2">
                                <button type="button" className="btn btn-sm btn-primary" onClick={this.showForm}>Ajouter un employé</button>
                            </div>

                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nom</th>
                                        <th>Prenom</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.employes.map((employe, key) => (
                                        <tr key={key}>
                                            <th>{key + 1}</th>
                                            <td onClick={this.showDetails(employe)} className="list">{employe.nom}</td>
                                            <td onClick={this.showDetails(employe)} className="list">{employe.prenom}</td>
                                            <td>
                                                <button type="button" className="btn btn-sm btn-warning" onClick={this.handleShowEditModal(employe)}>Modifier</button>
                                                &nbsp;
                                                <button type="button" className="btn btn-sm btn-danger" onClick={this.showComfirmDelete(employe)}>Supprimer</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </Table>
                            {this.state.showModalDetails &&
                                <DetailsModal
                                    employe={this.state.employe}
                                    modal={this.state.showModalDetails}
                                    toggle={this.hideDetails} />}

                            {this.state.showModalAdd &&
                                <FormModal
                                    titre={'Ajouter employé'}
                                    type={'Add'}
                                    modal={this.state.showModalAdd}
                                    mutation={ADD_EMPLOYE}
                                    toggle={this.showForm} />}

                            {this.state.showEditModal &&
                                <FormModal
                                    titre={'Modifier employé'}
                                    employe={this.state.employe}
                                    mutation={EDIT_EMPLOYE}
                                    type={'Add'}
                                    modal={this.state.showEditModal}
                                    toggle={this.hideEditModal} />}

                            {this.state.showModalDelete &&
                                <DeleteModal
                                    employe={this.state.employe}
                                    modal={this.state.showModalDelete}
                                    toggle={this.hideConfirmDelete} />}
                        </Container>
                    )
                }}
            </Query>
        )
    }
}

export default EmployeList;