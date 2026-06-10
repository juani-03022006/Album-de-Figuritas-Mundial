import { useMemo, useState } from 'react';
import { AlbumDoublePage } from './components/album/AlbumDoublePage';
import { AlbumHeader } from './components/album/AlbumHeader';
import { AlbumStatus } from './components/album/AlbumStatus';
import { TeamNavigator } from './components/album/TeamNavigator';
import { useAlbum } from './hooks/useAlbum';
import { countOwnedStickers } from './services/albumService';

export function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const { selections, isLoading, error, isUsingMockData } = useAlbum();

  const currentTeam = selections[currentPage] ?? null;

  const ownedCount = useMemo(() => {
    if (!currentTeam) return 0;
    return countOwnedStickers(currentTeam.stickers);
  }, [currentTeam]);

  function nextTeam() {
    if (selections.length === 0) return;
    setCurrentPage((prev) => (prev + 1) % selections.length);
  }

  function prevTeam() {
    if (selections.length === 0) return;
    setCurrentPage((prev) => (prev - 1 + selections.length) % selections.length);
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center p-4 md:p-8 font-sans overflow-x-hidden">
      {currentTeam && (
        <AlbumHeader
          team={currentTeam}
          ownedCount={ownedCount}
          totalCount={currentTeam.stickers.length}
          isUsingMockData={isUsingMockData}
        />
      )}

      <AlbumStatus isLoading={isLoading} error={error} hasSelections={selections.length > 0} />

      {currentTeam && <AlbumDoublePage team={currentTeam} />}

      {currentTeam && (
        <TeamNavigator team={currentTeam} onPrevious={prevTeam} onNext={nextTeam} />
      )}
    </div>
  );
}
