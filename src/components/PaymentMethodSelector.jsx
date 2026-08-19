import React from 'react'

const METHODS = [
  { id: 'credit', label: 'Credit Card' },
  { id: 'debit',  label: 'Debit card'  },
  { id: 'upi',    label: 'UPI'         },
  { id: 'wallet', label: 'Wallet'      },
]

/**
 * Left-side navigation tabs in the payment modal.
 */
export default function PaymentMethodSelector({ selected, onSelect }) {
  return (
    <nav className="pmt-nav" aria-label="Payment method">
      <ul className="pmt-nav__list" role="radiogroup">
        {METHODS.map(m => (
          <li key={m.id} className="pmt-nav__item">
            <button
              className={`pmt-nav__btn${selected === m.id ? ' pmt-nav__btn--active' : ''}`}
              onClick={() => onSelect(m.id)}
              role="radio"
              aria-checked={selected === m.id}
              type="button"
            >
              {m.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
