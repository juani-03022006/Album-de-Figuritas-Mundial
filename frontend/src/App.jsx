import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

const teamsData = [
  {
    id: 'ARG',
    name: 'ARGENTINA',
    association: 'Asociación del Fútbol Argentino',
    flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg',
    colors: {
      main: '#8fa7e6',
      accent1: '#f47833',
      accent2: '#3a5bb3',
      text: '#1c388c',
    },
    stickers: [
      { id: 1, name: '' },
      { id: 2, name: 'EMILIANO MARTINEZ' },
      { id: 3, name: 'NAHUEL MOLINA' },
      { id: 4, name: 'CRISTIAN ROMERO' },
      { id: 5, name: 'NICOLAS OTAMENDI' },
      { id: 6, name: 'NICOLAS TAGLIAFICO' },
      { id: 7, name: 'LEONARDO BALERDI' },
      { id: 8, name: 'ENZO FERNANDEZ' },
      { id: 9, name: 'ALEXIS MAC ALLISTER' },
      { id: 10, name: 'RODRIGO DE PAUL' },
      { id: 11, name: 'EXEQUIEL PALACIOS' },
      { id: 12, name: 'LEANDRO PAREDES' },
      { id: 13, name: 'TEAM PHOTO' },
      { id: 14, name: 'NICO PAZ' },
      { id: 15, name: 'FRANCO MASTANTUONO' },
      { id: 16, name: 'NICO GONZALEZ' },
      { id: 17, name: 'LIONEL MESSI' },
      { id: 18, name: 'LAUTARO MARTINEZ' },
      { id: 19, name: 'JULIAN ALVAREZ' },
      { id: 20, name: 'GIULIANO SIMEONE' },
    ],
  },
  {
    id: 'ESP',
    name: 'SPAIN',
    association: 'Real Federación Española de Fútbol',
    flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Bandera_de_Espa%C3%B1a.svg',
    colors: {
      main: '#e63946',
      accent1: '#ffb703',
      accent2: '#a80000',
      text: '#ffffff',
    },
    stickers: [
      { id: 1, name: '' },
      { id: 2, name: 'UNAI SIMON' },
      { id: 3, name: 'DANI CARVAJAL' },
      { id: 4, name: 'ROBIN LE NORMAND' },
      { id: 5, name: 'AYMERIC LAPORTE' },
      { id: 6, name: 'MARC CUCURELLA' },
      { id: 7, name: 'RODRI' },
      { id: 8, name: 'FABIAN RUIZ' },
      { id: 9, name: 'PEDRI' },
      { id: 10, name: 'GAVI' },
      { id: 11, name: 'LAMINE YAMAL' },
      { id: 12, name: 'NICO WILLIAMS' },
      { id: 13, name: 'TEAM PHOTO' },
      { id: 14, name: 'DANI OLMO' },
      { id: 15, name: 'ALVARO MORATA' },
      { id: 16, name: 'FERRAN TORRES' },
      { id: 17, name: 'MIKEL OYARZABAL' },
      { id: 18, name: 'MARTIN ZUBIMENDI' },
      { id: 19, name: 'DAVID RAYA' },
      { id: 20, name: 'PAU TORRES' },
    ],
  },
  {
    id: 'BRA',
    name: 'BRAZIL',
    association: 'Confederação Brasileira de Futebol',
    flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg',
    colors: {
      main: '#009c3b',
      accent1: '#ffdf00',
      accent2: '#002776',
      text: '#ffffff',
    },
    stickers: [
      { id: 1, name: '' },
      { id: 2, name: 'ALISSON BECKER' },
      { id: 3, name: 'DANILO' },
      { id: 4, name: 'MARQUINHOS' },
      { id: 5, name: 'GABRIEL MAGALHAES' },
      { id: 6, name: 'WENDELL' },
      { id: 7, name: 'CASEMIRO' },
      { id: 8, name: 'BRUNO GUIMARAES' },
      { id: 9, name: 'LUCAS PAQUETA' },
      { id: 10, name: 'DOUGLAS LUIZ' },
      { id: 11, name: 'JOAO GOMES' },
      { id: 12, name: 'RAPHINHA' },
      { id: 13, name: 'TEAM PHOTO' },
      { id: 14, name: 'VINI JR' },
      { id: 15, name: 'RODRYGO' },
      { id: 16, name: 'GABRIEL MARTINELLI' },
      { id: 17, name: 'RICHARLISON' },
      { id: 18, name: 'ENDRICK' },
      { id: 19, name: 'SAVIO' },
      { id: 20, name: 'EDERSON' },
    ],
  },
];

function StickerSlot({ teamCode, sticker, isLandscape = false, isHighlight = false, teamColors }) {
  const highlightStyle = isHighlight
    ? { boxShadow: `0 0 0 2px ${teamColors.accent1}`, backgroundColor: '#fffdf5' }
    : {};

  if (isLandscape) {
    return (
      <div
        className="relative bg-white rounded-xl shadow-md border border-gray-100 flex items-center p-2 h-full w-full overflow-hidden transition-all duration-300"
        style={highlightStyle}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
          <span className="text-8xl font-black italic tracking-tighter" style={{ fontFamily: "'Kanit', sans-serif" }}>
            26
          </span>
        </div>
        <div
          className="flex flex-col items-center justify-center font-black z-10 w-1/3 border-r border-gray-200 pr-2 transition-colors duration-300"
          style={{ color: teamColors.accent2 }}
        >
          <span className="text-xs leading-none" style={{ fontFamily: "'Kanit', sans-serif" }}>
            {teamCode}
          </span>
          <span className="text-3xl leading-none mt-1" style={{ fontFamily: "'Kanit', sans-serif" }}>
            {sticker.id}
          </span>
        </div>
        <div className="w-2/3 pl-3 z-10 flex flex-col justify-center h-full">
          <div className="text-[10px] sm:text-xs text-gray-500 font-bold leading-tight uppercase tracking-wider">
            {teamCode} | {sticker.name}
          </div>
          <div className="text-[8px] sm:text-[10px] text-gray-400 mt-1 leading-tight">
            Team | Équipe | Equipo
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative bg-white rounded-xl shadow-md border border-gray-100 flex flex-col items-center justify-between overflow-hidden p-2 aspect-[1/1.4] w-full transition-all duration-300 max-h-[160px] mx-auto"
      style={highlightStyle}
    >
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none select-none">
        <span className="text-5xl sm:text-6xl font-black italic tracking-tighter" style={{ fontFamily: "'Kanit', sans-serif" }}>
          26
        </span>
      </div>
      <div
        className="flex flex-col items-center font-black z-10 w-full pt-1 transition-colors duration-300"
        style={{ color: teamColors.accent2 }}
      >
        <span className="text-[10px] sm:text-xs leading-none" style={{ fontFamily: "'Kanit', sans-serif" }}>
          {teamCode}
        </span>
        <span className="text-lg sm:text-xl leading-none mt-1" style={{ fontFamily: "'Kanit', sans-serif" }}>
          {sticker.id}
        </span>
      </div>
      <div className="text-center z-10 w-full pb-1">
        <span className="text-[8px] sm:text-[9px] font-bold text-gray-600 uppercase leading-tight block px-1 truncate">
          {sticker.name ? sticker.name : '\u00A0'}
        </span>
      </div>
    </div>
  );
}

function AlbumDoublePage({ team }) {
  return (
    <div
      key={team.id}
      className="w-full max-w-[1200px] aspect-[1.8/1] flex shadow-2xl rounded-sm overflow-hidden ring-1 ring-black/10 mx-auto transition-colors duration-700 ease-in-out animate-in fade-in zoom-in-95"
      style={{ backgroundColor: team.colors.main }}
    >
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
          <div className="flex justify-between items-start mb-5">
            <div className="w-[55%] flex flex-col pr-2">
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

            <div className="w-[45%] flex gap-2 justify-end items-start pt-1 pr-2">
              <div className="w-1/2 max-w-[96px]">
                <StickerSlot teamCode={team.id} sticker={team.stickers[0]} teamColors={team.colors} />
              </div>
              <div className="w-1/2 max-w-[96px]">
                <StickerSlot teamCode={team.id} sticker={team.stickers[1]} teamColors={team.colors} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 mt-auto mb-3 px-2 md:px-6">
            {team.stickers.slice(2, 6).map((s) => (
              <StickerSlot key={s.id} teamCode={team.id} sticker={s} teamColors={team.colors} />
            ))}
          </div>

          <div className="grid grid-cols-4 gap-2 mt-auto mb-6 px-2 md:px-6">
            {team.stickers.slice(6, 10).map((s) => (
              <StickerSlot key={s.id} teamCode={team.id} sticker={s} teamColors={team.colors} />
            ))}
          </div>

          <div className="mt-auto flex items-center gap-3 pt-2 pb-1">
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
          <div className="flex justify-between items-start pt-1 mb-5">
            <div className="w-[35%] flex gap-2 pl-2">
              <div className="w-1/2 max-w-[96px]">
                <StickerSlot teamCode={team.id} sticker={team.stickers[10]} teamColors={team.colors} />
              </div>
              <div className="w-1/2 max-w-[96px]">
                <StickerSlot teamCode={team.id} sticker={team.stickers[11]} teamColors={team.colors} />
              </div>
            </div>
            <div className="w-[58%] h-[140px] sm:h-[150px] ml-auto">
              <StickerSlot
                teamCode={team.id}
                sticker={team.stickers[12]}
                isLandscape
                isHighlight
                teamColors={team.colors}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 mt-auto mb-3 px-2 md:px-6">
            {team.stickers.slice(13, 17).map((s) => (
              <StickerSlot key={s.id} teamCode={team.id} sticker={s} teamColors={team.colors} />
            ))}
          </div>

          <div className="grid grid-cols-4 gap-2 mt-auto mb-6 px-2 md:px-6">
            <div className="hidden sm:block"></div>
            {team.stickers.slice(17, 20).map((s) => (
              <StickerSlot key={s.id} teamCode={team.id} sticker={s} teamColors={team.colors} />
            ))}
          </div>

          <div className="mt-auto flex justify-end pt-2 pb-1">
            <div className="text-white/80 font-bold text-xs tracking-widest uppercase drop-shadow-sm">
              {team.id} - Collection
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function App() {
  const [currentPage, setCurrentPage] = useState(0);

  function nextTeam() {
    setCurrentPage((prev) => (prev + 1) % teamsData.length);
  }

  function prevTeam() {
    setCurrentPage((prev) => (prev - 1 + teamsData.length) % teamsData.length);
  }

  const currentTeam = teamsData[currentPage];

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center p-4 md:p-8 font-sans overflow-x-hidden">
      <div className="w-full max-w-[1200px] mb-6 flex justify-between items-center px-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white/90 flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full inline-block transition-colors duration-700"
            style={{ backgroundColor: currentTeam.colors.main }}
          ></span>
          Sticker Album Collection
        </h2>
      </div>

      <AlbumDoublePage team={currentTeam} />

      <div className="mt-8 bg-neutral-800 border border-neutral-700 rounded-2xl p-2 flex items-center gap-6 shadow-xl backdrop-blur-sm">
        <button
          onClick={prevTeam}
          className="p-3 hover:bg-neutral-700 rounded-xl transition-colors text-neutral-300 hover:text-white group cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        </button>

        <div className="flex flex-col items-center px-4 min-w-[180px]">
          <span className="text-xs text-neutral-400 font-medium uppercase tracking-widest mb-1">
            Selección Actual
          </span>
          <span
            key={currentTeam.id}
            className="text-xl font-bold text-center transition-colors duration-700 animate-in slide-in-from-bottom-2 fade-in duration-300"
            style={{ fontFamily: "'Kanit', sans-serif", color: currentTeam.colors.accent1 }}
          >
            {currentTeam.name}
          </span>
        </div>

        <button
          onClick={nextTeam}
          className="p-3 hover:bg-neutral-700 rounded-xl transition-colors text-neutral-300 hover:text-white group cursor-pointer"
        >
          <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
