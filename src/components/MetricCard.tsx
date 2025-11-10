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

  // Define background styles for specific cards
  const getBackgroundColor = () => {
    if (title === 'Customers') return 'bg-[#E3F5FF] dark:bg-white/5'
    if (title === 'Growth') return 'bg-[#E5ECF6] dark:bg-white/5'
    return 'bg-card/50 dark:bg-white/2'
  }

  return (
    <Card
      className={cn(
        'px-6 py-4 transition-all duration-300 border-border/50 rounded-2xl',
        getBackgroundColor(),
        className,
      )}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground/70 dark:text-foreground/60">
            {title}
          </span>
          <div
            className={cn(
              'flex items-center gap-1 text-xs font-medium',
              isPositive
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-red-600 dark:text-red-400',
            )}
          >
            {isPositive ? '+' : ''}
            {change}%
            {isPositive ? (
              <TrendingUp className="size-3.5" />
            ) : (
              <TrendingDown className="size-3.5" />
            )}
          </div>
        </div>
        <div className="text-3xl font-bold text-foreground tracking-tight">
          {value}
        </div>
      </div>
    </Card>
  )
})
