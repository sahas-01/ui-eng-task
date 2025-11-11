import { Search, Star, History, Bell } from 'lucide-react'
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
  return (
    <header className="h-[68px] border-b border-[#1C1C1C1A] dark:border-[#FFFFFF1A] bg-white dark:bg-[#1C1C1C] sticky top-0 z-10 backdrop-blur-sm">
      <div className="h-full px-4 flex items-center justify-between gap-4">
        {/* Left side - Breadcrumbs */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon-sm" onClick={onLeftSidebarToggle}>
            <CollapsibleIcon className="size-4 text-black dark:text-white" />
          </Button>
          <Star className="size-4 text-black dark:text-white" />
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="hidden sm:flex items-center gap-2 text-sm">
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center gap-2">
                  {index > 0 && (
                    <span className="text-muted-foreground">/</span>
                  )}
                  <span
                    className={cn(
                      index === breadcrumbs.length - 1
                        ? 'text-foreground font-medium'
                        : 'text-muted-foreground hover:text-foreground transition-colors cursor-pointer',
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

          <Button
            variant="ghost"
            size="icon-sm"
            className="hidden sm:flex relative"
          >
            <Bell className="size-4" />
            <span className="absolute top-1.5 right-1.5 size-2 bg-destructive rounded-full" />
          </Button>

          <Button
            variant="ghost"
            size="icon-sm"
            className="hidden sm:flex"
            onClick={onRightSidebarToggle}
          >
            <CollapsibleIcon className="size-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
