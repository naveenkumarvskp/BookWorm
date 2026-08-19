import React from 'react'
import { Link } from 'react-router-dom'

export default function OrderConfirmation({ orderItems, orderId }) {
  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.qty, 0)
  const total = subtotal + 49

  return (
    <div className="order-confirm" role="main" aria-live="polite">
      <div className="order-confirm__icon" aria-hidden="true">✓</div>
      <h1 className="order-confirm__title">Order Placed!</h1>
      <p className="order-confirm__sub">
        Thank you for your purchase. Your books will be delivered soon.
      </p>
      <p className="order-confirm__id">
        Order ID: <strong>{orderId}</strong>
      </p>

      <div className="order-confirm__items" aria-label="Ordered items">
        <p className="order-confirm__items-title">Items Ordered</p>
        {orderItems.map((item) => (
          <div key={item.id} className="order-confirm__item">
            <img
              src={item.coverImage}
              alt={item.title}
              className="order-confirm__item-cover"
            />
            <div className="order-confirm__item-info">
              <p className="order-confirm__item-title">{item.title}</p>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                by {item.author} · Qty: {item.qty}
              </p>
            </div>
            <span className="order-confirm__item-price">₹{item.price * item.qty}</span>
          </div>
        ))}
      </div>

      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
        Total Paid: <strong style={{ color: 'var(--price-color)' }}>₹{total}</strong>
        &nbsp;· Estimated Delivery: <strong>Mon, 25 Jul</strong>
      </p>

      <div className="order-confirm__actions">
        <Link to="/" className="btn btn-primary">
          Continue Shopping
        </Link>
        <Link to="/orders" className="btn btn-outline">
          View My Orders
        </Link>
      </div>
    </div>
  )
}
