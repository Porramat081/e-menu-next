export default function Loader({ isPage }: { isPage?: boolean }) {
  return (
    <>
      {isPage ? (
        <div className="w-10 h-10 border-2 border-white border-b-blue-400 rounded-full box-border animate-spin"></div>
      ) : (
        <div className="w-3.5 h-3.5 border-2 border-white border-b-blue-400 rounded-full box-border animate-spin"></div>
      )}
    </>
  );
}
