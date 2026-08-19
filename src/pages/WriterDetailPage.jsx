import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import BookCard from '../components/BookCard'
import { writers, getWriterById } from '../data/writers'
import { books } from '../data/books'
import { useStore } from '../context/StoreContext'

export default function WriterDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toggleWishlist, isWishlisted, addToCart } = useStore()
  const writer = getWriterById(id)

  if (!writer) {
    return (
      <main className="main-content" id="main-content">
        <div className="empty-state">
          <div className="empty-state__icon">✍️</div>
          <p className="empty-state__title">Author not found</p>
          <Link to="/writers" className="btn btn-outline" style={{ marginTop: 16 }}>All Writers</Link>
        </div>
      </main>
    )
  }

  const writerBooks = books.filter(b => writer.bookIds.includes(b.id))

  return (
    <main className="main-content" id="main-content">
      <div className="breadcrumb">
        <Link to="/">Home</Link><span>›</span>
        <Link to="/writers">Writers</Link><span>›</span>
        <span>{writer.name}</span>
      </div>

      <div className="writer-detail-header">
        <img src={writer.avatar} alt={`Photo of ${writer.name}`} className="writer-detail-header__avatar" />
        <div className="writer-detail-header__info">
          <h1 className="writer-detail-header__name">{writer.name}</h1>
          <div className="writer-card__genres" style={{ marginBottom: 12 }}>
            {writer.genres.map(g => <span key={g} className="writer-card__genre-tag">{g}</span>)}
          </div>
          <p className="writer-detail-header__bio">{writer.bio}</p>
          <p className="writer-detail-header__count">
            {writer.bookCount} {writer.bookCount === 1 ? 'book' : 'books'} published
          </p>
        </div>
      </div>

      <section aria-labelledby="writer-books-heading">
        <h2 id="writer-books-heading" className="book-section__title" style={{ marginBottom: 16 }}>
          Books by {writer.name}
        </h2>
        {writerBooks.length === 0 ? (
          <div className="empty-state" style={{ paddingTop: 24 }}>
            <p className="empty-state__sub">No books available yet.</p>
          </div>
        ) : (
          <div className="book-section__grid">
            {writerBooks.map(book => (
              <BookCard
                key={book.id}
                book={book}
                isWishlisted={isWishlisted(book.id)}
                onWishlistToggle={() => toggleWishlist(book)}
                onClick={() => navigate(`/book/${book.id}`)}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
