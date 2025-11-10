import { memo } from 'react'
import { Card } from '@/components/ui/card'
import { locationData } from '@/data/dashboard'

export const RevenueByLocation = memo(function RevenueByLocation() {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Revenue by Location
        </h3>
      </div>

      {/* World Map */}
      <div className="relative h-[200px] mb-6 rounded-lg bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-border/50 overflow-hidden">
        {/* Simple SVG world map representation */}
        <svg
          viewBox="0 0 800 400"
          className="w-full h-full opacity-30"
          fill="currentColor"
        >
          {/* Simplified continents */}
          <g className="text-muted-foreground">
            {/* North America */}
            <path d="M150,80 L180,70 L220,90 L230,110 L200,150 L160,160 L140,140 Z" />
            {/* South America */}
            <path d="M200,180 L220,200 L210,260 L190,280 L180,240 L185,200 Z" />
            {/* Europe */}
            <path d="M380,80 L420,70 L440,90 L430,120 L400,130 L380,110 Z" />
            {/* Africa */}
            <path d="M380,140 L420,150 L430,200 L410,250 L390,240 L380,190 Z" />
            {/* Asia */}
            <path d="M480,60 L580,70 L620,90 L630,130 L600,150 L550,140 L520,120 L480,100 Z" />
            {/* Australia */}
            <path d="M600,230 L650,240 L660,270 L640,280 L600,270 Z" />
          </g>
        </svg>

        {/* Location markers */}
        <div className="absolute top-1/4 left-[20%] size-3 rounded-full bg-blue-500 animate-pulse" />
        <div className="absolute top-1/3 left-[15%] size-3 rounded-full bg-purple-500 animate-pulse delay-75" />
        <div className="absolute top-2/3 left-[75%] size-3 rounded-full bg-emerald-500 animate-pulse delay-150" />
        <div className="absolute top-1/2 left-[70%] size-3 rounded-full bg-orange-500 animate-pulse delay-200" />
      </div>

      {/* Location list */}
      <div className="space-y-3">
        {locationData.map((location, index) => {
          const colors = [
            'bg-blue-500',
            'bg-purple-500',
            'bg-emerald-500',
            'bg-orange-500',
          ]
          return (
            <div
              key={location.city}
              className="flex items-center justify-between group cursor-pointer hover:bg-accent/30 -mx-2 px-2 py-2 rounded-lg transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`size-2 rounded-full ${colors[index]} transition-transform group-hover:scale-125`}
                />
                <span className="text-sm text-foreground font-medium">
                  {location.city}
                </span>
              </div>
              <span className="text-sm text-muted-foreground font-medium">
                {(location.value / 1000).toFixed(0)}K
              </span>
            </div>
          )
        })}
      </div>
    </Card>
  )
})
