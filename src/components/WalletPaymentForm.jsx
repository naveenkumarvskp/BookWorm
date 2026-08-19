import React from 'react'

const WALLETS = [
  { id: 'bookworm', label: 'Book Worm Wallet', balance: 250 },
  { id: 'pay',      label: 'Pay Wallet',        balance: 1200 },
  { id: 'gift',     label: 'Gift Wallet',        balance: 500 },
]

/**
 * Wallet selection form.
 */
export default function WalletPaymentForm({ form, errors, onChange }) {
  return (
    <div className="pmt-form pmt-form--wallet">
      <p className="pmt-field__label" id="wallet-label">Select Wallet</p>

      <div className="wallet-list" role="radiogroup" aria-labelledby="wallet-label">
        {WALLETS.map(w => (
          <label
            key={w.id}
            className={`wallet-option${form.wallet === w.id ? ' wallet-option--active' : ''}`}
          >
            <input
              type="radio"
              name="wallet"
              value={w.id}
              checked={form.wallet === w.id}
              onChange={() => onChange('wallet', w.id)}
              className="wallet-option__radio"
            />
            <span className="wallet-option__label">{w.label}</span>
            <span className="wallet-option__balance">₹{w.balance}</span>
          </label>
        ))}
      </div>

      {errors.wallet && (
        <span className="pmt-field__error" role="alert">{errors.wallet}</span>
      )}
    </div>
  )
}

export function validateWallet(form) {
  const e = {}
  if (!form.wallet) e.wallet = 'Please select a wallet.'
  return e
}
