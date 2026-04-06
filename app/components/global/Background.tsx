import { generationColors } from '~/utils/tableHelpers';

const blobs = [
  {
    gen: 'OriginS',
    size: 600,
    pos: { top: '-150px', left: '-150px' },
    animation: 'drift1 12s ease-in-out infinite',
  },
  {
    gen: 'Invaders QUEST',
    size: 550,
    pos: { top: '-100px', right: '-150px' },
    animation: 'drift2 16s ease-in-out infinite',
  },
  {
    gen: 'KALEiDO',
    size: 500,
    pos: { bottom: '-120px', right: '-100px' },
    animation: 'drift3 10s ease-in-out infinite',
  },
  {
    gen: 'Saga',
    size: 520,
    pos: { bottom: '-130px', left: '-120px' },
    animation: 'drift4 14s ease-in-out infinite',
  },
] as const;

export default function Background() {
  return (
    <div className="fixed inset-0 overflow-hidden">
      {blobs.map(({ gen, size, pos, animation }) => (
        <div
          key={gen}
          className="absolute rounded-full opacity-[0.18] dark:opacity-30"
          style={{
            backgroundColor: generationColors[gen],
            width: `${size}px`,
            height: `${size}px`,
            filter: 'blur(100px)',
            willChange: 'transform',
            animation,
            ...pos,
          }}
        />
      ))}
    </div>
  );
}
