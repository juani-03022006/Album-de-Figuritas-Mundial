import axios from 'axios';
import { API_ALBUM_URL } from '../config/api.js';
export async function getAlbumByUsuarioCodigo(codigoUsuario) {
  const album = await axios.get(`${API_ALBUM_URL}/album/${codigoUsuario}`);
  return album.data;
}