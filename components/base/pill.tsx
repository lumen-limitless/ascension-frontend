import React from "react";

interface PillProps {
  children: any;
  className: string;
}
export default function Pill({ children, className }: PillProps): JSX.Element {
  return <div className={`${className} p-1 m-1 rounded-xl`}>{children}</div>;
}
