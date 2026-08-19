import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const PAYMENT_METHODS = [
  { id: 'card', label: 'Credit / Debit Card', icon: '💳' },
  { id: 'upi', label: 'UPI Payment', icon: '📱' },
  { id: 'netbanking', label: 'Net Banking', icon: '🏦' },
  { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
]

export default function Checkout({ cartItems, onPlaceOrder }) {
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', pincode: '',
    cardNumber: '', cardExpiry: '', cardCVV: '', cardName: '',
    upiId: '',
  })
  const [errors, setErrors] = useState({})

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)
  const shipping = subtotal > 0 ? 49 : 0
  const total = subtotal + shipping

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
    setErrors((e) => ({ ...e, [field]: undefined }))
  }

  function validate() {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'Required'
    if (!form.lastName.trim()) e.lastName = 'Required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone)) e.phone = '10-digit number required'
    if (!form.address.trim()) e.address = 'Required'
    if (!form.city.trim()) e.city = 'Required'
    if (!form.pincode.trim() || !/^\d{6}$/.test(form.pincode)) e.pincode = '6-digit pincode required'
    if (paymentMethod === 'card') {
      if (!form.cardNumber.trim()) e.cardNumber = 'Required'
      if (!form.cardExpiry.trim()) e.cardExpiry = 'Required'
      if (!form.cardCVV.trim()) e.cardCVV = 'Required'
      if (!form.cardName.trim()) e.cardName = 'Required'
    }
    if (paymentMethod === 'upi') {
      if (!form.upiId.trim()) e.upiId = 'Required'
    }
    return e
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    onPlaceOrder()
    navigate('/order-success')
  }

  return (
    <div className="checkout-page">
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span>›</span>
        <Link to="/cart">Cart</Link>
        <span>›</span>
        <span>Checkout</span>
      </div>
      <h1 className="checkout-page__title">Checkout</h1>

      <form onSubmit={handleSubmit} noValidate>
        <div className="checkout-grid">
          {/* Left column */}
          <div>
            {/* Delivery address */}
            <div className="checkout-section">
              <h2 className="checkout-section__title">
                <span className="checkout-section__title-icon">📦</span>
                Delivery Address
              </h2>
              <div className="form-row">
                <FormField label="First Name" id="firstName" value={form.firstName}
                  onChange={(v) => update('firstName', v)} error={errors.firstName} />
                <FormField label="Last Name" id="lastName" value={form.lastName}
                  onChange={(v) => update('lastName', v)} error={errors.lastName} />
              </div>
              <div className="form-row">
                <FormField label="Email" id="email" type="email" value={form.email}
                  onChange={(v) => update('email', v)} error={errors.email} />
                <FormField label="Phone" id="phone" type="tel" value={form.phone}
                  onChange={(v) => update('phone', v)} error={errors.phone} placeholder="10-digit number" />
              </div>
              <FormField label="Address" id="address" value={form.address}
                onChange={(v) => update('address', v)} error={errors.address} placeholder="Street / Apartment" />
              <div className="form-row">
                <FormField label="City" id="city" value={form.city}
                  onChange={(v) => update('city', v)} error={errors.city} />
                <FormField label="State" id="state" value={form.state}
                  onChange={(v) => update('state', v)} />
              </div>
              <div className="form-row">
                <FormField label="Pincode" id="pincode" value={form.pincode}
                  onChange={(v) => update('pincode', v)} error={errors.pincode} />
              </div>
            </div>

            {/* Payment */}
            <div className="checkout-section">
              <h2 className="checkout-section__title">
                <span className="checkout-section__title-icon">💳</span>
                Payment Method
              </h2>
              <div className="payment-methods">
                {PAYMENT_METHODS.map((pm) => (
                  <div
                    key={pm.id}
                    className={`payment-method${paymentMethod === pm.id ? ' selected' : ''}`}
                    onClick={() => setPaymentMethod(pm.id)}
                    role="radio"
                    aria-checked={paymentMethod === pm.id}
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setPaymentMethod(pm.id)}
                  >
                    <div className="payment-method__radio" />
                    <span className="payment-method__icon">{pm.icon}</span>
                    <span className="payment-method__label">{pm.label}</span>
                  </div>
                ))}
              </div>

              {paymentMethod === 'card' && (
                <div style={{ marginTop: 16 }}>
                  <FormField label="Card Number" id="cardNumber" value={form.cardNumber}
                    onChange={(v) => update('cardNumber', v)} error={errors.cardNumber}
                    placeholder="1234 5678 9012 3456" />
                  <div className="form-row">
                    <FormField label="Expiry (MM/YY)" id="cardExpiry" value={form.cardExpiry}
                      onChange={(v) => update('cardExpiry', v)} error={errors.cardExpiry} placeholder="MM/YY" />
                    <FormField label="CVV" id="cardCVV" value={form.cardCVV}
                      onChange={(v) => update('cardCVV', v)} error={errors.cardCVV} placeholder="123" />
                  </div>
                  <FormField label="Name on Card" id="cardName" value={form.cardName}
                    onChange={(v) => update('cardName', v)} error={errors.cardName} />
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div style={{ marginTop: 16 }}>
                  <FormField label="UPI ID" id="upiId" value={form.upiId}
                    onChange={(v) => update('upiId', v)} error={errors.upiId}
                    placeholder="name@upi" />
                </div>
              )}
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px' }}>
              Place Order — ₹{total}
            </button>
          </div>

          {/* Right column: order summary */}
          <aside className="order-summary-card" aria-label="Order summary">
            <h2 className="order-summary-card__title">Order Summary</h2>
            <div className="order-summary-card__items">
              {cartItems.map((item) => (
                <div key={item.id} className="order-summary-item">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="order-summary-item__cover"
                  />
                  <div className="order-summary-item__text">
                    <p className="order-summary-item__title">{item.title}</p>
                    <p className="order-summary-item__qty">Qty: {item.qty}</p>
                  </div>
                  <span className="order-summary-item__price">₹{item.price * item.qty}</span>
                </div>
              ))}
            </div>
            <div className="order-summary-card__divider" />
            <div className="order-summary-card__row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="order-summary-card__row">
              <span>Delivery</span>
              <span style={{ color: 'var(--delivery-color)' }}>
                {shipping === 0 ? 'FREE' : `₹${shipping}`}
              </span>
            </div>
            <div className="order-summary-card__divider" />
            <div className="order-summary-card__row">
              <span style={{ fontWeight: 700 }}>Total</span>
              <span className="order-summary-card__total">₹{total}</span>
            </div>
          </aside>
        </div>
      </form>
    </div>
  )
}

function FormField({ label, id, value, onChange, error, type = 'text', placeholder }) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={!!error}
        style={error ? { borderColor: 'var(--danger)' } : undefined}
      />
      {error && (
        <span id={`${id}-error`} style={{ color: 'var(--danger)', fontSize: '11px' }} role="alert">
          {error}
        </span>
      )}
    </div>
  )
}
