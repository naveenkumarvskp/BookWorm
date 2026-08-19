import React from 'react'
import SuccessIcon from './SuccessIcon'
import PurchasedProductCard from './PurchasedProductCard'
import ContinueShoppingButton from './ContinueShoppingButton'

/**
 * The dark centered confirmation panel rendered over the bookstore background.
 * Wireframe structure:
 *   ✓ (green icon)
 *   "Your purchase of the following reads is successful"
 *   [Book cards — horizontal on desktop, stacked on mobile]
 *   [Continue your Shopping]
 *
 * Props:
 *   items  — array of order items (from the placed order)
 *   orderId — string, shown as a sub-label for screen readers / accessibility
 */
export default function PurchaseConfirmation({ items = [], orderId }) {
  return (
    <div
      className="pc-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pc-heading"
      aria-describedby="pc-desc"
    >
      {/* ── Success icon ──────────────────────────────────────────── */}
      <div className="pc-modal__icon-row">
        <SuccessIcon />
      </div>

      {/* ── Confirmation heading ──────────────────────────────────── */}
      <div className="pc-modal__heading-block">
        <p
          id="pc-heading"
          className="pc-modal__heading"
          aria-live="polite"
          aria-atomic="true"
        >
          Your purchase of the following reads is successful
        </p>
        {orderId && (
          <p id="pc-desc" className="pc-modal__order-id">
            Order <strong>{orderId}</strong>
          </p>
        )}
      </div>

      {/* ── Purchased book cards ──────────────────────────────────── */}
      {items.length > 0 && (
        <div
          className="pc-modal__books"
          aria-label="Purchased books"
        >
          {items.map((item, idx) => (
            <PurchasedProductCard key={`${item.id}-${idx}`} item={item} />
          ))}
        </div>
      )}

      {/* ── CTA button ────────────────────────────────────────────── */}
      <div className="pc-modal__cta">
        <ContinueShoppingButton />
      </div>
    </div>
  )
}
