import React from 'react'
import { CATEGORIES } from '../data/books'
import { useStore } from '../context/StoreContext'

export default function Sidebar({ className = '' }) {
  const { activeCategory, setActiveCategory } = useStore()

  return (
    <nav
      className={`sidebar ${className}`}
      aria-label="Book categories"
    >
      <ul>
        {CATEGORIES.map(cat => (
          <li key={cat}>
            <button
              className={`sidebar__category${activeCategory === cat ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
