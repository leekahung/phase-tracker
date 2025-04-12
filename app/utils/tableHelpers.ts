function getRowColor(generation: string): string {
  switch (generation) {
    case 'OriginS':
      return 'bg-blue-300/40';
    case 'ALiAS':
      return 'bg-orange-300/40';
    case 'Invaders':
      return 'bg-green-300/40';
    case 'KALEiDO':
      return 'bg-red-300/40';
    case 'Euphoria':
      return 'bg-purple-300/40';
    default:
      return 'bg-transparent';
  }
}

export { getRowColor };
