import React from "react";
import Header from "./header";

export default function Layout({ children }: any) {
  return (
    <>
      <div className="flex h-screen w-screen bg-gray-900 text-white">
        <main className="flex flex-col h-screen w-screen">
          <Header />
          <div className="h-full">{children}</div>
        </main>
      </div>
    </>
  );
}
