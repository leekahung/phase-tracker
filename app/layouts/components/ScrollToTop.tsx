import ChevronUpSVG from '~/components/icons/ChevronUpSVG';

interface Props {
  showButton: boolean;
  setShowButton: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ScrollToTopButton({ showButton, setShowButton }: Props) {
  return (
    <button
      className={`fixed right-4 bottom-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-slate-200 text-slate-700 transition sm:h-12 sm:w-12 ${
        showButton ? '-translate-y-4 opacity-100' : 'pointer-events-none opacity-0'
      }`}
      onClick={() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        setShowButton(false);
      }}
      type="button"
    >
      <ChevronUpSVG />
      <span className="sr-only">scroll to top</span>
    </button>
  );
}
