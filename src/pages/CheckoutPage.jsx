import React, { useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { GENRE_MAP } from '../data/books'

import CheckoutCart    from '../components/CheckoutCart'
import AddressForm, { SAVED_ADDRESS, validateAddress } from '../components/AddressForm'
import GiftPoints      from '../components/GiftPoints'
import { PaymentMethods } from '../components/PaymentMethods'
import OrderSummary    from '../components/OrderSummary'
import Breadcrumb      from '../components/Breadcrumb'

// ── Tax rate ──────────────────────────────────────────────────────────────────
const TAX_RATE = 0.12   // 12%

// ── Empty address template ────────────────────────────────────────────────────
const EMPTY_ADDR = {
  firstName: '', lastName: '', address: '', email: '',
  phone: '', city: '', pin: '', state: '', country: '',
}

// ── Empty payment fields ──────────────────────────────────────────────────────
const EMPTY_PAY = {
  cardName: '', cardNumber: '', cardExpiry: '', cardCVV: '',
  upiId: '', bank: '',
}

export default function CheckoutPage() {
  const { cart, cartTotal, placeOrder } = useStore()
  const navigate = useNavigate()

  // ── Address ────────────────────────────────────────────────────────────────
  const [addrForm,    setAddrForm]    = useState(EMPTY_ADDR)
  const [addrErrors,  setAddrErrors]  = useState({})
  const [usingSaved,  setUsingSaved]  = useState(false)

  // ── Payment ────────────────────────────────────────────────────────────────
  const [payMethod,   setPayMethod]   = useState('card')
  const [payForm,     setPayForm]     = useState(EMPTY_PAY)
  const [payErrors,   setPayErrors]   = useState({})

  // ── Coupon & Gift points ───────────────────────────────────────────────────
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [giftPoints,    setGiftPoints]    = useState(0)

  // ── Address helpers ────────────────────────────────────────────────────────
  function handleAddrChange(field, value) {
    setAddrForm(f => ({ ...f, [field]: value }))
    setAddrErrors(e => ({ ...e, [field]: undefined }))
  }

  function handleUseSaved(checked) {
    setUsingSaved(checked)
    setAddrForm(checked ? { ...SAVED_ADDRESS } : { ...EMPTY_ADDR })
    setAddrErrors({})
  }

  // ── Payment helpers ────────────────────────────────────────────────────────
  function handlePayChange(field, value) {
    setPayForm(f => ({ ...f, [field]: value }))
    setPayErrors(e => ({ ...e, [field]: undefined }))
  }

  // ── Pricing ────────────────────────────────────────────────────────────────
  const subtotal       = cartTotal
  const tax            = Math.round(subtotal * TAX_RATE)
  const delivery       = 0   // free delivery
  const couponDiscount = appliedCoupon?.discount || 0
  const giftDiscount   = giftPoints   // 1 point = ₹1
  const totalDiscount  = couponDiscount + giftDiscount
  const grandTotal     = Math.max(0, subtotal + tax + delivery - totalDiscount)
  const itemCount      = cart.reduce((s, i) => s + i.qty, 0)

  // ── Max gift discount (can't exceed payable amount) ────────────────────────
  const maxGiftDiscount = Math.max(0, subtotal + tax + delivery - couponDiscount)

  // ── Handle Pay Now ─────────────────────────────────────────────────────────
  function handlePayNow() {
    const aErr = validateAddress(addrForm)
    if (Object.keys(aErr).length > 0) {
      setAddrErrors(aErr)
      document.getElementById('af-heading')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    // Address is valid — navigate to the dedicated payment screen,
    // passing the computed total so the payment page shows the correct amount.
    navigate('/payment', {
      state: {
        totalAmount: grandTotal,
        addressData: { ...addrForm },
        couponDiscount,
        giftDiscount,
        tax,
        delivery,
      },
    })
  }

  // ── Empty cart ─────────────────────────────────────────────────────────────
  if (cart.length === 0) {
    return (
      <main className="main-content" id="main-content">
        <div className="empty-state">
          <div className="empty-state__icon">🛒</div>
          <p className="empty-state__title">Your cart is empty</p>
          <p className="empty-state__sub">Add some books before checking out.</p>
          <Link to="/" className="btn btn-primary" style={{ marginTop: 16 }}>
            Continue Shopping
          </Link>
        </div>
      </main>
    )
  }

  // ── Dynamic breadcrumb: use first cart item's category ────────────────────
  const firstItem = cart[0]

  return (
    <main className="main-content co-page" id="main-content">
      {/* Breadcrumb */}
      <nav className="breadcrumb bd-detail" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span className="breadcrumb__sep">›</span>
        {firstItem?.genre && (
          <><Link to="/">{firstItem.genre}</Link><span className="breadcrumb__sep">›</span></>
        )}
        {firstItem?.category && (
          <><Link to="/">{firstItem.category}</Link><span className="breadcrumb__sep">›</span></>
        )}
        {firstItem?.title && (
          <><Link to={`/book/${firstItem.id}`}>{firstItem.title}</Link><span className="breadcrumb__sep">›</span></>
        )}
        <span className="breadcrumb__current" aria-current="page">Checkout</span>
      </nav>

      {/* Cart items */}
      <CheckoutCart />

      {/* Main checkout grid: left (address + payment) | right (summary) */}
      <div className="co-grid">

        {/* ── Left column ─────────────────────────────────────── */}
        <div className="co-left">
          {/* Address form */}
          <AddressForm
            form={addrForm}
            errors={addrErrors}
            onChange={handleAddrChange}
            usingSaved={usingSaved}
            onUseSaved={handleUseSaved}
          />

          {/* Gift points */}
          <GiftPoints
            redeemed={giftPoints}
            onRedeem={setGiftPoints}
            maxDiscount={maxGiftDiscount}
          />

          {/* Payment methods */}
          <PaymentMethods
            selected={payMethod}
            onSelect={setPayMethod}
            form={payForm}
            errors={payErrors}
            onChange={handlePayChange}
          />
        </div>

        {/* ── Right column: Grand Total ────────────────────── */}
        <OrderSummary
          subtotal={subtotal}
          tax={tax}
          delivery={delivery}
          couponDiscount={couponDiscount}
          giftDiscount={giftDiscount}
          appliedCoupon={appliedCoupon}
          onApplyCode={setAppliedCoupon}
          onPayNow={handlePayNow}
          payLabel={`Pay Now`}
          itemCount={itemCount}
        />
      </div>
    </main>
  )
}
