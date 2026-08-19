import React from 'react'
import BookCard from './BookCard'

// Note: wishlist/onWishlistToggle/useStore props are accepted for API compat but not used —
// BookCard reads from StoreContext directly.
export default function BookSection({ title, books, onBookClick }) {
  if (!books || books.length === 0) return null

  return (
    <section className="book-section" aria-labelledby={`section-${title.replace(/\s+/g, '-').toLowerCase()}`}>
      <div className="book-section__header">
        <h2
          id={`section-${title.replace(/\s+/g, '-').toLowerCase()}`}
          className="book-section__title"
        >
          {title}
        </h2>
      </div>
      <div className="book-section__grid">
        {books.map(book => (
          <BookCard
            key={book.id}
            book={book}
            onClick={onBookClick}
          />
        ))}
      </div>
    </section>
  )
}
