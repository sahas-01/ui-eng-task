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

  return (
    <Card
      className={cn(
        'p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 border-border/50',
        'bg-card backdrop-blur-sm',
        className
      )}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            {title}
          </span>
          <div
            className={cn(
              'flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full transition-all duration-200',
              isPositive
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                : 'bg-red-500/10 text-red-600 dark:text-red-400'
            )}
          >
            {isPositive ? (
              <TrendingUp className="size-3" />
            ) : (
              <TrendingDown className="size-3" />
            )}
            <span>
              {isPositive ? '+' : ''}
              {change}%
            </span>
          </div>
        </div>
        <div className="text-3xl font-bold text-foreground tracking-tight">
          {value}
        </div>
      </div>
    </Card>
  )
})
