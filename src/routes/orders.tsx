import { createFileRoute } from '@tanstack/react-router'
import { useState, useMemo } from 'react'
import { Sidebar } from '@/sections/Sidebar'
import { TopBar } from '@/sections/TopBar'
import { RightSidebar } from '@/sections/RightSidebar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  Plus,
  SlidersHorizontal,
  ArrowUpDown,
  Search,
  Calendar,
  MoreHorizontal,
  X,
} from 'lucide-react'
import { orders as ordersData } from '@/data/dashboard'
import type { Order } from '@/types/dashboard'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/orders')({
  component: OrdersPage,
})

const statusColors = {
  'In Progress': 'text-[#8A8CD9]',
  Complete: 'text-[#4AA785]',
  Pending: 'text-[#59A8D4]',
  Approved: 'text-[#FFC555]',
  Rejected: 'text-[#1C1C1C66] dark:text-[#FFFFFF66]',
}

function OrdersPage() {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true)
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [nameFilter, setNameFilter] = useState('')
  const [orderIdFilter, setOrderIdFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [sortField, setSortField] = useState<keyof Order>('id')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredAndSortedOrders = useMemo(() => {
    let filtered = ordersData.filter((order) => {
      const matchesSearch =
        order.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus =
        statusFilter === 'all' || order.status === statusFilter

      const matchesName =
        nameFilter === '' ||
        order.user.name.toLowerCase().includes(nameFilter.toLowerCase())

      const matchesOrderId =
        orderIdFilter === '' ||
        order.id.toLowerCase().includes(orderIdFilter.toLowerCase())

      const matchesDate = dateFilter === '' || order.date.includes(dateFilter)

      return (
        matchesSearch &&
        matchesStatus &&
        matchesName &&
        matchesOrderId &&
        matchesDate
      )
    })

    filtered.sort((a, b) => {
      let aValue = a[sortField]
      let bValue = b[sortField]

      if (sortField === 'user') {
        aValue = a.user.name
        bValue = b.user.name
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }

      return 0
    })

    return filtered
  }, [
    searchQuery,
    statusFilter,
    sortField,
    sortDirection,
    nameFilter,
    orderIdFilter,
    dateFilter,
  ])

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredAndSortedOrders.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredAndSortedOrders, currentPage])

  const totalPages = Math.ceil(filteredAndSortedOrders.length / itemsPerPage)

  const toggleOrderSelection = (orderId: string) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId],
    )
  }

  const toggleAllOrders = () => {
    if (
      selectedOrders.length === paginatedOrders.length &&
      paginatedOrders.every((order) => selectedOrders.includes(order.id))
    ) {
      setSelectedOrders([])
    } else {
      const newSelectedOrders = paginatedOrders.map((order) => order.id)
      setSelectedOrders(newSelectedOrders)
    }
  }

  const handleSort = (field: keyof Order) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
    setCurrentPage(1)
    setSelectedOrders([])
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {leftSidebarOpen && (
        <div className="hidden lg:block">
          <Sidebar />
        </div>
      )}

      {/* Mobile sidebar */}
      {leftSidebarOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          onClick={() => setLeftSidebarOpen(false)}
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          <div
            className="absolute left-0 top-0 h-full animate-in slide-in-from-left duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar onClose={() => setLeftSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar
          breadcrumbs={[
            { label: 'Dashboards' },
            { label: 'Default', href: '/dashboard' },
          ]}
          onLeftSidebarToggle={() => setLeftSidebarOpen(!leftSidebarOpen)}
          onRightSidebarToggle={() => setRightSidebarOpen(!rightSidebarOpen)}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-6">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-sm inter-semibold text-foreground">
                Order List
              </h1>
            </div>

            {/* Toolbar */}
            <div className="mb-4 bg-[#F7F9FB] dark:bg-[#FFFFFF0D] rounded-lg px-4 py-2 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
              <div className="flex gap-4">
                <Plus className="size-4 cursor-pointer" />
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="p-0 cursor-pointer h-auto w-auto"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                  >
                    <SlidersHorizontal className="size-4 cursor-pointer" />
                  </Button>

                  {isFilterOpen && (
                    <div className="absolute left-0 mt-2 w-64 bg-white dark:bg-[#1C1C1C] border border-[#1C1C1C1A] dark:border-[#FFFFFF1A] rounded-lg shadow-lg z-50 p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-foreground">
                          Filters
                        </h3>
                        <button
                          onClick={() => setIsFilterOpen(false)}
                          className="p-1 hover:bg-accent/50 rounded transition-colors"
                        >
                          <X className="size-4" />
                        </button>
                      </div>

                      <div className="space-y-3">
                        {/* Order ID Filter */}
                        <div>
                          <label className="text-xs font-medium text-foreground mb-1.5 block">
                            Order ID
                          </label>
                          <Input
                            placeholder="Filter by Order ID"
                            value={orderIdFilter}
                            onChange={(e) => {
                              setOrderIdFilter(e.target.value)
                              setCurrentPage(1)
                            }}
                            className="h-8 text-sm"
                          />
                        </div>

                        {/* Name Filter */}
                        <div>
                          <label className="text-xs font-medium text-foreground mb-1.5 block">
                            Name
                          </label>
                          <Input
                            placeholder="Filter by Name"
                            value={nameFilter}
                            onChange={(e) => {
                              setNameFilter(e.target.value)
                              setCurrentPage(1)
                            }}
                            className="h-8 text-sm"
                          />
                        </div>

                        {/* Date Filter */}
                        <div>
                          <label className="text-xs font-medium text-foreground mb-1.5 block">
                            Date
                          </label>
                          <Input
                            placeholder="Filter by Date (e.g., Jan 15)"
                            value={dateFilter}
                            onChange={(e) => {
                              setDateFilter(e.target.value)
                              setCurrentPage(1)
                            }}
                            className="h-8 text-sm"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-medium text-foreground mb-1.5 block">
                            Status
                          </label>
                          <select
                            value={statusFilter}
                            onChange={(e) => {
                              setStatusFilter(e.target.value)
                              setCurrentPage(1)
                            }}
                            className="w-full h-8 text-sm px-2 rounded border border-[#1C1C1C1A] dark:border-[#FFFFFF1A] bg-white dark:bg-[#FFFFFF05] text-foreground"
                          >
                            <option value="all">All Statuses</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Complete">Complete</option>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full cursor-pointer mt-4"
                          onClick={() => {
                            setOrderIdFilter('')
                            setNameFilter('')
                            setDateFilter('')
                            setStatusFilter('all')
                            setCurrentPage(1)
                          }}
                        >
                          Clear Filters
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <ArrowUpDown className="size-4 cursor-pointer" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => handleSort('id')}>
                      Sort by Order ID
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSort('user')}>
                      Sort by User
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSort('project')}>
                      Sort by Project
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSort('date')}>
                      Sort by Date
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSort('status')}>
                      Sort by Status
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setCurrentPage(1)
                      setSelectedOrders([])
                    }}
                    className="pl-9 border border-[#FFFFFF1A] w-full sm:w-[200px]"
                  />
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={
                          paginatedOrders.length > 0 &&
                          selectedOrders.length === paginatedOrders.length
                        }
                        onCheckedChange={toggleAllOrders}
                      />
                    </TableHead>
                    <TableHead className="inter-normal text-[#1C1C1C66] dark:text-[#FFFFFF66] text-sm">
                      Order ID
                    </TableHead>
                    <TableHead className="inter-normal text-[#1C1C1C66] dark:text-[#FFFFFF66] text-sm">
                      User
                    </TableHead>
                    <TableHead className="inter-normal text-[#1C1C1C66] dark:text-[#FFFFFF66] text-sm hidden md:table-cell">
                      Project
                    </TableHead>
                    <TableHead className="inter-normal text-[#1C1C1C66] dark:text-[#FFFFFF66] text-sm hidden lg:table-cell">
                      Address
                    </TableHead>
                    <TableHead className="inter-normal text-[#1C1C1C66] dark:text-[#FFFFFF66] text-sm hidden sm:table-cell">
                      Date
                    </TableHead>
                    <TableHead className="inter-normal text-[#1C1C1C66] dark:text-[#FFFFFF66] text-sm">
                      Status
                    </TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedOrders.map((order) => (
                    <TableRow
                      key={order.id}
                      data-state={
                        selectedOrders.includes(order.id)
                          ? 'selected'
                          : undefined
                      }
                      className="group"
                    >
                      <TableCell>
                        <Checkbox
                          checked={selectedOrders.includes(order.id)}
                          onCheckedChange={() => toggleOrderSelection(order.id)}
                        />
                      </TableCell>
                      <TableCell className="font-normal">{order.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="size-8 transition-transform group-hover:scale-110">
                            <AvatarImage src={order.user.avatar} />
                            <AvatarFallback>
                              {order.user.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-normal">{order.user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden text-black dark:text-white md:table-cell font-normal">
                        {order.project}
                      </TableCell>
                      <TableCell className="hidden text-black dark:text-white lg:table-cell font-normal">
                        {order.address}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell font-normal">
                        <div className="flex items-center gap-2">
                          <Calendar className="size-3.5" />
                          {order.date}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={cn(
                            'flex items-center gap-x-1.5',
                            statusColors[order.status],
                          )}
                        >
                          <span className="size-2 rounded-full bg-current block" />
                          {order.status}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-end">
              <Pagination className="justify-end px-10">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => {
                        setCurrentPage((prev) => Math.max(1, prev - 1))
                        setSelectedOrders([])
                      }}
                      className={cn(
                        currentPage === 1 && 'cursor-pointer opacity-50',
                      )}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => {
                            setCurrentPage(page)
                            setSelectedOrders([])
                          }}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ),
                  )}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => {
                        setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                        setSelectedOrders([])
                      }}
                      className={cn(
                        currentPage === totalPages &&
                          'cursor-pointer opacity-50',
                      )}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </main>
      </div>

      {/* Right Sidebar */}
      {rightSidebarOpen && (
        <div className="hidden lg:block">
          <RightSidebar />
        </div>
      )}
    </div>
  )
}
