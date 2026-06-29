import { useState } from 'react';
import { useAlbumContext } from '../../context/AlbumContext.jsx';
import FormNuevaPosicion from '../FormsPosiciones/FormNuevaPosicion.jsx'



export function ContainerFormNewPosicion() {
    const { posiciones, addPosicion } = useAlbumContext();
        const [formData, setFormData] = useState({ descripcion: '' });

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        addPosicion(formData);
    };

    return (
        <div className="col-md-4">
            <FormNuevaPosicion
                handleSubmit={handleFormSubmit}
                handleChange={handleFormChange}
                isDisabled={posiciones.length === 4}
            />
        </div>
    );
};
