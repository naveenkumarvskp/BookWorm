import React from 'react'
import CouponInput from './CouponInput'

/**
 * Right-side "Grand Total" summary panel — matches the wireframe exactly.
 * Shows: Price, Tax, Delivery, Coupon row, Discount, Total Amount, Pay Now button.
 *
 * Props:
 *  subtotal, tax, delivery, couponDiscount, giftDiscount
 *  appliedCoupon, onApplyCode
 *  onPayNow, payLabel
 */
export default function OrderSummary({
  subtotal,
  tax,
  delivery,
  couponDiscount,
  giftDiscount,
  appliedCoupon,
  onApplyCode,
  onPayNow,
  payLabel,
  itemCount,
}) {
  const totalDiscount = couponDiscount + giftDiscount
  const total = Math.max(0, subtotal + tax + delivery - totalDiscount)

  return (
    <aside className="os-panel" aria-label="Grand Total">
      <h2 className="os-panel__heading">Grand Total</h2>

      <div className="os-panel__rows">
        <div className="os-row">
          <span>Price ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="os-row">
          <span>Tax</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>
        <div className="os-row">
          <span>Delivery Charges</span>
          <span className="os-free">
            {delivery === 0 ? 'Free' : `₹${delivery}`}
          </span>
        </div>
      </div>

      {/* Coupon */}
      <div className="os-divider" />
      <CouponInput
        appliedCoupon={appliedCoupon}
        onApply={onApplyCode}
        subtotal={subtotal}
      />

      {/* Discount */}
      {totalDiscount > 0 && (
        <>
          <div className="os-divider" />
          <div className="os-row os-row--discount">
            <span>Discount</span>
            <span className="os-discount-val">−₹{totalDiscount}</span>
          </div>
        </>
      )}

      <div className="os-divider" />
      <div className="os-row os-row--total">
        <span>Total Amount</span>
        <span className="os-total-val">₹{total}</span>
      </div>

      <button
        type="button"
        className="btn os-pay-btn"
        onClick={onPayNow}
        aria-label={`Pay now — ₹${total}`}
      >
        {payLabel || `Pay Now`}
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true" style={{ marginLeft: 6 }}>
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </aside>
  )
}
