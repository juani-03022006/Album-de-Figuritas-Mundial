export function formatBirthDate(isoDate) {
  if (!isoDate) return '';
  const [year, month, day] = isoDate.split('-');
  return `${Number(day)}-${Number(month)}-${year}`;
}

export function formatHeight(estatura) {
  if (!estatura) return '';
  return `${String(estatura).replace('.', ',')} m`;
}

export function formatWeight(peso) {
  if (!peso) return '';
  return `${Math.round(peso)} kg`;
}

export function getPlayerFullName(jugador) {
  if (!jugador) return '';
  return `${jugador.nombre} ${jugador.apellido}`.trim();
}
