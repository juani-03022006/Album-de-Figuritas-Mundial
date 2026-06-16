import { useEffect, useMemo, useState } from 'react';
import { AlbumDoublePage } from './components/album/AlbumDoublePage';
import { AlbumHeader } from './components/album/AlbumHeader';
import { AlbumStatus } from './components/album/AlbumStatus';
import { TeamNavigator } from './components/album/TeamNavigator';
import { useAlbum } from './hooks/useAlbum';
import { TOTAL_FIGURITAS } from './constants/albumLayout';
import { countOwnedFiguritas } from './services/albumService';

export function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const { selecciones, isLoading, isSelectionLoading, error, loadSelection } = useAlbum();

  const currentTeam = selecciones[currentPage] ?? null;

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

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center p-4 md:p-8 font-sans overflow-x-hidden">
      {currentTeam && (
        <AlbumHeader
          team={currentTeam}
          ownedCount={ownedCount}
          totalCount={TOTAL_FIGURITAS}
        />
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
