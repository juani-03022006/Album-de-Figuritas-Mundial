import { ImageWithFallback } from '../figma/ImageWithFallback';
import { getStickerById } from '../../services/albumService';
import { StickerSlot } from './StickerSlot';

export function AlbumLeftPage({ team }) {
  const { stickers } = team;

  return (
    <div className="w-1/2 relative flex flex-col p-6 shadow-[inset_-10px_0_20px_rgba(0,0,0,0.15)] z-10 border-r border-black/5">
      <div
        className="absolute top-0 right-0 w-2/3 h-[45%] rounded-bl-[120px] opacity-90 transition-colors duration-700 pointer-events-none"
        style={{ backgroundColor: team.colors.accent1 }}
      />
      <div
        className="absolute bottom-0 left-0 w-[55%] h-1/4 rounded-tr-[80px] opacity-90 transition-colors duration-700 pointer-events-none"
        style={{ backgroundColor: team.colors.accent2 }}
      />
      <div
        className="absolute top-1/4 -left-10 w-1/3 h-1/3 -rotate-12 opacity-30 rounded-full blur-3xl transition-colors duration-700 pointer-events-none"
        style={{ backgroundColor: '#ffffff' }}
      />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-5 gap-3">
          <div className="flex flex-col pr-2 min-w-0">
            <h1
              className="text-2xl md:text-3xl lg:text-4xl font-black italic uppercase leading-none tracking-tight drop-shadow-sm transition-colors duration-700 m-0"
              style={{ fontFamily: "'Kanit', sans-serif", color: team.colors.text }}
            >
              WE ARE <br /> <span className="text-3xl md:text-4xl lg:text-5xl">{team.name}</span>
            </h1>
            <div className="flex items-center gap-2 mt-3 bg-white/80 backdrop-blur-sm px-2 py-1.5 rounded-lg shadow-sm w-fit z-20 relative">
              <ImageWithFallback
                src={team.flagUrl}
                alt={team.name}
                className="w-8 h-5 object-cover border border-black/10"
              />
              <p
                className="font-bold text-[10px] md:text-xs leading-tight max-w-[140px] transition-colors duration-700"
                style={{ color: team.colors.accent2 }}
              >
                {team.association}
              </p>
            </div>
          </div>

          <div className="flex gap-2 shrink-0">
            <StickerSlot
              teamCode={team.id}
              sticker={getStickerById(stickers, 1)}
              teamColors={team.colors}
            />
            <StickerSlot
              teamCode={team.id}
              sticker={getStickerById(stickers, 2)}
              teamColors={team.colors}
            />
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-auto mb-3">
          {[3, 4, 5, 6].map((stickerId) => (
            <StickerSlot
              key={stickerId}
              teamCode={team.id}
              sticker={getStickerById(stickers, stickerId)}
              teamColors={team.colors}
            />
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-auto mb-6">
          {[7, 8, 9, 10].map((stickerId) => (
            <StickerSlot
              key={stickerId}
              teamCode={team.id}
              sticker={getStickerById(stickers, stickerId)}
              teamColors={team.colors}
            />
          ))}
        </div>

        <div className="mt-auto flex items-center gap-3 pt-0.5 pb-1">
          <div
            className="text-white font-black italic text-lg md:text-xl leading-none drop-shadow-md opacity-90 uppercase tracking-wide"
            style={{ fontFamily: "'Kanit', sans-serif" }}
          >
            ROAD TO 2026
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-white/70"></div>
          <div
            className="text-white font-black italic text-lg md:text-xl leading-none drop-shadow-md opacity-90 uppercase tracking-wide"
            style={{ fontFamily: "'Kanit', sans-serif" }}
          >
            FIFA WORLD CUP 2026™
          </div>
        </div>
      </div>
    </div>
  );
}
