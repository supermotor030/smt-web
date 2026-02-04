/// <reference types="vite/client" />

// Google Analytics gtag
declare global {
    interface Window {
        gtag: (
            command: 'config' | 'event' | 'set' | 'js',
            targetId: string | Date,
            config?: Record<string, unknown>
        ) => void
        dataLayer: unknown[]
    }
}

// react-leaflet type augmentation for missing props
declare module 'react-leaflet' {
    import type { LatLngExpression } from 'leaflet'
    import type { ReactNode, RefAttributes } from 'react'
    import type { Map as LeafletMap, TileLayer as LeafletTileLayer, Marker as LeafletMarker, Popup as LeafletPopup } from 'leaflet'

    export interface MapContainerProps {
        center?: LatLngExpression
        zoom?: number
        style?: React.CSSProperties
        zoomControl?: boolean
        attributionControl?: boolean
        children?: ReactNode
    }

    export interface TileLayerProps {
        url: string
        attribution?: string
    }

    export interface MarkerProps {
        position: LatLngExpression
        icon?: L.Icon | L.DivIcon
        children?: ReactNode
    }

    export interface PopupProps {
        className?: string
        children?: ReactNode
    }

    export function MapContainer(props: MapContainerProps & RefAttributes<LeafletMap>): JSX.Element
    export function TileLayer(props: TileLayerProps & RefAttributes<LeafletTileLayer>): JSX.Element
    export function Marker(props: MarkerProps & RefAttributes<LeafletMarker>): JSX.Element
    export function Popup(props: PopupProps & RefAttributes<LeafletPopup>): JSX.Element
    export function useMap(): LeafletMap
}

export { }
