'use client'

import { useState } from 'react'
import { StructuralElement } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { generateStructuralSVG, downloadSVG } from '@/lib/svg-generator'
import { Download, Eye, EyeOff } from 'lucide-react'

interface StructuralOverlayProps {
  columns: StructuralElement[]
  beams: StructuralElement[]
  walls: StructuralElement[]
  plotLength: number
  plotBreadth: number
}

export function StructuralOverlay({
  columns,
  beams,
  walls,
  plotLength,
  plotBreadth,
}: StructuralOverlayProps) {
  const [showColumns, setShowColumns] = useState(true)
  const [showBeams, setShowBeams] = useState(true)
  const [showWalls, setShowWalls] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)

  const allElements = [
    ...columns.map((col) => ({ ...col, type: 'column' as const })),
    ...beams.map((beam) => ({ ...beam, type: 'beam' as const })),
    ...walls.map((wall) => ({ ...wall, type: 'wall' as const })),
  ]

  const filteredElements = allElements.filter((elem) => {
    if (elem.type === 'column') return showColumns
    if (elem.type === 'beam') return showBeams
    if (elem.type === 'wall') return showWalls
    return true
  })

  const svg = generateStructuralSVG(
    filteredElements,
    plotLength,
    plotBreadth
  )

  const handleDownload = () => {
    downloadSVG(svg, `structural-layout-${Date.now()}.svg`)
  }

  return (
    <Card className={`${isExpanded ? 'fixed inset-0 z-50' : ''}`}>
      {isExpanded && (
        <div className="absolute inset-0 flex flex-col">
          {/* Expanded Header */}
          <CardHeader className="border-b">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Structural Layout - Full View</CardTitle>
                <CardDescription>
                  Columns, beams, walls, and foundations
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsExpanded(false)}
              >
                Exit Fullscreen
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-auto p-4">
            <div className="inline-block">
              <div dangerouslySetInnerHTML={{ __html: svg }} />
            </div>
          </CardContent>
        </div>
      )}

      {!isExpanded && (
        <>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Structural Layout</CardTitle>
                <CardDescription>
                  Columns, beams, walls, and load distribution
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                  className="gap-1"
                >
                  <Download className="w-4 h-4" />
                  Download
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Toggle Controls */}
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={showColumns ? 'default' : 'outline'}
                size="sm"
                onClick={() => setShowColumns(!showColumns)}
                className="gap-1"
              >
                {showColumns ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
                Columns
                <span className="ml-1 text-xs">({columns.length})</span>
              </Button>
              <Button
                variant={showBeams ? 'default' : 'outline'}
                size="sm"
                onClick={() => setShowBeams(!showBeams)}
                className="gap-1"
              >
                {showBeams ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
                Beams
                <span className="ml-1 text-xs">({beams.length})</span>
              </Button>
              <Button
                variant={showWalls ? 'default' : 'outline'}
                size="sm"
                onClick={() => setShowWalls(!showWalls)}
                className="gap-1"
              >
                {showWalls ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
                Walls
                <span className="ml-1 text-xs">({walls.length})</span>
              </Button>
            </div>

            {/* SVG Preview */}
            <div className="border border-border rounded-lg p-4 max-h-96 overflow-auto bg-background">
              <div className="inline-block" onClick={() => setIsExpanded(true)}>
                <div dangerouslySetInnerHTML={{ __html: svg }} />
              </div>
            </div>

            {/* Structural Details */}
            <Tabs defaultValue="columns" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="columns">Columns</TabsTrigger>
                <TabsTrigger value="beams">Beams</TabsTrigger>
                <TabsTrigger value="walls">Walls</TabsTrigger>
              </TabsList>

              <TabsContent value="columns" className="space-y-2">
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {columns.length > 0 ? (
                    columns.map((col, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded text-sm"
                      >
                        <div className="flex justify-between items-start mb-1">
                          <p className="font-semibold text-red-900 dark:text-red-100">
                            Column {idx + 1}
                          </p>
                          <span className="text-xs text-red-700 dark:text-red-300">
                            {col.size || 'Standard'}
                          </span>
                        </div>
                        <p className="text-xs text-foreground/70">
                          Position: ({col.x.toFixed(1)}m, {col.y.toFixed(1)}m)
                        </p>
                        <p className="text-xs text-foreground/70">
                          Dimensions: {col.width.toFixed(1)}m × {col.height.toFixed(1)}m
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-foreground/60 text-center py-4">
                      No columns defined
                    </p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="beams" className="space-y-2">
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {beams.length > 0 ? (
                    beams.map((beam, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded text-sm"
                      >
                        <div className="flex justify-between items-start mb-1">
                          <p className="font-semibold text-blue-900 dark:text-blue-100">
                            Beam {idx + 1}
                          </p>
                          <span className="text-xs text-blue-700 dark:text-blue-300">
                            {col.size || 'Standard'}
                          </span>
                        </div>
                        <p className="text-xs text-foreground/70">
                          Position: ({beam.x.toFixed(1)}m, {beam.y.toFixed(1)}m)
                        </p>
                        <p className="text-xs text-foreground/70">
                          Span: {beam.width.toFixed(1)}m × {beam.height.toFixed(1)}m
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-foreground/60 text-center py-4">
                      No beams defined
                    </p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="walls" className="space-y-2">
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {walls.length > 0 ? (
                    walls.map((wall, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded text-sm"
                      >
                        <div className="flex justify-between items-start mb-1">
                          <p className="font-semibold text-gray-900 dark:text-gray-100">
                            Wall {idx + 1}
                          </p>
                          <span className="text-xs text-gray-700 dark:text-gray-300">
                            {wall.material}
                          </span>
                        </div>
                        <p className="text-xs text-foreground/70">
                          Position: ({wall.x.toFixed(1)}m, {wall.y.toFixed(1)}m)
                        </p>
                        <p className="text-xs text-foreground/70">
                          Thickness: {wall.width.toFixed(1)}m × {wall.height.toFixed(1)}m
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-foreground/60 text-center py-4">
                      No walls defined
                    </p>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            {/* Structural Summary */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-2">
              <h4 className="font-semibold text-sm text-primary">
                Structural Summary
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-foreground/60">Total Columns</p>
                  <p className="font-semibold text-primary">{columns.length}</p>
                </div>
                <div>
                  <p className="text-foreground/60">Total Beams</p>
                  <p className="font-semibold text-primary">{beams.length}</p>
                </div>
                <div>
                  <p className="text-foreground/60">Wall Segments</p>
                  <p className="font-semibold text-primary">{walls.length}</p>
                </div>
                <div>
                  <p className="text-foreground/60">Column Grid</p>
                  <p className="font-semibold text-primary">6m × 6m</p>
                </div>
              </div>
            </div>
          </CardContent>
        </>
      )}
    </Card>
  )
}
