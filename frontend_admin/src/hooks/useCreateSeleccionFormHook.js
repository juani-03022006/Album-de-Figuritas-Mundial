import { useState } from 'react';


export function useCreateSeleccionForm(initialValues = {}, onSubmitCallback) {
    const [values, setValues] = useState({
        nombreSeleccion: initialValues.nombreSeleccion || '',
        nombrePais: initialValues.nombrePais || '',
        colorPrincipal: initialValues.colorPrincipal || '#ffffff',
        colorAcento1: initialValues.colorAcento1 || '#ffffff',
        colorAcento2: initialValues.colorAcento2 || '#ffffff',
        colorTitulo: initialValues.colorTitulo || '#ffffff',
        grupo: initialValues.grupo || 'A'
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (onSubmitCallback) {
            onSubmitCallback(values);
        }
    };

    const resetForm = () => {
        setValues({
            nombreSeleccion: initialValues.nombreSeleccion || '',
            nombrePais: initialValues.nombrePais || '',
            colorPrincipal: initialValues.colorPrincipal || '#ffffff',
            colorAcento1: initialValues.colorAcento1 || '#ffffff',
            colorAcento2: initialValues.colorAcento2 || '#ffffff',
            colorTitulo: initialValues.colorTitulo || '#ffffff',
            grupo: initialValues.grupo || 'A'
        });
    };

    return {
        values,
        handleChange,
        handleSubmit,
        resetForm
    };
};
