export function formatLastSeen(input) {
  if (
    !input ||
    (typeof input === "object" && Object.keys(input).length === 0)
  ) {
    return "noma’lum vaqt";
  }

  let date;

  if (input?.seconds !== undefined && input?.nanoseconds !== undefined) {
    date = new Date(input.seconds * 1000 + Math.floor(input.nanoseconds / 1e6));
  } else if (input instanceof Date) {
    date = input;
  } else {
    return "noma’lum vaqt";
  }

  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHrs = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHrs / 24);

  if (diffSec < 60) return "bir oz oldin";
  if (diffMin < 60) return `${diffMin} daqiqa oldin`;
  if (diffHrs < 24) return `${diffHrs} soat oldin`;
  if (diffDays === 1)
    return `kecha ${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  if (diffDays < 7) return `${diffDays} kun oldin`;

  return `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}.${date.getFullYear()} ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
}
