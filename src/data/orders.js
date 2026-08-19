// Mock order history — used for the My Orders page and Buy Again feature
import { books } from './books.js'

function getBook(id) {
  return books.find(b => b.id === id)
}

export const mockOrders = [
  {
    id: 'BW-20240715-001',
    date: '15 Jul 2024',
    status: 'Delivered',
    items: [
      { ...getBook('1'), qty: 1 },
      { ...getBook('3'), qty: 1 },
    ],
  },
  {
    id: 'BW-20240820-002',
    date: '20 Aug 2024',
    status: 'Delivered',
    items: [
      { ...getBook('4'), qty: 2 },
    ],
  },
  {
    id: 'BW-20241105-003',
    date: '5 Nov 2024',
    status: 'Delivered',
    items: [
      { ...getBook('7'), qty: 1 },
      { ...getBook('13'), qty: 1 },
    ],
  },
  {
    id: 'BW-20250210-004',
    date: '10 Feb 2025',
    status: 'Shipped',
    items: [
      { ...getBook('11'), qty: 1 },
    ],
  },
]
