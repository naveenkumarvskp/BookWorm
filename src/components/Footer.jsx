import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">📚 Book Worm</span>
          <p className="footer__tagline">Your favourite online bookstore.</p>
          <p className="footer__copy">© {new Date().getFullYear()} BookWorm. All rights reserved.</p>
        </div>

        <nav className="footer__section" aria-label="Company links">
          <h3 className="footer__heading">Company</h3>
          <ul className="footer__links">
            <li><Link to="/">About Us</Link></li>
            <li><Link to="/">Careers</Link></li>
            <li><Link to="/">Press</Link></li>
            <li><Link to="/">Blog</Link></li>
          </ul>
        </nav>

        <nav className="footer__section" aria-label="Help links">
          <h3 className="footer__heading">Help</h3>
          <ul className="footer__links">
            <li><Link to="/">FAQ</Link></li>
            <li><Link to="/">Contact Us</Link></li>
            <li><Link to="/orders">My Orders</Link></li>
            <li><Link to="/cart">My Cart</Link></li>
          </ul>
        </nav>

        <nav className="footer__section" aria-label="Browse links">
          <h3 className="footer__heading">Browse</h3>
          <ul className="footer__links">
            <li><Link to="/">All Books</Link></li>
            <li><Link to="/writers">Authors</Link></li>
            <li><Link to="/wishlist">Wishlist</Link></li>
            <li><Link to="/">New Arrivals</Link></li>
          </ul>
        </nav>

        <nav className="footer__section" aria-label="Legal links">
          <h3 className="footer__heading">Legal</h3>
          <ul className="footer__links">
            <li><Link to="/">Terms &amp; Conditions</Link></li>
            <li><Link to="/">Privacy Policy</Link></li>
            <li><Link to="/">Cookie Policy</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
