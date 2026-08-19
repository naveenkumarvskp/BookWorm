import React from 'react'

/**
 * Green circular success icon with a white SVG checkmark.
 * Matches the wireframe's top-of-modal green ✓ badge.
 */
export default function SuccessIcon() {
  return (
    <div
      className="success-icon"
      role="img"
      aria-label="Order placed successfully"
    >
      <svg
        viewBox="0 0 24 24"
        className="success-icon__check"
        aria-hidden="true"
        fill="none"
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
  )
}
