import React, { useState } from "react";
import Connection from "./connection";
import Nav from "./nav";
import MobileNav from "./mobilenav";

export default function Header() {
  const [extend, setExtend] = useState<boolean>(false);

  function viewMobileNav() {
    setExtend(!extend);
  }

  return (
    <header className=" text-white flex flex-col w-full px-4 py-1 justify-between items-center shadow-xl fixed">
      <div className="w-full h-full flex  items-center">
        <button onClick={viewMobileNav} className="px-2 md:hidden">
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

        <svg
          id="Vrstva_1"
          data-name="Vrstva 1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 754 754"
          height="32px"
          width="32px"
        >
          <defs>
            <style
              dangerouslySetInnerHTML={{
                __html:
                  ".cls-1{fill:url(#Nepojmenovaný_přechod_43);}.cls-2{fill:url(#Nepojmenovaný_přechod_19);}.cls-3{fill:url(#Nepojmenovaný_přechod_148);}.cls-4{fill:url(#Nepojmenovaný_přechod_23);}.cls-5{fill:url(#Nepojmenovaný_přechod_72);}.cls-6{fill:url(#Nepojmenovaný_přechod_60);}",
              }}
            />
            <linearGradient
              id="Nepojmenovaný_přechod_43"
              x1="381.41"
              y1="309.22"
              x2="368.29"
              y2="162.13"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.23" stopColor="#943259" />
              <stop offset="0.34" stopColor="#793070" />
              <stop offset="0.47" stopColor="#612e85" />
              <stop offset="0.59" stopColor="#522c92" />
              <stop offset="0.69" stopColor="#4d2c96" />
            </linearGradient>
            <linearGradient
              id="Nepojmenovaný_přechod_19"
              x1="-23.15"
              y1="132.68"
              x2="542.51"
              y2="127.73"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.05" stopColor="#fcb503" />
              <stop offset="0.14" stopColor="#fcb103" />
              <stop offset="0.85" stopColor="#f73f01" />
            </linearGradient>
            <linearGradient
              id="Nepojmenovaný_přechod_148"
              x1="223.95"
              y1="53.09"
              x2="-59.61"
              y2="1133.33"
              gradientTransform="matrix(-1, 0, 0, 1, 601.87, -135)"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.14" stopColor="#fcb103" />
              <stop offset="0.16" stopColor="#fcb503" />
              <stop offset="0.67" stopColor="#f73f01" />
            </linearGradient>
            <linearGradient
              id="Nepojmenovaný_přechod_23"
              x1="375.15"
              y1="255.93"
              x2="387.29"
              y2="793.97"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset={0} stopColor="#943259" />
              <stop offset="0.13" stopColor="#f73f01" />
              <stop offset="0.18" stopColor="#f96902" />
              <stop offset="0.23" stopColor="#fa8a02" />
              <stop offset="0.28" stopColor="#fba203" />
              <stop offset="0.33" stopColor="#fcb003" />
              <stop offset="0.37" stopColor="#fcb503" />
            </linearGradient>
            <linearGradient
              id="Nepojmenovaný_přechod_72"
              x1="730.17"
              y1="506.13"
              x2="-409.03"
              y2="607.24"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.11" stopColor="#2d1a62" />
              <stop offset="0.12" stopColor="#2e1a63" />
              <stop offset="0.55" stopColor="#442788" />
              <stop offset="0.78" stopColor="#4d2c96" />
            </linearGradient>
            <linearGradient
              id="Nepojmenovaný_přechod_60"
              x1="137.49"
              y1="653.89"
              x2="971.4"
              y2="385.62"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset={0} stopColor="#4d2c96" />
              <stop offset="0.57" stopColor="#943259" />
            </linearGradient>
          </defs>
          <polygon className="cls-1" points="542.48 259.8 211.52 259.8 377 199.82 542.48 259.8" />
          <polygon className="cls-2" points="377 199.82 377 0 211.52 259.8 377 199.82" />
          <polygon className="cls-3" points="377 199.82 377 0 542.48 259.8 377 199.82" />
          <polygon
            className="cls-4"
            points="593.71 340.17 160.39 340.17 377 399.68 593.71 340.17"
          />
          <polygon className="cls-5" points="0 591.6 377 754 377 399.68 160.39 340.17 0 591.6" />
          <polygon
            className="cls-6"
            points="754 591.6 377 754 377 399.68 593.71 340.17 754 591.6"
          />
        </svg>
        <Nav />
        <div className="flex ml-auto">
          <Connection />
        </div>
      </div>

      {extend ? <MobileNav /> : null}
    </header>
  );
}
