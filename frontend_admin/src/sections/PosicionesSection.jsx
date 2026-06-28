import './PosicionesSection.css';
import { useState } from 'react';
import { useAlbumContext } from '../context/SeleccionesContext.jsx';
import { TituloSubtitulo } from '../components/TituloSubtitulo/TituloSubtitulo.jsx';
import { TablaPosiciones } from '../components/TablaPosiciones/TablaPosiciones.jsx';
import FormNuevaPosicion from '../components/FormsPosiciones/FormNuevaPosicion.jsx';


function PosicionesSection() {
    const { posiciones, addPosicion } = useAlbumContext();
    const [formData, setFormData] = useState({
        descripcion: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

	const handleSubmit = (event) => {
		event.preventDefault();
		addPosicion(formData);
	};

	return (
		<div>
            <TituloSubtitulo titulo={'Posiciones'} subtitulo={'Gestioná las posiciones de los jugadores'} />

			<div className="row g-4 row-eq-height">
				<div className="col-md-4">
                    {/* Deberia haber un componente de form aca, no el form */}
					<FormNuevaPosicion handleSubmit={handleSubmit} handleChange={handleChange} />
				</div>

				<div className="col-md-8">
					<div className="card border-0 shadow-sm">
						<TablaPosiciones />
					</div>
				</div>
			</div>
		</div>
	);
};

export default PosicionesSection;
