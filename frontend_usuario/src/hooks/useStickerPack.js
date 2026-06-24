import { useCallback, useEffect, useState } from 'react';
import { fetchStickerPackStatus, openStickerPack } from '../services/albumService.js';

function getErrorMessage(error, fallback) {
  return (
    error.response?.data?.message ||
    error.response?.data?.error ||
    error.message ||
    fallback
  );
}

export function useStickerPack(userId, accessToken = null, shouldLoad = true, onPackageOpened) {
  const [estado, setEstado] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(shouldLoad));
  const [isOpening, setIsOpening] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paqueteAbierto, setPaqueteAbierto] = useState(null);
  const [error, setError] = useState(null);

  const loadStatus = useCallback(async () => {
    if (!shouldLoad) {
      setEstado(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchStickerPackStatus(userId, accessToken);
      setEstado(data);
    } catch (requestError) {
      setError(getErrorMessage(requestError, 'No se pudo consultar el paquete'));
    } finally {
      setIsLoading(false);
    }
  }, [accessToken, shouldLoad, userId]);

  useEffect(() => {
    loadStatus();
  }, [loadStatus]);

  useEffect(() => {
    if (!shouldLoad || !estado || estado.disponible) return undefined;

    const timeout = window.setTimeout(() => {
      loadStatus();
    }, Math.min(Math.max(estado.milisegundosRestantes, 1000), 2147483647));

    return () => window.clearTimeout(timeout);
  }, [estado, loadStatus, shouldLoad]);

  function openModal() {
    if (!estado?.disponible || isLoading) return;
    setPaqueteAbierto(null);
    setError(null);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setError(null);
  }

  const handleOpenPack = useCallback(async () => {
    if (!estado?.disponible || isOpening) return;

    setIsOpening(true);
    setError(null);

    try {
      const data = await openStickerPack(userId, accessToken);
      setPaqueteAbierto(data);
      setEstado(data.estado);
      onPackageOpened?.(data.figuritas.map((figurita) => figurita.id));
    } catch (requestError) {
      const serverDetails = requestError.response?.data?.details;

      if (serverDetails) {
        setEstado(serverDetails);
      }

      setError(getErrorMessage(requestError, 'No se pudo abrir el paquete'));
    } finally {
      setIsOpening(false);
    }
  }, [accessToken, estado?.disponible, isOpening, onPackageOpened, userId]);

  return {
    estado,
    isLoading,
    isOpening,
    isModalOpen,
    paqueteAbierto,
    error,
    loadStatus,
    openModal,
    closeModal,
    openPack: handleOpenPack,
  };
}
