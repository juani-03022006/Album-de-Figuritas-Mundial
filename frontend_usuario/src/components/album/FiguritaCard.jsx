import { ImageWithFallback } from '../figma/ImageWithFallback';
import {
  LANDSCAPE_ASPECT,
  LANDSCAPE_HEIGHT,
  LANDSCAPE_WIDTH,
  PORTRAIT_ASPECT,
  PORTRAIT_HEIGHT,
  PORTRAIT_WIDTH,
} from '../../constants/figuritaSizes';
import {
  formatBirthDate,
  formatHeight,
  formatWeight,
  getPlayerFullName,
} from '../../utils/formatFigurita';

const kanitStyle = { fontFamily: "'Kanit', sans-serif" };

function CountryPill({ team }) {
  return (
    <div className="absolute z-20 right-1 top-1 flex flex-col items-center rounded-full bg-black/20 border border-white/30 backdrop-blur-sm px-1 py-0.5">
      <ImageWithFallback
        src={team.flagUrl}
        alt={team.nombre}
        className="w-3 h-2 object-cover rounded-sm border border-white/40"
      />
      <span className="text-[6px] font-black text-white leading-none tracking-wider mt-0.5" style={kanitStyle}>
        {team.id}
      </span>
    </div>
  );
}

function FiguritaNumberBadge({ nroFigurita, className = '' }) {
  return (
    <span
      className={`absolute left-1 top-1 z-30 min-w-[14px] h-[14px] px-0.5 rounded-full bg-black/70 border border-white/30 text-[7px] font-black text-white flex items-center justify-center leading-none ${className}`}
      style={kanitStyle}
    >
      {nroFigurita}
    </span>
  );
}

function MissingFigurita({ team, figurita, isLandscape, fluid }) {
  const sizeStyle = fluid
    ? { width: '100%', height: '100%', aspectRatio: isLandscape ? LANDSCAPE_ASPECT : PORTRAIT_ASPECT }
    : {
        width: isLandscape ? `${LANDSCAPE_WIDTH}px` : `${PORTRAIT_WIDTH}px`,
        height: isLandscape ? `${LANDSCAPE_HEIGHT}px` : `${PORTRAIT_HEIGHT}px`,
      };

  return (
    <div
      className="relative rounded-md overflow-hidden shrink-0 bg-neutral-500 border border-neutral-600/60 grayscale flex items-center justify-center mx-auto"
      style={sizeStyle}
    >
      <FiguritaNumberBadge nroFigurita={figurita.nroFigurita} />
      <div className="flex flex-col items-center font-black text-neutral-200" style={kanitStyle}>
        <span className="text-[8px] leading-none">{team.id}</span>
        <span className="text-lg leading-none mt-0.5">{figurita.nroFigurita}</span>
      </div>
    </div>
  );
}

function PersonFigurita({ team, figurita, isLandscape, fluid, isTecnico = false }) {
  const { jugador, fotoUrl, nroFigurita } = figurita;
  const fullName = getPlayerFullName(jugador).toUpperCase();
  const statsLine = [
    formatBirthDate(jugador.fechaNacimiento),
    formatHeight(jugador.estatura),
    formatWeight(jugador.peso),
  ]
    .filter(Boolean)
    .join(' | ');

  const sizeStyle = fluid
    ? { width: '100%', height: '100%', aspectRatio: isLandscape ? LANDSCAPE_ASPECT : PORTRAIT_ASPECT }
    : {
        width: isLandscape ? `${LANDSCAPE_WIDTH}px` : `${PORTRAIT_WIDTH}px`,
        height: isLandscape ? `${LANDSCAPE_HEIGHT}px` : `${PORTRAIT_HEIGHT}px`,
      };

  return (
    <div
      className="relative rounded-md overflow-hidden shrink-0 shadow-md border border-white/20 mx-auto"
      style={sizeStyle}
    >
      <FiguritaNumberBadge nroFigurita={nroFigurita} />
      <div className="absolute inset-0" style={{ backgroundColor: team.colores.main }} />

      <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none">
        <span className="text-4xl font-black italic tracking-tighter text-white" style={kanitStyle}>
          26
        </span>
      </div>

      <CountryPill team={team} />

      <div className="absolute top-0 left-0 right-0 h-[58%] z-10">
        {fotoUrl && (
          <ImageWithFallback
            src={fotoUrl}
            alt={fullName}
            className="h-full w-full object-cover object-top"
          />
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 bg-black/60 backdrop-blur-[1px] px-1 py-0.5 text-white">
        {isTecnico && (
          <p className="text-[5px] font-bold uppercase tracking-wider text-amber-200 leading-none mb-0.5">
            Director Técnico
          </p>
        )}
        <p className="text-[6px] font-black leading-tight uppercase truncate" style={kanitStyle} title={fullName}>
          {fullName}
        </p>
        <p className="text-[4px] leading-tight truncate opacity-90">{statsLine}</p>
        <p className="text-[4px] leading-tight truncate uppercase opacity-80">{jugador.club}</p>
      </div>
    </div>
  );
}

function SpecialFigurita({ team, figurita, isLandscape, fluid }) {
  const title = figurita.especial?.nombre?.toUpperCase() ?? team.id;

  const sizeStyle = fluid
    ? { width: '100%', height: '100%', aspectRatio: isLandscape ? LANDSCAPE_ASPECT : PORTRAIT_ASPECT }
    : {
        width: isLandscape ? `${LANDSCAPE_WIDTH}px` : `${PORTRAIT_WIDTH}px`,
        height: isLandscape ? `${LANDSCAPE_HEIGHT}px` : `${PORTRAIT_HEIGHT}px`,
      };

  return (
    <div
      className={`relative rounded-md overflow-hidden shrink-0 shadow-md border border-white/20 mx-auto ${
        isLandscape ? 'flex items-stretch' : 'flex flex-col'
      }`}
      style={sizeStyle}
    >
      <FiguritaNumberBadge nroFigurita={figurita.nroFigurita} />
      <div className="absolute inset-0" style={{ backgroundColor: team.colores.main }} />

      {isLandscape ? (
        <>
          <div className="relative z-10 w-[30%] flex flex-col items-center justify-center border-r border-white/20 bg-black/10">
            <span className="text-[8px] font-black text-white" style={kanitStyle}>
              {team.id}
            </span>
          </div>
          <div className="relative z-10 flex-1 min-w-0">
            {figurita.fotoUrl && (
              <ImageWithFallback
                src={figurita.fotoUrl}
                alt={title}
                className="h-full w-full object-cover"
              />
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-1 py-0.5">
              <p className="text-[6px] font-black uppercase text-white truncate" style={kanitStyle}>
                {title}
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <CountryPill team={team} />
          <div className="relative z-10 flex-1 flex items-center justify-center p-1 min-h-0">
            {figurita.fotoUrl && (
              <ImageWithFallback
                src={figurita.fotoUrl}
                alt={title}
                className="max-h-full max-w-full object-contain drop-shadow"
              />
            )}
          </div>
          <div className="relative z-10 bg-black/60 px-1 py-0.5 text-center shrink-0">
            <p className="text-[6px] font-black uppercase text-white truncate" style={kanitStyle}>
              {title}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export function FiguritaCard({ team, figurita, fluid = false }) {
  if (!figurita) return null;

  const isLandscape = figurita.orientacion === 'landscape';

  if (!figurita.tiene) {
    return (
      <MissingFigurita team={team} figurita={figurita} isLandscape={isLandscape} fluid={fluid} />
    );
  }

  if ((figurita.tipo === 'jugador' || figurita.tipo === 'tecnico') && figurita.jugador) {
    return (
      <PersonFigurita
        team={team}
        figurita={figurita}
        isLandscape={isLandscape}
        fluid={fluid}
        isTecnico={figurita.tipo === 'tecnico'}
      />
    );
  }

  return (
    <SpecialFigurita team={team} figurita={figurita} isLandscape={isLandscape} fluid={fluid} />
  );
}
