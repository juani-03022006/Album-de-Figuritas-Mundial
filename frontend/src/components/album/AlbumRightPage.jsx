import { getStickerById } from '../../services/albumService';
import { StickerSlot } from './StickerSlot';

export function AlbumRightPage({ team }) {
  const { stickers } = team;

  return (
    <div className="w-1/2 relative flex flex-col p-6 shadow-[inset_10px_0_20px_rgba(0,0,0,0.15)] z-0 border-l border-white/20">
      <div
        className="absolute top-0 right-0 w-[45%] h-[35%] rounded-bl-[100px] opacity-90 transition-colors duration-700 pointer-events-none"
        style={{ backgroundColor: team.colors.accent1 }}
      />
      <div
        className="absolute bottom-[22%] right-0 w-1/3 h-[22%] rounded-l-full opacity-90 transition-colors duration-700 pointer-events-none"
        style={{ backgroundColor: team.colors.accent1 }}
      />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-end items-start gap-2 mb-5">
          <StickerSlot
            teamCode={team.id}
            sticker={getStickerById(stickers, 11)}
            teamColors={team.colors}
          />
          <StickerSlot
            teamCode={team.id}
            sticker={getStickerById(stickers, 12)}
            teamColors={team.colors}
          />
          <StickerSlot
            teamCode={team.id}
            sticker={getStickerById(stickers, 13)}
            teamColors={team.colors}
            isHighlight
          />
        </div>

        <div className="flex justify-center gap-2 mt-auto mb-3">
          {[14, 15, 16, 17].map((stickerId) => (
            <StickerSlot
              key={stickerId}
              teamCode={team.id}
              sticker={getStickerById(stickers, stickerId)}
              teamColors={team.colors}
            />
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-auto mb-6">
          <div className="w-[72px] shrink-0 hidden sm:block" aria-hidden="true" />
          {[18, 19, 20].map((stickerId) => (
            <StickerSlot
              key={stickerId}
              teamCode={team.id}
              sticker={getStickerById(stickers, stickerId)}
              teamColors={team.colors}
            />
          ))}
        </div>

        <div className="mt-auto flex justify-end pt-2 pb-1">
          <div className="text-white/80 font-bold text-xs tracking-widest uppercase drop-shadow-sm">
            {team.id} - Collection
          </div>
        </div>
      </div>
    </div>
  );
}
