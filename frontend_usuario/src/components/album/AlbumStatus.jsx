export function AlbumStatus({ isLoading, error, hasSelections }) {
  if (isLoading) {
    return (
      <div className="text-sm text-white/60 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-4">
        Cargando tu álbum...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-sm text-red-200 bg-red-500/20 border border-red-400/30 px-4 py-2 rounded-full mb-4">
        {error}
      </div>
    );
  }

  if (!hasSelections) {
    return (
      <div className="text-sm text-white/60 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-4">
        No hay selecciones para mostrar.
      </div>
    );
  }

  return null;
}
