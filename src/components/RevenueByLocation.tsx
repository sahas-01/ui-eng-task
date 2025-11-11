import { memo, useState } from 'react'
import { Card } from '@/components/ui/card'
import {
  ComposableMap,
  Geographies,
  Geography as GeographyComponent,
  Marker,
  type Geography,
} from 'react-simple-maps'
import { locationData } from '@/data/dashboard'

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

// Location coordinates for markers
const markers = [
  { city: 'New York', coordinates: [-74.006, 40.7128] as [number, number] },
  {
    city: 'San Francisco',
    coordinates: [-122.4194, 37.7749] as [number, number],
  },
  { city: 'Sydney', coordinates: [151.2093, -33.8688] as [number, number] },
  { city: 'Singapore', coordinates: [103.8198, 1.3521] as [number, number] },
]

export const RevenueByLocation = memo(function RevenueByLocation() {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null)

  return (
    <Card className="p-6 rounded-2xl bg-[#F7F9FB] dark:bg-[#FFFFFF0D] border-border/50 flex flex-col h-full">
      <div className="mb-4">
        <h3 className="inter-semibold text-sm text-foreground">
          Revenue by Location
        </h3>
      </div>

      {/* World Map */}
      <div className="relative h-32 mb-4 rounded-lg overflow-hidden">
        <ComposableMap
          projectionConfig={{
            rotate: [-10, 0, 0],
            scale: 147,
          }}
          width={800}
          height={280}
          style={{ width: '100%', height: '100%' }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }: { geographies: Geography[] }) =>
              geographies.map((geo: Geography) => (
                <GeographyComponent
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#A8C5DA"
                  stroke="hsl(var(--background))"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: 'none' },
                    hover: { outline: 'none', fill: '#B8D5EA' },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>
          {markers.map(({ city, coordinates }) => (
            <Marker key={city} coordinates={coordinates}>
              <g
                onMouseEnter={() => setHoveredCity(city)}
                onMouseLeave={() => setHoveredCity(null)}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  r={10}
                  className="fill-black dark:fill-[#C6C7F8] transition-all"
                  stroke="none"
                />
                {hoveredCity === city && (
                  <>
                    <rect
                      x={-40}
                      y={-35}
                      width={80}
                      height={24}
                      rx={4}
                      className="fill-black dark:fill-white"
                      opacity={0.9}
                    />
                    <text
                      textAnchor="middle"
                      y={-18}
                      className="fill-white dark:fill-black text-xs font-medium"
                      style={{ fontSize: '12px', pointerEvents: 'none' }}
                    >
                      {city}
                    </text>
                  </>
                )}
              </g>
            </Marker>
          ))}
        </ComposableMap>
      </div>

      {/* Location list with progress bars */}
      <div className="space-y-3">
        {locationData.map((location) => {
          const maxValue = Math.max(...locationData.map((l) => l.value))
          const percentage = (location.value / maxValue) * 100
          return (
            <div key={location.city} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground font-medium">
                  {location.city}
                </span>
                <span className="text-sm text-foreground font-semibold">
                  {(location.value / 1000).toFixed(0)}K
                </span>
              </div>
              <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#A8C5DA] rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
})
