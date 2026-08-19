import React from 'react'

/**
 * Full-viewport bookstore SVG background that matches the wireframe illustration:
 * deep teal/navy background, scattered books (open & closed), diamonds/squares,
 * golden swirl lines, orange accent circles.
 */
export default function BookstoreBackground() {
  return (
    <div className="pmt-bg" aria-hidden="true">
      <svg
        className="pmt-bg__svg"
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Base background */}
        <rect width="1200" height="700" fill="#0e2a3b" />

        {/* ── Subtle gradient overlay ── */}
        <defs>
          <radialGradient id="bg-glow" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#1a4060" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0e2a3b" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1200" height="700" fill="url(#bg-glow)" />

        {/* ─────────── TOP-LEFT: large closed book (orange/brown) ─────────── */}
        <g transform="translate(220,60) rotate(-8)">
          {/* Book body */}
          <rect x="0" y="0" width="140" height="180" rx="4" fill="#c75c1a" />
          <rect x="0" y="0" width="18" height="180" rx="3" fill="#a04010" />
          <rect x="18" y="0" width="122" height="180" rx="2" fill="#d96820" />
          {/* Cover lines */}
          <rect x="28" y="20" width="84" height="6" rx="2" fill="rgba(255,255,255,0.2)" />
          <rect x="28" y="34" width="60" height="4" rx="2" fill="rgba(255,255,255,0.12)" />
          {/* Red label */}
          <rect x="28" y="50" width="84" height="50" rx="3" fill="#922010" />
          <rect x="36" y="60" width="68" height="6" rx="1" fill="rgba(255,255,255,0.35)" />
          <rect x="42" y="72" width="52" height="4" rx="1" fill="rgba(255,255,255,0.2)" />
          {/* Pages edge */}
          <rect x="140" y="4" width="8" height="172" rx="1" fill="#e8d5b0" />
        </g>

        {/* ─────────── TOP-CENTER: tall teal book standing upright ────────── */}
        <g transform="translate(580,20) rotate(4)">
          <rect x="0" y="0" width="55" height="220" rx="3" fill="#1a6680" />
          <rect x="0" y="0" width="12" height="220" rx="2" fill="#124f62" />
          <rect x="12" y="0" width="43" height="220" rx="2" fill="#1e7a99" />
          <rect x="18" y="30" width="30" height="5" rx="1" fill="rgba(255,255,255,0.25)" />
          <rect x="18" y="42" width="22" height="3" rx="1" fill="rgba(255,255,255,0.15)" />
          {/* Pages */}
          <rect x="55" y="3" width="6" height="214" rx="1" fill="#e8d5b0" />
        </g>

        {/* ─────────── TOP-RIGHT: orange circle accent ───────────────────── */}
        <circle cx="980" cy="100" r="80" fill="#e05c15" opacity="0.7" />
        <circle cx="980" cy="100" r="55" fill="#c04010" opacity="0.5" />

        {/* ─────────── BOTTOM-LEFT: stack of books ───────────────────────── */}
        <g transform="translate(60,470)">
          {/* Bottom book (teal) */}
          <rect x="0" y="80" width="200" height="35" rx="3" fill="#1a6680" />
          <rect x="0" y="80" width="200" height="6" rx="2" fill="#124f62" />
          {/* Middle book (dark blue) */}
          <rect x="8" y="48" width="184" height="36" rx="3" fill="#1e3a4f" />
          <rect x="8" y="48" width="184" height="5" rx="2" fill="#152d3d" />
          {/* Top book (golden) */}
          <rect x="4" y="18" width="192" height="34" rx="3" fill="#b8892a" />
          <rect x="4" y="18" width="192" height="5" rx="2" fill="#9a7020" />
        </g>

        {/* ─────────── BOTTOM-CENTER: open book ──────────────────────────── */}
        <g transform="translate(540,520)">
          {/* Left page */}
          <path d="M0,0 C30,-15 90,-20 120,-5 L120,120 C90,105 30,100 0,115 Z"
            fill="#d4b878" />
          <line x1="20" y1="20" x2="100" y2="15" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
          <line x1="20" y1="32" x2="100" y2="27" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5" />
          <line x1="20" y1="44" x2="100" y2="39" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5" />
          <line x1="20" y1="56" x2="100" y2="51" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5" />
          {/* Spine */}
          <path d="M120,-5 L120,120" stroke="#a08040" strokeWidth="4" />
          {/* Right page */}
          <path d="M120,-5 C150,-20 210,-15 240,0 L240,115 C210,100 150,105 120,120 Z"
            fill="#c8aa60" />
          <line x1="140" y1="15" x2="220" y2="20" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
          <line x1="140" y1="27" x2="220" y2="32" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5" />
          <line x1="140" y1="39" x2="220" y2="44" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5" />
        </g>

        {/* ─────────── BOTTOM-RIGHT: golden swirl / wave ──────────────────── */}
        <g transform="translate(750,580)" opacity="0.6">
          <path d="M0,40 C40,-20 120,60 180,10 C240,-40 300,40 360,0"
            fill="none" stroke="#c8922a" strokeWidth="3" />
          <path d="M0,70 C40,10 120,90 180,40 C240,-10 300,70 360,30"
            fill="none" stroke="#c8922a" strokeWidth="2" opacity="0.5" />
        </g>

        {/* ─────────── LEFT-MID: golden curl decoration ───────────────────── */}
        <g transform="translate(100,320)" opacity="0.55">
          <path d="M0,0 C20,-40 80,-30 60,20 C40,70 100,80 80,120"
            fill="none" stroke="#d4a030" strokeWidth="3" />
        </g>

        {/* ─────────── SCATTERED DIAMONDS ─────────────────────────────────── */}
        {/* Top area */}
        <rect x="460" y="55"  width="14" height="14" rx="1" fill="#d4a030" transform="rotate(45,467,62)" opacity="0.8" />
        <rect x="740" y="80"  width="10" height="10" rx="1" fill="#d4a030" transform="rotate(45,745,85)" opacity="0.6" />
        <rect x="860" y="200" width="12" height="12" rx="1" fill="#d4a030" transform="rotate(45,866,206)" opacity="0.7" />
        <rect x="320" y="340" width="9"  height="9"  rx="1" fill="#d4a030" transform="rotate(45,324.5,344.5)" opacity="0.5" />
        <rect x="950" y="380" width="11" height="11" rx="1" fill="#d4a030" transform="rotate(45,955.5,385.5)" opacity="0.6" />
        <rect x="480" y="480" width="8"  height="8"  rx="1" fill="#d4a030" transform="rotate(45,484,484)" opacity="0.45" />
        <rect x="1060" y="280" width="13" height="13" rx="1" fill="#d4a030" transform="rotate(45,1066.5,286.5)" opacity="0.55" />

        {/* ─────────── SMALL ACCENT CIRCLES ───────────────────────────────── */}
        <circle cx="430" cy="300" r="8"  fill="#e05c15" opacity="0.5" />
        <circle cx="820" cy="450" r="10" fill="#c04010" opacity="0.4" />
        <circle cx="1100" cy="160" r="6"  fill="#d4a030" opacity="0.5" />
        <circle cx="150" cy="200" r="7"  fill="#e05c15" opacity="0.35" />

        {/* ─────────── RIGHT: second tall book ─────────────────────────────── */}
        <g transform="translate(1050,380) rotate(-5)">
          <rect x="0" y="0" width="45" height="160" rx="3" fill="#1a4f6a" />
          <rect x="0" y="0" width="10" height="160" rx="2" fill="#12394d" />
          <rect x="10" y="0" width="35" height="160" rx="2" fill="#1e6080" />
          <rect x="15" y="22" width="24" height="4" rx="1" fill="rgba(255,255,255,0.2)" />
          <rect x="15" y="32" width="18" height="3" rx="1" fill="rgba(255,255,255,0.12)" />
          <rect x="45" y="2" width="5" height="156" rx="1" fill="#e8d5b0" />
        </g>
      </svg>
    </div>
  )
}
