export default function Modal({ children }: any) {
  return (
    <div
      className={`flex items-center justify-center fixed z-50 left-0 top-0 w-full h-full bg-black opacity-90`}
    >
      {children}
    </div>
  );
}
