export function AlbumHeader({ team, ownedCount, totalCount }) {
  return (
    <div className="w-full max-w-[1200px] mx-auto mb-6 flex justify-center px-4">
      <div className="text-xs text-white/70 bg-white/10 px-3 py-1 rounded-full">
        {ownedCount}/{totalCount} figuritas
      </div>
    </div>
  );
}