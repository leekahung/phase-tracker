interface Props {
  title: string;
  children: React.ReactNode;
}

export default function AboutSection({ title, children }: Props) {
  return (
    <div className="flex w-[95%] flex-col gap-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      {children}
    </div>
  );
}
