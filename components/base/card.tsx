import React from "react";

interface AppProps {
  children: any;
  w: string;
  h: string;
  color: string;
}

export default function Card({ children, w, h, color }: AppProps): JSX.Element {
  return (
    <div
      className={`${color} rounded p-4 h-${h} w-${w} max-w-xl shadow-xl flex flex-col  items-center`}
    >
      {children}
    </div>
  );
}
