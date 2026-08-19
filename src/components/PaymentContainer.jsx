import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

import PaymentMethodSelector from './PaymentMethodSelector'
import CardPaymentForm, { validateCard } from './CardPaymentForm'
import UpiPaymentForm,  { validateUpi  } from './UpiPaymentForm'
import WalletPaymentForm, { validateWallet } from './WalletPaymentForm'

// ── Lock icon ──────────────────────────────────────────────────────────────────
function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

// ── Spinner ────────────────────────────────────────────────────────────────────
function Spinner() {
  return (
    <svg className="pmt-spinner" viewBox="0 0 24 24" width="18" height="18"
      fill="none" stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" aria-hidden="true">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  )
}

/**
 * The centered dark payment modal — contains method selector (left) + form (right).
 * amount: number — payable amount shown in the header
 */
export default function PaymentContainer({ amount, orderId, addressData = {}, couponDiscount = 0, giftDiscount = 0, delivery = 0 }) {
  const navigate   = useNavigate()
  const { placeOrder, cart, cartTotal } = useStore()

  const [method,   setMethod]   = useState('credit')
  const [form,     setForm]     = useState({
    // card
    cardNumber: '', cardName: '', cvv: '', cardExpiry: '',
    // upi
    upiId: '',
    // wallet
    wallet: '',
  })
  const [errors,   setErrors]   = useState({})
  const [loading,  setLoading]  = useState(false)
  const [failed,   setFailed]   = useState(false)

  function handleChange(field, value) {
    setForm(f => ({ ...f, [field]: value }))
    setErrors(e => ({ ...e, [field]: undefined }))
    setFailed(false)
  }

  function validate() {
    if (method === 'credit' || method === 'debit') return validateCard(form)
    if (method === 'upi')    return validateUpi(form)
    if (method === 'wallet') return validateWallet(form)
    return {}
  }

  function handlePay() {
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setLoading(true)
    setFailed(false)

    // Simulate a 1.4 s processing delay
    setTimeout(() => {
      setLoading(false)
      // If orderId was passed (pre-placed order), just navigate to success
      if (orderId) {
        navigate('/order-success', { state: { orderId } })
        return
      }
      // Place order now (cart still has items — address data from checkout)
      if (cart.length > 0) {
        const subtotal = cartTotal
        const tax      = Math.round(subtotal * 0.12)
        const newId = placeOrder({
          subtotal,
          tax,
          delivery,
          couponDiscount,
          giftDiscount,
          paymentMethod: method,
          address: addressData,
        })
        navigate('/order-success', { state: { orderId: newId } })
      } else {
        navigate('/order-success')
      }
    }, 1400)
  }

  const payLabel = amount ? `Pay ₹${amount}` : 'Pay Now'

  return (
    <div className="pmt-modal" role="dialog" aria-modal="true" aria-label="Complete Payment">
      {/* ── Modal header ── */}
      <div className="pmt-modal__header">
        <span className="pmt-modal__title">Complete Payment</span>
        <span className="pmt-modal__amount">
          Payable Amount:{' '}
          <strong className="pmt-modal__amount-val">
            ₹{amount || cartTotal + Math.round(cartTotal * 0.12)}
          </strong>
        </span>
      </div>

      {/* ── Modal body: left nav | right form ── */}
      <div className="pmt-modal__body">
        <PaymentMethodSelector selected={method} onSelect={m => { setMethod(m); setErrors({}) }} />

        <div className="pmt-modal__form-area">
          {(method === 'credit' || method === 'debit') && (
            <CardPaymentForm
              form={form}
              errors={errors}
              onChange={handleChange}
              isDebit={method === 'debit'}
            />
          )}
          {method === 'upi' && (
            <UpiPaymentForm form={form} errors={errors} onChange={handleChange} />
          )}
          {method === 'wallet' && (
            <WalletPaymentForm form={form} errors={errors} onChange={handleChange} />
          )}

          {failed && (
            <p className="pmt-modal__failed" role="alert">
              Payment failed. Please try again or use a different method.
            </p>
          )}

          {/* Pay Now button */}
          <div className="pmt-modal__action-row">
            <button
              type="button"
              className="pmt-pay-btn"
              onClick={handlePay}
              disabled={loading}
              aria-label={payLabel}
            >
              {loading ? (
                <><Spinner /><span>Processing…</span></>
              ) : (
                <><span>{payLabel}</span><LockIcon /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
