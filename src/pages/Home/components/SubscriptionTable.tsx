import { useMemo, useState } from 'react';
import useChannels from '@/hooks/useChannels';
import type { IMemberInfo } from '@/types/dataTypes';
import SortableTableHeader from './SortableTableHeader';
import SubscriptionTableRow from './SubscriptionTableRow';
import TableError from '@/global/components/TableError';
import TableLoading from '@/global/components/TableLoading';

export default function SubscriptionTable(): React.JSX.Element {
  const { members, isLoading, isError } = useChannels();
  const [sortBy, setSortBy] = useState<string>('subscribers');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (columnName: string) => {
    if (sortBy === columnName) {
      setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(columnName);
      setSortDirection('desc');
    }
  };

  const sortedData = useMemo(() => {
    if (!sortBy) return members;
    const unsortedData = members !== undefined ? [...members] : [];

    return unsortedData.sort((a, b) => {
      const valueA = a[sortBy as keyof IMemberInfo];
      const valueB = b[sortBy as keyof IMemberInfo];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortDirection === 'desc'
          ? valueB.localeCompare(valueA)
          : valueA.localeCompare(valueB);
      } else if (typeof valueA === 'number' && typeof valueB === 'number') {
        return sortDirection === 'desc' ? valueB - valueA : valueA - valueB;
      } else {
        return 0;
      }
    });
  }, [members, sortBy, sortDirection]);

  return (
    <table className="table max-w-screen-lg text-center sm:text-base">
      <thead>
        <tr className="border-b border-slate-300 text-sm text-slate-300 sm:text-base">
          <th className="hidden sm:table-cell sm:p-4">Channel Icon</th>
          {['channel_name', 'generation', 'subscribers'].map((header) => {
            return (
              <SortableTableHeader
                column={header}
                sortBy={sortBy || null}
                sortDirection={sortDirection}
                handleSort={handleSort}
                key={header}
              />
            );
          })}
          <th className="p-2 sm:p-4 sm:text-base">Channel Info</th>
          <th className="hidden sm:table-cell sm:p-4 sm:text-base">Data From</th>
        </tr>
      </thead>
      {isError ? (
        <TableError />
      ) : (
        <tbody>
          {isLoading ? (
            <TableLoading />
          ) : (
            sortedData?.map((member) => {
              return <SubscriptionTableRow member={member} key={member.id} />;
            })
          )}
        </tbody>
      )}
    </table>
  );
}
