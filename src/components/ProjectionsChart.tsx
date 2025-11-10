import { memo, useMemo } from 'react'
import { Card } from '@/components/ui/card'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { projectionData } from '@/data/dashboard'

const tooltipStyles = {
  contentStyle: {
    backgroundColor: 'hsl(var(--card))',
    border: '1px solid hsl(var(--border))',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  labelStyle: { color: 'hsl(var(--foreground))' },
  itemStyle: { color: 'hsl(var(--foreground))' },
  cursor: { fill: 'hsl(var(--accent) / 0.2)' },
}

export const ProjectionsChart = memo(function ProjectionsChart() {
  const tickFormatter = useMemo(() => (value: number) => `${value}M`, [])

  return (
    <Card className="p-6 rounded-2xl bg-card/50 dark:bg-white/2 border-border/50 h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          Projections vs Actuals
        </h3>
      </div>
      <div className="flex-1 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={projectionData}
            barCategoryGap="20%"
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
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
            <Bar
              dataKey="actuals"
              stackId="a"
              fill="hsl(var(--chart-1))"
              radius={[0, 0, 0, 0]}
              maxBarSize={60}
            />
            <Bar
              dataKey="projections"
              stackId="a"
              fill="hsl(var(--chart-2))"
              radius={[8, 8, 0, 0]}
              maxBarSize={60}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
})
