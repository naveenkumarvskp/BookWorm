import React from 'react'
import CheckoutCartItem from './CheckoutCartItem'
import { useStore } from '../context/StoreContext'

/**
 * Cart section at the top of the checkout page.
 * Lists all items with quantity controls.
 */
export default function CheckoutCart() {
  const { cart } = useStore()

  return (
    <section className="co-cart" aria-label="Shopping Cart">
      <h2 className="co-cart__heading">Shopping Cart</h2>
      <div className="co-cart__list" role="list">
        {cart.map(item => (
          <CheckoutCartItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
