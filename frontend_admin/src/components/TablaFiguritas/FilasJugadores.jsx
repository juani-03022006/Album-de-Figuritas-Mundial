import { Row, Col } from 'react-bootstrap';
import { agruparDeA4 } from '../../utils/arrayUtils.js';
import { Jugador } from '../Figurita/Jugador.jsx';
import { useAlbumContext } from '../../context/AlbumContext.jsx';


export function FilasJugadores({ jugadoresSeleccion, handleShow }) {
    const { posiciones } = useAlbumContext();
    const jugadoresDeA4 = agruparDeA4(jugadoresSeleccion);

    return (
        <>
            {jugadoresDeA4.map((filaJugadores, filaIndex) => {
                return (
                    <Row key={filaIndex} className="text-center p-2">
                        {filaJugadores.map(jugador => {
                            return (
                                <Col key={jugador.idJugador} md={3} className='p-3 d-flex flex-column align-items-center justify-content-center'>
                                    <Jugador 
                                        handleShow={handleShow}
                                        jugador={jugador}
                                        alt={jugador.nombre + ' ' + jugador.apellido}
                                    />
                                    <p className='fw-bold'>{jugador.nombre + ' ' + jugador.apellido}</p>
                                    <p>{posiciones[jugador.idPosicion - 1].descripcion}</p>
                                </Col>
                            );
                        })}
                    </Row>
                );
            })}
        </>
    );
};
