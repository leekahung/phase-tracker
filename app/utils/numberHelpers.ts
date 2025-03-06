function formatChangeNumbers(num: number): string {
  if (num > 0) return `+${num.toLocaleString()}`;
  if (num < 0) return `-${num.toLocaleString()}`;
  return '±0';
}

export default formatChangeNumbers;
