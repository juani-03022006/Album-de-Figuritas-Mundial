import { Row, Col } from 'react-bootstrap';
import { Especial } from '../Figurita/Especial.jsx';


export function FilaEspeciales({ especialesSeleccion, handleShow }) {
    return (
        <Row className="text-center fw-bold p-2">
            <Col md={4} className='p-3 d-flex flex-column align-items-center justify-content-center'>
                <Especial
                    handleShow={handleShow}
                    especial={especialesSeleccion[0]}
                    alt={especialesSeleccion[0].nombre}
                    orientation={'landscape'}
                />
                <p>{especialesSeleccion[0].nombre}</p>
            </Col>
            <Col md={4} className='p-3 d-flex flex-column align-items-center justify-content-center'>
                <Especial
                    handleShow={handleShow}
                    especial={especialesSeleccion[2]}
                    alt={especialesSeleccion[2].nombre}
                    orientation={'portrait'}
                />
                <p>{especialesSeleccion[2].nombre}</p>
            </Col>
            <Col md={4} className='p-3 d-flex flex-column align-items-center justify-content-center'>
                <Especial
                    handleShow={handleShow}
                    especial={especialesSeleccion[1]}
                    alt={especialesSeleccion[1].nombre}
                    orientation={'landscape'}
                />
                <p>{especialesSeleccion[1].nombre}</p>
            </Col>
        </Row>
    );
};
