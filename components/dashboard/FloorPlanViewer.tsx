'use client'

import { Download, Maximize2, Settings } from 'lucide-react'

interface FloorPlanViewerProps {
  svg: string
  plotLength: number
  plotBreadth: number
  onDownload?: () => void
}

export function FloorPlanViewer({
  svg,
  plotLength,
  plotBreadth,
  onDownload,
}: FloorPlanViewerProps) {
  return (
    <div className="flex-1 flex flex-col h-full bg-gradient-to-br from-[#0a0e27] via-[#0f1333] to-[#0a0e27] relative overflow-hidden">
      {/* Background Blueprint Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          style={{ position: 'absolute' }}
        >
          <defs>
            <pattern
              id="blueprint-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#00d9ff"
                strokeWidth="0.5"
              />
              <circle cx="0" cy="0" r="1" fill="#00d9ff" />
            </pattern>
            <pattern
              id="blueprint-lines"
              width="200"
              height="200"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 200 0 L 0 0 0 200"
                fill="none"
                stroke="#0099ff"
                strokeWidth="0.3"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
          <rect width="100%" height="100%" fill="url(#blueprint-lines)" />
        </svg>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Toolbar */}
      <div className="relative z-10 flex items-center justify-between p-4 border-b border-primary/10 bg-black/20 backdrop-blur-sm">
        <div>
          <h2 className="text-lg font-bold text-primary">Floor Plan - Ground Floor</h2>
          <p className="text-sm text-foreground/60">{plotLength}m × {plotBreadth}m Plot</p>
        </div>
        <div className="flex items-center gap-2">
          {onDownload && (
            <button
              onClick={onDownload}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary transition-all hover:shadow-lg hover:shadow-primary/20"
            >
              <Download size={16} />
              <span className="text-sm font-medium">Download</span>
            </button>
          )}
          <button className="p-2 rounded-lg hover:bg-white/5 transition-colors text-foreground/60 hover:text-foreground/90">
            <Maximize2 size={18} />
          </button>
          <button className="p-2 rounded-lg hover:bg-white/5 transition-colors text-foreground/60 hover:text-foreground/90">
            <Settings size={18} />
          </button>
        </div>
      </div>

      {/* Floor Plan Container */}
      <div className="relative z-5 flex-1 flex items-center justify-center p-8 overflow-auto">
        <div className="bg-card/30 backdrop-blur-sm border border-primary/30 rounded-2xl p-8 shadow-2xl shadow-primary/10 max-w-5xl w-full">
          {/* SVG Viewer */}
          <div
            className="w-full flex items-center justify-center bg-gradient-to-br from-black/20 to-black/40 rounded-xl p-6 border border-primary/20"
            style={{ aspectRatio: '16 / 9' }}
          >
            <div
              dangerouslySetInnerHTML={{ __html: svg }}
              className="w-full h-full drop-shadow-2xl"
              style={{
                filter: 'drop-shadow(0 10px 30px rgba(0, 217, 255, 0.15))',
              }}
            />
          </div>

          {/* Floor Plan Info Cards */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white/5 backdrop-blur border border-primary/20 rounded-lg p-4 hover:bg-white/8 transition-all">
              <p className="text-xs text-foreground/60 uppercase tracking-wider">Total Area</p>
              <p className="text-2xl font-bold text-primary mt-1">
                {(plotLength * plotBreadth).toFixed(0)}m²
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur border border-secondary/20 rounded-lg p-4 hover:bg-white/8 transition-all">
              <p className="text-xs text-foreground/60 uppercase tracking-wider">Dimensions</p>
              <p className="text-2xl font-bold text-secondary mt-1">
                {plotLength}m × {plotBreadth}m
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur border border-accent/20 rounded-lg p-4 hover:bg-white/8 transition-all">
              <p className="text-xs text-foreground/60 uppercase tracking-wider">Aspect Ratio</p>
              <p className="text-2xl font-bold text-accent mt-1">
                {(plotLength / plotBreadth).toFixed(2)}:1
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
