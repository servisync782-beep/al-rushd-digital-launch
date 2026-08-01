import React from "react";

export default function FullLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 600 260"
      role="img"
      aria-label="Al Rushd International Company logo"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="goldGrad" x1="0" x2="1">
          <stop offset="0" stopColor="#d7b24a" />
          <stop offset="1" stopColor="#b8862b" />
        </linearGradient>
        <linearGradient id="blueGrad" x1="0" x2="1">
          <stop offset="0" stopColor="#0d4b84" />
          <stop offset="1" stopColor="#1b5aa6" />
        </linearGradient>
        <filter id="emboss" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15"/>
        </filter>
      </defs>

      {/* Monogram */}
      <g transform="translate(150,20)" filter="url(#emboss)">
        {/* A (blue) */}
        <path
          d="M60 0 L110 104 L10 104 Z"
          fill="url(#blueGrad)"
          stroke="rgba(0,0,0,0.06)"
          strokeWidth="1"
        />
        {/* inner cut of A */}
        <path d="M60 28 L82 74 L38 74 Z" fill="#fff" opacity="0.06" />
        {/* R (gold) */}
        <path
          d="M140 6 L186 6 C206 6 220 20 220 40 C220 56 210 66 198 72 L220 104 L190 104 L170 80 L150 104 L120 104 L140 6 Z"
          fill="url(#goldGrad)"
        />
        {/* swoosh */}
        <path d="M0 120 C120 80 260 80 380 120" fill="none" stroke="url(#goldGrad)" strokeWidth="8" strokeLinecap="round" />
      </g>

      {/* Text lockup */}
      <g transform="translate(0,150)">
        <text
          x="300"
          y="36"
          textAnchor="middle"
          fontFamily="Space Grotesk, DM Sans, Arial, sans-serif"
          fontWeight={700}
          fontSize={40}
          fill="url(#blueGrad)"
        >
          AL RUSHD
        </text>

        <g transform="translate(150,62)">
          <rect x="0" y="-10" width="300" height="2" fill="url(#goldGrad)" />
          <text
            x="150"
            y="28"
            textAnchor="middle"
            fontFamily="DM Sans, Arial, sans-serif"
            fontWeight={600}
            fontSize={18}
            fill="url(#goldGrad)"
            letterSpacing={1}
          >
            INTERNATIONAL COMPANY
          </text>
        </g>

        <text
          x="300"
          y="110"
          textAnchor="middle"
          fontFamily="DM Sans, Arial, sans-serif"
          fontWeight={500}
          fontSize={20}
          fill="#0d4b84"
        >
          Beyond Expectations
        </text>
      </g>
    </svg>
  );
}
