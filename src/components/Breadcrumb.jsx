import React from 'react'
import { Link } from 'react-router-dom'
import { GENRE_MAP } from '../data/books'

/**
 * Breadcrumb — dynamically built from a book object.
 * Example: Home / Non-fiction / Self Help
 */
export default function Breadcrumb({ book }) {
  const genre    = book ? (GENRE_MAP[book.category] || book.genre || 'Books') : 'Books'
  const category = book ? book.category : null

  return (
    <nav className="breadcrumb bd-detail" aria-label="Breadcrumb">
      <Link to="/">Home</Link>
      <span className="breadcrumb__sep">›</span>
      {genre && (
        <>
          <Link to={`/?genre=${encodeURIComponent(genre)}`}>{genre}</Link>
          <span className="breadcrumb__sep">›</span>
        </>
      )}
      {category && (
        <Link to="/" aria-current={!book ? 'page' : undefined}>{category}</Link>
      )}
      {book && (
        <>
          <span className="breadcrumb__sep">›</span>
          <span aria-current="page" className="breadcrumb__current">{book.title}</span>
        </>
      )}
    </nav>
  )
}
