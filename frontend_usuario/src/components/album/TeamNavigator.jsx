import { ChevronLeft, ChevronRight } from 'lucide-react';

export function TeamNavigator({ team, onPrevious, onNext }) {
  return (
    <div className="mt-8 bg-neutral-800 border border-neutral-700 rounded-2xl p-2 flex items-center gap-6 shadow-xl backdrop-blur-sm">
      <button
        type="button"
        onClick={onPrevious}
        className="p-3 hover:bg-neutral-700 rounded-xl transition-colors text-neutral-300 hover:text-white group cursor-pointer"
        aria-label="Selección anterior"
      >
        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
      </button>

      <div className="flex flex-col items-center px-4 min-w-[180px]">
        <span className="text-xs text-neutral-400 font-medium uppercase tracking-widest mb-1">
          Selección Actual
        </span>
        <span
          key={team.id}
          className="text-xl font-bold text-center transition-colors duration-700 animate-in slide-in-from-bottom-2 fade-in duration-300"
          style={{ fontFamily: "'Kanit', sans-serif", color: team.colores.accent1 }}
        >
          {team.nombre}
        </span>
      </div>

      <button
        type="button"
        onClick={onNext}
        className="p-3 hover:bg-neutral-700 rounded-xl transition-colors text-neutral-300 hover:text-white group cursor-pointer"
        aria-label="Selección siguiente"
      >
        <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
