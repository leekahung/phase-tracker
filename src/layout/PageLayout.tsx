import ChevronUpSVG from "../assets/ChevronUpSVG";
import Navbar from "../global/Navbar/Navbar";

interface Props {
  children: React.JSX.Element;
}

export default function PageLayout({ children }: Props): React.JSX.Element {
  return (
    <div>
      <div>
        <header>
          <Navbar />
          {/* navbar section */}
        </header>
        <main>{children}</main>
        <footer className="absolute">
          <div className="flex h-10 items-center justify-center">
            {/* copyright section */}
          </div>
        </footer>
      </div>
      <button
        className={`fixed bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-slate-700`}
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}
        type="button"
      >
        <ChevronUpSVG />
      </button>
    </div>
  );
}
