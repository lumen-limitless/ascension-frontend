import React from "react";

interface AppProps {
  color: string;
  onClick: () => any;
  children: string;
}

export default function Button({ color, onClick, children }: AppProps): JSX.Element {
  return (
    <button
      className={`p-1 m-1 rounded opacity-80 hover:opacity-100 ${color}  max-h-8 max-w-32`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
