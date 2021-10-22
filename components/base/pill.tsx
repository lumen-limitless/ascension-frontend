import React from "react";

export interface PillProps {
  children?: any;
  className?: string;
  onClick?: () => void;
}
export default function Pill({ children, className, onClick }: PillProps): JSX.Element {
  return (
    <button onClick={onClick} className={`${className} p-1 m-1 rounded-full `}>
      {children}
    </button>
  );
}
