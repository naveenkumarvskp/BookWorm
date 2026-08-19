# 📚 BookWorm — React E-Bookstore

A complete, production-ready e-bookstore platform built with **React 18 + Vite + React Router v6**.  
Dark-themed, fully responsive, and feature-rich — browse, filter, and purchase books across 19 categories in 6 languages.

---

## ✨ Features

| Feature | Details |
|---------|---------|
| 📖 **Book Catalogue** | 48 books across all 19 categories |
| 🌍 **Multi-language** | English, Spanish, French, German, Hindi, Japanese |
| 🔍 **Search & Filters** | Filter by category, language, format, price range; sort by relevance / price / title / rating |
| 📄 **Book Details** | 3-column layout — gallery, info, related reads; user reviews |
| 🛒 **Shopping Cart** | Quantity controls, running total, free delivery |
| 💳 **Checkout** | Address form, gift points, coupon codes, payment methods |
| 💰 **Payment Screen** | Credit / debit card, UPI, wallet — with processing animation |
| ✅ **Order Success** | Bookstore-background confirmation modal with purchased books |
| 📦 **My Orders** | Order history with Buy Again |
| ❤️ **Wishlist** | Save books, move to cart |
| ✍️ **Authors** | Author grid + individual author pages |
| 🔔 **Toast notifications** | Real-time feedback for cart / wishlist actions |
| 💾 **Persistence** | Cart, wishlist and orders saved to `localStorage` |
| ♿ **Accessibility** | Semantic HTML, ARIA labels, keyboard navigation, focus states |
| 📱 **Responsive** | Desktop sidebar → tablet reduced → mobile drawer |

---

## 🛠️ Tech Stack

| Tool | Version |
|------|---------|
| [React](https://react.dev) | 18.3 |
| [Vite](https://vitejs.dev) | 6.0 |
| [React Router DOM](https://reactrouter.com) | 6.27 |
| CSS Variables | Custom dark theme — no UI framework |

---

## 📁 Project Structure

```
bookworm/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── App.jsx                    # Router, StoreProvider, layout
    ├── main.jsx                   # React DOM entry point
    │
    ├── context/
    │   └── StoreContext.jsx        # Cart, wishlist, orders, toasts
    │
    ├── data/
    │   ├── books.js               # 48 books + helpers
    │   ├── writers.js             # 27 authors
    │   ├── orders.js              # Mock order history
    │   └── reviews.js             # Seed reviews
    │
    ├── pages/
    │   ├── Home.jsx               # /
    │   ├── BookDetailsPage.jsx    # /book/:id
    │   ├── CartPage.jsx           # /cart
    │   ├── CheckoutPage.jsx       # /checkout
    │   ├── PaymentPage.jsx        # /payment
    │   ├── OrderSuccessPage.jsx   # /order-success
    │   ├── OrdersPage.jsx         # /orders
    │   ├── WishlistPage.jsx       # /wishlist
    │   ├── WritersPage.jsx        # /writers
    │   └── WriterDetailPage.jsx   # /writer/:id
    │
    ├── components/
    │   ├── Header.jsx
    │   ├── Footer.jsx
    │   ├── Sidebar.jsx
    │   ├── SearchFilters.jsx
    │   ├── BookCard.jsx
    │   ├── BookSection.jsx
    │   ├── BookDetails.jsx         # Quick-view modal
    │   ├── Breadcrumb.jsx
    │   ├── ProductGallery.jsx
    │   ├── ProductInfo.jsx
    │   ├── ProductActions.jsx
    │   ├── ProductMetadata.jsx
    │   ├── RelatedReads.jsx
    │   ├── WriterInfo.jsx
    │   ├── WriterCard.jsx
    │   ├── ReviewForm.jsx
    │   ├── ReviewList.jsx
    │   ├── CheckoutCart.jsx
    │   ├── CheckoutCartItem.jsx
    │   ├── AddressForm.jsx
    │   ├── GiftPoints.jsx
    │   ├── PaymentMethods.jsx
    │   ├── CouponInput.jsx
    │   ├── OrderSummary.jsx
    │   ├── PaymentContainer.jsx
    │   ├── PaymentMethodSelector.jsx
    │   ├── CardPaymentForm.jsx
    │   ├── UpiPaymentForm.jsx
    │   ├── WalletPaymentForm.jsx
    │   ├── BookstoreBackground.jsx  # SVG illustration (Payment + Order Success)
    │   ├── PurchaseConfirmation.jsx
    │   ├── SuccessIcon.jsx
    │   ├── PurchasedProductCard.jsx
    │   ├── ContinueShoppingButton.jsx
    │   ├── OrderCard.jsx
    │   └── RelatedProducts.jsx
    │
    └── styles/
        └── global.css             # All styles — CSS variables, components, responsive
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18  
- **npm** ≥ 9  

Check your versions:

```bash
node -v
npm -v
```

---

### 1 — Clone the repository

```bash
git clone https://github.com/naveenkumarvskp/BookWrom.git
cd BookWrom/bookworm
```

---

### 2 — Install dependencies

```bash
npm install
```

> If you are on a corporate network that blocks the default registry, use:
> ```bash
> npm install --registry https://registry.npmjs.org
> ```

---

### 3 — Start the development server

```bash
npm run dev
```

Open your browser at **http://localhost:5173**

The app hot-reloads automatically on every file save.

---

### 4 — Build for production

```bash
npm run build
```

Output is written to `dist/`. The production bundle is fully static — drop the `dist/` folder onto any static host (Netlify, Vercel, GitHub Pages, etc.).

---

### 5 — Preview the production build locally

```bash
npm run preview
```

Opens the built app at **http://localhost:4173**

---

## 🗺️ Available Routes

| Route | Page |
|-------|------|
| `/` | Home — book catalogue with sidebar, search & filters |
| `/book/:id` | Book details — gallery, info, related reads, reviews |
| `/cart` | Shopping cart |
| `/checkout` | Checkout — address, gift points, payment method |
| `/payment` | Payment screen — card / UPI / wallet |
| `/order-success` | Order confirmation |
| `/orders` | My Orders |
| `/wishlist` | My Wishlist |
| `/writers` | Authors grid |
| `/writer/:id` | Author detail + their books |

---

## 🧪 Demo Coupon Codes

Use these on the Checkout page:

| Code | Discount |
|------|----------|
| `BOOK100` | ₹100 off |
| `SAVE50` | ₹50 off |
| `WELCOME10` | ₹10 off |
| `READMORE` | ₹75 off |

---

## 💡 Demo Payment Details

Any values that pass validation are accepted — no real payment is processed.

**Credit / Debit Card**
```
Card Number : 4111-1111-1111-1111
Name        : Any Name
Expiry      : 12/2027
CVV         : 123
```

**UPI**
```
UPI ID : test@upi
```

**Wallet** — select any wallet from the list.

---

## 📦 npm Scripts

| Script | Command | Description |
|--------|---------|-------------|
| Dev server | `npm run dev` | Start Vite dev server with HMR |
| Production build | `npm run build` | Bundle for production into `dist/` |
| Preview build | `npm run preview` | Serve the `dist/` bundle locally |

---

## 🌐 Deployment

The app is a fully static SPA. After `npm run build`, deploy the `dist/` folder to any static host.

### Netlify (drag & drop)
1. Run `npm run build`
2. Drag the `dist/` folder to [netlify.com/drop](https://app.netlify.com/drop)

### Vercel
```bash
npx vercel --prod
```

### GitHub Pages
Add `base: '/BookWrom/'` to `vite.config.js`, then:
```bash
npm run build
npx gh-pages -d dist
```

> **Important:** For all SPA deployments, configure your host to redirect all 404s to `index.html` so React Router handles the routes.

---

## 🔧 Environment & Configuration

No `.env` file is required. The app uses only browser-native APIs (`localStorage`) and generates all placeholder book covers as inline SVG data URIs — no external image CDN or API keys are needed.

---

## 📝 License

MIT — free to use, modify and distribute.
