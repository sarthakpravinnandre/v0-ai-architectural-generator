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
    <div className={`space-y-4 ${isExpanded ? 'fixed inset-0 z-50 bg-background p-4 flex flex-col' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Floor {floorNumber} Plan</h3>
          <p className="text-sm text-foreground/60">
            {rooms.length} rooms • {totalArea.toFixed(1)} m² built-up area
          </p>
        </div>
        <div className="flex gap-2">
          {onDownload && (
            <Button
              variant="outline"
              size="sm"
              onClick={onDownload}
              className="gap-1"
            >
              <Download className="w-4 h-4" />
              Download
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
                Expand
              </>
            )}
          </Button>
        </div>
      </div>

      {/* SVG Preview */}
      <div className={`bg-background border border-border rounded-lg overflow-auto ${isExpanded ? 'flex-1' : 'max-h-96'}`}>
        <div className="inline-block min-w-full p-4">
          <div dangerouslySetInnerHTML={{ __html: svg }} />
        </div>
      </div>

      {/* Room List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h4 className="font-semibold text-sm">Rooms</h4>
          <div className="space-y-1 max-h-48 overflow-y-auto">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="text-sm p-2 bg-secondary/10 rounded border border-secondary/20"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{room.name}</p>
                    <p className="text-xs text-foreground/60 capitalize">{room.type}</p>
                  </div>
                  <p className="text-xs font-semibold text-primary">
                    {(room.width * room.height).toFixed(1)} m²
                  </p>
                </div>
                <p className="text-xs text-foreground/50 mt-1">
                  {room.width.toFixed(1)}m × {room.height.toFixed(1)}m
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm">Statistics</h4>
          <div className="space-y-1">
            <div className="p-2 bg-primary/10 rounded border border-primary/20">
              <p className="text-xs text-foreground/60">Total Plot Area</p>
              <p className="font-semibold text-primary">
                {(plotLength * plotBreadth).toFixed(1)} m²
              </p>
            </div>
            <div className="p-2 bg-primary/10 rounded border border-primary/20">
              <p className="text-xs text-foreground/60">Built-up Area</p>
              <p className="font-semibold text-primary">{totalArea.toFixed(1)} m²</p>
            </div>
            <div className="p-2 bg-primary/10 rounded border border-primary/20">
              <p className="text-xs text-foreground/60">Space Efficiency</p>
              <p className="font-semibold text-primary">
                {((totalArea / (plotLength * plotBreadth)) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="p-2 bg-secondary/10 rounded border border-secondary/20">
              <p className="text-xs text-foreground/60">Number of Rooms</p>
              <p className="font-semibold text-secondary">{rooms.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
