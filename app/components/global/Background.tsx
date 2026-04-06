export default function Background() {
  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* OriginS blue — top left */}
      <div
        className="blob h-[600px] w-[600px]"
        style={{
          backgroundColor: '#4C90BF',
          top: '-150px',
          left: '-150px',
          animation: 'drift1 12s ease-in-out infinite',
        }}
      />
      {/* Invaders QUEST purple — top right */}
      <div
        className="blob h-[550px] w-[550px]"
        style={{
          backgroundColor: '#9371BD',
          top: '-100px',
          right: '-150px',
          animation: 'drift2 16s ease-in-out infinite',
        }}
      />
      {/* KALEiDO red — bottom right */}
      <div
        className="blob h-[500px] w-[500px]"
        style={{
          backgroundColor: '#C45254',
          bottom: '-120px',
          right: '-100px',
          animation: 'drift3 10s ease-in-out infinite',
        }}
      />
      {/* Saga gold — bottom left */}
      <div
        className="blob h-[520px] w-[520px]"
        style={{
          backgroundColor: '#D4A843',
          bottom: '-130px',
          left: '-120px',
          animation: 'drift4 14s ease-in-out infinite',
        }}
      />
    </div>
  );
}
