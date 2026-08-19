import React from 'react'
import { Link } from 'react-router-dom'
import { writers } from '../data/writers'

/**
 * "About the writer" section — full-width banner below the 3-col layout.
 * Matches the wireframe section with circular avatar, name, and biography.
 */
export default function WriterInfo({ book }) {
  const writer = writers.find(w => w.id === book.authorId) || null

  const name  = writer ? writer.name  : book.author
  const bio   = writer ? writer.bio   : `${book.author} is the author of ${book.title}.`
  const count = writer ? writer.bookCount : null
  const href  = writer ? `/writer/${writer.id}` : '/writers'
  const img   = writer ? writer.avatar : null

  return (
    <section className="writer-info-section" aria-labelledby="writer-info-heading">
      <h2 id="writer-info-heading" className="writer-info-section__heading">
        About the writer
      </h2>

      <div className="writer-info-section__card">
        {img && (
          <img
            src={img}
            alt={`Photo of ${name}`}
            className="writer-info-section__avatar"
            width="64"
            height="64"
          />
        )}
        <div className="writer-info-section__body">
          <Link to={href} className="writer-info-section__name">
            {name}
          </Link>
          {count && (
            <span className="writer-info-section__count">{count} books</span>
          )}
          <p className="writer-info-section__bio">{bio}</p>
        </div>
      </div>
    </section>
  )
}
