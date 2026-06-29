import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useAlbumContext } from '../../context/AlbumContext.jsx';
import { FormModificarPosicion } from '../FormsPosiciones/FormModificarPosicion.jsx';


export function ModalModificarPosicion({ isOpen, onClose, posicion }) {
    const { modifyPosicion } = useAlbumContext();
    const [formData, setFormData] = useState({ descripcion: '' });

    useEffect(() => {
        if (posicion) {
            setFormData({
                descripcion: posicion.descripcion || ''
            });
        }
    }, [posicion]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!posicion?.idPosicion) return;

        modifyPosicion({ ...formData, 'idPosicion': posicion.idPosicion });
        onClose();
    };

    return (
        <Modal show={isOpen} onHide={onClose} backdrop='static' centered>
            <Modal.Header closeButton>
                <Modal.Title>Modificar Posición</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormModificarPosicion
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
