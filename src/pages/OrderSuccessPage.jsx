import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import BookstoreBackground from '../components/BookstoreBackground'
import PurchaseConfirmation from '../components/PurchaseConfirmation'

/**
 * /order-success — wireframe-accurate Order Success screen.
 *
 * Layout:
 *   ┌── fixed Header (reused) ──────────────────────┐
 *   │                                               │
 *   │  BookstoreBackground (full-viewport SVG)      │
 *   │                                               │
 *   │     ┌── PurchaseConfirmation modal ──┐        │
 *   │     │  ✓ green icon                 │        │
 *   │     │  "Your purchase of the …"     │        │
 *   │     │  [Book 1]  [Book 2]           │        │
 *   │     │  [Continue your Shopping]     │        │
 *   │     └───────────────────────────────┘        │
 *   │                                               │
 *   └── Footer (reused) ────────────────────────────┘
 *
 * Order source (priority):
 *   1. location.state.orderId  → look up from context orders[]
 *   2. orders[0]               → most-recently placed order
 */
export default function OrderSuccessPage() {
  const location = useLocation()
  const { orders } = useStore()

  // Resolve the correct order ─────────────────────────────────────────────────
  const stateOrderId = location.state?.orderId ?? null
  const order = stateOrderId
    ? (orders.find(o => o.id === stateOrderId) ?? orders[0] ?? null)
    : (orders[0] ?? null)

  const orderId = order?.id ?? stateOrderId ?? null
  const items   = order?.items ?? []

  // Guard: nothing to show (navigated here directly without a purchase) ────────
  if (!order && items.length === 0) {
    return (
      <main className="main-content" id="main-content">
        <div className="empty-state">
          <div className="empty-state__icon">📦</div>
          <p className="empty-state__title">No recent order found</p>
          <p className="empty-state__sub">Complete a purchase to see your confirmation here.</p>
          <Link to="/" className="btn btn-primary" style={{ marginTop: 16 }}>
            Browse Books
          </Link>
        </div>
      </main>
    )
  }

  return (
    /*
     * .os-page shares the same full-viewport structure as .pmt-page
     * (both use BookstoreBackground + a centred overlay).
     */
    <div className="os-page" id="main-content">
      {/* Full-viewport bookstore illustration — reused from Payment page */}
      <BookstoreBackground />

      {/* Centred modal overlay */}
      <div className="os-page__overlay">
        <PurchaseConfirmation items={items} orderId={orderId} />
      </div>
    </div>
  )
}
