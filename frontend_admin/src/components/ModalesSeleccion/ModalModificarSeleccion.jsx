import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSeleccionesContext } from '../../context/SeleccionesContext.jsx';
import { FormModificarSeleccion } from '../FormsSeleccion/FormModificarSeleccion.jsx';


export function ModalModificarSeleccion({ isOpen, onClose, seleccion }) {
    const { modifySeleccion } = useSeleccionesContext();

    const [formData, setFormData] = useState({
        nombreSeleccion: '',
        nombrePais: '',
        nroDesde: '',
        nroHasta: '',
        urlBandera: '',
        colorPrincipal: '#ffffff',
        colorAcento1: '#ffffff',
        colorAcento2: '#ffffff',
        colorTitulo: '#ffffff',
        grupo: 'A'
    });

    useEffect(() => {
        if (seleccion) {
            setFormData({
                nombreSeleccion: seleccion.nombreSeleccion || '',
                nombrePais: seleccion.nombrePais || '',
                nroDesde: seleccion.nroDesde || '',
                nroHasta: seleccion.nroHasta || '',
                urlBandera: seleccion.urlBandera || '',
                colorPrincipal: seleccion.colorPrincipal || '#ffffff',
                colorAcento1: seleccion.colorAcento1 || '#ffffff',
                colorAcento2: seleccion.colorAcento2 || '#ffffff',
                colorTitulo: seleccion.colorTitulo || '#ffffff',
                grupo: seleccion.grupo || 'A'
            });
        }
    }, [seleccion]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!seleccion?.idSeleccion) return;

        modifySeleccion({...formData, 'idSeleccion': seleccion.idSeleccion});
        onClose();
    };

    return (
        <Modal show={isOpen} onHide={onClose} backdrop="static" centered>
            <Modal.Header closeButton>
                <Modal.Title>Modificar Selección</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormModificarSeleccion
                    formData={formData}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancelar
                </Button>
                <Button variant="success" type="submit" form="form-modificar-seleccion">
                    Guardar Cambios
                </Button>
            </Modal.Footer>
        </Modal>
    );
}