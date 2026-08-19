import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

export default function CartPage() {
  const { cart, cartCount, cartTotal, updateQty, removeFromCart } = useStore()
  const navigate = useNavigate()

  const shipping = cartTotal > 0 ? 49 : 0
  const total = cartTotal + shipping

  if (cart.length === 0) {
    return (
      <main className="main-content" id="main-content">
        <div className="cart-page">
          <h1 className="cart-page__title">Shopping Cart</h1>
          <div className="empty-state">
            <div className="empty-state__icon">🛒</div>
            <p className="empty-state__title">Your cart is empty</p>
            <p className="empty-state__sub">Add some books to get started.</p>
            <Link to="/" className="btn btn-primary" style={{ marginTop: 16 }}>Browse Books</Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="main-content" id="main-content">
      <div className="cart-page">
        <div className="breadcrumb">
          <Link to="/">Home</Link><span>›</span><span>Cart</span>
        </div>
        <h1 className="cart-page__title">
          Shopping Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
        </h1>

        <div className="cart-layout">
          <div className="cart-items" role="list" aria-label="Cart items">
            {cart.map(item => (
              <div key={item.id} className="cart-item" role="listitem">
                <img src={item.coverImage} alt={`Cover of ${item.title}`} className="cart-item__cover" />
                <div className="cart-item__info">
                  <p className="cart-item__title">{item.title}</p>
                  <p className="cart-item__author">by {item.author}</p>
                  <p className="cart-item__format">{item.format}</p>
                  <div className="cart-item__qty">
                    <button className="qty-btn" onClick={() => updateQty(item.id, item.qty - 1)}
                      aria-label={`Decrease quantity of ${item.title}`} disabled={item.qty <= 1}>−</button>
                    <span className="qty-value" aria-label={`Quantity: ${item.qty}`}>{item.qty}</span>
                    <button className="qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}
                      aria-label={`Increase quantity of ${item.title}`}>+</button>
                  </div>
                </div>
                <div className="cart-item__right">
                  <span className="cart-item__price">₹{item.price * item.qty}</span>
                  <button className="btn btn-ghost" onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.title} from cart`}
                    style={{ fontSize: '12px', padding: '5px 10px' }}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <aside className="cart-summary" aria-label="Order summary">
            <h2 style={{ fontSize: '15px', fontWeight: 600, marginBottom: 16 }}>Price Details</h2>
            <div className="cart-summary__row">
              <span>Price ({cartCount} items)</span><span>₹{cartTotal}</span>
            </div>
            <div className="cart-summary__row">
              <span>Delivery Charges</span>
              <span style={{ color: 'var(--delivery-color)' }}>FREE</span>
            </div>
            <div className="cart-summary__row">
              <span className="cart-summary__total">Total Amount</span>
              <span className="cart-summary__total">₹{total}</span>
            </div>
            <button className="btn btn-primary" style={{ width: '100%', marginTop: 16 }}
              onClick={() => navigate('/checkout')}>
              Proceed to Checkout
            </button>
          </aside>
        </div>
      </div>
    </main>
  )
}
