import { Bug, UserPlus, Share2, FileEdit, Trash2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { notifications, activities, contacts } from '@/data/dashboard'
import { cn } from '@/lib/utils'

const activityIcons = {
  bug: <Bug className="size-4" />,
  release: <Share2 className="size-4" />,
  submission: <Bug className="size-4" />,
  modification: <FileEdit className="size-4" />,
  deletion: <Trash2 className="size-4" />,
}

const notificationIcons = {
  bug: <Bug className="size-4" />,
  user: <UserPlus className="size-4" />,
  subscription: <Share2 className="size-4" />,
}

export function RightSidebar() {
  return (
    <aside className="w-80 h-screen bg-white dark:bg-[#1C1C1C] border-l border-border flex flex-col overflow-y-auto">
      {/* Notifications */}
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold text-foreground mb-4">Notifications</h2>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-start gap-3 group cursor-pointer hover:bg-accent/50 dark:hover:bg-accent/30 -mx-2 px-2 py-2 rounded-lg transition-all duration-200"
            >
              {notification.avatar ? (
                <Avatar className="size-8 transition-transform group-hover:scale-110">
                  <AvatarImage src={notification.avatar} />
                  <AvatarFallback>{notification.title[0]}</AvatarFallback>
                </Avatar>
              ) : (
                <div className="size-8 rounded-full bg-accent flex items-center justify-center text-muted-foreground transition-transform group-hover:scale-110">
                  {notificationIcons[notification.type]}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground line-clamp-2">
                  {notification.title}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {notification.time}
                </p>
              </div>
              {notification.type === 'bug' && (
                <div className="size-2 rounded-full bg-primary shrink-0 mt-2" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Activities */}
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold text-foreground mb-4">Activities</h2>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 group cursor-pointer hover:bg-accent/50 dark:hover:bg-accent/30 -mx-2 px-2 py-2 rounded-lg transition-all duration-200"
            >
              <div
                className={cn(
                  'size-8 rounded-full flex items-center justify-center transition-transform group-hover:scale-110',
                  activity.type === 'bug' && 'bg-red-500/10 text-red-500',
                  activity.type === 'release' &&
                    'bg-purple-500/10 text-purple-500',
                  activity.type === 'submission' &&
                    'bg-blue-500/10 text-blue-500',
                  activity.type === 'modification' &&
                    'bg-orange-500/10 text-orange-500',
                  activity.type === 'deletion' &&
                    'bg-gray-500/10 text-gray-500',
                )}
              >
                {activityIcons[activity.type]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground line-clamp-2">
                  {activity.title}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contacts */}
      <div className="p-4 flex-1">
        <h2 className="font-semibold text-foreground mb-4">Contacts</h2>
        <div className="space-y-3">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center gap-3 group cursor-pointer hover:bg-accent/50 dark:hover:bg-accent/30 -mx-2 px-2 py-2 rounded-lg transition-all duration-200"
            >
              <Avatar className="size-8 transition-transform group-hover:scale-110">
                <AvatarImage src={contact.avatar} />
                <AvatarFallback>
                  {contact.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-foreground font-medium">
                {contact.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
