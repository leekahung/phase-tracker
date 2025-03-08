import type { IMemberInfo } from '~/types/dataTypes';
import SubscriberTableHeaderButtons from './SubscriberTableHeaderButtons';

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
        <th>
          <SubscriberTableHeaderButtons
            sortBy={sortBy}
            sortDirection={sortDirection}
            columnName={'channelName'}
            onClick={() => handleSortBy('channelName')}
          >
            Channel
          </SubscriberTableHeaderButtons>
        </th>
        <th className="hidden sm:table-cell">
          <SubscriberTableHeaderButtons
            sortBy={sortBy}
            sortDirection={sortDirection}
            columnName={'generation'}
            onClick={() => handleSortBy('generation')}
          >
            Generation
          </SubscriberTableHeaderButtons>
        </th>
        <th>
          <SubscriberTableHeaderButtons
            sortBy={sortBy}
            sortDirection={sortDirection}
            columnName={'subscribers'}
            onClick={() => handleSortBy('subscribers')}
          >
            Subscribers
          </SubscriberTableHeaderButtons>
        </th>
        <th>Channel Info</th>
      </tr>
    </thead>
  );
}
