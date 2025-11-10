import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import {
  LayoutDashboard,
  ShoppingCart,
  FolderKanban,
  GraduationCap,
  User,
  FileText,
  Briefcase,
  BookOpen,
  Share2,
  Star,
  ChevronRight,
  ChevronDown,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavItem {
  title: string
  icon: React.ReactNode
  href?: string
  badge?: string
  children?: NavItem[]
}

const navItems = {
  favorites: [
    { title: 'Overview', icon: <Star className="size-4" />, href: '/' },
    {
      title: 'Projects',
      icon: <FolderKanban className="size-4" />,
      href: '/projects',
    },
  ],
  dashboards: [
    {
      title: 'Default',
      icon: <LayoutDashboard className="size-4" />,
      href: '/dashboard',
    },
    {
      title: 'eCommerce',
      icon: <ShoppingCart className="size-4" />,
      href: '/dashboard',
    },
    {
      title: 'Projects',
      icon: <FolderKanban className="size-4" />,
      href: '/dashboard',
    },
    {
      title: 'Online Courses',
      icon: <GraduationCap className="size-4" />,
      href: '/dashboard',
    },
  ],
  pages: [
    {
      title: 'User Profile',
      icon: <User className="size-4" />,
      children: [
        { title: 'Overview', icon: null, href: '/profile/overview' },
        { title: 'Projects', icon: null, href: '/profile/projects' },
        { title: 'Campaigns', icon: null, href: '/profile/campaigns' },
        { title: 'Documents', icon: null, href: '/profile/documents' },
        { title: 'Followers', icon: null, href: '/profile/followers' },
      ],
    },
    { title: 'Account', icon: <User className="size-4" />, href: '/account' },
    {
      title: 'Corporate',
      icon: <Briefcase className="size-4" />,
      href: '/corporate',
    },
    { title: 'Blog', icon: <BookOpen className="size-4" />, href: '/blog' },
    { title: 'Social', icon: <Share2 className="size-4" />, href: '/social' },
  ],
}

function NavItemComponent({
  item,
  depth = 0,
}: {
  item: NavItem
  depth?: number
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const hasChildren = item.children && item.children.length > 0

  const content = (
    <div
      className={cn(
        'flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200',
        'hover:bg-accent/50 dark:hover:bg-accent/30 cursor-pointer group',
        'text-muted-foreground hover:text-foreground',
        depth > 0 && 'pl-8',
      )}
      onClick={() => hasChildren && setIsExpanded(!isExpanded)}
    >
      {item.icon && (
        <span className="shrink-0 transition-transform group-hover:scale-110">
          {item.icon}
        </span>
      )}
      <span className="flex-1 font-medium">{item.title}</span>
      {hasChildren && (
        <span className="shrink-0 transition-transform duration-200">
          {isExpanded ? (
            <ChevronDown className="size-4" />
          ) : (
            <ChevronRight className="size-4" />
          )}
        </span>
      )}
    </div>
  )

  return (
    <div>
      {item.href && !hasChildren ? (
        <Link to={item.href}>{content}</Link>
      ) : (
        content
      )}
      {hasChildren && isExpanded && (
        <div className="mt-1 space-y-1 animate-in slide-in-from-top-2 duration-200">
          {item.children?.map((child, index) => (
            <NavItemComponent key={index} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-white dark:bg-[#1C1C1C] border-r border-border flex flex-col overflow-y-auto">
      {/* Logo */}
      <div className="p-4 border-b border-border">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-foreground hover:opacity-80 transition-opacity"
        >
          <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">B</span>
          </div>
          <span className="font-semibold text-lg">ByeWind</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-6">
        {/* Favorites */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3">
            Favorites
          </h3>
          <div className="space-y-1">
            {navItems.favorites.map((item, index) => (
              <NavItemComponent key={index} item={item} />
            ))}
          </div>
        </div>

        {/* Recently */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3">
            Recently
          </h3>
          {/* Empty state - can be populated dynamically */}
        </div>

        {/* Dashboards */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3">
            Dashboards
          </h3>
          <div className="space-y-1">
            {navItems.dashboards.map((item, index) => (
              <NavItemComponent key={index} item={item} />
            ))}
          </div>
        </div>

        {/* Pages */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3">
            Pages
          </h3>
          <div className="space-y-1">
            {navItems.pages.map((item, index) => (
              <NavItemComponent key={index} item={item} />
            ))}
          </div>
        </div>
      </nav>
    </aside>
  )
}
