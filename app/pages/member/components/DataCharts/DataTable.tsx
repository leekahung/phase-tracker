import { useMemo } from 'react';
import type { IMemberInfo } from '~/types/dataTypes';
import GenerationDot from '~/components/global/GenerationDot';

interface Props {
  genList: string[];
  groupObject: Record<string, IMemberInfo[]>;
  genSelected: string[];
  handleGenSelected: (generation: string) => void;
}

export default function DataTable({ genList, groupObject, genSelected, handleGenSelected }: Props) {
  const totals = useMemo(
    () =>
      Object.fromEntries(
        genList.map((gen) => [gen, groupObject[gen].reduce((t, m) => t + m.subscribers, 0)])
      ),
    [genList, groupObject]
  );

  return (
    <table className="table max-w-2xl">
      <thead className="text-center">
        <tr>
          <th>Generation</th>
          <th>Subscribers</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {genList.map((generation) => {
          const bgColor = genSelected.includes(generation) ? 'bg-slate-500/50' : '';

          return (
            <tr
              className={`cursor-pointer ${bgColor}`}
              role="button"
              aria-label="row selector"
              onClick={(event) => {
                event.preventDefault();
                handleGenSelected(generation);
              }}
              key={generation}
            >
              <td className="flex items-center justify-center gap-4">
                <GenerationDot generation={generation} className="h-6 w-6" />
                <p className="w-15">{generation}</p>
              </td>
              <td>{totals[generation].toLocaleString()}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
