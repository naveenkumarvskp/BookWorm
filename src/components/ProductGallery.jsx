import React from 'react'

/**
 * Displays the large book cover and (optionally) a back cover / spine view.
 * Matches the left panel in the wireframe.
 */
export default function ProductGallery({ book }) {
  return (
    <div className="product-gallery" aria-label={`Book cover for ${book.title}`}>
      <div className="product-gallery__main">
        <img
          src={book.coverImage}
          alt={`Front cover of ${book.title} by ${book.author}`}
          className="product-gallery__cover"
        />
      </div>

      {/* About the Author blurb — compact, matches wireframe left column */}
      <div className="product-gallery__blurb">
        <p className="product-gallery__blurb-heading">About the Author</p>
        <p className="product-gallery__blurb-text">
          {book.author} is the author of <em>{book.title}</em>.
          {book.publisher ? ` Published by ${book.publisher}.` : ''}
        </p>
        {/* Barcode-style decoration to match wireframe visual */}
        <div className="product-gallery__barcode" aria-hidden="true">
          <span>ISBN</span>
          <div className="product-gallery__bars">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="product-gallery__bar"
                style={{ width: i % 5 === 0 ? 3 : 1, opacity: 0.5 + (i % 3) * 0.17 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
