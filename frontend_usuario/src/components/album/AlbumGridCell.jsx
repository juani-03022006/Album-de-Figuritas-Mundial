export function AlbumGridCell({ children, colSpan = 1, empty = false }) {
  const spanClass = colSpan === 2 ? 'col-span-2' : 'col-span-1';

  if (empty) {
    return <div className={`${spanClass} min-h-0`} aria-hidden="true" />;
  }

  return (
    <div className={`${spanClass} flex items-center justify-center min-h-0 min-w-0 h-full`}>
      {children}
    </div>
  );
}
