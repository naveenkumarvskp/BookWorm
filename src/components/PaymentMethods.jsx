import React from 'react'

// ── Card payment ───────────────────────────────────────────────────────────────
function Field({ label, id, value, onChange, error, type = 'text', placeholder, maxLength }) {
  return (
    <div className="af-field">
      <label htmlFor={id} className="af-label">{label}</label>
      <input id={id} type={type} className={`af-input${error ? ' af-input--err' : ''}`}
        value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder || label} maxLength={maxLength}
        aria-describedby={error ? `${id}-err` : undefined} aria-invalid={!!error} autoComplete="off" />
      {error && <span id={`${id}-err`} className="af-error" role="alert">{error}</span>}
    </div>
  )
}

export function CardPayment({ form, errors, onChange }) {
  return (
    <div className="pay-fields">
      <Field label="Cardholder Name" id="cardName" value={form.cardName}
        onChange={v => onChange('cardName', v)} error={errors.cardName} />
      <Field label="Card Number" id="cardNumber" value={form.cardNumber}
        onChange={v => onChange('cardNumber', v)} error={errors.cardNumber}
        placeholder="1234 5678 9012 3456" maxLength={19} />
      <div className="af-row af-row--2">
        <Field label="Expiry (MM/YY)" id="cardExpiry" value={form.cardExpiry}
          onChange={v => onChange('cardExpiry', v)} error={errors.cardExpiry}
          placeholder="MM / YY" maxLength={5} />
        <Field label="CVV" id="cardCVV" value={form.cardCVV}
          onChange={v => onChange('cardCVV', v)} error={errors.cardCVV}
          placeholder="•••" maxLength={3} type="password" />
      </div>
    </div>
  )
}

// ── UPI ────────────────────────────────────────────────────────────────────────
export function UpiPayment({ form, errors, onChange }) {
  return (
    <div className="pay-fields">
      <Field label="UPI ID" id="upiId" value={form.upiId}
        onChange={v => onChange('upiId', v)} error={errors.upiId}
        placeholder="example@upi" />
    </div>
  )
}

// ── Net Banking ────────────────────────────────────────────────────────────────
const BANKS = [
  'HDFC Bank', 'ICICI Bank', 'State Bank of India',
  'Axis Bank', 'Kotak Mahindra Bank', 'Punjab National Bank', 'Yes Bank',
]

export function NetBankingPayment({ form, errors, onChange }) {
  return (
    <div className="pay-fields">
      <div className="af-field">
        <label htmlFor="bank" className="af-label">Select Bank</label>
        <select id="bank" className={`af-input af-select${errors.bank ? ' af-input--err' : ''}`}
          value={form.bank || ''} onChange={e => onChange('bank', e.target.value)}
          aria-invalid={!!errors.bank}>
          <option value="">Select Bank</option>
          {BANKS.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
        {errors.bank && <span id="bank-err" className="af-error" role="alert">{errors.bank}</span>}
      </div>
    </div>
  )
}

// ── Payment Method selector ────────────────────────────────────────────────────
const METHODS = [
  { id: 'card',       label: 'Credit / Debit Card' },
  { id: 'upi',        label: 'UPI' },
  { id: 'netbanking', label: 'Net Banking' },
  { id: 'giftpoints', label: 'Gift Points + Payment' },
]

export function PaymentMethods({ selected, onSelect, form, errors, onChange }) {
  return (
    <section className="pay-section" aria-labelledby="pay-heading">
      <h2 id="pay-heading" className="pay-section__heading">Payment Method</h2>
      <div className="pay-methods" role="radiogroup" aria-label="Select payment method">
        {METHODS.map(m => (
          <label key={m.id} className={`pay-method${selected === m.id ? ' pay-method--active' : ''}`}>
            <input
              type="radio"
              name="paymentMethod"
              value={m.id}
              checked={selected === m.id}
              onChange={() => onSelect(m.id)}
              className="pay-method__radio"
            />
            <span className="pay-method__label">{m.label}</span>
          </label>
        ))}
      </div>

      {selected === 'card'       && <CardPayment       form={form} errors={errors} onChange={onChange} />}
      {selected === 'upi'        && <UpiPayment        form={form} errors={errors} onChange={onChange} />}
      {selected === 'netbanking' && <NetBankingPayment form={form} errors={errors} onChange={onChange} />}
      {selected === 'giftpoints' && (
        <p className="pay-giftpoints-note">
          Your gift points discount will be applied at payment. Complete address and proceed.
        </p>
      )}
    </section>
  )
}

// ── Payment validation ─────────────────────────────────────────────────────────
export function validatePayment(method, form) {
  const e = {}
  if (method === 'card') {
    if (!form.cardName?.trim())   e.cardName   = 'Cardholder name is required.'
    if (!form.cardNumber?.trim()) e.cardNumber = 'Card number is required.'
    if (!form.cardExpiry?.trim()) e.cardExpiry = 'Expiry date is required.'
    if (!form.cardCVV?.trim())    e.cardCVV    = 'CVV is required.'
  }
  if (method === 'upi') {
    if (!form.upiId?.trim() || !form.upiId.includes('@'))
      e.upiId = 'Please enter a valid UPI ID (e.g. name@upi).'
  }
  if (method === 'netbanking') {
    if (!form.bank) e.bank = 'Please select a bank.'
  }
  return e
}
