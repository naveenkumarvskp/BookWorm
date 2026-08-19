import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react'

// ─── localStorage helpers ────────────────────────────────────────────────────
function loadLS(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw !== null ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function saveLS(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {}
}

// ─── Context ─────────────────────────────────────────────────────────────────
const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [cart,    setCart]    = useState(() => loadLS('bw_cart',    []))
  const [wishlist,setWishlist]= useState(() => loadLS('bw_wishlist',[]))
  const [orders,  setOrders]  = useState(() => loadLS('bw_orders',  []))
  const [toasts,  setToasts]  = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const timerRef = useRef({})

  // Persist
  useEffect(() => { saveLS('bw_cart',    cart)    }, [cart])
  useEffect(() => { saveLS('bw_wishlist',wishlist) }, [wishlist])
  useEffect(() => { saveLS('bw_orders',  orders)  }, [orders])

  // ── Toast ──────────────────────────────────────────────────────────────────
  const showToast = useCallback((message) => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, message }])
    timerRef.current[id] = setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
      delete timerRef.current[id]
    }, 2800)
  }, [])

  // ── Cart ───────────────────────────────────────────────────────────────────
  const addToCart = useCallback((book) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === book.id)
      if (existing) {
        showToast(`"${book.title}" quantity updated`)
        return prev.map(i => i.id === book.id ? { ...i, qty: i.qty + 1 } : i)
      }
      showToast(`"${book.title}" added to cart`)
      return [...prev, { ...book, qty: 1 }]
    })
  }, [showToast])

  const updateQty = useCallback((id, qty) => {
    if (qty < 1) return
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }, [])

  const removeFromCart = useCallback((id) => {
    setCart(prev => {
      const item = prev.find(i => i.id === id)
      if (item) showToast(`"${item.title}" removed from cart`)
      return prev.filter(i => i.id !== id)
    })
  }, [showToast])

  const clearCart = useCallback(() => setCart([]), [])

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0)

  // ── Wishlist ───────────────────────────────────────────────────────────────
  const toggleWishlist = useCallback((book) => {
    setWishlist(prev => {
      if (prev.some(b => b.id === book.id)) {
        showToast(`Removed from wishlist`)
        return prev.filter(b => b.id !== book.id)
      }
      showToast(`Added to wishlist`)
      return [...prev, book]
    })
  }, [showToast])

  const isWishlisted = useCallback((id) => wishlist.some(b => b.id === id), [wishlist])

  const moveWishlistToCart = useCallback((book) => {
    setWishlist(prev => prev.filter(b => b.id !== book.id))
    addToCart(book)
  }, [addToCart])

  // ── Orders ─────────────────────────────────────────────────────────────────
  /**
   * placeOrder({ subtotal, tax, delivery, couponDiscount, giftDiscount,
   *              paymentMethod, address })
   * Returns the new order id.
   */
  const placeOrder = useCallback(({
    subtotal        = cartTotal,
    tax             = 0,
    delivery        = 0,
    couponDiscount  = 0,
    giftDiscount    = 0,
    paymentMethod   = 'card',
    address         = {},
  } = {}) => {
    if (cart.length === 0) return null

    const totalDiscount = couponDiscount + giftDiscount
    const total = Math.max(0, subtotal + tax + delivery - totalDiscount)

    const now   = new Date()
    const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    const idSuffix = `${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}`

    const order = {
      id:              `ORD-${idSuffix}-${String(orders.length + 1).padStart(3,'0')}`,
      date:            dateStr,
      status:          'Confirmed',
      items:           cart.map(i => ({ ...i })),
      subtotal,
      tax,
      deliveryCharges: delivery,
      couponDiscount,
      giftDiscount,
      total,
      paymentMethod,
      address,
    }

    setOrders(prev => [order, ...prev])
    clearCart()
    return order.id
  }, [cart, cartTotal, orders.length, clearCart])

  const buyAgain = useCallback((orderItems) => {
    orderItems.forEach(item => addToCart({ ...item, qty: undefined }))
    showToast('Items added to cart!')
  }, [addToCart, showToast])

  // ── Sidebar ────────────────────────────────────────────────────────────────
  const toggleSidebar = useCallback(() => setSidebarOpen(v => !v), [])
  const closeSidebar  = useCallback(() => setSidebarOpen(false),   [])

  return (
    <StoreContext.Provider value={{
      // Cart
      cart, cartCount, cartTotal, addToCart, updateQty, removeFromCart, clearCart,
      // Wishlist
      wishlist, toggleWishlist, isWishlisted, moveWishlistToCart,
      // Orders
      orders, placeOrder, buyAgain,
      // UI
      toasts, showToast,
      activeCategory, setActiveCategory,
      sidebarOpen, toggleSidebar, closeSidebar,
    }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside StoreProvider')
  return ctx
}
