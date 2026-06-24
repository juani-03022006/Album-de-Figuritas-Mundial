import axios from 'axios';
import { AUTH_BASE_URL } from '../config/auth.js';

export async function fetchAuthenticatedUser(accessToken) {
  const { data } = await axios.get(`${AUTH_BASE_URL}/api/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data.usuario;
}
