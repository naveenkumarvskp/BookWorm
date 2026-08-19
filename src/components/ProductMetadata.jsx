import React from 'react'

function Stars({ rating, size = 14 }) {
  const full  = Math.floor(rating)
  const half  = rating % 1 >= 0.5
  const empty = 5 - full - (half ? 1 : 0)
  const star  = (type, key) => (
    <span
      key={key}
      className={`star${type === 'full' || type === 'half' ? ' filled' : ''}`}
      style={{ fontSize: size }}
    >
      {type === 'full' ? '★' : type === 'half' ? '½' : '☆'}
    </span>
  )
  return (
    <span className="stars" aria-label={`${rating} out of 5 stars`}>
      {Array(full).fill(null).map((_, i) => star('full', `f${i}`))}
      {half && star('half', 'h')}
      {Array(empty).fill(null).map((_, i) => star('empty', `e${i}`))}
    </span>
  )
}

/**
 * Metadata row below the action buttons:
 * Language · Rating · Sells
 * Matches the compact wireframe metadata row.
 */
export default function ProductMetadata({ book }) {
  return (
    <div className="product-metadata">
      <div className="product-metadata__item">
        <span className="product-metadata__label">Language</span>
        <span className="product-metadata__value">{book.language}</span>
      </div>

      <div className="product-metadata__divider" aria-hidden="true" />

      <div className="product-metadata__item">
        <span className="product-metadata__label">Rating</span>
        <span className="product-metadata__value product-metadata__stars">
          <Stars rating={book.rating} size={13} />
        </span>
      </div>

      <div className="product-metadata__divider" aria-hidden="true" />

      <div className="product-metadata__item">
        <span className="product-metadata__label">Sells</span>
        <span className="product-metadata__value">
          {book.salesCount ? `${book.salesCount.toLocaleString()} copies sold` : 'N/A'}
        </span>
      </div>
    </div>
  )
}
