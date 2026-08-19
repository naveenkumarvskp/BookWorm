import React from 'react'
import { Link } from 'react-router-dom'

/**
 * Center panel — title, author link, description, publisher, format, category, price, delivery.
 * Matches the middle column of the wireframe.
 */
export default function ProductInfo({ book, writerHref }) {
  return (
    <div className="product-info">
      <h1 className="product-info__title">{book.title}</h1>

      <p className="product-info__author">
        by{' '}
        <Link to={writerHref || '/writers'} className="product-info__author-link">
          {book.author}
        </Link>
      </p>

      <p className="product-info__desc">{book.description}</p>

      <div className="product-info__meta-block">
        {book.publisher && (
          <p className="product-info__meta-row">
            <span className="product-info__meta-label">Published by:</span>{' '}
            <span className="product-info__meta-val product-info__publisher-link">
              {book.publisher}
            </span>
          </p>
        )}
        <p className="product-info__meta-row">
          <span className="product-info__meta-val product-info__format">{book.format}</span>
        </p>
        <p className="product-info__meta-row">
          <span className="product-info__meta-val product-info__category-tag">
            {book.genre || 'Books'}
          </span>
          {', '}
          <span className="product-info__meta-val product-info__category-tag">
            {book.category}
          </span>
        </p>
      </div>

      <p className="product-info__price">₹{book.price}</p>
      <p className="product-info__delivery">Delivery by {book.deliveryDate}</p>
    </div>
  )
}
