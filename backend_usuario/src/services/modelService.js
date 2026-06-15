import axios from 'axios';

const API_URL = 'http://localhost:3100'; 

export const getModelsFromAPI = async () => {
  try {
    const response = await axios.get(`${API_URL}/models`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los modelos de la API:', error.message);
    throw error; 
  }
};