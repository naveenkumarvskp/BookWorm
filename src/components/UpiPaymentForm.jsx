import React from 'react'

/**
 * UPI payment form — single UPI ID input.
 */
export default function UpiPaymentForm({ form, errors, onChange }) {
  return (
    <div className="pmt-form pmt-form--single">
      <div className="pmt-field">
        <label htmlFor="upi-id" className="pmt-field__label">UPI ID</label>
        <input
          id="upi-id"
          type="text"
          className={`pmt-field__input${errors.upiId ? ' pmt-field__input--err' : ''}`}
          value={form.upiId || ''}
          onChange={e => onChange('upiId', e.target.value)}
          placeholder="example@upi"
          autoComplete="off"
          aria-describedby={errors.upiId ? 'upi-err' : undefined}
          aria-invalid={!!errors.upiId}
        />
        {errors.upiId && (
          <span id="upi-err" className="pmt-field__error" role="alert">{errors.upiId}</span>
        )}
      </div>
    </div>
  )
}

export function validateUpi(form) {
  const e = {}
  const id = (form.upiId || '').trim()
  if (!id)               e.upiId = 'UPI ID is required.'
  else if (!id.includes('@')) e.upiId = 'Enter a valid UPI ID (e.g. name@upi).'
  return e
}
