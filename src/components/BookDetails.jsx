import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

function HeartIcon({ filled }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18"
      stroke={filled ? '#e74c3c' : 'currentColor'} fill={filled ? '#e74c3c' : 'none'}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

function StarRating({ rating }) {
  const full  = Math.floor(rating)
  const half  = rating % 1 >= 0.5
  const empty = 5 - full - (half ? 1 : 0)
  return (
    <span className="stars" aria-label={`${rating} out of 5 stars`}>
      {Array(full).fill(null).map((_, i) => <span key={`f${i}`} className="star filled">★</span>)}
      {half && <span key="h" className="star filled">½</span>}
      {Array(empty).fill(null).map((_, i) => <span key={`e${i}`} className="star">☆</span>)}
    </span>
  )
}

export default function BookDetails({ book, isWishlisted, onWishlistToggle, onAddToCart, onClose }) {
  const navigate = useNavigate()
  if (!book) return null

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={handleBackdropClick}
      onKeyDown={e => e.key === 'Escape' && onClose()}
    >
      <div className="modal">
        <button className="modal__close" onClick={onClose} aria-label="Close book details">✕</button>

        <div className="modal__body">
          <div className="modal__cover-wrap">
            <img
              className="modal__cover"
              src={book.coverImage}
              alt={`Cover of ${book.title} by ${book.author}`}
            />
          </div>

          <div className="modal__details">
            <span className="modal__category-badge">{book.category}</span>
            <h2 id="modal-title" className="modal__title">{book.title}</h2>
            <p className="modal__author">by {book.author}</p>

            <div className="modal__rating">
              <StarRating rating={book.rating} />
              <span style={{ color: 'var(--text-muted)', marginLeft: 4 }}>{book.rating} / 5</span>
            </div>

            <p className="modal__desc">{book.description}</p>

            <div className="modal__meta">
              <span><strong>Format:</strong> {book.format}</span>
              <span><strong>Language:</strong> {book.language}</span>
              <span><strong>Category:</strong> {book.category}</span>
            </div>

            <div className="modal__price-row">
              <span className="modal__price">₹{book.price}</span>
              <span className="modal__delivery">Delivery by {book.deliveryDate}</span>
            </div>

            <div className="modal__actions">
              <button className="btn btn-primary" onClick={() => onAddToCart(book)}>
                Add to Cart
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => { onAddToCart(book); navigate('/checkout') }}
                aria-label={`Buy ${book.title} now`}
              >
                Buy Now
              </button>
              <button
                className="btn btn-outline"
                onClick={onWishlistToggle}
                aria-pressed={isWishlisted}
              >
                <HeartIcon filled={isWishlisted} />
                {isWishlisted ? 'Wishlisted' : 'Wishlist'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
