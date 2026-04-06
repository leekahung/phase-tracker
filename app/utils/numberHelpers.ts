function formatChangeNumbers(num: number): string {
  if (num > 0) return `+${num.toLocaleString()}`;
  if (num < 0) return `-${num.toLocaleString()}`;
  return '±0';
}

function getChangeColorClass(change: number): string {
  if (change > 0) return 'text-green-300';
  if (change < 0) return 'text-red-300';
  return 'text-gray-300';
}

function formatCompactNumber(num: number, maxFractionDigits = 2): string {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: maxFractionDigits,
  }).format(num);
}

export { getChangeColorClass, formatCompactNumber };
export default formatChangeNumbers;
