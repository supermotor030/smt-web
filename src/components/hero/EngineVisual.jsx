import PropTypes from 'prop-types'

/**
 * EngineVisual - Lightweight SVG engine illustration
 * Optimized: Removed heavy CSS animations, using static visuals for performance
 */
export default function EngineVisual({ className = '' }) {
  return (
    <div className={`relative ${className}`}>
      {/* Main engine block SVG */}
      <svg 
        viewBox="0 0 300 280" 
        className="w-full h-auto"
        aria-label="Engine illustration"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="engineBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#374151" />
            <stop offset="50%" stopColor="#1f2937" />
            <stop offset="100%" stopColor="#111827" />
          </linearGradient>
          <linearGradient id="metalShine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6b7280" />
            <stop offset="50%" stopColor="#374151" />
            <stop offset="100%" stopColor="#1f2937" />
          </linearGradient>
          <linearGradient id="orangeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF5500" />
            <stop offset="100%" stopColor="#FF7733" />
          </linearGradient>
        </defs>

        {/* Engine block base */}
        <rect x="60" y="80" width="180" height="140" rx="8" fill="url(#engineBody)" />
        
        {/* Cylinder head */}
        <rect x="50" y="60" width="200" height="30" rx="4" fill="url(#metalShine)" />
        
        {/* Valve cover with fins - static */}
        <g>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect 
              key={i} 
              x={65 + i * 30} 
              y="40" 
              width="20" 
              height="25" 
              rx="2" 
              fill="#4b5563"
              opacity="0.8"
            />
          ))}
        </g>
        
        {/* Center logo area */}
        <circle cx="150" cy="150" r="35" fill="#1f2937" stroke="#FF5500" strokeWidth="2" />
        <text x="150" y="145" textAnchor="middle" fill="#FF5500" fontSize="12" fontWeight="bold" className="font-display">
          SMT
        </text>
        <text x="150" y="160" textAnchor="middle" fill="#9ca3af" fontSize="8" className="font-tech">
          GENUINE
        </text>

        {/* Gear - left (static) */}
        <g>
          <circle cx="85" cy="150" r="20" fill="#374151" stroke="#4b5563" strokeWidth="2" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <rect
              key={angle}
              x="80"
              y="128"
              width="10"
              height="8"
              rx="1"
              fill="#4b5563"
              transform={`rotate(${angle} 85 150)`}
            />
          ))}
          <circle cx="85" cy="150" r="8" fill="#1f2937" />
        </g>

        {/* Gear - right (static) */}
        <g>
          <circle cx="215" cy="150" r="20" fill="#374151" stroke="#4b5563" strokeWidth="2" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <rect
              key={angle}
              x="210"
              y="128"
              width="10"
              height="8"
              rx="1"
              fill="#4b5563"
              transform={`rotate(${angle} 215 150)`}
            />
          ))}
          <circle cx="215" cy="150" r="8" fill="#1f2937" />
        </g>

        {/* Oil pan */}
        <path 
          d="M70 220 L80 240 L220 240 L230 220 Z" 
          fill="url(#engineBody)" 
          stroke="#374151"
          strokeWidth="1"
        />

        {/* Exhaust manifold */}
        <g>
          <path d="M250 90 Q280 90 280 120 L280 180 Q280 200 260 200" fill="none" stroke="#4b5563" strokeWidth="8" strokeLinecap="round" />
          {/* Exhaust glow - static */}
          <circle cx="260" cy="200" r="6" fill="#FF5500" opacity="0.6" />
        </g>

        {/* Intake manifold */}
        <g>
          <path d="M50 100 Q20 100 20 130 L20 170 Q20 190 40 190" fill="none" stroke="#4b5563" strokeWidth="8" strokeLinecap="round" />
        </g>

        {/* Spark plug wires - static */}
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <line 
              x1={85 + i * 40} 
              y1="40" 
              x2={85 + i * 40} 
              y2="20" 
              stroke="#FF5500" 
              strokeWidth="3" 
              strokeLinecap="round"
            />
            <circle 
              cx={85 + i * 40} 
              cy="15" 
              r="5" 
              fill="#FF5500"
            />
          </g>
        ))}

        {/* Belt system - static */}
        <ellipse cx="150" cy="260" rx="60" ry="12" fill="none" stroke="#374151" strokeWidth="4" strokeDasharray="8 4" />
      </svg>

      {/* Stats overlay */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-6">
        <div className="text-center">
          <div className="font-display text-2xl text-ignition-500 font-mono">5000+</div>
          <div className="font-tech text-[10px] text-steel-500 uppercase tracking-wider">Parts</div>
        </div>
        <div className="w-px bg-steel-700" />
        <div className="text-center">
          <div className="font-display text-2xl text-electric-500 font-mono">50+</div>
          <div className="font-tech text-[10px] text-steel-500 uppercase tracking-wider">Brands</div>
        </div>
      </div>
    </div>
  )
}

EngineVisual.propTypes = {
  className: PropTypes.string,
}
