export default function TableLoading(): React.JSX.Element {
  return (
    <tr className="h-[calc(100vh-80px-250px)]">
      <td colSpan={6}>
        <div className="flex items-center justify-center">
          Fetching Data...
          <span className="loading loading-ring loading-lg" />
        </div>
      </td>
    </tr>
  );
}
