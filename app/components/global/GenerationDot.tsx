import { generationColors } from '~/utils/tableHelpers';

interface Props {
  generation: string;
  className?: string;
}

export default function GenerationDot({ generation, className = 'h-2.5 w-2.5' }: Props) {
  return (
    <span
      className={`shrink-0 rounded-full ${className}`}
      style={{ backgroundColor: generationColors[generation] }}
    />
  );
}
