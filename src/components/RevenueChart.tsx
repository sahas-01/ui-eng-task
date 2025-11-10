import { memo, useMemo } from 'react'
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
  const tickFormatter = useMemo(() => (value: number) => `${value}M`, [])
  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <h3 className="text-lg font-semibold text-foreground">Revenue</h3>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-[hsl(var(--chart-1))]" />
            <span className="text-sm text-foreground font-medium">
              Current Week
            </span>
            <span className="text-sm text-muted-foreground">$58,211</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-[hsl(var(--chart-2))]" />
            <span className="text-sm text-foreground font-medium">
              Previous Week
            </span>
            <span className="text-sm text-muted-foreground">$68,768</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={revenueData}>
          <defs>
            <linearGradient id="currentGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="hsl(var(--chart-1))"
                stopOpacity={0.1}
              />
              <stop
                offset="95%"
                stopColor="hsl(var(--chart-1))"
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient id="previousGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="hsl(var(--chart-2))"
                stopOpacity={0.1}
              />
              <stop
                offset="95%"
                stopColor="hsl(var(--chart-2))"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="currentColor"
            className="stroke-border/50"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            stroke="currentColor"
            className="text-muted-foreground text-xs"
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            stroke="currentColor"
            className="text-muted-foreground text-xs"
            axisLine={false}
            tickLine={false}
            tickFormatter={tickFormatter}
          />
          <Tooltip {...tooltipStyles} />
          <Line
            type="monotone"
            dataKey="current"
            stroke="hsl(var(--chart-1))"
            strokeWidth={3}
            dot={{
              fill: 'hsl(var(--chart-1))',
              strokeWidth: 2,
              r: 4,
            }}
            activeDot={{
              r: 6,
              strokeWidth: 2,
            }}
            className="transition-all duration-300"
          />
          <Line
            type="monotone"
            dataKey="previous"
            stroke="hsl(var(--chart-2))"
            strokeWidth={3}
            strokeDasharray="5 5"
            dot={{
              fill: 'hsl(var(--chart-2))',
              strokeWidth: 2,
              r: 4,
            }}
            activeDot={{
              r: 6,
              strokeWidth: 2,
            }}
            className="transition-all duration-300"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
})
