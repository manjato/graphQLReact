import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Mutation } from "react-apollo";
import { GET_EMPLOYES } from "../EmployeList";

class FormModal extends React.Component {
    state = {
        nom: '',
        prenom: '',
        age: 15,
        poste: '',
        experiences: [{ titre: '', description: '' }],
    }

    onChange = (evt) => {
        this.setState({
            [evt.target.id]: evt.target.value
        })
    }

    componentDidMount() {
        if (this.props.employe) {
            const { nom, prenom, age, poste, experiences } = this.props.employe;
            this.setState({ nom, prenom, age, poste, experiences })
        }
    }

    addEmployeFromForm = (addEmploye) => {
        const { nom, prenom, age, poste, experiences } = this.state;
        const experience = experiences.map(exp => {
            const { _id, titre, description } = exp;
            return { _id, titre, description }
        })

        if (this.props.employe) {
            addEmploye({
                variables: {
                    id: this.props.employe._id,
                    nom,
                    prenom,
                    age: +age,
                    poste,
                    experiences: experience
                }
            });

        } else {
            addEmploye({
                variables: {
                    nom,
                    prenom,
                    age: +age,
                    poste,
                    experiences: experience
                }
            });

        }
    }

    handleChange = idx => evt => {
        const newExperiences = this.state.experiences.map((experience, sidx) => {
            if (idx !== sidx) return experience;
            return { ...experience, [evt.target.name]: evt.target.value };
        });

        this.setState({ experiences: newExperiences });
    };

    handleRemoveFormExperience = idx => () => {
        this.setState({
            experiences: this.state.experiences.filter((s, sidx) => idx !== sidx)
        });
    };

    handleAddFormExperience = () => {
        this.setState({
            experiences: this.state.experiences.concat([{ titre: '', description: '' }])
        });
    };

    isDisable = () => {
        let count = 0;
        this.state.experiences.map((experience) => {
            if (!experience.titre) {
                count += 1;
            }
            return experience;
        });
        
        if (this.state.nom && (count < 1)) return false;

        return true;
    }

    render() {
        return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
                <Mutation
                    mutation={this.props.mutation}
                    onCompleted={() => {
                        this.props.toggle();
                    }}
                    update={(cache, { data: { addEmploye } }) => {
                        if (!this.props.employe) {
                            const { employes } = cache.readQuery({ query: GET_EMPLOYES });
                            cache.writeQuery({
                                query: GET_EMPLOYES,
                                data: { employes: employes.concat([addEmploye]) },
                            });
                        }
                    }}>
                    {(addEmploye) => (
                        <form onSubmit={e => {
                            e.preventDefault();
                            this.addEmployeFromForm(addEmploye);
                        }}>
                            <ModalHeader toggle={this.props.toggle}><span className="titre">{this.props.titre}</span></ModalHeader>
                            <ModalBody>

                                <div className="form-group">
                                    <label htmlFor="nom">Nom</label>
                                    <input type="text" defaultValue={this.props.employe && this.props.employe.nom} className={this.state.nom ? 'form-control' : 'form-control is-invalid'} id="nom" placeholder="Nom" onChange={this.onChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="prenom">Prenom</label>
                                    <input type="text" defaultValue={this.props.employe && this.props.employe.prenom} className="form-control" id="prenom" placeholder="Prenom" onChange={this.onChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="age">Age</label>
                                    <input type="text" defaultValue={this.props.employe && this.props.employe.age} className="form-control" id="age" placeholder="Age" onChange={this.onChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="poste">Poste</label>
                                    <input type="text" defaultValue={this.props.employe && this.props.employe.poste} className="form-control" id="poste" placeholder="Poste" onChange={this.onChange} />
                                </div>

                                <div className="form-group">
                                    <h4 className="float-left">Experiences</h4>
                                    <button
                                        type="button"
                                        onClick={this.handleAddFormExperience}
                                        className="btn btn-sm btn-outline-primary float-right">
                                        Ajouter un experience
                                    </button>
                                </div>

                                <div className="form-group">
                                    <label>&nbsp;</label>
                                </div>
                            
                                {this.state.experiences.map((experience, idx) => (
                                    <div className="form-group" key={idx}>
                                        <div className="form-group">
                                            <label htmlFor="titre"> #{idx + 1} &nbsp;
                                                <button
                                                    type="button"
                                                    onClick={this.handleRemoveFormExperience(idx)}
                                                    className="btn btn-sm btn-danger">
                                                    Supprimer
                                                </button>
                                            </label>
                                            <input
                                                id={idx+1}
                                                type="text"
                                                name="titre"
                                                placeholder={'Titre'}
                                                className={!experience.titre ? 'form-control is-invalid' : 'form-control'}
                                                defaultValue={experience.titre || ""}
                                                onChange={this.handleChange(idx)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                id={idx+1}
                                                name='description'
                                                className="form-control"
                                                defaultValue={experience.description}
                                                onChange={this.handleChange(idx)}>
                                            </input>
                                        </div>
                                    </div>
                                ))}

                                <div className="form-group">
                                    <label>&nbsp;</label>
                                </div>

                            </ModalBody>
                            <ModalFooter>
                                <button type="submit" className="btn btn-primary" disabled={this.isDisable()}>Submit</button>
                            </ModalFooter>
                        </form>
                    )}
                </Mutation>
            </Modal>
        )
    }
}

export default FormModal;