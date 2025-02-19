interface Props {
  column: string;
  sortBy: string | null;
  sortDirection: 'asc' | 'desc';
  handleSort: (columnName: string) => void;
}

export default function SortableTableHeader({
  column,
  sortBy,
  sortDirection,
  handleSort,
}: Props): React.JSX.Element {
  return (
    <th
      className={`cursor-pointer sm:p-4 ${column === 'generation' ? 'hidden sm:table-cell' : 'p-2'}`}
      onClick={() => handleSort(column)}
    >
      {`${column
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')}`}
      {sortBy === column && <>{sortDirection === 'desc' ? <>&darr;</> : <>&uarr;</>}</>}
    </th>
  );
}
