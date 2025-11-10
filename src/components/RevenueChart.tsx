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

  // Split data for solid and dashed segments (April is index 3)
  const solidData = useMemo(() => {
    return revenueData.map((item, index) => ({
      ...item,
      previousSolid: index <= 3 ? item.previous : null,
      previousDashed: index >= 3 ? item.previous : null,
    }))
  }, [])

  return (
    <Card className="p-6 rounded-2xl bg-card/50 dark:bg-white/2 border-border/50 h-full flex flex-col">
      <div className="mb-4 flex items-center justify-between flex-wrap gap-4">
        <h3 className="text-lg font-semibold text-foreground">Revenue</h3>
        <div className="flex items-center gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="size-2.5 rounded-full bg-[#A8C5DA]" />
            <span className="text-sm text-foreground font-medium">
              Current Week
            </span>
            <span className="text-sm font-semibold text-foreground">$58,211</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-2.5 rounded-full bg-black dark:bg-white" />
            <span className="text-sm text-foreground font-medium">
              Previous Week
            </span>
            <span className="text-sm font-semibold text-foreground">$68,768</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={solidData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="currentColor"
            className="stroke-border/30 dark:stroke-border/20"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            stroke="currentColor"
            className="text-muted-foreground text-xs"
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
          />
          <YAxis
            stroke="currentColor"
            className="text-muted-foreground text-xs"
            axisLine={false}
            tickLine={false}
            tickFormatter={tickFormatter}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            domain={[0, 30]}
            ticks={[0, 10, 20, 30]}
          />
          <Tooltip {...tooltipStyles} />
          {/* Current Week - Light blue curve starting from near zero */}
          <Line
            type="monotoneX"
            dataKey="current"
            stroke="#A8C5DA"
            strokeWidth={2.5}
            dot={false}
            activeDot={{
              r: 5,
              strokeWidth: 0,
              fill: '#A8C5DA',
            }}
            connectNulls={true}
          />
          {/* Previous Week Solid - Black/White line (Jan to Apr - solid) */}
          <Line
            type="monotoneX"
            dataKey="previousSolid"
            stroke="black"
            className="dark:stroke-white"
            strokeWidth={2.5}
            dot={false}
            activeDot={{
              r: 5,
              strokeWidth: 0,
              fill: 'black',
              className: "dark:fill-white"
            }}
            connectNulls={false}
          />
          {/* Previous Week Dashed - Black/White line (Apr to Jun - dashed) */}
          <Line
            type="monotoneX"
            dataKey="previousDashed"
            stroke="black"
            className="dark:stroke-white"
            strokeWidth={2.5}
            strokeDasharray="8 4"
            dot={false}
            activeDot={{
              r: 5,
              strokeWidth: 0,
              fill: 'black',
              className: "dark:fill-white"
            }}
            connectNulls={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
})
