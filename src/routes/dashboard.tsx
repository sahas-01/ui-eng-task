import { createFileRoute } from '@tanstack/react-router'
import { Sidebar } from '@/sections/Sidebar'
import { TopBar } from '@/sections/TopBar'
import { RightSidebar } from '@/sections/RightSidebar'
import { MetricCard } from '@/components/MetricCard'
import { ProjectionsChart } from '@/components/ProjectionsChart'
import { RevenueChart } from '@/components/RevenueChart'
import { SalesChart } from '@/components/SalesChart'
import { RevenueByLocation } from '@/components/RevenueByLocation'
import { ProductsTable } from '@/components/ProductsTable'
import { metrics } from '@/data/dashboard'
import { useState } from 'react'

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          <div
            className="absolute left-0 top-0 h-full animate-in slide-in-from-left duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar />
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
          onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-6 space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                eCommerce
              </h1>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {metrics.map((metric, index) => (
                <MetricCard key={index} {...metric} />
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <ProjectionsChart />
              <RevenueChart />
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <ProductsTable />
              </div>
              <div className="space-y-6">
                <RevenueByLocation />
                <SalesChart />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Right Sidebar */}
      <div className="hidden xl:block">
        <RightSidebar />
      </div>
    </div>
  )
}
