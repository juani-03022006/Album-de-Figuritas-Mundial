import { useState } from "react";
import { Button, Form, Row } from "react-bootstrap";

function FormNuevaPosicion({ handleSubmit, handleChange }) {
    return (
        <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white fw-bold py-3">➕ Añadir Posición</div>
            <div className="card-body d-flex align-items-center justify-content-center">
                <Form id="form-nueva-posicion" onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group controlId="descripcionSeleccion">
                            <Form.Label>Nombre de la Posición</Form.Label>
                            <Form.Control
                                type="text"
                                name="descripcion"
                                placeholder="Ej: Arquero"
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button className="btn btn-primary w-100" variant="primary" type="submit">
                            Agregar
                        </Button>
                    </Row>
                </Form>
            </div>
        </div>
    );
};

export default FormNuevaPosicion;
