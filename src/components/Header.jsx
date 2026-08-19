import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

// ─── SVG Icons ───────────────────────────────────────────────────────────────
function BookIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  )
}
function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  )
}
function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}
function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

export default function Header() {
  const { cartCount, wishlist, toggleSidebar } = useStore()

  return (
    <header className="header" role="banner">
      <button
        className="header__icon-btn header__menu-btn"
        onClick={toggleSidebar}
        aria-label="Toggle category menu"
      >
        <MenuIcon />
      </button>

      <Link to="/" className="header__logo" aria-label="BookWorm Home">
        <BookIcon />
        <span className="header__logo-text">Book Worm</span>
      </Link>

      <nav className="header__nav" aria-label="Main navigation">
        <NavLink to="/orders" className={({ isActive }) => `header__nav-link${isActive ? ' active' : ''}`}>
          My Orders
        </NavLink>
        <NavLink to="/wishlist" className={({ isActive }) => `header__nav-link${isActive ? ' active' : ''}`}>
          My Wishlist
        </NavLink>
        <NavLink to="/writers" className={({ isActive }) => `header__nav-link${isActive ? ' active' : ''}`}>
          My Writers
        </NavLink>
      </nav>

      <div className="header__actions">
        <Link to="/wishlist" className="header__icon-btn" aria-label={`Wishlist (${wishlist.length} items)`}>
          <HeartIcon />
          {wishlist.length > 0 && <span className="header__badge" aria-hidden="true">{wishlist.length}</span>}
        </Link>
        <Link to="/cart" className="header__icon-btn" aria-label={`Cart (${cartCount} items)`}>
          <CartIcon />
          {cartCount > 0 && <span className="header__badge" aria-hidden="true">{cartCount}</span>}
        </Link>
        <button className="header__icon-btn" aria-label="User profile">
          <UserIcon />
        </button>
      </div>
    </header>
  )
}
