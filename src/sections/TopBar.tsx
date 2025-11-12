import {
  Search,
  Star,
  History,
  Bell,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'
import { useState } from 'react'
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CollapsibleIcon } from '@/components/icons/CollapsibleIcon'

interface TopBarProps {
  breadcrumbs?: { label: string; href?: string }[]
  onLeftSidebarToggle?: () => void
  onRightSidebarToggle?: () => void
}

export function TopBar({
  breadcrumbs,
  onLeftSidebarToggle,
  onRightSidebarToggle,
}: TopBarProps) {
  const [isUpdatesOpen, setIsUpdatesOpen] = useState(false)

  const updates = [
    {
      id: 1,
      title: 'New Order Received',
      description: 'Order #12345 from John Doe',
      time: '2 hours ago',
      type: 'success',
    },
    {
      id: 2,
      title: 'Payment Processed',
      description: 'Invoice #INV-2024-001 paid',
      time: '4 hours ago',
      type: 'success',
    },
    {
      id: 3,
      title: 'Low Stock Alert',
      description: 'Product SKU-789 inventory low',
      time: '6 hours ago',
      type: 'warning',
    },
    {
      id: 4,
      title: 'System Update',
      description: 'Database maintenance scheduled',
      time: '1 day ago',
      type: 'info',
    },
  ]

  return (
    <header className="h-[70px] border-b border-[#1C1C1C1A] dark:border-[#FFFFFF1A] bg-white dark:bg-[#1C1C1C] sticky top-0 z-10 backdrop-blur-xs">
      <div className="h-full px-4 flex items-center justify-between gap-4">
        {/* Left side - Breadcrumbs */}
        <div className="flex px-2 items-center gap-4">
          {/* <Button variant="ghost" size="icon-sm" onClick={onLeftSidebarToggle}> */}
          <CollapsibleIcon
            onClick={onLeftSidebarToggle}
            className="size-4 mt-0.5 text-black dark:text-white"
          />
          {/* </Button> */}
          <Star className="size-4 text-black dark:text-white" />
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="flex items-center gap-2 text-sm">
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center gap-2">
                  {index > 0 && (
                    <span className="text-[#1C1C1C66] dark:text-[#FFFFFF66]">
                      /
                    </span>
                  )}
                  <span
                    className={cn(
                      index === breadcrumbs.length - 1
                        ? 'text-foreground font-medium'
                        : 'text-[#1C1C1C66] dark:text-[#FFFFFF66] hover:text-foreground transition-colors cursor-pointer',
                    )}
                  >
                    {crumb.label}
                  </span>
                </div>
              ))}
            </nav>
          )}
        </div>

        {/* Right side - Search and Controls */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search"
              className="px-9 rounded-xl w-[200px] h-10 bg-[#1C1C1C0D] dark:bg-[#FFFFFF1A] transition-all duration-200 focus:w-[250px] lg:focus:w-[350px]"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>

          {/* Mobile search button */}
          <Button variant="ghost" size="icon-sm" className="md:hidden">
            <Search className="size-4" />
          </Button>

          <AnimatedThemeToggler className="flex items-center justify-center size-4 rounded-md hover:bg-accent transition-colors" />

          <Button variant="ghost" size="icon-sm" className="hidden sm:flex">
            <History className="size-4" />
          </Button>

          {/* Updates Popover */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon-sm"
              className="flex relative"
              onClick={() => setIsUpdatesOpen(!isUpdatesOpen)}
            >
              <Bell className="size-4" />
              <span className="absolute top-1.5 right-1.5 size-2 bg-destructive rounded-full" />
            </Button>

            {isUpdatesOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#1C1C1C] border border-[#1C1C1C1A] dark:border-[#FFFFFF1A] rounded-lg shadow-lg z-50">
                {/* Header */}
                <div className="p-4 border-b border-[#1C1C1C1A] dark:border-[#FFFFFF1A]">
                  <h3 className="text-sm font-semibold text-foreground">
                    Updates
                  </h3>
                </div>

                {/* Updates List */}
                <div className="max-h-96 overflow-y-auto">
                  {updates.map((update) => (
                    <div
                      key={update.id}
                      className="p-4 border-b border-[#1C1C1C0D] dark:border-[#FFFFFF0D] hover:bg-[#F7F9FB] dark:hover:bg-[#FFFFFF05] transition-colors cursor-pointer"
                    >
                      <div className="flex gap-3">
                        <div className="shrink-0 mt-1">
                          {update.type === 'success' && (
                            <CheckCircle className="size-4 text-[#4AA785]" />
                          )}
                          {update.type === 'warning' && (
                            <AlertCircle className="size-4 text-[#FFC555]" />
                          )}
                          {update.type === 'info' && (
                            <Bell className="size-4 text-[#A8C5DA]" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">
                            {update.title}
                          </p>
                          <p className="text-xs text-[#1C1C1C66] dark:text-[#FFFFFF66] mt-1">
                            {update.description}
                          </p>
                          <p className="text-xs text-[#1C1C1C33] dark:text-[#FFFFFF33] mt-2">
                            {update.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="p-3 border-t border-[#1C1C1C1A] dark:border-[#FFFFFF1A]">
                  <button className="w-full text-center text-sm text-[#A8C5DA] hover:text-[#8AAFCD] transition-colors">
                    View all updates
                  </button>
                </div>
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon-sm"
            className="flex"
            onClick={onRightSidebarToggle}
          >
            <CollapsibleIcon className="size-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
