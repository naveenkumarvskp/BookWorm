import React from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

/**
 * A single cart row in the checkout cart list.
 * Matches the wireframe card: cover | info+description | qty controls + price
 */
export default function CheckoutCartItem({ item }) {
  const { updateQty, removeFromCart } = useStore()

  return (
    <div className="co-cart-item">
      {/* Cover */}
      <div className="co-cart-item__cover-wrap">
        <img
          src={item.coverImage}
          alt={`Cover of ${item.title}`}
          className="co-cart-item__cover"
        />
      </div>

      {/* Info */}
      <div className="co-cart-item__info">
        <h3 className="co-cart-item__title">{item.title}</h3>
        <p className="co-cart-item__author">
          by{' '}
          <Link
            to={`/writer/${item.authorId || 'w1'}`}
            className="co-cart-item__author-link"
          >
            {item.author}
          </Link>
        </p>
        {item.description && (
          <p className="co-cart-item__desc">
            {item.description.slice(0, 80)}…
          </p>
        )}
        <p className="co-cart-item__format">{item.format}</p>
        {(item.genre || item.category) && (
          <p className="co-cart-item__category">
            <span className="co-cart-item__category-tag">
              {item.genre || 'Books'}
            </span>
            {', '}
            <span className="co-cart-item__category-tag">
              {item.category}
            </span>
          </p>
        )}
        <p className="co-cart-item__price-inline">₹{item.price}</p>
        <p className="co-cart-item__delivery">
          Delivery by {item.deliveryDate}
        </p>
      </div>

      {/* Qty + price */}
      <div className="co-cart-item__right">
        <div className="co-cart-item__qty" role="group" aria-label={`Quantity for ${item.title}`}>
          <button
            className="co-qty-btn"
            onClick={() => updateQty(item.id, item.qty - 1)}
            disabled={item.qty <= 1}
            aria-label={`Decrease quantity of ${item.title}`}
          >
            −
          </button>
          <span className="co-qty-val" aria-live="polite" aria-atomic="true">
            {item.qty}
          </span>
          <button
            className="co-qty-btn"
            onClick={() => updateQty(item.id, item.qty + 1)}
            aria-label={`Increase quantity of ${item.title}`}
          >
            +
          </button>
        </div>
        <p className="co-cart-item__total-price">₹{item.price * item.qty}</p>
        <button
          className="co-cart-item__remove"
          onClick={() => removeFromCart(item.id)}
          aria-label={`Remove ${item.title} from cart`}
        >
          Remove
        </button>
      </div>
    </div>
  )
}
