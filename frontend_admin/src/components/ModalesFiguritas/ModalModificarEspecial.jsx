import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useAlbumContext } from '../../context/AlbumContext.jsx';
import { FormModificarEspecial } from '../FormsFiguritas/FormModificarEspecial.jsx';

export function ModalModificarEspecial({ isOpen, onClose, especial }) {
    const { modifyEspecial } = useAlbumContext();
    const [formData, setFormData] = useState({
        nombre: '',
        pathTopic: ''
    });

    useEffect(() => {
        if (especial) {
            setFormData({
                nombre: especial.nombre,
                pathTopic: especial.figurita.pathTopic
            });
        };
    }, [especial]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!especial?.figurita.idFigurita) return;

        modifyEspecial(
            especial.id,
            {
                nombre: formData.nombre,
                figurita: {
                    id: especial.id,
                    pathTopic: formData.pathTopic,
                    tipo: especial.figurita.tipo,
                    idSeleccion: especial.figurita.idSeleccion,
                }
            }
        );
        onClose();
    };

    return (
        <Modal show={isOpen} onHide={onClose} backdrop='static' centered>
            <Modal.Header closeButton>
                <Modal.Title>Modificar Figurita Especial</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormModificarEspecial
                    formData={formData}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={onClose}>
                    Cancelar
                </Button>
                <Button variant='success' type='submit' form='form-modificar-posicion'>
                    Guardar Cambios
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
