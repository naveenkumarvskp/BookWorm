import React from 'react'
import { useStore } from '../context/StoreContext'

function StatusBadge({ status }) {
  const colorMap = {
    Delivered: 'var(--delivery-color)',
    Shipped: 'var(--accent)',
    Processing: 'var(--price-color)',
    Cancelled: 'var(--danger)',
  }
  return (
    <span
      className="order-card__status"
      style={{ color: colorMap[status] || 'var(--text-secondary)', borderColor: colorMap[status] || 'var(--border-color)' }}
    >
      {status}
    </span>
  )
}

export default function OrderCard({ order }) {
  const { buyAgain } = useStore()
  // Prefer stored order.total (set by placeOrder); fall back to summing items + delivery
  const total = order.total ?? order.items.reduce((s, i) => s + i.price * (i.qty || 1), 0)

  return (
    <article className="order-card" aria-label={`Order ${order.id}`}>
      <div className="order-card__header">
        <div className="order-card__meta">
          <span className="order-card__id">{order.id}</span>
          <span className="order-card__date">Ordered: {order.date}</span>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="order-card__items">
        {order.items.map((item, idx) => (
          <div key={`${item.id}-${idx}`} className="order-card__item">
            <img
              src={item.coverImage}
              alt={`Cover of ${item.title}`}
              className="order-card__item-cover"
            />
            <div className="order-card__item-info">
              <p className="order-card__item-title">{item.title}</p>
              <p className="order-card__item-author">by {item.author}</p>
              <p className="order-card__item-format">{item.format}</p>
            </div>
            <div className="order-card__item-right">
              <span className="order-card__item-qty">Qty: {item.qty || 1}</span>
              <span className="order-card__item-price">₹{item.price * (item.qty || 1)}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="order-card__footer">
        <span className="order-card__total">
          Total: <strong>₹{total + 49}</strong>
        </span>
        <button
          className="btn btn-primary"
          style={{ padding: '8px 18px', fontSize: '13px' }}
          onClick={() => buyAgain(order.items)}
          aria-label={`Buy again items from order ${order.id}`}
        >
          Buy Again
        </button>
      </div>
    </article>
  )
}
