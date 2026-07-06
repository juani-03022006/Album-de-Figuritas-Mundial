import { useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { TituloSubtitulo } from '../components/TituloSubtitulo/TituloSubtitulo.jsx';
import { TablaFiguritas } from '../components/TablaFiguritas/TablaFiguritas.jsx';
import { useAlbumContext } from '../context/AlbumContext.jsx';
import { ModalModificarEspecial } from '../components/ModalesFiguritas/ModalModificarEspecial.jsx';
import { ModalModificarJugador } from '../components/ModalesFiguritas/ModalModificarJugador.jsx';


function FiguritasSection() {
    const { loading } = useAlbumContext();
    const [especialParaEditar, setEspecialParaEditar] = useState(null);
    const [isEspecialModificarModalOpen, setEspecialModificarModalOpen] = useState(false);
    const [jugadorParaEditar, setJugadorParaEditar] = useState(null);
    const [isJugadorModificarModalOpen, setJugadorModificarModalOpen] = useState(false);

    if (loading) {
        return (
            <Container className="text-center my-5">
                <Spinner animation="border" variant="primary" />
                <h5>Conectando con el servidor...</h5>
            </Container>
        );
    };

    const handleSelectEspecial = (especial) => {
        setEspecialParaEditar(especial);
        setEspecialModificarModalOpen(true)
    };

    const handleCloseModalModifyEspecial = () => {
        setEspecialModificarModalOpen(false);
        setEspecialParaEditar(null);
    };

    const handleSelectJugador = (jugador) => {
        setJugadorParaEditar(jugador);
        setJugadorModificarModalOpen(true)
    };

    const handleCloseModalModifyJugador = () => {
        setJugadorModificarModalOpen(false);
        setJugadorParaEditar(null);
    };

    return (
        <>
            <TituloSubtitulo titulo={'Figuritas'} subtitulo={'Gestioná las figuritas de cada Selección'} />

            <div className="row g-4">
                <ModalModificarEspecial
                    isOpen={isEspecialModificarModalOpen}
                    onClose={handleCloseModalModifyEspecial}
                    especial={especialParaEditar}
                />

                <ModalModificarJugador
                    isOpen={isJugadorModificarModalOpen}
                    onClose={handleCloseModalModifyJugador}
                    jugador={jugadorParaEditar}
                />

                <div className='col-md-12'>
                    <TablaFiguritas
                        onEspecialClick={handleSelectEspecial}
                        onJugadorClick={handleSelectJugador}
                    />
                </div>
            </div>
        </>
    );
};

export default FiguritasSection;
