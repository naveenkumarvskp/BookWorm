import React, { useState } from 'react'

const MOCK_GIFT = { availablePoints: 500, pointValue: 1 }

/**
 * Gift-points redemption widget.
 * Props: redeemed (number of points already committed), onRedeem(points)
 */
export default function GiftPoints({ redeemed, onRedeem, maxDiscount }) {
  const [enabled,    setEnabled]    = useState(redeemed > 0)
  const [inputVal,   setInputVal]   = useState(String(redeemed || ''))
  const [inputError, setInputError] = useState('')

  const available = MOCK_GIFT.availablePoints
  const pv        = MOCK_GIFT.pointValue

  function handleToggle(e) {
    const checked = e.target.checked
    setEnabled(checked)
    setInputError('')
    if (!checked) { onRedeem(0); setInputVal('') }
    else          { setInputVal(String(Math.min(available, maxDiscount))) }
  }

  function handleChange(e) {
    setInputVal(e.target.value)
    setInputError('')
  }

  function handleApply() {
    const pts = parseInt(inputVal, 10)
    if (isNaN(pts) || pts < 1) {
      setInputError('Enter a valid number of points.'); return
    }
    if (pts > available) {
      setInputError(`You only have ${available} points.`); return
    }
    const maxPts = Math.floor(maxDiscount / pv)
    if (pts > maxPts) {
      setInputError(`Points discount cannot exceed ₹${maxDiscount}.`); return
    }
    setInputError('')
    onRedeem(pts)
  }

  return (
    <section className="gift-points" aria-labelledby="gp-heading">
      <h3 id="gp-heading" className="gift-points__heading">Gift Points</h3>
      <p className="gift-points__avail">
        Available Points: <strong>{available}</strong>
      </p>

      <label className="gift-points__toggle">
        <input
          type="checkbox"
          checked={enabled}
          onChange={handleToggle}
          aria-label="Redeem gift points"
        />
        <span>Redeem gift points</span>
      </label>

      {enabled && (
        <div className="gift-points__input-row">
          <div className="gift-points__field">
            <label htmlFor="gp-input" className="af-label">Points to use</label>
            <input
              id="gp-input"
              type="number"
              min={1}
              max={available}
              className="af-input"
              value={inputVal}
              onChange={handleChange}
              aria-describedby={inputError ? 'gp-err' : undefined}
            />
            {inputError && (
              <span id="gp-err" className="af-error" role="alert">{inputError}</span>
            )}
          </div>
          <button
            type="button"
            className="btn gift-points__apply-btn"
            onClick={handleApply}
            aria-label="Apply gift points"
          >
            Apply
          </button>
        </div>
      )}

      {redeemed > 0 && (
        <p className="gift-points__discount" aria-live="polite">
          Discount: <strong>₹{redeemed * pv}</strong>
        </p>
      )}
    </section>
  )
}
