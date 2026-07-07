import { Form, Button, Row, Col } from 'react-bootstrap';
import { useAlbumContext } from '../../context/AlbumContext.jsx';


export function FormAddJugador({ formData, onChange, onSubmit, onPosicionChange }) {
    const { posiciones } = useAlbumContext();

    return (
        <Form id='form-aniadir-jugador' onSubmit={onSubmit}>
            <Row className='mb-3'>
                <Col md={6}>
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

                <Col md={6}>
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

                <Form.Group className='mb-2' controlId='club'>
                    <Form.Label>Club del Jugador</Form.Label>
                    <Form.Control
                        type='text'
                        name='club'
                        value={formData.club}
                        onChange={onChange}
                        required
                    />
                </Form.Group>

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

            <Row className='mb-3'>
                <Col md={6}>
                    <Form.Group className='mb-2' controlId='fechaNacimiento'>
                        <Form.Label>Fecha de Nacimiento</Form.Label>
                        <Form.Control
                            type='date'
                            name='fechaNacimiento'
                            value={formData.fechaNacimiento}
                            onChange={onChange}
                            required
                        />
                    </Form.Group>
                </Col>

                <Col md={6}>
                    <Form.Group className='mb-2' controlId='estatura'>
                        <Form.Label>Estatura</Form.Label>
                        <Form.Control
                            type='number'
                            name='estatura'
                            value={formData.estatura}
                            onChange={onChange}
                            required
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row className='mb-3'>
                <Col md={6}>
                    <Form.Group className='mb-2' controlId="posicion">
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

                <Col md={6}>
                    <Form.Group className='mb-2' controlId='nroFigurita'>
                        <Form.Label>Numero de Figurita</Form.Label>
                        <Form.Control
                            type='number'
                            name='nroFigurita'
                            value={formData.nroFigurita}
                            onChange={onChange}
                            required
                        />
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );
};
