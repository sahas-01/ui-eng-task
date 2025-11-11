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
    if (title === 'Customers') return 'bg-[#E3F5FF]'
    if (title === 'Growth') return 'bg-[#E5ECF6]'
    if (title === 'Orders' || title === 'Revenue')
      return 'bg-[#F7F9FB] dark:bg-[#FFFFFF0D]'
    return 'bg-[#F7F9FB] dark:bg-[#FFFFFF0D]'
  }

  return (
    <Card
      className={cn(
        'px-6 py-4 transition-all duration-300 border-border/50 rounded-2xl',
        getBackgroundColor(),
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-semibold">{value}</h3>
        </div>
        <div
          className={cn(
            'flex items-center gap-1 text-sm font-medium',
            isPositive ? 'text-green-600' : 'text-red-600',
          )}
        >
          {isPositive ? (
            <TrendingUp className="h-4 w-4" aria-label="Trending up" />
          ) : (
            <TrendingDown className="h-4 w-4" aria-label="Trending down" />
          )}
          <span>{change}</span>
        </div>
      </div>
    </Card>
  )
})
