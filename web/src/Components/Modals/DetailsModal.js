import React from "react";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

const DetailsModal = (props) => (
        <Modal isOpen={props.modal} toggle={props.toggle}>
            <ModalHeader toggle={props.toggle}><span className="titre">Details de l'employé</span></ModalHeader>
            <ModalBody>
                <div className="info"><b>Nom</b> : {props.employe.nom} </div>
                <div className="info"><b>Prenom</b> : {props.employe.prenom} </div>
                <div className="info"><b>Age</b> : {props.employe.age} </div>
                <div className="info"><b>Poste</b> : {props.employe.poste} </div>
                <div className="info"><b>Experiences</b> : {props.employe.experiences.map((experience, key) => (
                    <div className="experiences" key={key}> 
                        <div><i>Titre</i> : {experience.titre}</div>
                        <div><i>Description</i> : {experience.description}</div>
                    </div>
                ))} 
                </div>
            </ModalBody>
        </Modal>
)

export default DetailsModal;