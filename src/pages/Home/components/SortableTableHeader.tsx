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
    <th className="cursor-pointer" onClick={() => handleSort(column)}>
      {`${column
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')} `}
      {sortBy === column && sortDirection === 'desc' ? <>&darr;</> : <>&uarr;</>}
    </th>
  );
}
