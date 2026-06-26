import { useState } from 'react';
import { SeleccionesProvider } from '../context/SeleccionesContext.jsx';
import { TituloSubtitulo } from '../components/TituloSubtitulo/TituloSubtitulo.jsx';
import { ModalNuevaSeleccion } from '../components/ModalesSeleccion/ModalNuevaSeleccion.jsx';
import { ModalModificarSeleccion } from '../components/ModalesSeleccion/ModalModificarSeleccion.jsx';
import { TablaSelecciones } from '../components/TablaSelecciones/TablaSelecciones.jsx';
import { useSelecciones } from '../hooks/useSelecciones.js';


function SeleccionesSection() {
    const [seleccionParaEditar, setSeleccionParaEditar] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSelectSeleccion = (seleccion) => {
        setSeleccionParaEditar(seleccion);
        setIsModalOpen(true)
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSeleccionParaEditar(null);
    };

    return (
        <SeleccionesProvider>
            <TituloSubtitulo titulo="Selecciones" subtitulo="Gestioná los equipos del torneo" />

            <div className="row g-4">
                <div className="col-md-12">
                    <ModalNuevaSeleccion />
                    <ModalModificarSeleccion
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        seleccion={seleccionParaEditar}
                    />

                    <div className="card border-0 shadow-sm">
                        <TablaSelecciones onEditarClick={handleSelectSeleccion} />
                    </div>
                </div>

            </div >
        </SeleccionesProvider>
    );
};

export default SeleccionesSection;
