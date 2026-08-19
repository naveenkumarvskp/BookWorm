import React, { useState } from 'react'

// Mock coupon database
const COUPONS = {
  BOOK100:    { discount: 100, label: '₹100 off' },
  SAVE50:     { discount: 50,  label: '₹50 off' },
  WELCOME10:  { discount: 10,  label: '₹10 off' },
  READMORE:   { discount: 75,  label: '₹75 off' },
}

/**
 * Coupon input with Apply button.
 * Props: appliedCoupon, onApply(coupon | null), subtotal
 */
export default function CouponInput({ appliedCoupon, onApply }) {
  const [code,    setCode]    = useState('')
  const [message, setMessage] = useState(null)   // { text, type: 'success'|'error' }

  function handleApply() {
    const upper = code.trim().toUpperCase()
    if (!upper) { setMessage({ text: 'Please enter a coupon code.', type: 'error' }); return }
    if (appliedCoupon?.code === upper) {
      setMessage({ text: 'This coupon is already applied.', type: 'error' }); return
    }
    if (COUPONS[upper]) {
      onApply({ code: upper, ...COUPONS[upper] })
      setMessage({ text: `Coupon "${upper}" applied — ${COUPONS[upper].label}!`, type: 'success' })
      setCode('')
    } else {
      onApply(null)
      setMessage({ text: 'Invalid coupon code.', type: 'error' })
    }
  }

  function handleRemove() {
    onApply(null)
    setCode('')
    setMessage(null)
  }

  function handleKey(e) {
    if (e.key === 'Enter') { e.preventDefault(); handleApply() }
  }

  return (
    <div className="coupon">
      <label htmlFor="coupon-input" className="coupon__label">Apply Coupon</label>
      <div className="coupon__row">
        <input
          id="coupon-input"
          type="text"
          className="coupon__input"
          value={code}
          onChange={e => setCode(e.target.value.toUpperCase())}
          onKeyDown={handleKey}
          placeholder="Apply Coupon"
          aria-label="Enter coupon code"
          disabled={!!appliedCoupon}
        />
        {appliedCoupon ? (
          <button type="button" className="btn coupon__remove-btn" onClick={handleRemove}>
            Remove
          </button>
        ) : (
          <button type="button" className="btn coupon__apply-btn" onClick={handleApply}>
            Apply
          </button>
        )}
      </div>
      {message && (
        <p
          className={`coupon__message coupon__message--${message.type}`}
          role={message.type === 'error' ? 'alert' : 'status'}
          aria-live="polite"
        >
          {message.text}
        </p>
      )}
    </div>
  )
}
