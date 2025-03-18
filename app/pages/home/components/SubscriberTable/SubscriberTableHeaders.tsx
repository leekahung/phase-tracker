import type { IMemberInfo } from '~/types/dataTypes';
import SubscriberTableHeaderButton from './SubscriberTableHeaderButton';

const interactiveColumns: (keyof IMemberInfo)[] = ['channelName', 'generation', 'subscribers'];

interface Props {
  handleSortBy: (key: keyof IMemberInfo) => void;
  sortBy: keyof IMemberInfo;
  sortDirection: 'asc' | 'desc';
}

export default function SubscriberTableHeaders({ handleSortBy, sortBy, sortDirection }: Props) {
  return (
    <thead>
      <tr>
        <th className="hidden sm:table-cell">Icon</th>
        {interactiveColumns.map((column) => (
          <th key={column}>
            <SubscriberTableHeaderButton
              sortBy={sortBy}
              sortDirection={sortDirection}
              columnName={column}
              onClick={() => handleSortBy(column)}
            >
              {column === 'channelName'
                ? 'Channel'
                : `${column.charAt(0).toUpperCase() + column.slice(1)}`}
            </SubscriberTableHeaderButton>
          </th>
        ))}
        <th>Channel Info</th>
      </tr>
    </thead>
  );
}
