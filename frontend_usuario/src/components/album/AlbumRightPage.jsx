import { getFiguritaByNumber } from '../../services/albumService';
import { RIGHT_PAGE_ROWS } from '../../constants/albumLayout';
import { FiguritaCard } from './FiguritaCard';
import { AlbumGridCell } from './AlbumGridCell';

export function AlbumRightPage({ team }) {
  const { figuritas } = team;

  return (
    <div className="w-1/2 relative flex flex-col p-4 md:p-5 shadow-[inset_10px_0_20px_rgba(0,0,0,0.15)] z-0 border-l border-white/20">
      <div
        className="absolute top-0 right-0 w-[45%] h-[35%] rounded-bl-[100px] opacity-90 transition-colors duration-700 pointer-events-none"
        style={{ backgroundColor: team.colores.accent1 }}
      />
      <div
        className="absolute bottom-[22%] right-0 w-1/3 h-[22%] rounded-l-full opacity-90 transition-colors duration-700 pointer-events-none"
        style={{ backgroundColor: team.colores.accent1 }}
      />

      <div className="relative z-10 flex flex-col h-full gap-1.5">
        {RIGHT_PAGE_ROWS.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-4 gap-1.5 flex-1 min-h-0">
            {row.map((nro) => (
              <AlbumGridCell key={nro}>
                <FiguritaCard team={team} figurita={getFiguritaByNumber(figuritas, nro)} fluid />
              </AlbumGridCell>
            ))}
          </div>
        ))}

        <div className="flex justify-end pt-1 pb-0.5 shrink-0">
          <div className="text-white/80 font-bold text-[10px] tracking-widest uppercase drop-shadow-sm">
            {team.id} - Collection
          </div>
        </div>
      </div>
    </div>
  );
}
