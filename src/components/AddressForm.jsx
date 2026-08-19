import React from 'react'

// ── Mock saved address ─────────────────────────────────────────────────────────
export const SAVED_ADDRESS = {
  firstName: 'Daniel',
  lastName:  'Reed',
  address:   '123 Main Street, Apt 4B',
  email:     'daniel@example.com',
  phone:     '9123456789',
  city:      'Hyderabad',
  pin:       '500001',
  state:     'Telangana',
  country:   'India',
}

const COUNTRIES = ['India', 'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France']

function Field({ label, id, value, onChange, error, type = 'text', placeholder, children }) {
  return (
    <div className="af-field">
      <label htmlFor={id} className="af-label">{label}</label>
      {children || (
        <input
          id={id}
          type={type}
          className={`af-input${error ? ' af-input--err' : ''}`}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder || label}
          aria-describedby={error ? `${id}-err` : undefined}
          aria-invalid={!!error}
          autoComplete="off"
        />
      )}
      {error && (
        <span id={`${id}-err`} className="af-error" role="alert">{error}</span>
      )}
    </div>
  )
}

/**
 * Address form with "Use Saved Address" checkbox.
 * Props: form, errors, onChange(field, value), onUseSaved(bool), usingSaved
 */
export default function AddressForm({ form, errors, onChange, usingSaved, onUseSaved }) {
  function handleCheckbox(e) {
    onUseSaved(e.target.checked)
  }

  return (
    <section className="af-section" aria-labelledby="af-heading">
      <h2 id="af-heading" className="af-heading">Address</h2>

      {/* Use saved address toggle */}
      <label className="af-saved-label">
        <input
          type="checkbox"
          checked={usingSaved}
          onChange={handleCheckbox}
          className="af-saved-checkbox"
          aria-label="Use saved address"
        />
        <span>Use Saved Address</span>
      </label>

      {/* Row 1: First Name · Last Name · Address */}
      <div className="af-row af-row--3">
        <Field label="First Name" id="firstName" value={form.firstName}
          onChange={v => onChange('firstName', v)} error={errors.firstName} />
        <Field label="Last Name" id="lastName" value={form.lastName}
          onChange={v => onChange('lastName', v)} error={errors.lastName} />
        <Field label="Address" id="address" value={form.address}
          onChange={v => onChange('address', v)} error={errors.address}
          placeholder="Address Line 2" />
      </div>

      {/* Row 2: Email · City · PIN */}
      <div className="af-row af-row--3">
        <Field label="e-mail" id="email" type="email" value={form.email}
          onChange={v => onChange('email', v)} error={errors.email}
          placeholder="e-mail" />
        <Field label="City" id="city" value={form.city}
          onChange={v => onChange('city', v)} error={errors.city} />
        <Field label="Pin" id="pin" value={form.pin}
          onChange={v => onChange('pin', v)} error={errors.pin}
          placeholder="000000" />
      </div>

      {/* Row 3: Phone · State · Country */}
      <div className="af-row af-row--3">
        <Field label="Phone Number" id="phone" type="tel" value={form.phone}
          onChange={v => onChange('phone', v)} error={errors.phone}
          placeholder="+91 1234567890" />
        <Field label="State" id="state" value={form.state}
          onChange={v => onChange('state', v)} error={errors.state} />
        <Field label="Country" id="country" value={form.country}
          onChange={v => onChange('country', v)} error={errors.country}>
          <select
            id="country"
            className={`af-input af-select${errors.country ? ' af-input--err' : ''}`}
            value={form.country}
            onChange={e => onChange('country', e.target.value)}
            aria-invalid={!!errors.country}
          >
            <option value="">Select Country</option>
            {COUNTRIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.country && (
            <span id="country-err" className="af-error" role="alert">{errors.country}</span>
          )}
        </Field>
      </div>
    </section>
  )
}

// ── Exported validation helper ─────────────────────────────────────────────────
export function validateAddress(form) {
  const e = {}
  if (!form.firstName.trim())  e.firstName = 'Please enter your first name.'
  if (!form.lastName.trim())   e.lastName  = 'Please enter your last name.'
  if (!form.address.trim())    e.address   = 'Please enter your address.'
  if (!form.city.trim())       e.city      = 'Please enter your city.'
  if (!form.state.trim())      e.state     = 'Please enter your state.'
  if (!form.country)           e.country   = 'Please select your country.'
  if (!form.pin.trim() || !/^\d{4,10}$/.test(form.pin.replace(/\s/g, '')))
    e.pin = 'Please enter a valid PIN/postal code.'
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    e.email = 'Please enter a valid email address.'
  if (!form.phone.trim() || !/^[+]?[\d\s\-()]{7,15}$/.test(form.phone))
    e.phone = 'Please enter a valid phone number.'
  return e
}
