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
  Legend,
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

const legendStyle = {
  paddingTop: '20px',
}

export const ProjectionsChart = memo(function ProjectionsChart() {
  const tickFormatter = useMemo(() => (value: number) => `${value}M`, [])

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Projections vs Actuals
        </h3>
        <p className="text-sm text-muted-foreground mt-1">30M</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={projectionData} barGap={8}>
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
          <Legend wrapperStyle={legendStyle} iconType="circle" />
          <Bar
            dataKey="projections"
            fill="hsl(var(--chart-1))"
            radius={[8, 8, 0, 0]}
            maxBarSize={50}
            className="transition-all duration-300"
          />
          <Bar
            dataKey="actuals"
            fill="hsl(var(--chart-2))"
            radius={[8, 8, 0, 0]}
            maxBarSize={50}
            className="transition-all duration-300"
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
})
