import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import type { LatLngExpression } from 'leaflet'
import { motion } from 'framer-motion'
import { LuNavigation, LuPhone, LuClock, LuMapPin } from 'react-icons/lu'
import { FaWhatsapp } from 'react-icons/fa6'
import { GiSpanner } from 'react-icons/gi'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { contact, businessHours } from '../data/siteData'

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Custom marker icon with brand colors
const customIcon = new L.DivIcon({
  className: 'custom-marker',
  html: `
    <div class="relative">
      <div class="absolute -top-8 -left-4 w-8 h-8 bg-ignition-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      </div>
      <div class="absolute -top-1 left-0 w-2 h-2 bg-ignition-600 rotate-45"></div>
    </div>
  `,
  iconSize: [0, 0],
  iconAnchor: [4, 0],
  popupAnchor: [0, -10],
})

// Store coordinates (Kadawatha, Sri Lanka)
const STORE_LOCATION = {
  lat: 7.0013,
  lng: 79.9528,
}

interface FlyToLocationProps {
  center: LatLngExpression
  zoom: number
}

// Animate to location hook
function FlyToLocation({ center, zoom }: FlyToLocationProps) {
  const map = useMap()

  useEffect(() => {
    map.flyTo(center, zoom, {
      duration: 1.5,
    })
  }, [map, center, zoom])

  return null
}

export default function StoreMap() {
  const mapRef = useRef<L.Map | null>(null)
  const storePosition: LatLngExpression = [STORE_LOCATION.lat, STORE_LOCATION.lng]

  const handleGetDirections = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${STORE_LOCATION.lat},${STORE_LOCATION.lng}`,
      '_blank'
    )
  }

  return (
    <div className="relative rounded-2xl overflow-hidden border-2 border-forge-700 bg-forge-800">
      {/* Map Header */}
      <div className="bg-forge-900 px-4 py-3 border-b border-forge-600 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-ignition-600/20 flex items-center justify-center">
            <LuMapPin className="w-4 h-4 text-ignition-500" />
          </div>
          <div>
            <h4 className="font-tech font-semibold text-steel-100 text-sm">SUPER MOTOR TRADING</h4>
            <p className="text-xs text-steel-400">Kadawatha, Sri Lanka</p>
          </div>
        </div>
        <motion.button
          onClick={handleGetDirections}
          className="flex items-center gap-2 px-3 py-2 bg-ignition-600 hover:bg-ignition-500 text-white text-xs font-tech font-semibold rounded-lg transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <LuNavigation className="w-3 h-3" />
          DIRECTIONS
        </motion.button>
      </div>

      {/* Map Container */}
      <div className="h-[300px] lg:h-[350px]">
        <MapContainer
          ref={mapRef}
          center={storePosition}
          zoom={15}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />

          <FlyToLocation center={storePosition} zoom={15} />

          <Marker position={storePosition} icon={customIcon}>
            <Popup className="store-popup">
              <div className="p-2 min-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <GiSpanner className="w-5 h-5 text-ignition-600" />
                  <h5 className="font-bold text-forge-900">Super Motor Trading</h5>
                </div>
                <p className="text-sm text-gray-600 mb-3">{contact.address}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <LuClock className="w-4 h-4" />
                    <span>{businessHours.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <LuPhone className="w-4 h-4" />
                    <a href={contact.callLink} className="hover:text-ignition-600">{contact.storePhone}</a>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <a
                    href={contact.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-whatsapp text-white text-xs font-semibold rounded-lg hover:opacity-90"
                  >
                    <FaWhatsapp className="w-3 h-3" />
                    WhatsApp
                  </a>
                  <button
                    onClick={handleGetDirections}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-ignition-600 text-white text-xs font-semibold rounded-lg hover:opacity-90"
                  >
                    <LuNavigation className="w-3 h-3" />
                    Navigate
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Quick Info Footer */}
      <div className="bg-forge-900/80 backdrop-blur-sm px-4 py-3 border-t border-forge-600">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <span className="text-steel-400 flex items-center gap-1">
              <LuClock className="w-3 h-3" />
              {businessHours.days}
            </span>
            <span className="text-ignition-500 font-semibold">{businessHours.time}</span>
          </div>
          <a
            href={contact.callLink}
            className="text-steel-300 hover:text-ignition-500 transition-colors flex items-center gap-1"
          >
            <LuPhone className="w-3 h-3" />
            {contact.storePhone}
          </a>
        </div>
      </div>

      {/* Custom CSS for map */}
      <style>{`
        .custom-marker {
          background: transparent;
          border: none;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        }
        .leaflet-popup-tip {
          background: white;
        }
        .leaflet-container {
          background: #0A0A0F;
        }
      `}</style>
    </div>
  )
}
