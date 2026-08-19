import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getRelatedBooks } from '../data/books'

/**
 * Right-side "Related Reads" panel — matches wireframe's right column.
 * Compact list-style cards: cover | title + author + desc + format + price + delivery.
 */
export default function RelatedReads({ book }) {
  const navigate  = useNavigate()
  const related   = getRelatedBooks(book, 5)

  if (related.length === 0) return null

  return (
    <aside className="related-reads" aria-labelledby="related-reads-heading">
      <h2 id="related-reads-heading" className="related-reads__heading">
        Related Reads
      </h2>

      <ul className="related-reads__list">
        {related.map(rb => (
          <li key={rb.id} className="related-reads__item">
            <button
              className="related-reads__item-btn"
              onClick={() => navigate(`/book/${rb.id}`)}
              aria-label={`View ${rb.title} by ${rb.author}`}
            >
              <img
                src={rb.coverImage}
                alt={`Cover of ${rb.title}`}
                className="related-reads__cover"
                loading="lazy"
              />
              <div className="related-reads__info">
                <p className="related-reads__title">{rb.title}</p>
                <p className="related-reads__author">
                  by{' '}
                  <Link
                    to={`/writer/${rb.authorId || 'w1'}`}
                    className="related-reads__author-link"
                    onClick={e => e.stopPropagation()}
                  >
                    {rb.author}
                  </Link>
                </p>
                <p className="related-reads__desc">{rb.description.slice(0, 70)}…</p>
                <p className="related-reads__format">{rb.format}</p>
                <p className="related-reads__category-tag">
                  {rb.genre || 'Books'}, {rb.category}
                </p>
                <p className="related-reads__price">₹{rb.price}</p>
                <p className="related-reads__delivery">Delivery by {rb.deliveryDate}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}
