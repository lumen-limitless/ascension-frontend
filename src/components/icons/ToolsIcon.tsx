import React from 'react'

const ToolsIcon = (props: JSX.IntrinsicElements['svg']) => {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="100" cy="100" r="100" fill="url(#paint0_linear_216_28)" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M90.9049 111.257C76.2258 117.764 58.4322 115.001 46.3984 102.967C34.3647 90.9332 31.6012 73.1396 38.1081 58.4605L64.5065 84.8589L85.2893 64.0761L59.061 37.8478C73.6225 31.6781 91.0969 34.5283 102.967 46.3984C114.837 58.2685 117.687 75.7429 111.518 90.3044L161.657 140.444L140.874 161.226L90.9049 111.257Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_216_28"
          x1="236"
          y1="43"
          x2="4.44651e-06"
          y2="165"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EE502F" />
          <stop offset="1" stopColor="#943259" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default ToolsIcon
