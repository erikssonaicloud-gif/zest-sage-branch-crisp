export function DeltaMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="nd" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="100%" stopColor="#eef0f4" />
        </linearGradient>
      </defs>
      <path
        d="M12 3.2 21.2 20.2H2.8L12 3.2Z"
        fill="none"
        stroke="url(#nd)"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M12 8.4 17.2 17.6H6.8L12 8.4Z" fill="none" stroke="#7dd3fc" strokeWidth="1" opacity="0.7" />
      <circle cx="12" cy="14.6" r="1.15" fill="#7dd3fc" />
    </svg>
  );
}
