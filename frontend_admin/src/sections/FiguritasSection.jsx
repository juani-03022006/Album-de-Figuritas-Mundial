import { useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { TituloSubtitulo } from '../components/TituloSubtitulo/TituloSubtitulo.jsx';
import { TablaFiguritas } from '../components/TablaFiguritas/TablaFiguritas.jsx';
import { useAlbumContext } from '../context/AlbumContext.jsx';
import { ModalModificarEspecial } from '../components/ModalesFiguritas/ModalModificarEspecial.jsx';


function FiguritasSection() {
    const { loading } = useAlbumContext();
    const [especialParaEditar, setEspecialParaEditar] = useState(null);
    const [isEspecialModificarModalOpen, setEspecialModificarModalOpen] = useState(false);
    
    if (loading) {
        return (
            <Container className="text-center my-5">
                <Spinner animation="border" variant="primary" />
                <h5>Conectando con el servidor...</h5>
            </Container>
        );
    };

    const handleSelectEspecial = (posicion) => {
        setEspecialParaEditar(posicion);
        setEspecialModificarModalOpen(true)
    };

    const handleCloseModalModifyEspecial = () => {
        setEspecialModificarModalOpen(false);
        setEspecialParaEditar(null);
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

                <div className='col-md-12'>
                    <TablaFiguritas onFiguritaClick={handleSelectEspecial}/>
                </div>
            </div>
        </>
    );
};

export default FiguritasSection;
