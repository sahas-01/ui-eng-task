import { memo, useState, useEffect, useMemo } from 'react'
import { Card } from '@/components/ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts'
import { salesData } from '@/data/dashboard'

// Color mapping for light and dark modes
const colorMap = {
  Direct: {
    light: '#1C1C1C',
    dark: '#C6C7F8',
  },
  Affiliate: {
    light: '#BAEDBD',
    dark: '#BAEDBD',
  },
  Sponsored: {
    light: '#95A4FC',
    dark: '#95A4FC',
  },
  'E-mail': {
    light: '#B1E3FF',
    dark: '#B1E3FF',
  },
}

const CustomShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props

  return (
    <Sector
      cx={cx}
      cy={cy}
      innerRadius={innerRadius}
      outerRadius={outerRadius}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={fill}
      cornerRadius={15}
      cornerIsExternal={true}
    />
  )
}

export const SalesChart = memo(function SalesChart() {
  const [isDark, setIsDark] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }

    checkTheme()

    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  const getColor = (name: string) => {
    const colors = colorMap[name as keyof typeof colorMap]
    return colors ? (isDark ? colors.dark : colors.light) : '#CCCCCC'
  }

  const total = useMemo(() => {
    return salesData.reduce((sum, item) => sum + item.value, 0)
  }, [])

  const getPercentage = (value: number) => {
    return ((value / total) * 100).toFixed(1)
  }

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  const onPieLeave = () => {
    setActiveIndex(null)
  }

  return (
    <Card className="p-6 rounded-2xl bg-[#F7F9FB] dark:bg-[#FFFFFF0D] border-border/50 h-full flex flex-col">
      <div>
        <h3 className="font-inter font-semibold text-sm leading-5 text-foreground">
          Total Sales
        </h3>
      </div>
      <div className="relative flex-1 flex items-center justify-center py-4">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={salesData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={0.5}
              dataKey="value"
              startAngle={90}
              endAngle={450}
              activeShape={CustomShape}
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              cornerRadius={15}
            >
              {salesData.map((item) => (
                <Cell key={`cell-${item.name}`} fill={getColor(item.name)} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        {activeIndex !== null && (
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-2xl pointer-events-none"
            style={{
              backgroundColor: '#1C1C1CCC',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
            }}
          >
            <div className="text-sm font-semibold text-white tracking-tight">
              {getPercentage(salesData[activeIndex].value)}%
            </div>
          </div>
        )}
      </div>
      <div className="space-y-3">
        {salesData.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="size-2.5 rounded-full"
                style={{
                  backgroundColor: getColor(item.name),
                }}
              />
              <span className="text-sm text-foreground font-normal">
                {item.name}
              </span>
            </div>
            <span className="text-sm text-foreground font-semibold">
              ${item.value.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
})
