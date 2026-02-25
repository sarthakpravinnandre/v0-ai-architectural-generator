'use client'

import { useEffect, useRef, useState } from 'react'
import { Room } from '@/lib/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Maximize2, Minimize2, RotateCw } from 'lucide-react'

interface ThreeDPreviewProps {
  rooms: Room[]
  plotLength: number
  plotBreadth: number
  numFloors: number
}

export function ThreeDPreview({
  rooms,
  plotLength,
  plotBreadth,
  numFloors,
}: ThreeDPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [rotation, setRotation] = useState({ x: 0.5, y: 0.5 })
  const animationFrameRef = useRef<number>()

  const SCALE = 5 // pixels per meter
  const FLOOR_HEIGHT = 3.5 // meters
  const MARGIN = 50

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    // Clear canvas
    ctx.fillStyle = '#f8fafc'
    ctx.fillRect(0, 0, width, height)

    // Draw 3D representation
    draw3D(ctx, width, height)
  }, [rooms, plotLength, plotBreadth, numFloors, rotation, isExpanded])

  const draw3D = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = '#f8fafc'
    ctx.fillRect(0, 0, width, height)

    const centerX = width / 2
    const centerY = height / 2
    const buildingWidth = plotLength * SCALE
    const buildingDepth = plotBreadth * SCALE
    const buildingHeight = numFloors * FLOOR_HEIGHT * SCALE

    // Isometric-like projection
    const offsetX = Math.cos(rotation.y) * buildingWidth
    const offsetY = Math.sin(rotation.x) * buildingHeight
    const offsetZ = Math.sin(rotation.y) * buildingDepth

    // Draw building box (simplified isometric)
    ctx.strokeStyle = '#1a3a52'
    ctx.lineWidth = 2
    ctx.fillStyle = 'rgba(37, 99, 235, 0.1)'

    // Front face
    const frontX = centerX - buildingWidth / 2
    const frontY = centerY - buildingHeight / 2

    ctx.beginPath()
    ctx.moveTo(frontX, frontY)
    ctx.lineTo(frontX + buildingWidth, frontY)
    ctx.lineTo(frontX + buildingWidth, frontY + buildingHeight)
    ctx.lineTo(frontX, frontY + buildingHeight)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // Top face
    ctx.fillStyle = 'rgba(37, 99, 235, 0.15)'
    ctx.beginPath()
    ctx.moveTo(frontX, frontY)
    ctx.lineTo(frontX + buildingDepth / 3, frontY - buildingDepth / 4)
    ctx.lineTo(frontX + buildingWidth + buildingDepth / 3, frontY - buildingDepth / 4)
    ctx.lineTo(frontX + buildingWidth, frontY)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // Side face
    ctx.fillStyle = 'rgba(37, 99, 235, 0.2)'
    ctx.beginPath()
    ctx.moveTo(frontX + buildingWidth, frontY)
    ctx.lineTo(frontX + buildingWidth + buildingDepth / 3, frontY - buildingDepth / 4)
    ctx.lineTo(frontX + buildingWidth + buildingDepth / 3, frontY + buildingHeight - buildingDepth / 4)
    ctx.lineTo(frontX + buildingWidth, frontY + buildingHeight)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // Draw floors
    ctx.strokeStyle = '#cbd5e1'
    ctx.lineWidth = 1
    for (let floor = 1; floor < numFloors; floor++) {
      const floorY = frontY + (floor * buildingHeight) / numFloors

      ctx.beginPath()
      ctx.moveTo(frontX, floorY)
      ctx.lineTo(frontX + buildingWidth, floorY)
      ctx.stroke()

      // Floor label
      ctx.fillStyle = '#64748b'
      ctx.font = '11px sans-serif'
      ctx.fillText(`Floor ${floor}`, frontX - 40, floorY + 4)
    }

    // Draw windows (simplified)
    ctx.fillStyle = '#bfdbfe'
    ctx.strokeStyle = '#1e40af'
    ctx.lineWidth = 1

    const windowWidth = (buildingWidth / 4) / numFloors
    const windowHeight = buildingHeight / (numFloors * 2)

    for (let floor = 0; floor < numFloors; floor++) {
      for (let col = 0; col < 4; col++) {
        const windowX = frontX + col * (buildingWidth / 4) + windowWidth / 2
        const windowY = frontY + floor * (buildingHeight / numFloors) + windowHeight / 2

        ctx.fillRect(windowX, windowY, windowWidth * 0.8, windowHeight * 0.8)
        ctx.strokeRect(windowX, windowY, windowWidth * 0.8, windowHeight * 0.8)
      }
    }

    // Draw roof
    ctx.fillStyle = '#dc2626'
    ctx.beginPath()
    ctx.moveTo(centerX - buildingWidth / 2, frontY)
    ctx.lineTo(centerX, frontY - buildingHeight / 6)
    ctx.lineTo(centerX + buildingWidth / 2, frontY)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // Add labels
    ctx.fillStyle = '#1a3a52'
    ctx.font = 'bold 14px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(`${numFloors}-Story Building`, centerX, height - 20)
    ctx.font = '12px sans-serif'
    ctx.fillText(`Plot: ${plotLength}m × ${plotBreadth}m`, centerX, height - 5)

    // Draw coordinate axes
    ctx.strokeStyle = '#94a3b8'
    ctx.lineWidth = 1
    ctx.fillStyle = '#64748b'
    ctx.font = '10px sans-serif'

    const axisX = centerX - buildingWidth / 2 - 20
    const axisY = centerY + buildingHeight / 2 + 20

    // X axis (red)
    ctx.strokeStyle = '#ef4444'
    ctx.beginPath()
    ctx.moveTo(axisX, axisY)
    ctx.lineTo(axisX + 30, axisY)
    ctx.stroke()
    ctx.fillStyle = '#ef4444'
    ctx.fillText('X', axisX + 35, axisY + 4)

    // Y axis (green)
    ctx.strokeStyle = '#10b981'
    ctx.beginPath()
    ctx.moveTo(axisX, axisY)
    ctx.lineTo(axisX, axisY - 30)
    ctx.stroke()
    ctx.fillStyle = '#10b981'
    ctx.fillText('Y', axisX - 5, axisY - 35)

    // Z axis (blue) - simplified
    ctx.strokeStyle = '#2563eb'
    ctx.beginPath()
    ctx.moveTo(axisX, axisY)
    ctx.lineTo(axisX + 15, axisY - 15)
    ctx.stroke()
    ctx.fillStyle = '#2563eb'
    ctx.fillText('Z', axisX + 20, axisY - 20)
  }

  const resetRotation = () => {
    setRotation({ x: 0.5, y: 0.5 })
  }

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas || !e.buttons) return

    const rect = canvas.getBoundingClientRect()
    const deltaX = e.clientX - rect.left - canvas.width / 2
    const deltaY = e.clientY - rect.top - canvas.height / 2

    setRotation({
      x: Math.max(-Math.PI / 4, Math.min(Math.PI / 4, rotation.x + deltaY * 0.01)),
      y: rotation.y + deltaX * 0.01,
    })
  }

  return (
    <Card className={`${isExpanded ? 'fixed inset-0 z-50' : ''}`}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>3D Building Preview</CardTitle>
            <CardDescription>
              Interactive 3D visualization of your building design
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={resetRotation}
              className="gap-1"
            >
              <RotateCw className="w-4 h-4" />
              Reset
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="gap-1"
            >
              {isExpanded ? (
                <>
                  <Minimize2 className="w-4 h-4" />
                  Exit
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
      </CardHeader>

      <CardContent>
        <div className={isExpanded ? 'flex-1' : 'max-h-96'}>
          <canvas
            ref={canvasRef}
            width={isExpanded ? 1200 : 600}
            height={isExpanded ? 800 : 400}
            onMouseMove={handleCanvasMouseMove}
            className="w-full border border-border rounded-lg bg-background cursor-move"
            style={{ touchAction: 'none' }}
          />
        </div>

        {/* Instructions */}
        <div className="mt-4 p-3 bg-secondary/10 rounded-lg border border-secondary/20">
          <p className="text-xs text-foreground/70">
            Tip: Click and drag on the canvas to rotate the 3D view. This is a simplified isometric
            projection. For detailed 3D models, export to professional software.
          </p>
        </div>

        {/* Building Info */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="p-3 bg-primary/5 rounded border border-primary/20">
            <p className="text-xs text-foreground/60">Total Height</p>
            <p className="font-semibold text-primary">
              {(numFloors * FLOOR_HEIGHT).toFixed(1)}m
            </p>
          </div>
          <div className="p-3 bg-secondary/5 rounded border border-secondary/20">
            <p className="text-xs text-foreground/60">Footprint</p>
            <p className="font-semibold text-secondary">
              {(plotLength * plotBreadth).toFixed(0)}m²
            </p>
          </div>
          <div className="p-3 bg-orange-100 dark:bg-orange-950 rounded border border-orange-200 dark:border-orange-800">
            <p className="text-xs text-foreground/60">Stories</p>
            <p className="font-semibold text-orange-600 dark:text-orange-400">
              {numFloors}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
