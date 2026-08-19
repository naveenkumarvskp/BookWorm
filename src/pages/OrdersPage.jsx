import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OrderCard from '../components/OrderCard'
import { useStore } from '../context/StoreContext'
import { mockOrders } from '../data/orders'

export default function OrdersPage() {
  const { orders: liveOrders } = useStore()
  const navigate = useNavigate()

  // Merge live orders (placed during this session) with mock seed data
  const allOrders = [...liveOrders, ...mockOrders]

  return (
    <main className="main-content" id="main-content">
      <div className="orders-page">
        <div className="breadcrumb">
          <Link to="/">Home</Link><span>›</span><span>My Orders</span>
        </div>
        <h1 className="orders-page__title">
          My Orders ({allOrders.length})
        </h1>

        {allOrders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state__icon">📦</div>
            <p className="empty-state__title">No orders yet</p>
            <p className="empty-state__sub">Your completed orders will appear here.</p>
            <Link to="/" className="btn btn-primary" style={{ marginTop: 16 }}>Start Shopping</Link>
          </div>
        ) : (
          <div className="orders-list">
            {allOrders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
