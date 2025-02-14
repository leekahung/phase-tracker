export default function TableError(): React.JSX.Element {
  return (
    <tr className="h-[calc(100vh-80px-250px)]">
      <td colSpan={6}>
        <em>Error: Unable to fetch data...</em>
      </td>
    </tr>
  );
}
