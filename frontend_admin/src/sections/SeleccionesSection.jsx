import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useSelecciones } from '../hooks/useSelecciones.js';
import { Seleccion } from '../components/Seleccion/Seleccion.jsx';
import { TituloSubtitulo } from '../components/TituloSubtitulo/TituloSubtitulo.jsx';
import { ListaSelecciones } from '../components/ListaSelecciones/ListaSelecciones.jsx';
import { TablaSelecciones } from '../components/TablaSelecciones/TablaSelecciones.jsx';
import { ModalNuevaSeleccion } from '../components/ModalNuevaSeleccion/ModalNuevaSeleccion.jsx';


function SeleccionesSection() {
    const { selecciones, loading, addSeleccion, deleteSeleccion } = useSelecciones();

    return (
        <>
            <TituloSubtitulo titulo="Selecciones" subtitulo="Gestioná los equipos del torneo" />

            <div className="row g-4">
                <div className="col-md-12">
                    <ModalNuevaSeleccion />
                    
                    <div className="card border-0 shadow-sm">
                        <TablaSelecciones />
                    </div>
                </div>

            </div >
        </>
    );
};

export default SeleccionesSection;
