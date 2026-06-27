'use client'

import { useState } from 'react'
import { Room } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Download, Maximize2, Minimize2 } from 'lucide-react'

interface FloorPlanPreviewProps {
  svg: string
  rooms: Room[]
  plotLength: number
  plotBreadth: number
  floorNumber?: number
  onDownload?: () => void
}

export function FloorPlanPreview({
  svg,
  rooms,
  plotLength,
  plotBreadth,
  floorNumber = 1,
  onDownload,
}: FloorPlanPreviewProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const totalArea = rooms.reduce((sum, room) => sum + room.width * room.height, 0)

  return (
    <div className={`space-y-4 ${isExpanded ? 'fixed inset-0 z-50 bg-background p-6 flex flex-col' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Floor {floorNumber} Plan</h3>
          <p className="text-sm text-foreground/60">
            {rooms.length} rooms • {totalArea.toFixed(1)} m² built-up • {plotLength}m × {plotBreadth}m plot
          </p>
        </div>
        <div className="flex gap-2">
          {onDownload && (
            <Button
              size="sm"
              onClick={onDownload}
              className="gap-2 bg-primary hover:bg-primary/90 text-white"
            >
              <Download className="w-4 h-4" />
              Download SVG
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="gap-1"
          >
            {isExpanded ? (
              <>
                <Minimize2 className="w-4 h-4" />
                Minimize
              </>
            ) : (
              <>
                <Maximize2 className="w-4 h-4" />
                Fullscreen
              </>
            )}
          </Button>
        </div>
      </div>

      {/* SVG Preview with premium styling */}
      <div className={`bg-card/40 backdrop-blur border border-primary/20 rounded-lg overflow-auto ${isExpanded ? 'flex-1' : 'h-96 lg:h-[32rem]'}`}>
        <div className="w-full h-full p-6 flex items-center justify-center overflow-auto">
          <div 
            dangerouslySetInnerHTML={{ __html: svg }} 
            className="drop-shadow-2xl"
            style={{
              filter: 'drop-shadow(0 10px 30px rgba(0, 217, 255, 0.15))'
            }}
          />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-card/40 backdrop-blur border border-primary/20 rounded-lg p-4 space-y-1">
          <p className="text-xs text-foreground/60 uppercase tracking-wide">Total Plot</p>
          <p className="text-xl font-bold text-primary">{(plotLength * plotBreadth).toFixed(0)} m²</p>
        </div>
        <div className="bg-card/40 backdrop-blur border border-secondary/20 rounded-lg p-4 space-y-1">
          <p className="text-xs text-foreground/60 uppercase tracking-wide">Built-up</p>
          <p className="text-xl font-bold text-secondary">{totalArea.toFixed(0)} m²</p>
        </div>
        <div className="bg-card/40 backdrop-blur border border-accent/20 rounded-lg p-4 space-y-1">
          <p className="text-xs text-foreground/60 uppercase tracking-wide">Efficiency</p>
          <p className="text-xl font-bold text-accent">
            {((totalArea / (plotLength * plotBreadth)) * 100).toFixed(0)}%
          </p>
        </div>
        <div className="bg-card/40 backdrop-blur border border-primary/20 rounded-lg p-4 space-y-1">
          <p className="text-xs text-foreground/60 uppercase tracking-wide">Rooms</p>
          <p className="text-xl font-bold text-primary">{rooms.length}</p>
        </div>
      </div>

      {/* Room List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <h4 className="font-semibold text-lg">Spaces & Rooms</h4>
          <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
            {rooms.map((room, index) => (
              <div
                key={room.id}
                className="group bg-card/40 backdrop-blur border border-border/50 rounded-lg p-3 space-y-2 hover:border-primary/50 transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <p className="font-semibold text-primary group-hover:text-accent transition-colors">{room.name}</p>
                    <p className="text-xs text-foreground/50 uppercase tracking-wide capitalize">{room.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-primary">
                      {(room.width * room.height).toFixed(1)} m²
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 text-xs text-foreground/60 bg-background/50 rounded px-2 py-1">
                  <span>{room.width.toFixed(1)}m</span>
                  <span className="text-foreground/30">×</span>
                  <span>{room.height.toFixed(1)}m</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Statistics */}
        <div className="space-y-3">
          <h4 className="font-semibold text-lg">Plan Analysis</h4>
          <div className="space-y-2">
            <div className="bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur border border-primary/30 rounded-lg p-4 space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-sm text-foreground/70">Plot Dimensions</p>
                <p className="font-bold text-primary">{plotLength}m × {plotBreadth}m</p>
              </div>
              <div className="h-1 bg-background/50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-secondary"
                  style={{ width: `${Math.min((plotLength / 100) * 100, 100)}%` }}
                />
              </div>
            </div>

            <div className="bg-gradient-to-br from-secondary/20 to-secondary/10 backdrop-blur border border-secondary/30 rounded-lg p-4">
              <p className="text-sm text-foreground/70 mb-2">Average Room Size</p>
              <p className="font-bold text-lg text-secondary">
                {(totalArea / Math.max(rooms.length, 1)).toFixed(1)} m²
              </p>
            </div>

            <div className="bg-gradient-to-br from-accent/20 to-accent/10 backdrop-blur border border-accent/30 rounded-lg p-4">
              <p className="text-sm text-foreground/70 mb-2">Total Perimeter</p>
              <p className="font-bold text-lg text-accent">
                {(2 * (plotLength + plotBreadth)).toFixed(0)} m
              </p>
            </div>

            <div className="bg-card/40 backdrop-blur border border-border/50 rounded-lg p-4">
              <p className="text-sm text-foreground/70 mb-3">Room Distribution</p>
              <div className="flex gap-2 flex-wrap">
                {rooms.slice(0, 5).map((room, i) => (
                  <div 
                    key={room.id}
                    className="px-3 py-1 bg-primary/20 border border-primary/40 rounded text-xs font-medium text-primary"
                    title={room.name}
                  >
                    {room.name.split(' ')[0]}
                  </div>
                ))}
                {rooms.length > 5 && (
                  <div className="px-3 py-1 bg-foreground/10 border border-foreground/20 rounded text-xs font-medium text-foreground/60">
                    +{rooms.length - 5} more
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
