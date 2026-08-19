import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BookCard from '../components/BookCard'
import BookDetails from '../components/BookDetails'
import { useState } from 'react'
import { useStore } from '../context/StoreContext'
import { books } from '../data/books'

export default function WishlistPage() {
  const { wishlist, toggleWishlist, isWishlisted, moveWishlistToCart, addToCart } = useStore()
  const [selectedBook, setSelectedBook] = useState(null)
  const navigate = useNavigate()

  return (
    <main className="main-content" id="main-content">
      <div className="wishlist-page">
        <div className="breadcrumb">
          <Link to="/">Home</Link><span>›</span><span>My Wishlist</span>
        </div>
        <h1 className="wishlist-page__title">
          My Wishlist ({wishlist.length} {wishlist.length === 1 ? 'book' : 'books'})
        </h1>

        {wishlist.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state__icon">💝</div>
            <p className="empty-state__title">Your wishlist is empty</p>
            <p className="empty-state__sub">Browse books and click the heart icon to save favourites.</p>
            <Link to="/" className="btn btn-primary" style={{ marginTop: 16 }}>Browse Books</Link>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlist.map(book => (
              <div key={book.id} className="wishlist-item">
                <img src={book.coverImage} alt={`Cover of ${book.title}`} className="wishlist-item__cover" />
                <div className="wishlist-item__info">
                  <p className="wishlist-item__title"
                    onClick={() => setSelectedBook(book)}
                    style={{ cursor: 'pointer' }}>
                    {book.title}
                  </p>
                  <p className="wishlist-item__author">by {book.author}</p>
                  <p className="wishlist-item__price">₹{book.price}</p>
                  <p className="wishlist-item__format">{book.format}</p>
                </div>
                <div className="wishlist-item__actions">
                  <button
                    className="btn btn-primary"
                    style={{ padding: '7px 14px', fontSize: '12px' }}
                    onClick={() => moveWishlistToCart(book)}
                  >
                    Move to Cart
                  </button>
                  <button
                    className="btn btn-ghost"
                    style={{ padding: '7px 14px', fontSize: '12px' }}
                    onClick={() => toggleWishlist(book)}
                    aria-label={`Remove ${book.title} from wishlist`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedBook && (
        <BookDetails
          book={selectedBook}
          isWishlisted={isWishlisted(selectedBook.id)}
          onWishlistToggle={() => toggleWishlist(selectedBook)}
          onAddToCart={b => { addToCart(b); setSelectedBook(null) }}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </main>
  )
}
