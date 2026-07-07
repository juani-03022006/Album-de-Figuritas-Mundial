import { Form, Button, Row, Col } from 'react-bootstrap';


export function FormAddEspecial({ formData, onChange, onSubmit, onTipoChange }) {
    const tipos = [
        { valor: 'escudo', nombre: 'Escudo' },
        { valor: 'foto_seleccion', nombre: 'Foto de Selección' },
        { valor: 'tecnico', nombre: 'Técnico' }
    ]

    return (
        <Form id='form-aniadir-especial' onSubmit={onSubmit}>
            <Row className='mb-3'>
                <Form.Group className='mb-2' controlId='nombre'>
                    <Form.Label>Nombre de la Figurita</Form.Label>
                    <Form.Control
                        type='text'
                        name='nombre'
                        value={formData.nombre}
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
                    <Form.Group className='mb-2' controlId='tipo'>
                        <Form.Label>Tipo</Form.Label>
                        <Form.Select
                            value={formData.tipo}
                            onChange={onTipoChange}
                        >
                            <option>Elegir un tipo...</option>
                            {tipos.map((tipo, index) => {
                                return <option key={index} value={tipo.valor}>{tipo.nombre}</option>
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
