import React from 'react'
import { Link } from 'react-router-dom'
import { books } from '../data/books'

export default function WriterCard({ writer }) {
  const writerBooks = books.filter(b => writer.bookIds.includes(b.id))

  return (
    <article className="writer-card" aria-label={`Author: ${writer.name}`}>
      <div className="writer-card__avatar-wrap">
        <img
          src={writer.avatar}
          alt={`Photo of ${writer.name}`}
          className="writer-card__avatar"
          width="80"
          height="80"
        />
      </div>
      <div className="writer-card__info">
        <h3 className="writer-card__name">{writer.name}</h3>
        <div className="writer-card__genres">
          {writer.genres.map(g => (
            <span key={g} className="writer-card__genre-tag">{g}</span>
          ))}
        </div>
        <p className="writer-card__bio">{writer.bio}</p>
        <div className="writer-card__footer">
          <span className="writer-card__book-count">
            {writer.bookCount} {writer.bookCount === 1 ? 'book' : 'books'}
          </span>
          <Link to={`/writer/${writer.id}`} className="btn btn-outline" style={{ padding: '6px 14px', fontSize: '12px' }}>
            View Books
          </Link>
        </div>
      </div>
    </article>
  )
}
