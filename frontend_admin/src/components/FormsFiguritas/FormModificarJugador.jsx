import { Form, Button, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useAlbumContext } from '../../context/AlbumContext.jsx';


export function FormModificarJugador({ formData, onChange, onSubmit, posicionElegida, onPosicionChange }) {
    const { posiciones } = useAlbumContext();

    return (
        <Form id='form-modificar-jugador' onSubmit={onSubmit}>
            <Row className='mb-3'>
                <Col>
                    <Form.Group className='mb-2' controlId='nombre'>
                        <Form.Label>Nombre del Jugador</Form.Label>
                        <Form.Control
                            type='text'
                            name='nombre'
                            value={formData.nombre}
                            onChange={onChange}
                            required
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className='mb-2' controlId='apellido'>
                        <Form.Label>Apellido del Jugador</Form.Label>
                        <Form.Control
                            type='text'
                            name='apellido'
                            value={formData.apellido}
                            onChange={onChange}
                            required
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row className='mb-3'>
                <Col md={4}>
                    <Form.Group className='mb-2' controlId='estatura'>
                        <Form.Label>Estatura</Form.Label>
                        <Form.Control
                            type='number'
                            name='estatura'
                            value={formData.estatura}
                            onChange={onChange}
                            min={0}
                            required
                        />
                    </Form.Group>
                </Col>
                <Col md={8}>
                    <Form.Group controlId="formOpciones">
                        <Form.Label>Posición</Form.Label>
                        <Form.Select
                            value={formData.idPosicion}
                            onChange={onPosicionChange}
                        >
                            {posiciones.map((posicion, index) => {
                                return <option key={index} value={index + 1}>{posicion.descripcion}</option>
                            })}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>

            <Row className='mb-3'>
                <Form.Group className='mb-2' controlId='pathTopic'>
                    <Form.Label>URL de la Foto de la Figurita</Form.Label>
                    <Form.Control
                        type='text'
                        name='pathTopic'
                        value={formData.pathTopic}
                        onChange={onChange}
                        required
                    />
                </Form.Group>
            </Row>
        </Form>
    );
};
