import { Form, Button, Row } from 'react-bootstrap';


export function FormModificarPosicion({ formData, onChange, onSubmit }) {
    return (
        <Form id='form-modificar-posicion' onSubmit={onSubmit}>
            <Row className='mb-3'>
                <Form.Group controlId='descripcion'>
                    <Form.Label>Descripción de la Posición</Form.Label>
                    <Form.Control
                        type='text'
                        name='descripcion'
                        value={formData.descripcion}
                        onChange={onChange}
                        required
                    />
                </Form.Group>
            </Row>
        </Form>
    );
};
