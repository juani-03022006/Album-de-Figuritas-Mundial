import { useMemo, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAlbumContext } from '../../context/AlbumContext.jsx';
import { NavegadorSelecciones } from './NavegadorSelecciones.jsx';
import { FilaEspeciales } from './FilaEspeciales.jsx';
import { FilasJugadores } from './FilasJugadores.jsx';
import { BotonesAltaFiguritas } from './BotonesAltaFiguritas.jsx';
import { ModalAddEspecial } from '../ModalesFiguritas/ModalAddEspecial.jsx';
import { ModalAddJugador } from '../ModalesFiguritas/ModalAddJugador.jsx';


export function TablaFiguritas({ onEspecialClick, onJugadorClick}) {
    const { selecciones, especiales, jugadores } = useAlbumContext();
    const [idSelectedSeleccion, setIdSelectedSeleccion] = useState(1);
    const [isNewJugadorModalOpen, setNewJugadorModalOpen] = useState(false);
    const [isNewEspecialModalOpen, setNewEspecialModalOpen] = useState(false);
    const haySelecciones = selecciones.length !== 0;
    const hayJugadores = jugadores.length !== 0;
    const hayEspeciales = especiales.length !== 0;
    const navigate = useNavigate();

    const seleccionesOrdenadas = useMemo(() => {
        if (!selecciones) return [];

        return [...selecciones].sort((unaSeleccion, otraSeleccion) => {
            return unaSeleccion.grupo.localeCompare(otraSeleccion.grupo);
        });
    }, [selecciones]);

    const handleSeleccionChange = (event) => {
        const valorSeleccionado = Number(event.target.value);
        setIdSelectedSeleccion(valorSeleccionado + 1);
    };

    const handlePrev = () => {
        if (idSelectedSeleccion > 0) {
            setIdSelectedSeleccion(idSelectedSeleccion - 1);
        };
    };

    const handleNext = () => {
        if (idSelectedSeleccion < seleccionesOrdenadas.length - 1) {
            setIdSelectedSeleccion(idSelectedSeleccion + 1);
        };
    };

    const handleModalNewEspecial = () => {
        setNewEspecialModalOpen(true);
    };

    const handleCloseModalNewEspecial = () => {
        setNewEspecialModalOpen(false);
    };

    const handleModalNewJugador = () => {
        setNewJugadorModalOpen(true);
    };

    const handleCloseModalNewJugador = () => {
        setNewJugadorModalOpen(false);
    };

    const especialesSeleccion = especiales.filter(especial => especial.figurita.idSeleccion === seleccionesOrdenadas[idSelectedSeleccion - 1].idSeleccion);
    const jugadoresSeleccion = jugadores.filter(jugador => jugador.figurita.idSeleccion === seleccionesOrdenadas[idSelectedSeleccion - 1].idSeleccion);

    return (
        <>
            {haySelecciones ? (
                <>
                    <ModalAddEspecial
                        isOpen={isNewEspecialModalOpen}
                        onClose={handleCloseModalNewEspecial}
                        idSeleccion={idSelectedSeleccion}
                    />

                    <ModalAddJugador
                        isOpen={isNewJugadorModalOpen}
                        onClose={handleCloseModalNewJugador}
                        idSeleccion={idSelectedSeleccion}
                    />

                    <NavegadorSelecciones
                        handlePrev={handlePrev}
                        handleNext={handleNext}
                        handleSeleccionChange={handleSeleccionChange}
                        selectedSeleccion={idSelectedSeleccion - 1}
                        seleccionesOrdenadas={seleccionesOrdenadas}
                    />

                    <BotonesAltaFiguritas
                        isMaxEspeciales={especialesSeleccion.length === 3}
                        isMaxJugadores={jugadoresSeleccion.length === 26}
                        onAddEspecial={handleModalNewEspecial}
                        onAddJugador={handleModalNewJugador}
                    />

                    <Container className='card border-0 shadow-sm'>

                        <FilaEspeciales
                            especialesSeleccion={especialesSeleccion}
                            handleShow={onEspecialClick}
                        />

                        <FilasJugadores
                            jugadoresSeleccion={jugadoresSeleccion}
                            handleShow={onJugadorClick}
                        />
                    </Container>
                </>
            ) : (
                <Container className="text-center my-5">
                    <h5>Todavía no hay Selecciones...</h5>
                    <Button
                        onClick={() => navigate('/selecciones')}
                    >
                        Añadir Selección
                    </Button>
                </Container>
            )}
        </>
    );
};
