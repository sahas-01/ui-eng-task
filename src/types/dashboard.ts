export interface MetricCard {
  title: string
  value: string | number
  change: number
  trend: 'up' | 'down'
}

export interface Order {
  id: string
  user: {
    name: string
    avatar: string
  }
  project: string
  address: string
  date: string
  status: 'In Progress' | 'Complete' | 'Pending' | 'Approved' | 'Rejected'
}

export interface Product {
  name: string
  price: number
  quantity: number
  amount: number
}

export interface Activity {
  id: string
  type: 'bug' | 'release' | 'submission' | 'modification' | 'deletion'
  title: string
  time: string
  avatar?: string
}

export interface Notification {
  id: string
  type: 'bug' | 'user' | 'subscription'
  title: string
  time: string
  avatar?: string
}

export interface Contact {
  id: string
  name: string
  avatar: string
}

export interface RevenueData {
  month: string
  current: number
  previous: number
}

export interface ProjectionData {
  month: string
  projections: number
  actuals: number
}

export interface LocationData {
  city: string
  value: number
}

export interface SalesData {
  name: string
  value: number
  color: string
  [key: string]: string | number
}
