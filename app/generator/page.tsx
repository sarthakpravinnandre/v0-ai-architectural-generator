'use client'

import { useState, useEffect } from 'react'
import { InputForm } from '@/components/generator/InputForm'
import { FloorPlanViewer } from '@/components/dashboard/FloorPlanViewer'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { PlotInput, Room, CostEstimate } from '@/lib/types'
import { generateFloorPlanSVG, downloadSVG } from '@/lib/svg-generator'
import {
  generateOptimalLayout,
  calculateBuildingStats,
  estimateCosts,
} from '@/lib/layout-algorithms'


interface GeneratedPlan {
  input: PlotInput
  rooms: Room[]
  floorPlanSvg: string
  costEstimate: CostEstimate
  buildingStats: ReturnType<typeof calculateBuildingStats>
}

export default function GeneratorPage() {
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedPlan | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

      setGeneratedPlan({
        input,
        rooms,
        floorPlanSvg,
        costEstimate,
        buildingStats,
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
    <DashboardLayout
      plotLength={generatedPlan?.input.length || 30}
      plotBreadth={generatedPlan?.input.breadth || 40}
    >
      {!generatedPlan ? (
        // Initial State - Show Input Form
        <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-[#0a0e27] via-[#0f1333] to-[#0a0e27]">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold text-primary">AI Floor Plan Generator</h2>
              <p className="text-foreground/60">Create your perfect architectural layout in seconds</p>
            </div>

            <div className="bg-card/50 backdrop-blur border border-primary/20 rounded-2xl p-8 space-y-6 shadow-2xl shadow-primary/10">
              <InputForm
                onGenerate={handleGenerate}
                isLoading={isLoading}
              />

              {/* Error State */}
              {error && (
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Error</p>
                      <p className="text-sm text-foreground/70 mt-1">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tips */}
              <div className="p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                <h4 className="font-semibold text-sm mb-2 text-secondary">Quick Tips</h4>
                <ul className="text-xs space-y-1 text-foreground/70">
                  <li>• Enter plot dimensions in meters</li>
                  <li>• Choose appropriate building type</li>
                  <li>• Specify number of floors</li>
                  <li>• Click generate to create plans</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Generated State - Show Dashboard
        <>
          <FloorPlanViewer
            svg={generatedPlan.floorPlanSvg}
            plotLength={generatedPlan.input.length}
            plotBreadth={generatedPlan.input.breadth}
            onDownload={handleDownloadSVG}
          />
        </>
      )}
    </DashboardLayout>
  )
}

