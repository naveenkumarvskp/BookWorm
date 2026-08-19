import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { books, getBookById } from '../data/books'
import { writers } from '../data/writers'
import { getSeedReviews } from '../data/reviews'

import Breadcrumb       from '../components/Breadcrumb'
import ProductGallery   from '../components/ProductGallery'
import ProductInfo      from '../components/ProductInfo'
import ProductActions   from '../components/ProductActions'
import ProductMetadata  from '../components/ProductMetadata'
import WriterInfo       from '../components/WriterInfo'
import RelatedReads     from '../components/RelatedReads'
import ReviewForm       from '../components/ReviewForm'
import ReviewList       from '../components/ReviewList'

// ─── localStorage helpers ────────────────────────────────────────────────────
function loadReviews(bookId) {
  try {
    const raw = localStorage.getItem(`bw_reviews_${bookId}`)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}
function saveReviews(bookId, reviews) {
  try { localStorage.setItem(`bw_reviews_${bookId}`, JSON.stringify(reviews)) } catch {}
}

export default function BookDetailsPage() {
  const { id }    = useParams()
  const book      = getBookById(id)

  // ── Reviews state (seed + user-submitted, persisted to localStorage) ───────
  const [reviews, setReviews] = useState(() => {
    const stored = loadReviews(id)
    return stored ?? getSeedReviews(id)
  })

  // Re-initialise when the book id changes (user navigates to another book)
  useEffect(() => {
    const stored = loadReviews(id)
    setReviews(stored ?? getSeedReviews(id))
  }, [id])

  function handleSubmitReview({ reviewer, rating, comment }) {
    const newReview = {
      id:       `r${id}-${Date.now()}`,
      bookId:   id,
      reviewer,
      rating,
      comment,
      date:     new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    }
    const updated = [newReview, ...reviews]
    setReviews(updated)
    saveReviews(id, updated)
  }

  // ── Writer href lookup ──────────────────────────────────────────────────────
  const writer    = book ? writers.find(w => w.id === book.authorId) : null
  const writerHref = writer ? `/writer/${writer.id}` : '/writers'

  // ── Not found ──────────────────────────────────────────────────────────────
  if (!book) {
    return (
      <main className="main-content" id="main-content">
        <div className="empty-state">
          <div className="empty-state__icon">📖</div>
          <p className="empty-state__title">Book not found</p>
          <Link to="/" className="btn btn-outline" style={{ marginTop: 16 }}>Back to Store</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="main-content bd-page" id="main-content">
      {/* ── Breadcrumb ─────────────────────────────────────────────────────── */}
      <Breadcrumb book={book} />

      {/* ── 3-column product area ─────────────────────────────────────────── */}
      <div className="bd-layout">

        {/* Left: gallery */}
        <div className="bd-layout__left">
          <ProductGallery book={book} />
        </div>

        {/* Centre: info + actions + metadata */}
        <div className="bd-layout__centre">
          <ProductInfo   book={book} writerHref={writerHref} />
          <ProductActions book={book} />
          <ProductMetadata book={book} />
        </div>

        {/* Right: related reads sidebar */}
        <div className="bd-layout__right">
          <RelatedReads book={book} />
        </div>
      </div>

      {/* ── About the writer — full width below the 3 columns ─────────────── */}
      <WriterInfo book={book} />

      {/* ── Reviews ───────────────────────────────────────────────────────── */}
      <section className="bd-reviews" aria-labelledby="reviews-heading">
        <h2 id="reviews-heading" className="bd-reviews__heading">Reviews</h2>

        <div className="bd-reviews__layout">
          <div className="bd-reviews__form-col">
            <ReviewForm onSubmit={handleSubmitReview} />
          </div>
          <div className="bd-reviews__list-col">
            <ReviewList reviews={reviews} />
          </div>
        </div>
      </section>
    </main>
  )
}
