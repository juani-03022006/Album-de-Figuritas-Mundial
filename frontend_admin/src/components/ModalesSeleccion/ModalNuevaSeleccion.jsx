import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FormNuevaSeleccion } from '../FormsSeleccion/FormNuevaSeleccion.jsx';
import { useAlbumContext } from '../../context/AlbumContext.jsx';


export function ModalNuevaSeleccion() {
    const { addSeleccion } = useAlbumContext();

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
                    <FormNuevaSeleccion
                        onSubmitSuccess={(datosSeleccion) => {
                            addSeleccion(datosSeleccion);
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
