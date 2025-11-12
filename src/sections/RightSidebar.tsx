import { User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { notifications, activities, contacts } from '@/data/dashboard'
import { BugIcon } from '@/components/icons/RightSidebar/BugIcon'
import { BroadcastIcon } from '@/components/icons/RightSidebar/BroadcastIcon'

const notificationIcons = {
  bug: <BugIcon className="size-4 text-black dark:text-white" />,
  user: <User className="size-4 text-black dark:text-white" />,
  subscription: <BroadcastIcon className="size-4 text-black dark:text-white" />,
}

export function RightSidebar() {
  return (
    <aside className="w-72 h-screen bg-white dark:bg-[#1C1C1C] border-l border-[#1C1C1C1A] dark:border-[#FFFFFF1A] flex flex-col overflow-y-auto">
      {/* Notifications */}
      <div className="px-6 py-4">
        <h2 className="text-[#1c1c1c] mt-2 dark:text-white inter-semibold text-sm mb-4">
          Notifications
        </h2>
        <div className="space-y-1">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-start gap-3 group cursor-pointer hover:bg-accent/50 dark:hover:bg-accent/30 -mx-2 px-2 py-2 rounded-lg transition-all duration-200"
            >
              <div
                className="size-8 rounded-lg flex items-center justify-center text-muted-foreground transition-transform group-hover:scale-110"
                style={{ backgroundColor: notification.bgColor }}
              >
                {notificationIcons[notification.type]}
              </div>
              <div className="flex-1">
                <p className="text-sm text-[#1c1c1c] dark:text-white line-clamp-2">
                  {notification.title}
                </p>
                <p className="text-xs text-[#1C1C1C66] dark:text-[#FFFFFF66] mt-0.5">
                  {notification.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activities */}
      <div className="px-6 py-4">
        <h2 className="text-[#1c1c1c] dark:text-white inter-semibold text-sm mb-4">
          Activities
        </h2>
        <div className="space-y-2.5">
          {activities.map((activity, index) => (
            <div key={activity.id} className="relative">
              <div className="flex items-start gap-3 group cursor-pointer hover:bg-accent/50 dark:hover:bg-accent/30 -mx-2 px-2 py-2 rounded-lg transition-all duration-200">
                <img
                  src={activity.avatar}
                  alt={activity.title}
                  className="size-8 rounded-full object-cover transition-transform group-hover:scale-110 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground line-clamp-2">
                    {activity.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {activity.time}
                  </p>
                </div>
              </div>
              {index < activities.length - 1 && (
                <div className="absolute left-[15px] top-12 w-px h-4 bg-[#1C1C1C1A] dark:bg-[#FFFFFF1A]" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contacts */}
      <div className="px-6 py-4">
        <h2 className="text-[#1c1c1c] dark:text-white inter-semibold text-sm mb-4">
          Contacts
        </h2>
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center gap-3 group cursor-pointer hover:bg-accent/50 dark:hover:bg-accent/30 -mx-2 px-2 rounded-lg transition-all duration-200"
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
              <span className="text-sm text-[#1C1C1C] dark:text-white inter-regular">
                {contact.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
