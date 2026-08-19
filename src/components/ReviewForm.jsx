import React, { useState } from 'react'

function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0)
  return (
    <div
      className="star-picker"
      role="radiogroup"
      aria-label="Select star rating"
    >
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type="button"
          className={`star-picker__star${(hovered || value) >= n ? ' active' : ''}`}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(n)}
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
          aria-pressed={value === n}
        >
          ★
        </button>
      ))}
      {value > 0 && (
        <span className="star-picker__label">{value}/5</span>
      )}
    </div>
  )
}

/**
 * Review submission form.
 * On submit: calls onSubmit({ reviewer, rating, comment }).
 */
export default function ReviewForm({ onSubmit }) {
  const [rating,  setRating]  = useState(0)
  const [comment, setComment] = useState('')
  const [name,    setName]    = useState('')
  const [error,   setError]   = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (rating === 0)         { setError('Please select a star rating.'); return }
    if (!comment.trim())      { setError('Please write a review.'); return }
    if (!name.trim())         { setError('Please enter your name.'); return }
    setError('')
    onSubmit({ reviewer: name.trim(), rating, comment: comment.trim() })
    setRating(0)
    setComment('')
    setName('')
  }

  return (
    <form className="review-form" onSubmit={handleSubmit} noValidate aria-label="Leave a review">
      <h3 className="review-form__heading">Leave Your Review</h3>

      {error && (
        <p className="review-form__error" role="alert">{error}</p>
      )}

      <div className="review-form__row">
        <label htmlFor="review-name" className="review-form__label">Your Name</label>
        <input
          id="review-name"
          type="text"
          className="review-form__input"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Placeholder Text"
          aria-required="true"
        />
      </div>

      <div className="review-form__row">
        <div className="review-form__rating-row">
          <label className="review-form__label" id="rating-label">Rating</label>
          <span className="review-form__rating-count">{rating}/5</span>
        </div>
        <StarPicker
          value={rating}
          onChange={setRating}
          aria-labelledby="rating-label"
        />
      </div>

      <div className="review-form__row">
        <label htmlFor="review-comment" className="review-form__label">
          Your review
        </label>
        <textarea
          id="review-comment"
          className="review-form__textarea"
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Write your review here…"
          rows={4}
          aria-required="true"
        />
      </div>

      <div className="review-form__footer">
        <span />
        <button type="submit" className="btn btn-primary review-form__submit">
          Submit Review
        </button>
      </div>
    </form>
  )
}
