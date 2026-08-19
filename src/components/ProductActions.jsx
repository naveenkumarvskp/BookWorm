import React, { useState } from 'react'
import { useStore } from '../context/StoreContext'

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  )
}

function HeartIcon({ filled }) {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15"
      stroke={filled ? '#e74c3c' : 'currentColor'} fill={filled ? '#e74c3c' : 'none'}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

/**
 * Add to Cart + Add to Wishlist action buttons.
 * Matches the wireframe button row directly below the price/delivery info.
 */
export default function ProductActions({ book }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore()
  const [addedFeedback, setAddedFeedback] = useState(false)
  const wishlisted = isWishlisted(book.id)

  function handleAddToCart() {
    addToCart(book)
    setAddedFeedback(true)
    setTimeout(() => setAddedFeedback(false), 1800)
  }

  return (
    <div className="product-actions" role="group" aria-label="Product actions">
      <button
        className={`btn product-actions__cart-btn${addedFeedback ? ' added' : ''}`}
        onClick={handleAddToCart}
        aria-label={`Add ${book.title} to cart`}
      >
        <CartIcon />
        {addedFeedback ? 'Added to Cart ✓' : 'Add to Cart'}
      </button>

      <button
        className={`btn product-actions__wish-btn${wishlisted ? ' wishlisted' : ''}`}
        onClick={() => toggleWishlist(book)}
        aria-pressed={wishlisted}
        aria-label={wishlisted ? `Remove ${book.title} from wishlist` : `Add ${book.title} to wishlist`}
      >
        <HeartIcon filled={wishlisted} />
        {wishlisted ? 'Wishlisted' : 'Add to Wishlist'}
      </button>

      {/* Search/look-inside icon — purely decorative match for wireframe */}
      <button className="btn product-actions__look-btn" aria-label="Look inside this book">
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>
    </div>
  )
}
