import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useAlbumContext } from '../../context/AlbumContext.jsx';
import { FormAddJugador } from '../FormsFiguritas/FormAddJugador.jsx';


export function ModalAddJugador({ isOpen, onClose, idSeleccion }) {
    const { addJugador } = useAlbumContext();
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        estatura: '',
        club: '',
        fechaNacimiento: '',
        idPosicion: 1,
        nroFigurita: '',
        pathTopic: '',
        idSeleccion: idSeleccion
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePosicionChange = (event) => {
        setFormData((prev) => ({
            ...prev,
            idPosicion: event.target.value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addJugador(
            {
                nombre: formData.nombre,
                apellido: formData.apellido,
                estatura: Number(formData.estatura),
                club: formData.club,
                fechaNacimiento: formData.fechaNacimiento,
                idPosicion: 1,
                figurita: {
                    nroFigurita: Number(formData.nroFigurita),
                    pathTopic: formData.pathTopic,
                    tipo: 'jugador',
                    idSeleccion: formData.idSeleccion,
                }
            }
        );

        setFormData({
            nombre: '',
            apellido: '',
            estatura: '',
            club: '',
            fechaNacimiento: '',
            idPosicion: 1,
            nroFigurita: '',
            pathTopic: '',
            idSeleccion: idSeleccion
        });

        onClose();
    };

    return (
        <Modal show={isOpen} onHide={onClose} backdrop='static' centered>
            <Modal.Header closeButton>
                <Modal.Title>Añadir Figurita Especial</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormAddJugador
                    formData={formData}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    onPosicionChange={handlePosicionChange}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={onClose}>
                    Cancelar
                </Button>
                <Button variant='success' type='submit' form='form-aniadir-jugador'>
                    Añadir
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
