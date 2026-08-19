import React, { useState, useMemo } from 'react'
import SearchFilters from '../components/SearchFilters'
import BookSection from '../components/BookSection'
import BookDetails from '../components/BookDetails'
import { books } from '../data/books'
import { useStore } from '../context/StoreContext'

function applyFilters(allBooks, { query, category, language, format, maxPrice, sortBy }) {
  let result = [...allBooks]

  if (query.trim()) {
    const q = query.toLowerCase()
    result = result.filter(
      b =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q)
    )
  }
  if (category && category !== 'All') result = result.filter(b => b.category === category)
  if (language && language !== 'All Languages') result = result.filter(b => b.language === language)
  if (format && format !== 'All Formats') result = result.filter(b => b.format === format)
  if (maxPrice < 500) result = result.filter(b => b.price <= maxPrice)

  switch (sortBy) {
    case 'price-asc':  result.sort((a, b) => a.price - b.price); break
    case 'price-desc': result.sort((a, b) => b.price - a.price); break
    case 'title-asc':  result.sort((a, b) => a.title.localeCompare(b.title)); break
    case 'title-desc': result.sort((a, b) => b.title.localeCompare(a.title)); break
    case 'rating':     result.sort((a, b) => b.rating - a.rating); break
    default: break
  }
  return result
}

export default function Home() {
  const { activeCategory, toggleWishlist, isWishlisted, addToCart } = useStore()

  const [query, setQuery] = useState('')
  const [language, setLanguage] = useState('All Languages')
  const [format, setFormat] = useState('All Formats')
  const [maxPrice, setMaxPrice] = useState(500)
  const [sortBy, setSortBy] = useState('relevance')
  const [selectedBook, setSelectedBook] = useState(null)

  const isFiltering = !!(
    query.trim() || activeCategory !== 'All' ||
    language !== 'All Languages' || format !== 'All Formats' ||
    maxPrice < 500 || sortBy !== 'relevance'
  )

  const filteredBooks = useMemo(
    () => applyFilters(books, { query, category: activeCategory, language, format, maxPrice, sortBy }),
    [query, activeCategory, language, format, maxPrice, sortBy]
  )

  const recommended = useMemo(
    () => isFiltering ? filteredBooks.filter(b => b.section === 'recommended') : books.filter(b => b.section === 'recommended'),
    [filteredBooks, isFiltering]
  )
  const bestsellers = useMemo(
    () => isFiltering ? filteredBooks.filter(b => b.section === 'bestsellers') : books.filter(b => b.section === 'bestsellers'),
    [filteredBooks, isFiltering]
  )
  const newLaunches = useMemo(
    () => isFiltering ? filteredBooks.filter(b => b.section === 'new') : books.filter(b => b.section === 'new'),
    [filteredBooks, isFiltering]
  )

  const hasResults = filteredBooks.length > 0

  return (
    <main className="main-content" id="main-content">
      <SearchFilters
        query={query}            onQueryChange={setQuery}
        language={language}      onLanguageChange={setLanguage}
        format={format}          onFormatChange={setFormat}
        maxPrice={maxPrice}      onMaxPriceChange={setMaxPrice}
        sortBy={sortBy}          onSortChange={setSortBy}
      />

      {!hasResults ? (
        <div className="empty-state">
          <div className="empty-state__icon">📚</div>
          <p className="empty-state__title">No books found</p>
          <p className="empty-state__sub">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <>
          <BookSection title="Recommended for You" books={recommended} onBookClick={setSelectedBook} />
          <BookSection title="Bestsellers this Month" books={bestsellers} onBookClick={setSelectedBook} />
          <BookSection title="New Launches" books={newLaunches} onBookClick={setSelectedBook} />
        </>
      )}

      {selectedBook && (
        <BookDetails
          book={selectedBook}
          isWishlisted={isWishlisted(selectedBook.id)}
          onWishlistToggle={() => toggleWishlist(selectedBook)}
          onAddToCart={book => { addToCart(book); setSelectedBook(null) }}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </main>
  )
}
