import type { IMemberInfo } from '~/types/dataTypes';

const generationColors: Record<string, string> = {
  OriginS: '#4C90BF',
  ALiAS: '#D6865B',
  Invaders: '#4CAF4D',
  KALEiDO: '#C45254',
  Euphoria: '#A07862',
  'Invaders QUEST': '#9371BD',
  Saga: '#D4A843',
};

function groupByGeneration(members: IMemberInfo[]): Record<string, IMemberInfo[]> {
  return members.reduce(
    (group, member) => {
      (group[member.generation] ||= []).push(member);
      return group;
    },
    {} as Record<string, IMemberInfo[]>
  );
}

export { generationColors, groupByGeneration };
