import React from 'react'
import { LANGUAGES, FORMATS } from '../data/books'

function SearchIcon() {
  return (
    <svg className="search-filters__search-icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

export default function SearchFilters({
  query, onQueryChange,
  language, onLanguageChange,
  format, onFormatChange,
  maxPrice, onMaxPriceChange,
  sortBy, onSortChange,
}) {
  return (
    <div className="search-filters" role="search" aria-label="Search and filter books">
      {/* Search */}
      <div className="search-filters__search">
        <SearchIcon />
        <label htmlFor="book-search" className="visually-hidden">
          Search books by title or author
        </label>
        <input
          id="book-search"
          type="search"
          placeholder="Search what you want to read"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          autoComplete="off"
        />
      </div>

      {/* Language */}
      <div className="search-filters__group">
        <label htmlFor="language-filter" className="search-filters__label">
          Language
        </label>
        <select
          id="language-filter"
          className="search-filters__select"
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
        >
          {LANGUAGES.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>

      {/* Format */}
      <div className="search-filters__group">
        <label htmlFor="format-filter" className="search-filters__label">
          Format
        </label>
        <select
          id="format-filter"
          className="search-filters__select"
          value={format}
          onChange={(e) => onFormatChange(e.target.value)}
        >
          {FORMATS.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="search-filters__group">
        <label htmlFor="price-range" className="search-filters__label">
          Price
        </label>
        <div className="price-range">
          <span>₹0</span>
          <input
            id="price-range"
            type="range"
            min={0}
            max={500}
            step={10}
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(Number(e.target.value))}
            aria-label={`Max price ₹${maxPrice}`}
          />
          <span>₹{maxPrice}</span>
        </div>
      </div>

      {/* Sort */}
      <div className="search-filters__group">
        <label htmlFor="sort-by" className="search-filters__label">
          Sort by
        </label>
        <select
          id="sort-by"
          className="search-filters__select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="relevance">Relevance</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="title-asc">Title A–Z</option>
          <option value="title-desc">Title Z–A</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>
    </div>
  )
}
