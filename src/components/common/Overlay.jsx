export default function Overlay({ children }) {
  return (
    <>
      <div className={`overlay animation-fade-in`}>
        {children}
      </div>
    </>
  );
}
