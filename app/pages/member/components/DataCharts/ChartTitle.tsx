interface Props {
  title: string;
  children?: React.ReactNode;
}

export default function ChartTitle({ title, children }: Props) {
  return (
    <div className="relative flex flex-col items-center">
      <h2 className="text-lg sm:text-2xl">{title}</h2>
      {children}
      <em className="text-sm">(Last 14 days)</em>
    </div>
  );
}
