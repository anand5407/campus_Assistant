import React, { useState, useEffect } from 'react';
import { ZoomIn, ZoomOut, RotateCw, Maximize2 } from 'lucide-react';

const campusMapImage = '/src/assets/v7.png';

const hotspots = [
  { id: 'block-a', x: 16.3, y: 42, width: 6, height: 15, name: 'Block A (B.Tech)' },
  { id: 'block-b', x: 40, y: 40, width: 12, height: 7, name: 'Block B (Diploma)' },
  { id: 'block-c', x: 15, y: 30, width: 5, height: 8, name: 'Block C (Nursing)' },
  { id: 'boys-hostel', x: 65, y: 28, width: 5, height: 6, name: 'Boys Hostel' },
  { id: 'girls-hostel', x: 12, y: 57, width: 5, height:6, name: 'Girls Hostel' },
  { id: 'ground', x: 36, y: 29, width: 22, height: 9, name: 'Ground' },
  { id: 'canteen', x: 62, y: 47, width: 6, height: 6, name: 'Canteen' },
  { id: 'main-gate', x: 36, y: 61, width: 5, height: 3, name: 'Main Gate' },
  { id: 'gate-2', x: 58, y: 61, width: 5, height: 3, name: 'Gate 2' },
  { id: 'gate-3', x: 67, y: 36, width: 3, height: 5, name: 'Gate 3' },
  { id: 'bus-parking', x: 44, y: 53, width: 12, height: 8, name: 'Bus Parking' },
  { id: 'security-room', x: 38, y: 59.4, width: 3, height: 2, name: 'Security Room' },
  { id: 'center', x: 32.5, y: 47, width: 3, height: 3, name: 'Center' },
  { id: 'kalam', x: 78, y: 32, width: 6, height: 6, name: 'Kalam Science College' },
  { id: 'student-parking', x: 30, y: 64, width: 15, height: 4, name: 'Student Parking' },
];

export function CampusMap({ selectedLocation, onLocationClick, collapsed, onToggleCollapse }) {
  const [hoveredHotspot, setHoveredHotspot] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isLegendOpen, setIsLegendOpen] = useState(true);
  const [isZoomOpen, setIsZoomOpen] = useState(true);

  const centerHotspot = hotspots.find(h => h.id === 'center');
  const highlightedHotspotId = selectedLocation?.id || hoveredHotspot;

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handleReset = () => {
    setZoom(1);
    setRotation(0);
  }; 

  return (
    <div className="flex-1 bg-gradient-to-br from-green-50 to-green-100 overflow-hidden relative" style={{ contain: 'layout' }}>
      <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: !collapsed ? '#B3E6B3' : 'transparent' }}>
        <div className={`relative ${!collapsed ? 'h-5/6' : 'w-full h-full'} bg-gradient-to-br from-green-50 to-green-100 overflow-hidden`} style={{ contain: 'layout' }}>
          <div className="absolute top-6 right-6 z-20 flex flex-col gap-2">
            <button
              onClick={() => setIsZoomOpen(!isZoomOpen)}
              className="bg-white shadow-lg rounded-lg p-3 hover:bg-gray-50 transition-colors font-bold text-lg"
              title={isZoomOpen ? 'Collapse' : 'Expand'}
            >
              {isZoomOpen ? '−' : '+'}
            </button>
            {isZoomOpen && (
              <>
                <button
                  onClick={handleZoomIn}
                  className="bg-white shadow-lg rounded-lg p-3 hover:bg-gray-50 transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={handleZoomOut}
                  className="bg-white shadow-lg rounded-lg p-3 hover:bg-gray-50 transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={handleRotate}
                  className="bg-white shadow-lg rounded-lg p-3 hover:bg-gray-50 transition-colors"
                  title="Rotate 90°"
                >
                  <RotateCw className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={handleReset}
                  className="bg-white shadow-lg rounded-lg p-3 hover:bg-gray-50 transition-colors"
                  title="Reset View"
                >
                  <Maximize2 className="w-5 h-5 text-gray-700" />
                </button>
                <div className="bg-white shadow-lg rounded-lg px-3 py-2 text-center">
                  <div className="text-xs text-gray-500">Zoom</div>
                  <div className="text-sm font-bold text-gray-700">{Math.round(zoom * 100)}%</div>
                </div>
              </>
            )}
          </div>

          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
            <div
              style={{
                transform: `scale(${zoom}) rotate(${rotation}deg)`,
                transition: 'transform 0.3s ease-out',
                transformOrigin: 'center center',
                width: '100%',
                height: '100%'
              }}
            >
              <img
                src={campusMapImage}
                alt="Campus Map"
                className="w-full h-full object-contain"
              />

              <svg
                key={`hotspots-${collapsed}`}
                className="absolute inset-0 w-full h-full pointer-events-auto"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid slice"
              >
                {hotspots.map((hotspot) => {
                  const isSelected = selectedLocation?.id === hotspot.id;
                  const isHovered = hoveredHotspot === hotspot.id;

                  return (
                    <g key={hotspot.id}>
                      <rect
                        x={hotspot.x}
                        y={hotspot.y}
                        width={hotspot.width}
                        height={hotspot.height}
                        className={`pointer-events-auto cursor-pointer transition-all duration-300 ${
                          isSelected
                            ? 'fill-blue-500 fill-opacity-30 stroke-blue-600/60 stroke-[0.5]'
                            : isHovered
                            ? 'fill-yellow-400 fill-opacity-30 stroke-yellow-500/50'
                            : 'fill-transparent stroke-transparent'
                        }`}
                        rx="1"
                        onMouseEnter={() => setHoveredHotspot(hotspot.id)}
                        onMouseLeave={() => setHoveredHotspot(null)}
                        onClick={() => {
                          if (collapsed) {
                            onToggleCollapse();
                          }
                          onLocationClick(hotspot.id);
                        }}
                        style={{ pointerEvents: 'auto' }}
                      />

                      {isSelected && (
                        <rect
                          x={hotspot.x}
                          y={hotspot.y}
                          width={hotspot.width}
                          height={hotspot.height}
                          className="fill-blue-400 fill-opacity-15 stroke-blue-500/50 stroke-[0.3]"
                          rx="1"
                        >
                          <animate
                            attributeName="opacity"
                            values="0.15;0.35;0.15"
                            dur="2.5s"
                            repeatCount="indefinite"
                          />
                        </rect>
                      )}
                    </g>
                  );
                })}
              </svg>

              {hoveredHotspot && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-lg pointer-events-none z-10">
                  <p className="text-sm font-semibold text-gray-800">
                    {hotspots.find((h) => h.id === hoveredHotspot)?.name}
                  </p>
                </div>
              )}


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
