import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FormSeleccion } from '../FormSeleccion/FormSeleccion.jsx';
import { useSelecciones } from '../../hooks/useSelecciones.js';


export function ModalNuevaSeleccion() {
    const { addSeleccion } = useSelecciones();

    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (
        <>
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Nueva Selección</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormSeleccion
                        onSubmitSuccess={(datosFinales) => {
                            addSeleccion(datosFinales);
                            handleClose();
                        }}
                    />
                </Modal.Body>
            </Modal>

            <div className="d-flex justify-content-end align-items-center gap-1 rounded-pill p-2">
                Añadir Seleccion:
                <button className="btn btn-sm btn-outline-primary" onClick={handleShow}>Añadir</button>
            </div>
        </>
    );
};
