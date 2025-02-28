export default function LoadingCardTable(): React.JSX.Element {
  return (
    <tr className="h-[320px] sm:h-[350px]">
      <td colSpan={6}>
        <div className="flex items-center justify-center">
          Fetching Data...
          <span className="loading loading-ring loading-lg" />
        </div>
      </td>
    </tr>
  );
}
