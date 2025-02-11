interface Props {
  children: React.JSX.Element;
}

export default function PageLayout({ children }: Props): React.JSX.Element {
  return (
    <div className="">
      <header>
        <div className="h-20" />
        {/* navbar section */}
      </header>
      <main>{children}</main>
      <footer>
        <div className="flex items-center justify-center h-10">
          {/* copyright section */}
        </div>
      </footer>
    </div>
  );
}
