import { useCallback, useEffect, useRef, useState } from 'react';
import { DEFAULT_USER_ID } from '../config/api.js';
import { fetchUserAlbum, fetchUserSelection } from '../services/albumService.js';

function replaceSelection(selecciones, updatedSelection) {
  return selecciones.map((seleccion) =>
    seleccion.id === updatedSelection.id ? updatedSelection : seleccion
  );
}

export function useAlbum(userId = DEFAULT_USER_ID) {
  const [album, setAlbum] = useState({ usuarioId: '', selecciones: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [isSelectionLoading, setIsSelectionLoading] = useState(false);
  const [error, setError] = useState(null);
  const loadingSelectionCodes = useRef(new Set());

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

  const loadSelection = useCallback(
    async (codigoSeleccion) => {
      const codigo = String(codigoSeleccion ?? '').toUpperCase();
      if (!codigo || loadingSelectionCodes.current.has(codigo)) return;

      loadingSelectionCodes.current.add(codigo);
      setIsSelectionLoading(true);
      setError(null);

      try {
        const updatedSelection = await fetchUserSelection(userId, codigo);
        setAlbum((prevAlbum) => ({
          ...prevAlbum,
          selecciones: replaceSelection(prevAlbum.selecciones, updatedSelection),
        }));
      } catch (requestError) {
        setError(
          requestError.response?.data?.message ||
            requestError.message ||
            `No se pudo cargar la selección ${codigo}`
        );
      } finally {
        loadingSelectionCodes.current.delete(codigo);
        setIsSelectionLoading(false);
      }
    },
    [userId]
  );

  return {
    selecciones: album.selecciones,
    isLoading,
    isSelectionLoading,
    error,
    loadSelection,
  };
}
