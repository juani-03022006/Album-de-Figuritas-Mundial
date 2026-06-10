export function AlbumHeader({ team, ownedCount, totalCount, isUsingMockData }) {
  return (
    <div className="w-full max-w-[1200px] mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 px-4">
      <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white/90 flex items-center gap-2">
        <span
          className="w-3 h-3 rounded-full inline-block transition-colors duration-700"
          style={{ backgroundColor: team.colors.main }}
        ></span>
        Sticker Album Collection
      </h2>

      <div className="flex flex-wrap items-center gap-2">
        <div className="text-xs text-white/70 bg-white/10 px-3 py-1 rounded-full">
          {ownedCount}/{totalCount} figuritas
        </div>
      </div>
    </div>
  );
}
