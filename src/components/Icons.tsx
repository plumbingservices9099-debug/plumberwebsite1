export function TrophyStatIcon() {
  return (
    <svg viewBox="0 0 36 36" className="w-8 h-8 mx-auto" fill="none" aria-hidden="true">
      <path d="M11 6h14v9c0 4.4-3.1 8-7 8s-7-3.6-7-8V6Z" fill="#D99B26" />
      <path d="M11 8H7.5c-.8 0-1.5.7-1.5 1.5v2c0 2.5 2 4.5 4.5 4.5H11" stroke="#C68617" strokeWidth="2" />
      <path d="M25 8h3.5c.8 0 1.5.7 1.5 1.5v2c0 2.5-2 4.5-4.5 4.5H25" stroke="#C68617" strokeWidth="2" />
      <path d="M18 23v5" stroke="#B67812" strokeWidth="3" />
      <rect x="12" y="28" width="12" height="3.5" rx="1.5" fill="#9A6008" />
    </svg>
  );
}

export function CustomersStatIcon() {
  return (
    <svg viewBox="0 0 36 36" className="w-8 h-8 mx-auto" fill="none" aria-hidden="true">
      <circle cx="14" cy="13" r="4.2" fill="#4E6C8E" />
      <path d="M6.5 27c0-3.9 3.3-6.5 7.5-6.5s7.5 2.6 7.5 6.5" fill="#4E6C8E" />
      <circle cx="23.5" cy="14" r="3.4" fill="#6D86A3" />
      <path d="M20.5 27c.3-3 2.5-5.2 5.7-5.2 2.9 0 5.3 2 5.3 5.2" fill="#6D86A3" />
    </svg>
  );
}

export function ToolsStatIcon() {
  return (
    <svg viewBox="0 0 36 36" className="w-8 h-8 mx-auto" fill="none" aria-hidden="true">
      <path d="M8.5 27.5 22 14l2.5 2.5-13.5 13.5-2.5-2.5Z" fill="#7D8590" />
      <path d="M21 10.5c1.5-2 4.5-2.4 6.5-1.1l-2.6 2.6 2 2 2.6-2.6c1.3 2 .9 5-1.1 6.5-1.8 1.3-4.2 1.1-5.8-.3l-1.9-1.9c-1.1-1.6-1.3-3.7.3-5.2Z" fill="#646D78" />
      <path d="M10 11.5 25.5 27l-2 2L8 13.5l2-2Z" fill="#8E96A0" />
      <path d="M7.5 14 14 7.5l3 3-6.5 6.5-3-3Z" fill="#59626D" />
    </svg>
  );
}

export function ClockStatIcon() {
  return (
    <svg viewBox="0 0 36 36" className="w-8 h-8 mx-auto" fill="none" aria-hidden="true">
      <circle cx="18" cy="18" r="12" fill="#ECEFF1" stroke="#A6B0B9" strokeWidth="2.5" />
      <path d="M18 11v7.5l5 3" stroke="#475569" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WhyIcon({ type }: { type: 'experienced' | 'workmanship' | 'support' | 'satisfaction' }) {
  return (
    <div className="w-10 h-10 rounded-full bg-[#1C6ED5] text-white flex items-center justify-center mx-auto mb-4 shadow-sm">
      {type === 'experienced' && (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      )}
      {type === 'workmanship' && (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9" />
          <path d="M17.64 15 22 10.64" />
          <path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91" />
        </svg>
      )}
      {type === 'support' && (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
          <rect x="6" y="7" width="12" height="10" rx="2" fill="#EF4444" />
          <path d="M7 9.5C8.5 8 15.5 8 17 9.5" stroke="#FCA5A5" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="12" cy="13" r="2" fill="#FEE2E2" />
        </svg>
      )}
      {type === 'satisfaction' && (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </div>
  );
}

export function PlumberMascotSvg({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 130 160"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Shoulders / Cyan shirt */}
      <path
        d="M12 142 C12 114 34 102 65 102 C96 102 118 114 118 142 L118 147 L12 147 Z"
        fill="#7AD2D2"
        stroke="#223540"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
      {/* Neck */}
      <path
        d="M52 88 L52 103 C52 109 78 109 78 103 L78 88"
        fill="#FFFFFF"
        stroke="#223540"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
      {/* Shirt collar */}
      <path
        d="M46 101 C50 112 80 112 84 101"
        stroke="#223540"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      {/* Overalls */}
      <path
        d="M36 105 L44 105 L44 122 L86 122 L86 105 L94 105 L94 156 L36 156 Z"
        fill="#223540"
        stroke="#223540"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Face */}
      <path
        d="M43 52 C43 75 51 92 65 92 C79 92 87 75 87 52 Z"
        fill="#FFFFFF"
        stroke="#223540"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
      {/* Hard hat dome */}
      <path
        d="M35 45 C35 23 48 12 65 12 C82 12 95 23 95 45 Z"
        fill="#FFD447"
        stroke="#223540"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
      {/* Hat ridges */}
      <path d="M56 15 L53 43" stroke="#223540" strokeWidth="4" strokeLinecap="round" />
      <path d="M74 15 L77 43" stroke="#223540" strokeWidth="4" strokeLinecap="round" />
      {/* Hat brim */}
      <path
        d="M27 50 C36 41 94 41 103 50 C105 53 102 56 97 56 C78 53 52 53 33 56 C28 56 25 53 27 50 Z"
        fill="#FFD447"
        stroke="#223540"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WhatsAppLogoIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.49 0 .14 5.35.14 11.92c0 2.1.55 4.15 1.59 5.96L0 24l6.29-1.65a11.88 11.88 0 0 0 5.77 1.47h.01c6.57 0 11.93-5.35 11.93-11.92 0-3.18-1.24-6.17-3.48-8.42ZM12.07 21.8h-.01a9.87 9.87 0 0 1-5.04-1.38l-.36-.21-3.73.98 1-3.64-.24-.37a9.85 9.85 0 0 1-1.52-5.26c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.13 1.03 6.99 2.9a9.83 9.83 0 0 1 2.9 7c0 5.45-4.44 9.87-9.89 9.87Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.08-.79.37-.27.3-1.04 1.01-1.04 2.47s1.07 2.86 1.21 3.06c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.88.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}
