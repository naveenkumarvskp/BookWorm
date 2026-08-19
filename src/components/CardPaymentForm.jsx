import React from 'react'

function Field({ label, id, value, onChange, error, placeholder, type = 'text', maxLength, inputMode }) {
  return (
    <div className="pmt-field">
      <label htmlFor={id} className="pmt-field__label">{label}</label>
      <input
        id={id}
        type={type}
        className={`pmt-field__input${error ? ' pmt-field__input--err' : ''}`}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        inputMode={inputMode}
        autoComplete="off"
        aria-describedby={error ? `${id}-err` : undefined}
        aria-invalid={!!error}
      />
      {error && (
        <span id={`${id}-err`} className="pmt-field__error" role="alert">{error}</span>
      )}
    </div>
  )
}

/**
 * Shared card form for both Credit Card and Debit Card.
 * Layout matches wireframe: 2-col grid (Card# | Name, CVV | Expiry)
 */
export default function CardPaymentForm({ form, errors, onChange, isDebit = false }) {
  // Format card number with dashes every 4 digits
  function handleCardNumber(raw) {
    const digits = raw.replace(/\D/g, '').slice(0, 16)
    const formatted = digits.replace(/(.{4})/g, '$1-').replace(/-$/, '')
    onChange('cardNumber', formatted)
  }

  function handleExpiry(raw) {
    const digits = raw.replace(/\D/g, '').slice(0, 6)
    // Format as MM/YYYY
    if (digits.length > 2) {
      onChange('cardExpiry', digits.slice(0, 2) + '/' + digits.slice(2))
    } else {
      onChange('cardExpiry', digits)
    }
  }

  return (
    <div className="pmt-form">
      <div className="pmt-form__row">
        {/* Card Number */}
        <Field
          label="Card Number"
          id={`${isDebit ? 'debit' : 'credit'}-cardNumber`}
          value={form.cardNumber || ''}
          onChange={handleCardNumber}
          error={errors.cardNumber}
          placeholder="XXXX-XXXX-XXXX-XXXX"
          inputMode="numeric"
          maxLength={19}
        />
        {/* Name on Card */}
        <Field
          label="Name on Card"
          id={`${isDebit ? 'debit' : 'credit'}-cardName`}
          value={form.cardName || ''}
          onChange={v => onChange('cardName', v)}
          error={errors.cardName}
          placeholder="Name"
        />
      </div>

      <div className="pmt-form__row">
        {/* CVV */}
        <Field
          label="CVV"
          id={`${isDebit ? 'debit' : 'credit'}-cvv`}
          value={form.cvv || ''}
          onChange={v => onChange('cvv', v.replace(/\D/g, '').slice(0, 4))}
          error={errors.cvv}
          placeholder="XXX"
          type="password"
          maxLength={4}
          inputMode="numeric"
        />
        {/* Date of Expiry */}
        <Field
          label="Date of Expiry"
          id={`${isDebit ? 'debit' : 'credit'}-cardExpiry`}
          value={form.cardExpiry || ''}
          onChange={handleExpiry}
          error={errors.cardExpiry}
          placeholder="MM/YYYY"
          inputMode="numeric"
          maxLength={7}
        />
      </div>
    </div>
  )
}

// ── Validation ─────────────────────────────────────────────────────────────────
export function validateCard(form) {
  const e = {}
  const rawNum = (form.cardNumber || '').replace(/-/g, '')
  if (!rawNum || rawNum.length < 13) e.cardNumber = 'Enter a valid card number (13-16 digits).'
  if (!(form.cardName || '').trim()) e.cardName = 'Cardholder name is required.'
  if (!(form.cvv || '').trim() || !/^\d{3,4}$/.test(form.cvv)) e.cvv = 'CVV must be 3 or 4 digits.'
  const expiry = (form.cardExpiry || '')
  const parts  = expiry.split('/')
  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    e.cardExpiry = 'Enter expiry as MM/YYYY.'
  } else {
    const mm = parseInt(parts[0], 10)
    const yy = parseInt(parts[1], 10)
    const now = new Date()
    if (mm < 1 || mm > 12) { e.cardExpiry = 'Invalid month.' }
    else if (yy < now.getFullYear() || (yy === now.getFullYear() && mm < now.getMonth() + 1)) {
      e.cardExpiry = 'Card is expired.'
    }
  }
  return e
}
