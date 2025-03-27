export function calculateFontSize(radius: number): number {
  const minFontSize = 6;
  const maxFontSize = 48;
  const sizeFactor = 0.3;

  const fontSize = Math.min(maxFontSize, Math.max(minFontSize, radius * sizeFactor));

  return fontSize;
}
