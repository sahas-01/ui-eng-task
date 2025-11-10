import type {
  MetricCard,
  Order,
  Product,
  Activity,
  Notification,
  Contact,
  RevenueData,
  ProjectionData,
  LocationData,
  SalesData,
} from '@/types/dashboard'

export const metrics: MetricCard[] = [
  {
    title: 'Customers',
    value: '3,781',
    change: 11.01,
    trend: 'up',
  },
  {
    title: 'Orders',
    value: '1,219',
    change: -0.03,
    trend: 'down',
  },
  {
    title: 'Revenue',
    value: '$695',
    change: 15.03,
    trend: 'up',
  },
  {
    title: 'Growth',
    value: '30.1%',
    change: 6.08,
    trend: 'up',
  },
]

export const projectionData: ProjectionData[] = [
  { month: 'Jan', projections: 4, actuals: 16 },
  { month: 'Feb', projections: 5, actuals: 20 },
  { month: 'Mar', projections: 5, actuals: 16 },
  { month: 'Apr', projections: 6, actuals: 22 },
  { month: 'May', projections: 3, actuals: 14 },
  { month: 'Jun', projections: 5, actuals: 20 },
]

export const revenueData: RevenueData[] = [
  { month: 'Jan', current: 10, previous: 12 },
  { month: 'Feb', current: 15, previous: 8 },
  { month: 'Mar', current: 11, previous: 16 },
  { month: 'Apr', current: 16, previous: 11 },
  { month: 'May', current: 18, previous: 19 },
  { month: 'Jun', current: 23, previous: 20 },
]

export const locationData: LocationData[] = [
  { city: 'New York', value: 72000 },
  { city: 'San Francisco', value: 39000 },
  { city: 'Sydney', value: 25000 },
  { city: 'Singapore', value: 61000 },
]

export const products: Product[] = [
  {
    name: 'ASOS Ridley High Waist',
    price: 79.49,
    quantity: 82,
    amount: 6518.18,
  },
  {
    name: 'Marco Lightweight Shirt',
    price: 128.5,
    quantity: 37,
    amount: 4754.5,
  },
  {
    name: 'Half Sleeve Shirt',
    price: 39.99,
    quantity: 64,
    amount: 2559.36,
  },
  {
    name: 'Lightweight Jacket',
    price: 20.0,
    quantity: 184,
    amount: 3680.0,
  },
  {
    name: 'Marco Shoes',
    price: 79.49,
    quantity: 64,
    amount: 1965.81,
  },
]

export const salesData: SalesData[] = [
  { name: 'Direct', value: 300.56, color: '#8B5CF6' },
  { name: 'Affiliate', value: 135.18, color: '#3B82F6' },
  { name: 'Sponsored', value: 154.02, color: '#10B981' },
  { name: 'E-mail', value: 48.96, color: '#F59E0B' },
]

export const orders: Order[] = [
  {
    id: '#CM9801',
    user: {
      name: 'Natali Craig',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    project: 'Landing Page',
    address: 'Meadow Lane Oakland',
    date: 'Just now',
    status: 'In Progress',
  },
  {
    id: '#CM9802',
    user: {
      name: 'Kate Morrison',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    project: 'CRM Admin pages',
    address: 'Larry San Francisco',
    date: 'A minute ago',
    status: 'Complete',
  },
  {
    id: '#CM9803',
    user: {
      name: 'Drew Cano',
      avatar: 'https://i.pravatar.cc/150?img=33',
    },
    project: 'Client Project',
    address: 'Bagwell Avenue Ocala',
    date: '1 hour ago',
    status: 'Pending',
  },
  {
    id: '#CM9804',
    user: {
      name: 'Orlando Diggs',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
    project: 'Admin Dashboard',
    address: 'Washburn Baton Rouge',
    date: 'Yesterday',
    status: 'Approved',
  },
  {
    id: '#CM9805',
    user: {
      name: 'Andi Lane',
      avatar: 'https://i.pravatar.cc/150?img=32',
    },
    project: 'App Landing Page',
    address: 'Nest Lane Olivette',
    date: 'Feb 2, 2023',
    status: 'Rejected',
  },
  {
    id: '#CM9801',
    user: {
      name: 'Natali Craig',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    project: 'Landing Page',
    address: 'Meadow Lane Oakland',
    date: 'Just now',
    status: 'In Progress',
  },
  {
    id: '#CM9802',
    user: {
      name: 'Kate Morrison',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    project: 'CRM Admin pages',
    address: 'Larry San Francisco',
    date: 'A minute ago',
    status: 'Complete',
  },
  {
    id: '#CM9803',
    user: {
      name: 'Drew Cano',
      avatar: 'https://i.pravatar.cc/150?img=33',
    },
    project: 'Client Project',
    address: 'Bagwell Avenue Ocala',
    date: '1 hour ago',
    status: 'Pending',
  },
  {
    id: '#CM9804',
    user: {
      name: 'Orlando Diggs',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
    project: 'Admin Dashboard',
    address: 'Washburn Baton Rouge',
    date: 'Yesterday',
    status: 'Approved',
  },
  {
    id: '#CM9805',
    user: {
      name: 'Andi Lane',
      avatar: 'https://i.pravatar.cc/150?img=32',
    },
    project: 'App Landing Page',
    address: 'Nest Lane Olivette',
    date: 'Feb 2, 2023',
    status: 'Rejected',
  },
]

export const notifications: Notification[] = [
  {
    id: '1',
    type: 'bug',
    title: 'You have a bug that needs...',
    time: 'Just now',
  },
  {
    id: '2',
    type: 'user',
    title: 'New user registered',
    time: '59 minutes ago',
    avatar: 'https://i.pravatar.cc/150?img=20',
  },
  {
    id: '3',
    type: 'bug',
    title: 'You have a bug that needs...',
    time: '12 hours ago',
  },
  {
    id: '4',
    type: 'subscription',
    title: 'Andi Lane subscribed to you',
    time: 'Today, 11:59 AM',
    avatar: 'https://i.pravatar.cc/150?img=32',
  },
]

export const activities: Activity[] = [
  {
    id: '1',
    type: 'bug',
    title: 'You have a bug that needs...',
    time: 'Just now',
  },
  {
    id: '2',
    type: 'release',
    title: 'Released a new version',
    time: '59 minutes ago',
  },
  {
    id: '3',
    type: 'submission',
    title: 'Submitted a bug',
    time: '12 hours ago',
  },
  {
    id: '4',
    type: 'modification',
    title: 'Modified A data in Page X',
    time: 'Today, 11:59 AM',
  },
  {
    id: '5',
    type: 'deletion',
    title: 'Deleted a page in Project X',
    time: 'Feb 2, 2023',
  },
]

export const contacts: Contact[] = [
  {
    id: '1',
    name: 'Natali Craig',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    name: 'Drew Cano',
    avatar: 'https://i.pravatar.cc/150?img=33',
  },
  {
    id: '3',
    name: 'Orlando Diggs',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: '4',
    name: 'Andi Lane',
    avatar: 'https://i.pravatar.cc/150?img=32',
  },
  {
    id: '5',
    name: 'Kate Morrison',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: '6',
    name: 'Koray Okumus',
    avatar: 'https://i.pravatar.cc/150?img=15',
  },
]
