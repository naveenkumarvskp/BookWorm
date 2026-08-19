import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import BookstoreBackground from '../components/BookstoreBackground'
import PaymentContainer    from '../components/PaymentContainer'

/**
 * Full-screen payment page at /payment.
 *
 * Amount is sourced (in priority order) from:
 * 1. location.state.totalAmount  — passed by CheckoutPage OrderSummary
 * 2. location.state.total        — alt key
 * 3. cartTotal + 12% tax         — live cart fallback
 */
export default function PaymentPage() {
  const location  = useLocation()
  const { cartTotal, cart } = useStore()

  const stateAmount = location.state?.totalAmount ?? location.state?.total ?? null
  const tax         = Math.round(cartTotal * 0.12)
  const amount      = stateAmount ?? (cartTotal + tax)
  const orderId     = location.state?.orderId ?? null
  const addressData = location.state?.addressData ?? {}
  const couponDiscount = location.state?.couponDiscount ?? 0
  const giftDiscount   = location.state?.giftDiscount ?? 0
  const delivery       = location.state?.delivery ?? 0

  if (cart.length === 0 && !orderId) {
    return (
      <main className="main-content" id="main-content">
        <div className="empty-state">
          <div className="empty-state__icon">🛒</div>
          <p className="empty-state__title">Nothing to pay for</p>
          <p className="empty-state__sub">Your cart is empty. Browse books first.</p>
          <Link to="/" className="btn btn-primary" style={{ marginTop: 16 }}>
            Browse Books
          </Link>
        </div>
      </main>
    )
  }

  return (
    <div className="pmt-page" id="main-content">
      {/* Full-viewport bookstore illustration */}
      <BookstoreBackground />

      {/* Centered payment modal overlay */}
      <div className="pmt-page__overlay">
        <PaymentContainer
          amount={amount}
          orderId={orderId}
          addressData={addressData}
          couponDiscount={couponDiscount}
          giftDiscount={giftDiscount}
          delivery={delivery}
        />
      </div>
    </div>
  )
}
