function formatRemainingTime(ms) {
  const totalSeconds = Math.ceil(Math.max(0, Number(ms) || 0) / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m`;
  return `${totalSeconds}s`;
}

export function StickerPackButton({ estado, isLoading, onClick }) {
  const disponible = Boolean(estado?.disponible);
  const restante = estado?.milisegundosRestantes ?? 0;

  return (
    <div className="fixed left-4 top-4 z-50 flex flex-col items-start gap-1">
      <button
        type="button"
        onClick={onClick}
        disabled={!disponible || isLoading}
        className={`group relative rounded-2xl border px-4 py-3 text-left shadow-xl transition ${
          disponible
            ? 'border-amber-200 bg-gradient-to-br from-yellow-300 via-amber-500 to-yellow-700 text-neutral-950 hover:scale-105 hover:shadow-amber-400/40'
            : 'cursor-not-allowed border-white/10 bg-neutral-800/80 text-white/35 opacity-70'
        }`}
        title={disponible ? 'Abrir paquete disponible' : 'Todavía no hay paquete disponible'}
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl" aria-hidden="true">🎁</span>
          <div className="leading-tight">
            <p className="text-xs font-black uppercase tracking-wider">Paquete</p>
            <p className="text-[10px] font-bold uppercase opacity-80">
              {isLoading ? 'consultando...' : disponible ? 'disponible' : `en ${formatRemainingTime(restante)}`}
            </p>
          </div>
        </div>
        {disponible && <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-white shadow" />}
      </button>
    </div>
  );
}
