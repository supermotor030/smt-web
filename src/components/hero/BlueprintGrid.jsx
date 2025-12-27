/**
 * BlueprintGrid - Lightweight CSS-only grid background
 * No JavaScript animations for better performance
 */
export default function BlueprintGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Simple CSS grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 85, 0, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 85, 0, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Corner brackets - static */}
      <div className="absolute top-6 left-6 w-12 h-12 border-l-2 border-t-2 border-ignition-600/20" />
      <div className="absolute top-6 right-6 w-12 h-12 border-r-2 border-t-2 border-ignition-600/20" />
      <div className="absolute bottom-6 left-6 w-12 h-12 border-l-2 border-b-2 border-ignition-600/20" />
      <div className="absolute bottom-6 right-6 w-12 h-12 border-r-2 border-b-2 border-ignition-600/20" />
    </div>
  )
}
