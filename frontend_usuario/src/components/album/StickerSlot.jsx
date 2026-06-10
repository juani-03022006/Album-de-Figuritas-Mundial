import { ImageWithFallback } from '../figma/ImageWithFallback';
import {
  LANDSCAPE_HEIGHT,
  LANDSCAPE_WIDTH,
  PORTRAIT_HEIGHT,
  PORTRAIT_WIDTH,
} from '../../constants/stickerSizes';

const kanitStyle = { fontFamily: "'Kanit', sans-serif" };

function StickerLabel({ teamCode, stickerId, teamColors, owned, compact = false }) {
  const textColor = owned ? teamColors.accent2 : '#374151';

  return (
    <div
      className={`flex flex-col items-center font-black z-10 ${compact ? 'shrink-0' : ''}`}
      style={{ color: textColor }}
    >
      <span className="text-[10px] leading-none drop-shadow-sm" style={kanitStyle}>
        {teamCode}
      </span>
      <span
        className={`${compact ? 'text-xl' : 'text-lg'} leading-none mt-0.5 drop-shadow-sm`}
        style={kanitStyle}
      >
        {stickerId}
      </span>
    </div>
  );
}

export function StickerSlot({ teamCode, sticker, teamColors, isHighlight = false }) {
  if (!sticker) return null;

  const isLandscape = sticker.orientation === 'landscape';
  const { owned, photoUrl, id } = sticker;

  const width = isLandscape ? LANDSCAPE_WIDTH : PORTRAIT_WIDTH;
  const height = isLandscape ? LANDSCAPE_HEIGHT : PORTRAIT_HEIGHT;

  const containerStyle = {
    width: `${width}px`,
    height: `${height}px`,
    ...(isHighlight && owned ? { boxShadow: `0 0 0 2px ${teamColors.accent1}` } : {}),
  };

  const containerClasses = owned
    ? 'bg-white shadow-md border border-gray-100'
    : 'bg-neutral-500/80 border border-neutral-600/50';

  return (
    <div
      className={`relative rounded-xl overflow-hidden shrink-0 transition-all duration-300 ${containerClasses} ${
        isLandscape ? 'flex items-center p-2 gap-2' : 'flex flex-col items-center justify-center p-1.5'
      } ${owned ? '' : 'grayscale'}`}
      style={containerStyle}
    >
      {!isLandscape && photoUrl && (
        <ImageWithFallback
          src={photoUrl}
          alt={`${teamCode} ${id}`}
          className={`absolute inset-0 h-full w-full object-cover ${owned ? 'opacity-100' : 'opacity-30'}`}
        />
      )}

      <div
        className={`absolute inset-0 flex items-center justify-center pointer-events-none select-none ${
          owned ? 'opacity-[0.04]' : 'opacity-[0.1]'
        }`}
      >
        <span
          className={`font-black italic tracking-tighter text-white ${isLandscape ? 'text-6xl' : 'text-5xl'}`}
          style={kanitStyle}
        >
          26
        </span>
      </div>

      {isLandscape ? (
        <>
          <div className="relative z-10 shrink-0 pr-2 border-r border-white/40">
            <StickerLabel
              teamCode={teamCode}
              stickerId={id}
              teamColors={teamColors}
              owned={owned}
              compact
            />
          </div>
          <div className="relative z-10 flex-1 min-w-0 h-full rounded-md overflow-hidden bg-neutral-300/40">
            {photoUrl ? (
              <ImageWithFallback
                src={photoUrl}
                alt={`${teamCode} ${id}`}
                className={`h-full w-full object-cover ${owned ? '' : 'opacity-40'}`}
              />
            ) : null}
          </div>
        </>
      ) : (
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
          <StickerLabel teamCode={teamCode} stickerId={id} teamColors={teamColors} owned={owned} />
        </div>
      )}
    </div>
  );
}
