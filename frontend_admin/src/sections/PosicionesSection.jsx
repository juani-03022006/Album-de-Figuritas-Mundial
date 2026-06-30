import './PosicionesSection.css';
import { useState } from 'react';
import { TituloSubtitulo } from '../components/TituloSubtitulo/TituloSubtitulo.jsx';
import { TablaPosiciones } from '../components/TablaPosiciones/TablaPosiciones.jsx';
import { ContainerFormNewPosicion } from '../components/FormsPosiciones/ContainerFormNewPosicion.jsx';
import { ModalModificarPosicion } from '../components/ModalesPoscion/ModalModificarPosicion.jsx';


function PosicionesSection() {
    const [posicionParaEditar, setPosicionParaEditar] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSelectPosicion = (posicion) => {
        setPosicionParaEditar(posicion);
        setIsModalOpen(true)
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setPosicionParaEditar(null);
    };

    return (
        <div>
            <TituloSubtitulo titulo={'Posiciones'} subtitulo={'Gestioná las posiciones de los jugadores'} />

            <div className="row g-4">
                <ModalModificarPosicion
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    posicion={posicionParaEditar}
                />

                <div className='row-eq-height'>
                    <ContainerFormNewPosicion />

                    <div className="col-md-8 ps-2">
                        <div className="card border-0 shadow-sm">
                            <TablaPosiciones onEditarClick={handleSelectPosicion}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PosicionesSection;
