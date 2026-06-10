import { AlbumLeftPage } from './AlbumLeftPage';
import { AlbumRightPage } from './AlbumRightPage';

export function AlbumDoublePage({ team }) {
  return (
    <div
      key={team.id}
      className="w-full max-w-[1200px] aspect-[1.8/1] flex shadow-2xl rounded-sm overflow-hidden ring-1 ring-black/10 mx-auto transition-colors duration-700 ease-in-out animate-in fade-in zoom-in-95"
      style={{ backgroundColor: team.colors.main }}
    >
      <AlbumLeftPage team={team} />
      <AlbumRightPage team={team} />
    </div>
  );
}
