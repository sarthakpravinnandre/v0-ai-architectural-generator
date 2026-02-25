'use client'

import { useState } from 'react'
import { InputForm } from '@/components/generator/InputForm'
import { FloorPlanPreview } from '@/components/generator/FloorPlanPreview'
import { CostEstimator } from '@/components/generator/CostEstimator'
import { PlotInput, Room, CostEstimate, StructuralElement } from '@/lib/types'
import { generateFloorPlanSVG, downloadSVG } from '@/lib/svg-generator'
import {
  generateOptimalLayout,
  calculateBuildingStats,
  estimateCosts,
} from '@/lib/layout-algorithms'
import { generateStructuralLayout } from '@/lib/structural-calculator'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AlertCircle, CheckCircle } from 'lucide-react'

interface GeneratedPlan {
  input: PlotInput
  rooms: Room[]
  floorPlanSvg: string
  costEstimate: CostEstimate
  buildingStats: ReturnType<typeof calculateBuildingStats>
  structural: {
    columns: StructuralElement[]
    beams: StructuralElement[]
    walls: StructuralElement[]
    foundation: StructuralElement[]
  }
}

export default function GeneratorPage() {
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedPlan | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentTab, setCurrentTab] = useState('floor-plan')

  const handleGenerate = async (input: PlotInput) => {
    setIsLoading(true)
    setError(null)

    try {
      console.log('[v0] Generating plan with input:', input)

      // Generate optimal layout
      const rooms = generateOptimalLayout(input)
      console.log('[v0] Generated rooms:', rooms)

      // Calculate building stats
      const buildingStats = calculateBuildingStats(
        rooms,
        input.length,
        input.breadth
      )
      console.log('[v0] Building stats:', buildingStats)

      // Generate SVG
      const floorPlanSvg = generateFloorPlanSVG(
        rooms,
        input.length,
        input.breadth,
        1
      )
      console.log('[v0] Generated SVG')

      // Estimate costs
      const costEstimate = estimateCosts(
        rooms,
        buildingStats,
        input.numFloors
      )
      console.log('[v0] Cost estimate calculated:', costEstimate)

      // Generate structural layout
      const structural = generateStructuralLayout(
        input.length,
        input.breadth,
        input.numFloors
      )
      console.log('[v0] Structural layout generated:', structural)

      setGeneratedPlan({
        input,
        rooms,
        floorPlanSvg,
        costEstimate,
        buildingStats,
        structural,
      })
    } catch (err) {
      console.error('[v0] Error generating plan:', err)
      setError(
        err instanceof Error ? err.message : 'Failed to generate plan'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownloadSVG = () => {
    if (!generatedPlan) return
    downloadSVG(
      generatedPlan.floorPlanSvg,
      `floor-plan-${Date.now()}.svg`
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-primary">Plan Generator</h1>
          <p className="text-foreground/60 mt-1">
            Create your perfect architectural plan in seconds
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Input Form */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Building Details</h2>
              <InputForm
                onGenerate={handleGenerate}
                isLoading={isLoading}
              />

              {/* Instructions */}
              <div className="mt-8 p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                <h4 className="font-semibold text-sm mb-2 text-secondary">
                  Quick Tips
                </h4>
                <ul className="text-xs space-y-1 text-foreground/70">
                  <li>• Enter plot dimensions in meters</li>
                  <li>• Choose appropriate building type</li>
                  <li>• Specify number of floors</li>
                  <li>• Click generate to create plans</li>
                </ul>
              </div>
            </Card>
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Error State */}
            {error && (
              <Card className="p-4 bg-destructive/10 border-destructive/20">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Error</p>
                    <p className="text-sm text-foreground/70 mt-1">{error}</p>
                  </div>
                </div>
              </Card>
            )}

            {/* Success State */}
            {generatedPlan && (
              <Card className="p-4 bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Plan Generated Successfully!</p>
                    <p className="text-sm text-foreground/70 mt-1">
                      Your floor plan is ready. Review the details below.
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Results Tabs */}
            {generatedPlan && (
              <Tabs defaultValue="floor-plan" className="w-full" onValueChange={setCurrentTab}>
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="floor-plan" className="text-base">Floor Plan</TabsTrigger>
                  <TabsTrigger value="stats" className="text-base">Analysis</TabsTrigger>
                  <TabsTrigger value="costs" className="text-base">Cost Estimate</TabsTrigger>
                </TabsList>

                {/* Floor Plan Tab */}
                <TabsContent value="floor-plan" className="space-y-4">
                  <FloorPlanPreview
                    svg={generatedPlan.floorPlanSvg}
                    rooms={generatedPlan.rooms}
                    plotLength={generatedPlan.input.length}
                    plotBreadth={generatedPlan.input.breadth}
                    floorNumber={1}
                    onDownload={handleDownloadSVG}
                  />
                </TabsContent>



                {/* Statistics Tab */}
                <TabsContent value="stats" className="space-y-4">
                  <Card className="p-6 space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Building Statistics
                      </h3>

                      {/* Key Metrics */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                          <p className="text-sm text-foreground/60">Plot Size</p>
                          <p className="text-2xl font-bold text-primary">
                            {(
                              generatedPlan.input.length *
                              generatedPlan.input.breadth
                            ).toFixed(0)}{' '}
                            m²
                          </p>
                        </div>
                        <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                          <p className="text-sm text-foreground/60">
                            Built-up Area
                          </p>
                          <p className="text-2xl font-bold text-primary">
                            {generatedPlan.buildingStats.builtUpArea.toFixed(
                              1
                            )}{' '}
                            m²
                          </p>
                        </div>
                        <div className="p-4 bg-secondary/5 rounded-lg border border-secondary/20">
                          <p className="text-sm text-foreground/60">
                            Carpet Area
                          </p>
                          <p className="text-2xl font-bold text-secondary">
                            {generatedPlan.buildingStats.carpetArea.toFixed(1)}{' '}
                            m²
                          </p>
                        </div>
                        <div className="p-4 bg-orange-100 dark:bg-orange-950 rounded-lg border border-orange-200 dark:border-orange-800">
                          <p className="text-sm text-foreground/60">
                            Space Efficiency
                          </p>
                          <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                            {generatedPlan.buildingStats.efficiency.toFixed(1)}%
                          </p>
                        </div>
                      </div>

                      {/* Detailed Info */}
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-foreground/60">
                            Plot Dimensions
                          </p>
                          <p className="text-base font-semibold">
                            {generatedPlan.input.length}m ×{' '}
                            {generatedPlan.input.breadth}m
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground/60">
                            Number of Floors
                          </p>
                          <p className="text-base font-semibold">
                            {generatedPlan.input.numFloors}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground/60">
                            Building Type
                          </p>
                          <p className="text-base font-semibold capitalize">
                            {generatedPlan.input.plotType}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground/60">
                            Number of Rooms
                          </p>
                          <p className="text-base font-semibold">
                            {generatedPlan.rooms.length}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                {/* Cost Estimate Tab */}
                <TabsContent value="costs">
                  <CostEstimator
                    costEstimate={generatedPlan.costEstimate}
                  />
                </TabsContent>


              </Tabs>
            )}

            {/* Empty State */}
            {!generatedPlan && !isLoading && (
              <Card className="p-12 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-secondary/10 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-secondary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    Ready to generate your floor plan?
                  </h3>
                  <p className="text-foreground/60 mt-1">
                    Fill in your building details on the left and click the
                    generate button to see your plan
                  </p>
                </div>
              </Card>
            )}

            {/* Loading State */}
            {isLoading && (
              <Card className="p-12 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
                  <div className="animate-spin w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    Generating your plan...
                  </h3>
                  <p className="text-foreground/60 mt-1">
                    Our AI is optimizing your space layout
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
