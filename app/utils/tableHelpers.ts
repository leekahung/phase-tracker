function getRowColor(generation: string): string {
  switch (generation) {
    case 'OriginS':
      return 'bg-blue-300/50';
    case 'ALiAS':
      return 'bg-orange-300/50';
    case 'Invaders':
      return 'bg-green-300/50';
    case 'KALEiDO':
      return 'bg-red-300/50';
    case 'Euphoria':
      return 'bg-[#795548]/50';
    case 'Invaders QUEST':
      return 'bg-purple-300/50';
    default:
      return 'bg-transparent';
  }
}

export { getRowColor };
