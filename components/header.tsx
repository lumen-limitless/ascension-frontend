import React, { useState, useRef } from "react";
import Connection from "./connection";
import Nav from "./nav";
import Modal from "./base/modal";
import Logo from "./svg/logo";
import { useClickAway } from "react-use";
import Exit from "./svg/exit";

export default function Header() {
  const [extend, setExtend] = useState<boolean>(false);
  const ref = useRef(null);
  useClickAway(ref, () => {
    setExtend(false);
  });
  function viewMobileNav() {
    setExtend(!extend);
  }

  return (
    <header className=" text-white flex flex-col w-full px-4 py-1 justify-between items-center shadow-xl">
      <div className="w-full h-full flex  items-center">
        <button onClick={viewMobileNav} className={`px-2 md:hidden`}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"
            color="#253449"
            aria-hidden="true"
          >
            <path d="M1.31738 6.05078H17.6826C18.21 6.05078 18.6143 5.62012 18.6143 5.10156C18.6143 4.57422 18.21 4.15234 17.6826 4.15234H1.31738C0.798828 4.15234 0.385742 4.58301 0.385742 5.10156C0.385742 5.61133 0.798828 6.05078 1.31738 6.05078ZM3.11035 10.6035H15.916C16.4434 10.6035 16.8477 10.1641 16.8477 9.6543C16.8477 9.12695 16.4434 8.70508 15.916 8.70508H3.11035C2.5918 8.70508 2.17871 9.13574 2.17871 9.6543C2.17871 10.1641 2.5918 10.6035 3.11035 10.6035ZM4.87695 15.1562H14.1494C14.6768 15.1562 15.0811 14.7168 15.0811 14.207C15.0811 13.6797 14.6768 13.249 14.1494 13.249H4.87695C4.3584 13.249 3.94531 13.6885 3.94531 14.207C3.94531 14.708 4.3584 15.1562 4.87695 15.1562Z"></path>
          </svg>
        </button>
        <Logo />
        <Nav />
        <div className="flex ml-auto ">
          <Connection />
        </div>
      </div>
      {extend ? (
        <>
          <Modal>
            <button className="absolute top-0 left-0 p-4" onClick={() => setExtend(false)}>
              <Exit />
            </button>
            <div className="h-2/3" ref={ref}>
              <Nav isMobile={true} />
            </div>
          </Modal>
        </>
      ) : null}
    </header>
  );
}
