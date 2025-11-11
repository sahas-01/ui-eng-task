import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ChevronRight, ChevronDown, Dot } from 'lucide-react'
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
  showChevron?: boolean
}

const navItems = {
  favorites: [
    {
      title: 'Overview',
      icon: <Dot className="size-7 text-[#1C1C1C33]" />,
      href: '/',
    },
    {
      title: 'Projects',
      icon: <Dot className="size-7 text-[#1C1C1C33]" />,
      href: '/projects',
    },
  ],
  dashboards: [
    {
      title: 'Default',
      icon: <DefaultIcon />,
      href: '/dashboard',
      showChevron: true,
    },
    {
      title: 'eCommerce',
      icon: <EcommerceIcon />,
      href: '/dashboard',
      showChevron: true,
    },
    {
      title: 'Projects',
      icon: <ProjectsIcon />,
      href: '/dashboard',
      showChevron: true,
    },
    {
      title: 'Online Courses',
      icon: <OnlineCoursesIcon />,
      href: '/dashboard',
      showChevron: true,
    },
  ],
  pages: [
    {
      title: 'User Profile',
      icon: <UserProfileIcon />,
      showChevron: true,
      children: [
        { title: 'Overview', icon: null, href: '/profile/overview' },
        {
          title: 'Projects',
          icon: null,
          href: '/profile/projects',
          showChevron: true,
        },
        {
          title: 'Campaigns',
          icon: null,
          href: '/profile/campaigns',
          showChevron: true,
        },
        {
          title: 'Documents',
          icon: null,
          href: '/profile/documents',
          showChevron: true,
        },
        {
          title: 'Followers',
          icon: null,
          href: '/profile/followers',
          showChevron: true,
        },
      ],
    },
    {
      title: 'Account',
      icon: <UserAccIcon />,
      href: '/account',
      showChevron: true,
    },
    {
      title: 'Corporate',
      icon: <CorporateIcon />,
      href: '/corporate',
      showChevron: true,
    },
    { title: 'Blog', icon: <BlogIcon />, href: '/blog', showChevron: true },
    { title: 'Social', icon: <ChatIcon />, href: '/social', showChevron: true },
  ],
}

function NavItemComponent({
  item,
  depth = 0,
  isFavorite = false,
}: {
  item: NavItem
  depth?: number
  isFavorite?: boolean
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const hasChildren = item.children && item.children.length > 0

  const content = (
    <div
      className={cn(
        'flex items-center whitespace-pre rounded-lg transition-all duration-200',
        'hover:bg-accent/50 dark:hover:bg-accent/30 cursor-pointer group',
        'hover:border-l-4 hover:border-black dark:hover:border-white',
        'text-black dark:text-white text-sm font-normal',
        isFavorite ? 'px-1 py-1' : 'px-4 py-2',
        depth > 0 && 'pl-12',
      )}
      style={{ fontSize: '14px', lineHeight: '20px' }}
      onClick={() => hasChildren && setIsExpanded(!isExpanded)}
    >
      {item.showChevron && (
        <ChevronRight className="size-4 mr-1 text-[#1C1C1C33] dark:text-[#FFFFFF33]" />
      )}
      {item.icon && (
        <span
          className={cn(
            'shrink-0 transition-transform group-hover:scale-110',
            !isFavorite && 'mr-3',
          )}
        >
          {item.icon}
        </span>
      )}
      <span className="flex-1">{item.title}</span>
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
            <NavItemComponent
              key={index}
              item={child}
              depth={depth + 1}
              isFavorite={isFavorite}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function Sidebar({ onClose }: { onClose?: () => void }) {
  return (
    <aside className="w-56 h-screen bg-white dark:bg-[#1C1C1C] border-r border-[#1C1C1C1A] dark:border-[#FFFFFF1A] flex flex-col overflow-y-auto">
      {/* Logo and Mobile Close Button */}
      <div className="flex items-center justify-between p-4">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-black dark:text-white hover:opacity-80 transition-opacity"
        >
          <img src="/saas-ss.png" alt="ByeWind" className="size-8" />
          <span className="font-medium text-sm">ByeWind</span>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden ml-2 p-1 hover:bg-accent/50 rounded transition-colors"
          >
            <ChevronRight className="size-5 text-black dark:text-white" />
          </button>
        )}
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
            <NavItemComponent key={index} item={item} isFavorite={true} />
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
