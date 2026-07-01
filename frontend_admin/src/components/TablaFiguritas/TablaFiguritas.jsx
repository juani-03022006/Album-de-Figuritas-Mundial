import { useMemo, useState } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { useAlbumContext } from '../../context/AlbumContext.jsx';
import { TituloSubtitulo } from '../TituloSubtitulo/TituloSubtitulo.jsx';
import { NavegadorSelecciones } from './NavegadorSelecciones.jsx';
import { FilaEspeciales } from './FilaEspeciales.jsx';


export function TablaFiguritas({ onFiguritaClick }) {
    const { selecciones, especiales, jugadores } = useAlbumContext();
    const [selectedSeleccion, setSelectedSeleccion] = useState(0);
    const haySelecciones = selecciones.length !== 0;
    const hayJugadores = jugadores.length !== 0;
    const hayEspeciales = especiales.length !== 0;

    const seleccionesOrdenadas = useMemo(() => {
        if (!selecciones) return [];

        return [...selecciones].sort((unaSeleccion, otraSeleccion) => {
            return unaSeleccion.grupo.localeCompare(otraSeleccion.grupo);
        });
    }, [selecciones]);


    // Handler para el Dropdown (mismo de antes)
    const handleSeleccionChange = (event) => {
        const valorSeleccionado = Number(event.target.value);
        setSelectedSeleccion(valorSeleccionado);
    };

    // Funciones para navegar hacia atrás y adelante
    const handlePrev = () => {
        if (selectedSeleccion > 0) {
            setSelectedSeleccion(selectedSeleccion - 1);
        };
    };

    const handleNext = () => {
        if (selectedSeleccion < seleccionesOrdenadas.length - 1) {
            setSelectedSeleccion(selectedSeleccion + 1);
        };
    };

    const especialesSeleccion = especiales.filter(especial => especial.figurita.idSeleccion === seleccionesOrdenadas[selectedSeleccion].idSeleccion);
    const jugadoresSeleccion = jugadores.filter(jugador => jugador.figurita.idSeleccion === seleccionesOrdenadas[selectedSeleccion].idSeleccion);

    return (
        <>
            {haySelecciones && hayJugadores && hayEspeciales ? (
                <>
                    {/* SECTOR DE CONTROL: CONTROLES DE PAGINACIÓN Y DROPDOWN */}
                    <NavegadorSelecciones
                        handlePrev={handlePrev}
                        handleNext={handleNext}
                        handleSeleccionChange={handleSeleccionChange}
                        selectedSeleccion={selectedSeleccion}
                        seleccionesOrdenadas={seleccionesOrdenadas}
                    />
                    <Container className='card border-0 shadow-sm'>

                        <FilaEspeciales especialesSeleccion={especialesSeleccion} />

                        <Row className="text-center p-2">
                            <Col md={3} className='p-3' >Celda 1/4</Col>
                            <Col md={3} className='p-3' >Celda 1/4</Col>
                            <Col md={3} className='p-3' >Celda 1/4</Col>
                            <Col md={3} className='p-3' >Celda 1/4</Col>
                        </Row>

                        <Row className="text-center p-2">
                            <Col md={3} className='p-3' >Celda 1/4</Col>
                            <Col md={3} className='p-3' >Celda 1/4</Col>
                            <Col md={3} className='p-3' >Celda 1/4</Col>
                            <Col md={3} className='p-3' >Celda 1/4</Col>
                        </Row>
                    </Container>
                </>
            ) : (
                <Container className="text-center my-5">
                    <h5>Todavía no hay Selecciones...</h5> <Button>Añadir Selección</Button>
                </Container>
            )}
        </>
    );
};
