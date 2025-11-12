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
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-background text-foreground">
      {leftSidebarOpen && (
        <div className="hidden lg:block">
          <Sidebar />
        </div>
      )}

      {/* Mobile left sidebar */}
      {leftSidebarOpen && (
        <div
          className="fixed inset-0 z-50 sm:hidden"
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
          <div className="p-4 lg:p-6 space-y-6">
            {/* eCommerce Section */}
            <div className="space-y-6">
              <h1 className="text-base inter-semibold text-black dark:text-white">
                eCommerce
              </h1>

              {/* eCommerce Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Metrics Grid - Left Side (2x2 Grid) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {metrics.map((metric, index) => (
                    <MetricCard key={index} {...metric} />
                  ))}
                </div>

                {/* Projections Chart - Right Side */}
                <ProjectionsChart />
              </div>
            </div>

            {/* Revenue Charts Row */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <RevenueChart />
              </div>
              <div>
                <RevenueByLocation />
              </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <ProductsTable />
              </div>
              <div>
                <SalesChart />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Right Sidebar */}
      {rightSidebarOpen && (
        <div className="hidden xl:block">
          <RightSidebar />
        </div>
      )}
    </div>
  )
}
