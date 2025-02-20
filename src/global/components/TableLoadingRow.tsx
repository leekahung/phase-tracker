export default function TableLoadingRow(): React.JSX.Element {
  return (
    <tr className="border-b border-slate-300 last:border-b-0">
      <td className="hidden sm:table-cell sm:p-4">
        <div className="mx-auto h-[60px] w-[60px] animate-pulse rounded-full bg-slate-700" />
      </td>
      <td className="p-2 sm:p-4">
        <div className="mx-auto mb-2 h-[60px] w-[60px] animate-pulse rounded-full bg-slate-700 sm:hidden" />
        <div className="mx-auto h-4 w-[100px] animate-pulse rounded-full bg-slate-700" />
      </td>
      <td className="hidden sm:table-cell sm:p-4">
        <div className="mx-auto h-4 w-[100px] animate-pulse rounded-full bg-slate-700" />
      </td>
      <td className="p-2 sm:p-4">
        <div className="mx-auto h-4 w-[100px] animate-pulse rounded-full bg-slate-700" />
      </td>
      <td className="p-2 sm:p-4">
        <div className="mx-auto h-4 w-[100px] animate-pulse rounded-full bg-slate-700" />
      </td>
    </tr>
  );
}
