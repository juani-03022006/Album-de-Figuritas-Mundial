import { useEffect, useMemo, useState } from 'react';
import { AlbumDoublePage } from './components/album/AlbumDoublePage';
import { AlbumHeader } from './components/album/AlbumHeader';
import { AlbumStatus } from './components/album/AlbumStatus';
import { TeamNavigator } from './components/album/TeamNavigator';
import { StickerPackButton } from './components/pack/StickerPackButton';
import { StickerPackModal } from './components/pack/StickerPackModal';
import { LoginScreen } from './components/auth/LoginScreen';
import { useAuth } from './auth/useAuth';
import { useAlbum } from './hooks/useAlbum';
import { useStickerPack } from './hooks/useStickerPack';
import { TOTAL_FIGURITAS } from './constants/albumLayout';
import { countOwnedFiguritas } from './services/albumService';

export function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const {
    enabled: authEnabled,
    isInitialized,
    isAuthenticated,
    accessToken,
    usuarioId,
    displayName,
    error: authError,
    login,
    register,
    logout,
  } = useAuth();

  const canLoadAlbum = isInitialized && isAuthenticated && Boolean(usuarioId);
  const {
    selecciones,
    isLoading,
    isSelectionLoading,
    error,
    loadSelection,
    markFiguritasAsOwned,
  } = useAlbum(usuarioId, accessToken, canLoadAlbum);

  const stickerPack = useStickerPack(
    usuarioId,
    accessToken,
    canLoadAlbum,
    markFiguritasAsOwned
  );

  const currentTeam = selecciones[currentPage] ?? null;

  const grupos = useMemo(() => {
    const gruposMap = new Map();

    selecciones.forEach((seleccion, index) => {
      const grupo = seleccion.grupo || 'SIN GRUPO';
      if (!gruposMap.has(grupo)) {
        gruposMap.set(grupo, { grupo, firstIndex: index, selecciones: [] });
      }
      gruposMap.get(grupo).selecciones.push(seleccion);
    });

    return [...gruposMap.values()].sort((a, b) => a.grupo.localeCompare(b.grupo, 'es'));
  }, [selecciones]);

  useEffect(() => {
    if (!currentTeam?.id || currentTeam.imagenesResueltas) return;
    loadSelection(currentTeam.id);
  }, [currentTeam?.id, currentTeam?.imagenesResueltas, loadSelection]);

  const ownedCount = useMemo(() => {
    if (!currentTeam) return 0;
    return countOwnedFiguritas(currentTeam.figuritas);
  }, [currentTeam]);

  function nextTeam() {
    if (selecciones.length === 0) return;
    setCurrentPage((prev) => (prev + 1) % selecciones.length);
  }

  function prevTeam() {
    if (selecciones.length === 0) return;
    setCurrentPage((prev) => (prev - 1 + selecciones.length) % selecciones.length);
  }

  function goToGroup(firstIndex) {
    setCurrentPage(firstIndex);
  }

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center p-6 font-sans">
        <div className="rounded-2xl bg-white/10 px-5 py-3 text-sm text-white/80">
          Validando sesión...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginScreen error={authError} onLogin={login} onRegister={register} />;
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center p-4 md:p-8 font-sans overflow-x-hidden">
      <StickerPackButton
        estado={stickerPack.estado}
        isLoading={stickerPack.isLoading}
        onClick={stickerPack.openModal}
      />

      <StickerPackModal
        isOpen={stickerPack.isModalOpen}
        isOpening={stickerPack.isOpening}
        error={stickerPack.error}
        paqueteAbierto={stickerPack.paqueteAbierto}
        onOpenPack={stickerPack.openPack}
        onClose={stickerPack.closeModal}
      />

      {authEnabled && (
        <div className="fixed right-4 top-4 z-50 flex items-center gap-3 rounded-full border border-white/10 bg-black/40 px-3 py-2 text-xs text-white/80 backdrop-blur">
          <span>{displayName}</span>
          <button
            type="button"
            onClick={logout}
            className="rounded-full bg-white px-3 py-1 font-bold uppercase tracking-wide text-neutral-950 transition hover:bg-white/90"
          >
            Cerrar sesión
          </button>
        </div>
      )}

      {currentTeam && (
        <AlbumHeader
          team={currentTeam}
          ownedCount={ownedCount}
          totalCount={TOTAL_FIGURITAS}
        />
      )}

      {grupos.length > 0 && (
        <div className="mb-5 flex max-w-[1200px] flex-wrap items-center justify-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur">
          {grupos.map((grupo) => {
            const active = currentTeam?.grupo === grupo.grupo;
            return (
              <button
                key={grupo.grupo}
                type="button"
                onClick={() => goToGroup(grupo.firstIndex)}
                className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-wider transition ${
                  active
                    ? 'bg-amber-300 text-neutral-950 shadow-lg shadow-amber-300/20'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                }`}
              >
                Grupo {grupo.grupo}
              </button>
            );
          })}
        </div>
      )}

      <AlbumStatus isLoading={isLoading} error={error} hasSelections={selecciones.length > 0} />

      {isSelectionLoading && currentTeam && (
        <div className="mb-3 text-xs text-white/70 bg-white/10 px-3 py-1 rounded-full">
          Buscando imágenes de {currentTeam.nombre}...
        </div>
      )}

      {currentTeam && <AlbumDoublePage team={currentTeam} />}

      {currentTeam && (
        <TeamNavigator team={currentTeam} onPrevious={prevTeam} onNext={nextTeam} />
      )}
    </div>
  );
}
