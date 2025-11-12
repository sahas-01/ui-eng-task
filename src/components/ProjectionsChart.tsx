import { memo, useMemo, useState, useEffect } from 'react'
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
import { useTheme } from '@/context/theme-provider'

const getTooltipStyles = (isDark: boolean) => ({
  contentStyle: {
    backgroundColor: isDark ? '#1C1C1C' : '#FFFFFF',
    border: '1px solid hsl(var(--border))',
    borderRadius: '4px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  labelStyle: { color: 'hsl(var(--foreground))' },
  itemStyle: { color: 'hsl(var(--foreground))' },
  cursor: false,
})

export const ProjectionsChart = memo(function ProjectionsChart() {
  const { theme } = useTheme()
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
  }, [theme])

  const gridColor = isDark ? '#FFFFFF1A' : '#1C1C1C0D'
  const tooltipStyles = getTooltipStyles(isDark)

  return (
    <Card className="p-6 rounded-2xl bg-[#F7F9FB] dark:bg-[#FFFFFF0D] border-border/50 h-full flex flex-col">
      <div className="mb-4">
        <h3 className="inter-semibold mt-2.5 text-sm text-foreground">
          Projections vs Actuals
        </h3>
      </div>
      <div className="flex-1 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={projectionData}
            barCategoryGap="30%"
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
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
            <Bar
              dataKey="actuals"
              stackId="a"
              fill="#A8C5DA"
              radius={[0, 0, 0, 0]}
              maxBarSize={50}
              isAnimationActive={false}
            />
            <Bar
              dataKey="projections"
              stackId="a"
              fill={theme === 'dark' ? '#687681' : '#CFDFEB'}
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
})
