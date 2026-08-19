import React from 'react'

function Stars({ rating }) {
  return (
    <span className="stars" aria-label={`${rating} out of 5 stars`}>
      {[1,2,3,4,5].map(n => (
        <span key={n} className={`star${n <= rating ? ' filled' : ''}`}>★</span>
      ))}
    </span>
  )
}

/**
 * Displays a list of reviews.
 * Matches the wireframe review block: reviewer name, comment, stars, date.
 */
export default function ReviewList({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return (
      <p className="review-list__empty">No reviews yet. Be the first to review this book!</p>
    )
  }

  return (
    <ul className="review-list" aria-label="Customer reviews">
      {reviews.map(r => (
        <li key={r.id} className="review-list__item">
          <div className="review-list__header">
            <span className="review-list__reviewer">{r.reviewer}</span>
            {r.date && (
              <span className="review-list__date">{r.date}</span>
            )}
          </div>
          <p className="review-list__comment">{r.comment}</p>
          <Stars rating={r.rating} />
        </li>
      ))}
    </ul>
  )
}
