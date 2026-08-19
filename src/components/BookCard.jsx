import React from 'react'
import { useStore } from '../context/StoreContext'

function HeartIcon({ filled }) {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15"
      stroke={filled ? '#e74c3c' : 'currentColor'}
      fill={filled ? '#e74c3c' : 'none'}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
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

export default function BookCard({ book, onClick }) {
  const { toggleWishlist, isWishlisted } = useStore()
  const wishlisted = isWishlisted(book.id)

  function handleWishClick(e) {
    e.stopPropagation()
    toggleWishlist(book)
  }

  function handleClick() {
    if (onClick) onClick(book)
  }

  return (
    <article
      className="book-card"
      onClick={handleClick}
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && handleClick()}
      role="button"
      aria-label={`${book.title} by ${book.author}`}
    >
      <div className="book-card__cover-wrap">
        <img
          className="book-card__cover"
          src={book.coverImage}
          alt={`Cover of ${book.title} by ${book.author}`}
          loading="lazy"
        />
        <button
          className={`book-card__wish${wishlisted ? ' wishlisted' : ''}`}
          onClick={handleWishClick}
          aria-label={wishlisted ? `Remove ${book.title} from wishlist` : `Add ${book.title} to wishlist`}
          aria-pressed={wishlisted}
        >
          <HeartIcon filled={wishlisted} />
        </button>
      </div>

      <div className="book-card__info">
        <h3 className="book-card__title">{book.title}</h3>
        <p className="book-card__author">by {book.author}</p>
        <p className="book-card__format">{book.format}</p>
        <div className="book-card__rating">
          <StarRating rating={book.rating} />
          <span>({book.rating})</span>
        </div>
        <p className="book-card__price">₹{book.price}</p>
        <p className="book-card__delivery">Delivery by {book.deliveryDate}</p>
      </div>
    </article>
  )
}
