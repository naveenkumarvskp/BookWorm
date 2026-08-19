import React from 'react'
import { Link } from 'react-router-dom'

/**
 * A single purchased book card shown on the Order Success screen.
 * Layout (wireframe): cover left | info right
 *   Title, by Author (link), short description,
 *   Format, Genre + Category, Price, Delivery
 */
export default function PurchasedProductCard({ item }) {
  const authorHref = item.authorId ? `/writer/${item.authorId}` : '/writers'
  const desc = item.description
    ? item.description.slice(0, 72) + (item.description.length > 72 ? '…' : '')
    : ''

  return (
    <article className="ppc" aria-label={`${item.title} by ${item.author}`}>
      {/* Cover */}
      <div className="ppc__cover-wrap">
        <img
          src={item.coverImage}
          alt={`Cover of ${item.title}`}
          className="ppc__cover"
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="ppc__info">
        <h3 className="ppc__title">{item.title}</h3>

        <p className="ppc__author">
          by{' '}
          <Link to={authorHref} className="ppc__author-link">
            {item.author}
          </Link>
        </p>

        {desc && (
          <p className="ppc__desc">{desc}</p>
        )}

        {item.format && (
          <p className="ppc__format">{item.format}</p>
        )}

        {(item.genre || item.category) && (
          <p className="ppc__category">
            <span className="ppc__category-tag">{item.genre || 'Books'}</span>
            {item.category && (
              <>, <span className="ppc__category-tag">{item.category}</span></>
            )}
          </p>
        )}

        <p className="ppc__price">₹{item.price}</p>

        {item.deliveryDate && (
          <p className="ppc__delivery">Delivery by {item.deliveryDate}</p>
        )}
      </div>
    </article>
  )
}
