import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ChevronRight, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DefaultIcon } from '@/components/icons/SideBar/DefaultIcon'
import { EcommerceIcon } from '@/components/icons/SideBar/EcommerceIcon'
import { ProjectsIcon } from '@/components/icons/SideBar/ProjectsIcon'
import { OnlineCoursesIcon } from '@/components/icons/SideBar/OnlineCoursesIcon'
import { UserProfileIcon } from '@/components/icons/SideBar/UserProfileIcon'
import { UserAccIcon } from '@/components/icons/SideBar/UserAccIcon'
import { CorporateIcon } from '@/components/icons/SideBar/CorporateIcon'
import { BlogIcon } from '@/components/icons/SideBar/BlogIcon'
import { ChatIcon } from '@/components/icons/SideBar/ChatIcon'

interface NavItem {
  title: string
  icon: React.ReactNode
  href?: string
  badge?: string
  children?: NavItem[]
}

const navItems = {
  favorites: [
    { title: 'Overview', icon: <DefaultIcon />, href: '/' },
    {
      title: 'Projects',
      icon: <ProjectsIcon />,
      href: '/projects',
    },
  ],
  dashboards: [
    {
      title: 'Default',
      icon: <DefaultIcon />,
      href: '/dashboard',
    },
    {
      title: 'eCommerce',
      icon: <EcommerceIcon />,
      href: '/dashboard',
    },
    {
      title: 'Projects',
      icon: <ProjectsIcon />,
      href: '/dashboard',
    },
    {
      title: 'Online Courses',
      icon: <OnlineCoursesIcon />,
      href: '/dashboard',
    },
  ],
  pages: [
    {
      title: 'User Profile',
      icon: <UserProfileIcon />,
      children: [
        { title: 'Overview', icon: null, href: '/profile/overview' },
        { title: 'Projects', icon: null, href: '/profile/projects' },
        { title: 'Campaigns', icon: null, href: '/profile/campaigns' },
        { title: 'Documents', icon: null, href: '/profile/documents' },
        { title: 'Followers', icon: null, href: '/profile/followers' },
      ],
    },
    { title: 'Account', icon: <UserAccIcon />, href: '/account' },
    {
      title: 'Corporate',
      icon: <CorporateIcon />,
      href: '/corporate',
    },
    { title: 'Blog', icon: <BlogIcon />, href: '/blog' },
    { title: 'Social', icon: <ChatIcon />, href: '/social' },
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
        'flex items-center px-3 py-2 rounded-lg transition-all duration-200',
        'hover:bg-accent/50 dark:hover:bg-accent/30 cursor-pointer group',
        'text-black dark:text-white text-sm font-normal',
        depth > 0 && 'pl-12',
      )}
      style={{ fontSize: '14px', lineHeight: '20px' }}
      onClick={() => hasChildren && setIsExpanded(!isExpanded)}
    >
      {item.icon && (
        <span className="shrink-0 transition-transform group-hover:scale-110">
          {item.icon}
        </span>
      )}
      <span className="flex-1">{item.title}</span>
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
        <div className="mt-1 space-y-0 animate-in slide-in-from-top-2 duration-200">
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
    <aside className="w-52 h-screen bg-white dark:bg-[#1C1C1C] border-r border-[#1C1C1C1A] dark:border-[#FFFFFF1A] flex flex-col overflow-y-auto">
      {/* Logo */}
      <div className="p-4">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-black dark:text-white hover:opacity-80 transition-opacity"
        >
          <img src="/saas-ss.png" alt="ByeWind" className="size-8" />
          <span className="font-medium text-sm">ByeWind</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        {/* Favorites and Recently tabs */}
        <div className="flex items-center gap-6 mb-4 px-3">
          <h3 className="text-xs font-normal text-muted-foreground">
            Favorites
          </h3>
          <h3 className="text-xs font-normal text-muted-foreground">
            Recently
          </h3>
        </div>

        {/* Favorites items */}
        <div className="space-y-0 mb-6">
          {navItems.favorites.map((item, index) => (
            <NavItemComponent key={index} item={item} />
          ))}
        </div>

        {/* Dashboards */}
        <div className="mb-6">
          <h3 className="text-xs font-normal text-[#1C1C1C66] dark:text-[#FFFFFF66] mb-3 px-3">
            Dashboards
          </h3>
          <div className="space-y-0">
            {navItems.dashboards.map((item, index) => (
              <NavItemComponent key={index} item={item} />
            ))}
          </div>
        </div>

        {/* Pages */}
        <div>
          <h3 className="text-xs font-normal text-[#1C1C1C66] dark:text-[#FFFFFF66] mb-3 px-3">
            Pages
          </h3>
          <div className="space-y-0">
            {navItems.pages.map((item, index) => (
              <NavItemComponent key={index} item={item} />
            ))}
          </div>
        </div>
      </nav>
    </aside>
  )
}
