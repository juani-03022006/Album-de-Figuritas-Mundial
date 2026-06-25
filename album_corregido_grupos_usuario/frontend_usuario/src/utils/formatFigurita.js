export function formatBirthDate(isoDate) {
  if (!isoDate) return '';
  const [year, month, day] = isoDate.split('-');
  return `${Number(day)}-${Number(month)}-${year}`;
}

export function formatHeight(estatura) {
  if (!estatura) return '';
  const height = Number(estatura);
  if (!Number.isFinite(height)) return '';
  if (height > 3) return `${height} cm`;
  return `${String(height).replace('.', ',')} m`;
}

export function formatWeight(peso) {
  if (!peso) return '';
  return `${Math.round(peso)} kg`;
}

export function getPlayerFullName(jugador) {
  if (!jugador) return '';
  return `${jugador.nombre} ${jugador.apellido}`.trim();
}
