import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useAlbumContext } from '../../context/AlbumContext.jsx';
import { FormAddEspecial } from '../FormsFiguritas/FormAddEspecial.jsx';


export function ModalAddEspecial({ isOpen, onClose, idSeleccion }) {
    const { addEspecial } = useAlbumContext();
    const [formData, setFormData] = useState({
        nombre: '',
        nroFigurita: '',
        pathTopic: '',
        tipo: '',
        idSeleccion: idSeleccion
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleTipoChange = (event) => {
        setFormData((prev) => ({
            ...prev,
            tipo: event.target.value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addEspecial(
            {
                nombre: formData.nombre,
                figurita: {
                    nroFigurita: Number(formData.nroFigurita),
                    pathTopic: formData.pathTopic,
                    tipo: formData.tipo,
                    idSeleccion: formData.idSeleccion,
                }
            }
        );

        setFormData({
            nombre: '',
            nroFigurita: '',
            pathTopic: '',
            tipo: '',
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
                <FormAddEspecial
                    formData={formData}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    onTipoChange={handleTipoChange}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={onClose}>
                    Cancelar
                </Button>
                <Button variant='success' type='submit' form='form-aniadir-especial'>
                    Añadir
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
