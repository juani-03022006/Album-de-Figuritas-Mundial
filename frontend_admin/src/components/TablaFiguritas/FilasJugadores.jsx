import { Row, Col } from 'react-bootstrap';


export function FilasJugadores({ jugadoresSeleccion }) {
    return (
        <>
            <Row className="text-center p-2">
                <Col md={3} className='p-3'>Celda 1/4</Col>
                <Col md={3} className='p-3'>Celda 1/4</Col>
                <Col md={3} className='p-3'>Celda 1/4</Col>
                <Col md={3} className='p-3'>Celda 1/4</Col>
            </Row>

            <Row className="text-center p-2">
                <Col md={3} className='p-3'>Celda 1/4</Col>
                <Col md={3} className='p-3'>Celda 1/4</Col>
                <Col md={3} className='p-3'>Celda 1/4</Col>
                <Col md={3} className='p-3'>Celda 1/4</Col>
            </Row>
        </>
    );
};
