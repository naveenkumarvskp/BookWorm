import React from 'react'
import { useNavigate } from 'react-router-dom'
import BookCard from './BookCard'
import { books } from '../data/books'
import { useStore } from '../context/StoreContext'

export default function RelatedProducts({ currentBook }) {
  const { toggleWishlist, isWishlisted, addToCart } = useStore()
  const navigate = useNavigate()

  // Related = same category, excluding current book, up to 4
  const related = books
    .filter(b => b.id !== currentBook.id && b.category === currentBook.category)
    .slice(0, 4)

  if (related.length === 0) return null

  return (
    <section className="related-products" aria-labelledby="related-heading">
      <h2 id="related-heading" className="related-products__title">
        Related Products
      </h2>
      <div className="book-section__grid">
        {related.map(book => (
          <BookCard
            key={book.id}
            book={book}
            isWishlisted={isWishlisted(book.id)}
            onWishlistToggle={() => toggleWishlist(book)}
            onClick={() => navigate(`/book/${book.id}`)}
          />
        ))}
      </div>
    </section>
  )
}
