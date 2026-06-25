export function AlbumHeader({ team, ownedCount, totalCount }) {
  return (
    <div className="w-full max-w-[1200px] mx-auto mb-6 flex justify-center px-4">
      <div className="flex items-center gap-3 rounded-full bg-white/10 px-4 py-1 text-xs text-white/75">
        <span className="font-black uppercase tracking-wider text-amber-200">Grupo {team.grupo || '-'}</span>
        <span className="h-1 w-1 rounded-full bg-white/40" />
        <span>{ownedCount}/{totalCount} figuritas</span>
      </div>
    </div>
  );
}
