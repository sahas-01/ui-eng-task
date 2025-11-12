import { memo } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { MetricCard as MetricCardType } from '@/types/dashboard'

interface MetricCardProps extends MetricCardType {
  className?: string
}

export const MetricCard = memo(function MetricCard({
  title,
  value,
  change,
  trend,
  className,
}: MetricCardProps) {
  const isPositive = trend === 'up'
  const isOrdersOrRevenue = title === 'Orders' || title === 'Revenue'

  // Define background styles for specific cards
  const getBackgroundColor = () => {
    if (title === 'Customers') return 'bg-[#E3F5FF]'
    if (title === 'Growth') return 'bg-[#E5ECF6]'
    if (title === 'Orders' || title === 'Revenue')
      return 'bg-[#F7F9FB] dark:bg-[#FFFFFF0D]'
    return 'bg-[#F7F9FB] dark:bg-[#FFFFFF0D]'
  }

  const textColorClass = isOrdersOrRevenue
    ? 'text-black dark:text-white'
    : 'text-black'

  return (
    <Card
      className={cn(
        'px-8 pt-10 pb-4 min-h-32 min-w-[200px] shadow-none border-none transition-all duration-300 rounded-2xl',
        getBackgroundColor(),
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-y-3.5">
          <p className={cn('text-sm inter-semibold', textColorClass)}>
            {title}
          </p>
          <div className="flex gap-x-9 items-center">
            <h1 className={cn('text-2xl inter-semibold', textColorClass)}>
              {value}
            </h1>
            <div
              className={cn(
                'flex items-center gap-2 text-sm font-normal',
                textColorClass,
              )}
            >
              <span>
                {isPositive ? '+' : '-'}
                {change}
              </span>

              {isPositive ? (
                <TrendingUp className="h-4 w-4" aria-label="Trending up" />
              ) : (
                <TrendingDown className="h-4 w-4" aria-label="Trending down" />
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
})
