import { useEffect, useState } from 'react';
import { DEFAULT_USER_ID } from '../config/api.js';
import { fetchUserAlbum } from '../services/albumService.js';

export function useAlbum(userId = DEFAULT_USER_ID) {
  const [album, setAlbum] = useState({ usuarioId: '', selecciones: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadAlbum() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchUserAlbum(userId);
        if (!isMounted) return;
        setAlbum(data);
      } catch (requestError) {
        if (!isMounted) return;
        setAlbum({ usuarioId: userId, selecciones: [] });
        setError(
          requestError.response?.data?.message ||
            requestError.message ||
            'No se pudo cargar el álbum'
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadAlbum();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  return {
    selecciones: album.selecciones,
    isLoading,
    error,
  };
}
