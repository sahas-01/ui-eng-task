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
    <Card className="p-6 rounded-2xl bg-[#F7F9FB] dark:bg-[#FFFFFF0D] border-border/50 flex flex-col h-full">
      <div className="mb-4 flex items-center justify-between flex-wrap gap-4">
        <h3 className="inter-semibold text-sm text-foreground">Revenue</h3>
        <div className="flex items-center gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="size-2.5 rounded-full bg-[#A8C5DA]" />
            <span className="text-sm text-foreground font-medium">
              Current Week
            </span>
            <span className="text-sm font-semibold text-foreground">
              $58,211
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-2.5 rounded-full bg-black dark:bg-[#C6C7F8]" />
            <span className="text-sm text-foreground font-medium">
              Previous Week
            </span>
            <span className="text-sm font-semibold text-foreground">
              $68,768
            </span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart
          data={revenueData}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
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
            padding={{ left: 30, right: 30 }}
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
            strokeWidth={3}
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
            strokeWidth={3}
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
