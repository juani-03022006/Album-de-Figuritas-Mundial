import { Form, Button, Row } from 'react-bootstrap';


export function FormModificarEspecial({ formData, onChange, onSubmit }) {
    return (
        <Form id='form-modificar-posicion' onSubmit={onSubmit}>
            <Row className='mb-3'>
                <Form.Group controlId='nombre'>
                    <Form.Label>Nombre de la Figurita</Form.Label>
                    <Form.Control
                        type='text'
                        name='nombre'
                        value={formData.nombre}
                        onChange={onChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId='pathTopic'>
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
