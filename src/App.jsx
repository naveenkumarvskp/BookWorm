import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom'

import { StoreProvider, useStore } from './context/StoreContext'

import Header    from './components/Header'
import Sidebar   from './components/Sidebar'
import Footer    from './components/Footer'

import Home            from './pages/Home'
import BookDetailsPage from './pages/BookDetailsPage'
import CartPage        from './pages/CartPage'
import CheckoutPage    from './pages/CheckoutPage'
import OrderSuccessPage from './pages/OrderSuccessPage'
import WishlistPage    from './pages/WishlistPage'
import OrdersPage      from './pages/OrdersPage'
import WritersPage     from './pages/WritersPage'
import WriterDetailPage from './pages/WriterDetailPage'
import PaymentPage      from './pages/PaymentPage'

// ─── Toast overlay ────────────────────────────────────────────────────────────
function ToastContainer() {
  const { toasts } = useStore()
  return (
    <div className="toast-container" aria-live="polite" aria-atomic="false">
      {toasts.map(t => (
        <div key={t.id} className="toast" role="status">{t.message}</div>
      ))}
    </div>
  )
}

// ─── Skip link ────────────────────────────────────────────────────────────────
function SkipLink() {
  return (
    <a
      href="#main-content"
      className="skip-link"
      onFocus={e => { e.target.style.top = '0' }}
      onBlur={e => { e.target.style.top = '-40px' }}
    >
      Skip to main content
    </a>
  )
}

// ─── Page title updater ───────────────────────────────────────────────────────
const PAGE_TITLES = {
  '/':              'BookWorm — Your Online Bookstore',
  '/wishlist':      'My Wishlist — BookWorm',
  '/cart':          'Shopping Cart — BookWorm',
  '/checkout':      'Checkout — BookWorm',
  '/payment':       'Payment — BookWorm',
  '/order-success': 'Order Confirmed — BookWorm',
  '/orders':        'My Orders — BookWorm',
  '/writers':       'My Writers — BookWorm',
}

function PageTitle() {
  const { pathname } = useLocation()
  useEffect(() => {
    const base = pathname.startsWith('/book/')   ? 'Book Details — BookWorm'
               : pathname.startsWith('/writer/') ? 'Author — BookWorm'
               : (PAGE_TITLES[pathname] || 'BookWorm')
    document.title = base
  }, [pathname])
  return null
}

// ─── 404 ─────────────────────────────────────────────────────────────────────
function NotFound() {
  return (
    <main className="main-content" id="main-content">
      <div className="empty-state">
        <div className="empty-state__icon">🔍</div>
        <p className="empty-state__title">Page not found</p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: 16 }}>Go Home</Link>
      </div>
    </main>
  )
}

// ─── App inner (has access to router + store context) ────────────────────────
function AppInner() {
  const location = useLocation()
  const { sidebarOpen, closeSidebar } = useStore()
  // keep document.title in sync

  const isHomePage = location.pathname === '/'

  return (
    <>
      <PageTitle />
      <SkipLink />
      <Header />

      {/* Mobile sidebar drawer — available only on home page */}
      {sidebarOpen && isHomePage && (
        <>
          <div
            className="sidebar-overlay visible"
            onClick={closeSidebar}
            aria-hidden="true"
          />
          <Sidebar className="sidebar-drawer open" />
        </>
      )}

      <div className="app-layout">
        {/* Desktop sidebar — only on home */}
        {isHomePage && <Sidebar />}

        <Routes>
          <Route path="/"              element={<Home />} />
          <Route path="/book/:id"      element={<BookDetailsPage />} />
          <Route path="/wishlist"      element={<WishlistPage />} />
          <Route path="/cart"          element={<CartPage />} />
          <Route path="/checkout"      element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/orders"        element={<OrdersPage />} />
          <Route path="/writers"       element={<WritersPage />} />
          <Route path="/writer/:id"    element={<WriterDetailPage />} />
          <Route path="/payment"       element={<PaymentPage />} />
          <Route path="*"              element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
      <ToastContainer />
    </>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <AppInner />
      </StoreProvider>
    </BrowserRouter>
  )
}
