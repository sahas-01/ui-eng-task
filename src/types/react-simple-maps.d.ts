declare module 'react-simple-maps' {
  import { ComponentType, CSSProperties, ReactNode } from 'react'

  export interface ComposableMapProps {
    projection?: string
    projectionConfig?: {
      rotate?: [number, number, number]
      scale?: number
      center?: [number, number]
    }
    width?: number
    height?: number
    style?: CSSProperties
    children?: ReactNode
  }

  export interface GeographiesProps {
    geography: string | object
    children: (args: { geographies: Geography[] }) => ReactNode
  }

  export interface Geography {
    rsmKey: string
    properties: Record<string, unknown>
    geometry: {
      type: string
      coordinates: number[][][]
    }
  }

  export interface GeographyProps {
    geography: Geography
    fill?: string
    stroke?: string
    strokeWidth?: number
    style?: {
      default?: CSSProperties
      hover?: CSSProperties
      pressed?: CSSProperties
    }
  }

  export interface MarkerProps {
    coordinates: [number, number]
    children?: ReactNode
  }

  export const ComposableMap: ComponentType<ComposableMapProps>
  export const Geographies: ComponentType<GeographiesProps>
  export const Geography: ComponentType<GeographyProps>
  export const Marker: ComponentType<MarkerProps>
}
