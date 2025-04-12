import type { IMemberInfo } from '~/types/dataTypes';
import { getRowColor } from '~/utils/tableHelpers';

interface Props {
  genList: string[];
  groupObject: Record<string, IMemberInfo[]>;
  genSelected: string[];
  handleGenSelected: (generation: string) => void;
}

export default function DataTable({ genList, groupObject, genSelected, handleGenSelected }: Props) {
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
          const totalSubscribers = groupObject[generation].reduce(
            (total, member) => total + member.subscribers,
            0
          );
          const genColor = getRowColor(generation);
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
                <div className={`h-6 w-6 rounded-full ${genColor}`} />
                <p className="w-[60px]">{generation}</p>
              </td>
              <td>{totalSubscribers.toLocaleString()}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
