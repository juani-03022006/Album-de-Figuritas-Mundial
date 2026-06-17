function getTipoLabel(tipo) {
  const labels = {
    escudo: 'Escudo',
    foto_equipo: 'Foto selección',
    tecnico: 'Director técnico',
    jugador: 'Jugador',
  };

  return labels[tipo] ?? tipo;
}

export function StickerPackModal({ isOpen, isOpening, error, paqueteAbierto, onOpenPack, onClose }) {
  if (!isOpen) return null;

  const figuritas = paqueteAbierto?.figuritas ?? [];
  const yaAbierto = figuritas.length > 0;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl rounded-3xl border border-amber-200/30 bg-neutral-950/95 p-5 text-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-1 text-sm font-bold text-white/80 transition hover:bg-white/20"
        >
          Cerrar
        </button>

        <div className="grid gap-6 md:grid-cols-[320px_1fr] md:items-center">
          <div className="flex flex-col items-center">
            <img
              src="/paquete-figuritas.svg"
              alt="Paquete de figuritas"
              className="w-full max-w-[280px] rounded-2xl shadow-2xl"
            />

            {!yaAbierto && (
              <button
                type="button"
                onClick={onOpenPack}
                disabled={isOpening}
                className="mt-5 rounded-full bg-gradient-to-r from-yellow-300 via-amber-500 to-yellow-700 px-8 py-3 text-sm font-black uppercase tracking-[0.25em] text-neutral-950 shadow-lg transition hover:scale-105 disabled:cursor-wait disabled:opacity-70"
              >
                {isOpening ? 'Abriendo...' : 'Abrir'}
              </button>
            )}
          </div>

          <div className="min-h-[360px] rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-amber-200">Paquete de 7</p>
            <h3 className="mt-2 text-2xl font-black uppercase tracking-tight">Figuritas obtenidas</h3>

            {error && (
              <div className="mt-4 rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                {error}
              </div>
            )}

            {!yaAbierto && !error && (
              <p className="mt-8 text-sm leading-relaxed text-white/65">
                Tocá <strong>Abrir</strong> para recibir 7 figuritas.
              </p>
            )}

            {yaAbierto && (
              <ol className="mt-5 grid gap-2">
                {figuritas.map((figurita, index) => (
                  <li
                    key={`${figurita.id}-${index}`}
                    className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/25 px-4 py-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-black uppercase text-white">
                        #{figurita.nroFigurita} · {figurita.nombre}
                      </p>
                      <p className="truncate text-xs text-white/55">
                        {figurita.seleccion?.nombre ?? 'Selección'} · {getTipoLabel(figurita.tipo)}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-black uppercase ${
                        figurita.yaLaTenia
                          ? 'bg-white/10 text-white/60'
                          : 'bg-emerald-400 text-emerald-950'
                      }`}
                    >
                      {figurita.yaLaTenia ? 'repetida' : 'nueva'}
                    </span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
