import React from "react";

interface AppProps {
  children?: any;
  className?: string;
}

export default function Card({ children, className }: AppProps): JSX.Element {
  return (
    <div
      className={` rounded p-4 w-full max-w-xl shadow-xl flex flex-col items-center ${className}`}
    >
      {children}
    </div>
  );
}
