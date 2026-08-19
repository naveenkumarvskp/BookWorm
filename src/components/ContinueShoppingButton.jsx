import React from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Blue "Continue your Shopping" button that returns to the catalogue.
 * Matches the wireframe's compact primary CTA button at the bottom of the
 * Order Success modal.
 */
export default function ContinueShoppingButton() {
  const navigate = useNavigate()

  return (
    <button
      type="button"
      className="continue-btn"
      onClick={() => navigate('/')}
      aria-label="Continue your shopping — return to the book catalogue"
    >
      Continue your Shopping
      {/* Bag / shopping icon matching wireframe */}
      <svg
        viewBox="0 0 24 24"
        width="14"
        height="14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="continue-btn__icon"
      >
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    </button>
  )
}
