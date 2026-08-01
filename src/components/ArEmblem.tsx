import React from "react";

export default function ArEmblem({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      role="img"
      aria-label="Al Rushd emblem"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="ar-grad" x1="0" x2="1">
          <stop offset="0" stopColor="#f5a623" />
          <stop offset="1" stopColor="#ffb84d" />
        </linearGradient>
      </defs>
      <polygon points="60,6 110,30 110,90 60,114 10,90 10,30" fill="url(#ar-grad)" />
      <text
        x="50%"
        y="60%"
        textAnchor="middle"
        fontFamily="Space Grotesk, sans-serif"
        fontWeight={700}
        fontSize={34}
        fill="#fff"
        style={{ dominantBaseline: "middle" as const }}
      >
        AR
      </text>
    </svg>
  );
}
