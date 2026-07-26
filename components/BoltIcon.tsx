export function BoltIcon({ size = 26 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ filter: "drop-shadow(0 0 8px rgba(120,200,255,.75))" }}
    >
      <defs>
        <linearGradient id="boltIconGrad" x1="20%" y1="0%" x2="78%" y2="100%">
          <stop offset="0%" stopColor="#eaf5ff" />
          <stop offset="24%" stopColor="#a4cffc" />
          <stop offset="52%" stopColor="#4d9bfb" />
          <stop offset="78%" stopColor="#1e5fd0" />
          <stop offset="100%" stopColor="#123f9e" />
        </linearGradient>
      </defs>
      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#boltIconGrad)" />
    </svg>
  );
}
