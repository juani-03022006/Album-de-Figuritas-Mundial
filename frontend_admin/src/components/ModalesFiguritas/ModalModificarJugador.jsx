import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useAlbumContext } from '../../context/AlbumContext.jsx';
import { FormModificarJugador } from '../FormsFiguritas/FormModificarJugador.jsx';


export function ModalModificarJugador({ isOpen, onClose, jugador }) {
    const { modifyJugador } = useAlbumContext();
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        estatura: '',
        club: '',
        fechaNacimiento: '',
        idPosicion: '',
        pathTopic: ''
    });

    useEffect(() => {
        if (jugador) {
            setFormData({
                nombre: jugador.nombre,
                apellido: jugador.apellido,
                estatura: jugador.estatura,
                club: jugador.club,
                fechaNacimiento: jugador.fechaNacimiento,
                idPosicion: jugador.idPosicion,
                pathTopic: jugador.figurita.pathTopic
            });
        };
    }, [jugador]);

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
        if (!jugador?.figurita.idFigurita) return;

        modifyJugador(
            jugador.idJugador,
            {
                nombre: formData.nombre,
                apellido: formData.apellido,
                estatura: formData.estatura,
                club: formData.club,
                fechaNacimiento: formData.fechaNacimiento,
                idPosicion: Number(formData.idPosicion),
                figurita: {
                    idFigurita: jugador.idFigurita,
                    pathTopic: formData.pathTopic,
                    tipo: jugador.figurita.tipo,
                    idSeleccion: jugador.figurita.idSeleccion,
                }
            }
        );
        onClose();
    };

    return (
        <Modal show={isOpen} onHide={onClose} backdrop='static' centered>
            <Modal.Header closeButton>
                <Modal.Title>Modificar Figurita Jugador</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormModificarJugador
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
                <Button variant='success' type='submit' form='form-modificar-jugador'>
                    Guardar Cambios
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
