interface Props {
  small?: boolean;
}

export default function TableLoading({ small }: Props): React.JSX.Element {
  return (
    <tr className={`${small ? 'h-[calc(100vh-80px-250px-250px)]' : 'h-[calc(100vh-80px-250px)]'}`}>
      <td colSpan={6}>
        <div className="flex items-center justify-center">
          Fetching Data...
          <span className="loading loading-ring loading-lg" />
        </div>
      </td>
    </tr>
  );
}
