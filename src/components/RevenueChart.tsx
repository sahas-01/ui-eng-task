import { memo, useMemo, useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { revenueData } from '@/data/dashboard'
import useMediaQuery from '@/hooks/useMediaQuery'

const tooltipStyles = {
  contentStyle: {
    backgroundColor: 'hsl(var(--card))',
    border: '1px solid hsl(var(--border))',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  labelStyle: { color: 'hsl(var(--foreground))' },
  itemStyle: { color: 'hsl(var(--foreground))' },
  cursor: { stroke: 'hsl(var(--border))', strokeWidth: 1 },
}

export const RevenueChart = memo(function RevenueChart() {
  const [isDark, setIsDark] = useState(false)
  const tickFormatter = useMemo(() => (value: number) => `${value}M`, [])
  const isMobile = useMediaQuery('(max-width: 640px)')

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }

    updateTheme()

    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  const gridColor = isDark ? '#FFFFFF1A' : '#1C1C1C0D'

  return (
    <Card className="p-4 sm:p-6 border-none shadow-none rounded-2xl bg-[#F7F9FB] dark:bg-[#FFFFFF0D] border-border/50 flex flex-col h-full">
      <div className="mb-4 px-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
        <h3 className="inter-semibold text-sm text-foreground">Revenue</h3>
        <div className="w-px h-4 bg-[#1C1C1C33] dark:bg-[#FFFFFF33] hidden sm:block" />
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-[#A8C5DA]" />
            <span className="text-xs text-foreground font-medium">
              Current Week
            </span>
            <span className="text-sm font-semibold text-foreground">
              $58,211
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-black dark:bg-[#C6C7F8]" />
            <span className="text-xs text-foreground font-medium">
              Previous Week
            </span>
            <span className="text-sm font-semibold text-foreground">
              $68,768
            </span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={isMobile ? 250 : 300}>
        <LineChart
          data={revenueData}
          margin={{ top: 0, right: 10, left: -17, bottom: -5 }}
        >
          <CartesianGrid
            strokeDasharray="0"
            stroke={gridColor}
            vertical={false}
            horizontal={true}
          />
          <XAxis
            dataKey="month"
            stroke="currentColor"
            className="text-muted-foreground text-xs"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: isDark
                ? 'rgba(255, 255, 255, 0.4)'
                : 'rgba(28, 28, 28, 0.4)',
              fontSize: 12,
            }}
            padding={{ left: 20, right: 20 }}
            scale="point"
          />
          <YAxis
            stroke="currentColor"
            className="text-muted-foreground text-xs"
            axisLine={false}
            tickLine={false}
            tickFormatter={tickFormatter}
            tick={{
              fill: isDark
                ? 'rgba(255, 255, 255, 0.4)'
                : 'rgba(28, 28, 28, 0.4)',
              fontSize: 12,
            }}
            domain={[0, 30]}
            ticks={[0, 10, 20, 30]}
          />
          <Tooltip {...tooltipStyles} />
          {/* Current Week - Light blue curve */}
          <Line
            type="monotone"
            dataKey="current"
            stroke="#A8C5DA"
            strokeWidth={4}
            dot={false}
            activeDot={{
              r: 5,
              strokeWidth: 0,
              fill: '#A8C5DA',
            }}
          />
          {/* Previous Week - Black/Purple line */}
          <Line
            type="monotone"
            dataKey="previous"
            stroke={isDark ? '#C6C7F8' : 'black'}
            strokeWidth={4}
            dot={false}
            activeDot={{
              r: 5,
              strokeWidth: 0,
              fill: isDark ? '#C6C7F8' : 'black',
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
})
