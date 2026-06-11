import { ImageWithFallback } from '../figma/ImageWithFallback';
import { getFiguritaByNumber } from '../../services/albumService';
import { LEFT_PAGE_ROWS } from '../../constants/albumLayout';
import { FiguritaCard } from './FiguritaCard';
import { AlbumGridCell } from './AlbumGridCell';

export function AlbumLeftPage({ team }) {
  const { figuritas } = team;

  return (
    <div className="w-1/2 relative flex flex-col p-4 md:p-5 shadow-[inset_-10px_0_20px_rgba(0,0,0,0.15)] z-10 border-r border-black/5">
      <div
        className="absolute top-0 right-0 w-2/3 h-[45%] rounded-bl-[120px] opacity-90 transition-colors duration-700 pointer-events-none"
        style={{ backgroundColor: team.colores.accent1 }}
      />
      <div
        className="absolute bottom-0 left-0 w-[55%] h-1/4 rounded-tr-[80px] opacity-90 transition-colors duration-700 pointer-events-none"
        style={{ backgroundColor: team.colores.accent2 }}
      />

      <div className="relative z-10 flex flex-col h-full gap-1.5">
        {LEFT_PAGE_ROWS.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-4 gap-1.5 flex-1 min-h-0">
            {row.map((cell, cellIndex) => {
              if (cell.type === 'title') {
                return (
                  <AlbumGridCell key={`title-${cellIndex}`}>
                    <div className="flex flex-col justify-center h-full pr-1">
                      <h1
                        className="text-lg md:text-xl font-black italic uppercase leading-none tracking-tight drop-shadow-sm m-0"
                        style={{ fontFamily: "'Kanit', sans-serif", color: team.colores.text }}
                      >
                        WE ARE
                        <br />
                        <span className="text-xl md:text-2xl">{team.nombre}</span>
                      </h1>
                      <div className="flex items-center gap-1 mt-2 bg-white/80 backdrop-blur-sm px-1.5 py-1 rounded-md shadow-sm w-fit">
                        <ImageWithFallback
                          src={team.flagUrl}
                          alt={team.nombre}
                          className="w-6 h-4 object-cover border border-black/10"
                        />
                        <p
                          className="font-bold text-[8px] leading-tight max-w-[80px]"
                          style={{ color: team.colores.accent2 }}
                        >
                          {team.asociacion}
                        </p>
                      </div>
                    </div>
                  </AlbumGridCell>
                );
              }

              if (cell.type === 'empty') {
                return <AlbumGridCell key={`empty-${cellIndex}`} empty />;
              }

              const figurita = getFiguritaByNumber(figuritas, cell.nro);
              return (
                <AlbumGridCell key={cell.nro} colSpan={cell.colSpan ?? 1}>
                  <FiguritaCard team={team} figurita={figurita} fluid />
                </AlbumGridCell>
              );
            })}
          </div>
        ))}

        <div className="flex items-center gap-2 pt-1 pb-0.5 shrink-0">
          <div
            className="text-white font-black italic text-sm leading-none drop-shadow-md opacity-90 uppercase tracking-wide"
            style={{ fontFamily: "'Kanit', sans-serif" }}
          >
            ROAD TO 2026
          </div>
          <div className="w-1 h-1 rounded-full bg-white/70" />
          <div
            className="text-white font-black italic text-sm leading-none drop-shadow-md opacity-90 uppercase tracking-wide"
            style={{ fontFamily: "'Kanit', sans-serif" }}
          >
            FIFA WORLD CUP 2026™
          </div>
        </div>
      </div>
    </div>
  );
}
