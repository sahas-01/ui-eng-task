import { memo, useCallback } from 'react'
import { Card } from '@/components/ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { salesData } from '@/data/dashboard'

const COLORS = ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B']

const tooltipStyles = {
  contentStyle: {
    backgroundColor: 'hsl(var(--card))',
    border: '1px solid hsl(var(--border))',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
}

export const SalesChart = memo(function SalesChart() {
  const formatter = useCallback((value: number) => `$${value.toFixed(2)}`, [])

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Total Sales</h3>
      </div>
      <div className="relative">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={salesData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              className="transition-all duration-300"
            >
              {salesData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
              ))}
            </Pie>
            <Tooltip {...tooltipStyles} formatter={formatter} />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-2xl font-bold text-foreground">38.6%</div>
        </div>
      </div>
      <div className="mt-6 space-y-3">
        {salesData.map((item, index) => (
            <div
              key={item.name}
              className="flex items-center justify-between group cursor-pointer hover:bg-accent/30 -mx-2 px-2 py-1.5 rounded-lg transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <div
                  className="size-3 rounded-full transition-transform group-hover:scale-125"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <span className="text-sm text-foreground font-medium">
                  {item.name}
                </span>
              </div>
              <span className="text-sm text-muted-foreground font-medium">
                ${item.value.toFixed(2)}
              </span>
            </div>
        ))}
      </div>
    </Card>
  )
})
