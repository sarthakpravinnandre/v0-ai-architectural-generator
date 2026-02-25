'use client'

import { useState } from 'react'
import { Room, VastuCompliance } from '@/lib/types'
import { calculateVastuCompliance, getVastuRecommendations } from '@/lib/vastu-calculator'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CheckCircle, AlertCircle, Info, Zap } from 'lucide-react'

interface VastuPanelProps {
  rooms: Room[]
  plotLength: number
  plotBreadth: number
  onApply?: (compliance: VastuCompliance) => void
}

type Direction = 'Northeast' | 'North' | 'East' | 'Southeast' | 'South' | 'Southwest' | 'West' | 'Northwest'

export function VastuPanel({
  rooms,
  plotLength,
  plotBreadth,
  onApply,
}: VastuPanelProps) {
  const [entrance, setEntrance] = useState<Direction>('Northeast')
  const [compliance, setCompliance] = useState<VastuCompliance | null>(null)

  const handleCalculate = () => {
    const comp = calculateVastuCompliance(
      rooms,
      plotLength,
      plotBreadth,
      entrance as any
    )
    setCompliance(comp)
    onApply?.(comp)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400'
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400'
    if (score >= 40) return 'text-orange-600 dark:text-orange-400'
    return 'text-red-600 dark:text-red-400'
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800'
    if (score >= 60) return 'bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800'
    if (score >= 40) return 'bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800'
    return 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Vastu Shastra Compliance
        </CardTitle>
        <CardDescription>
          Optimize your design according to Vastu principles
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Entrance Direction */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Entrance Direction</label>
          <Select value={entrance} onValueChange={(val) => setEntrance(val as Direction)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Northeast">Northeast (Best)</SelectItem>
              <SelectItem value="North">North</SelectItem>
              <SelectItem value="East">East</SelectItem>
              <SelectItem value="Southeast">Southeast</SelectItem>
              <SelectItem value="South">South</SelectItem>
              <SelectItem value="Southwest">Southwest</SelectItem>
              <SelectItem value="West">West</SelectItem>
              <SelectItem value="Northwest">Northwest</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-foreground/60 mt-1">
            Choose the direction your main entrance faces
          </p>
        </div>

        {/* Calculate Button */}
        <Button
          onClick={handleCalculate}
          className="w-full gap-2 bg-primary hover:bg-primary/90"
        >
          <Zap className="w-4 h-4" />
          Calculate Compliance
        </Button>

        {/* Compliance Score */}
        {compliance && (
          <>
            <div className={`p-4 rounded-lg border ${getScoreBgColor(compliance.score)}`}>
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold">Vastu Compliance Score</p>
                <p className={`text-3xl font-bold ${getScoreColor(compliance.score)}`}>
                  {compliance.score}%
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    compliance.score >= 80
                      ? 'bg-green-600'
                      : compliance.score >= 60
                      ? 'bg-yellow-600'
                      : compliance.score >= 40
                      ? 'bg-orange-600'
                      : 'bg-red-600'
                  }`}
                  style={{ width: `${compliance.score}%` }}
                />
              </div>
              <p className="text-sm mt-2">
                {compliance.isCompliant ? (
                  <span className="text-green-700 dark:text-green-300 font-semibold">
                    ✓ Vastu Compliant Design
                  </span>
                ) : (
                  <span className="text-orange-700 dark:text-orange-300 font-semibold">
                    ⚠ Consider improvements below
                  </span>
                )}
              </p>
            </div>

            {/* Compliance Details */}
            <div className="space-y-2">
              <p className="text-sm font-semibold">Compliance Status</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 bg-foreground/5 rounded">
                  {compliance.details.entranceDirection ? (
                    <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                  )}
                  <span className="text-sm">Entrance Position</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-foreground/5 rounded">
                  {compliance.details.kitchenPlacement ? (
                    <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                  )}
                  <span className="text-sm">Kitchen Placement</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-foreground/5 rounded">
                  {compliance.details.bedroomPlacement ? (
                    <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                  )}
                  <span className="text-sm">Bedroom Placement</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-foreground/5 rounded">
                  {compliance.details.bathroomPlacement ? (
                    <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                  )}
                  <span className="text-sm">Bathroom Placement</span>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            {compliance.recommendations.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-semibold flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Recommendations
                </p>
                <div className="space-y-1">
                  {compliance.recommendations.map((rec, idx) => (
                    <div
                      key={idx}
                      className="text-xs p-2 bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded"
                    >
                      <p className="text-orange-900 dark:text-orange-100">
                        • {rec}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vastu Tips */}
            <div className="space-y-2 pt-4 border-t border-border">
              <p className="text-sm font-semibold">Quick Vastu Tips</p>
              <div className="space-y-2 max-h-48 overflow-y-auto text-xs text-foreground/70">
                {getVastuRecommendations()
                  .slice(0, 5)
                  .map((tip, idx) => (
                    <div key={idx} className="flex gap-2">
                      <span className="text-primary font-bold">→</span>
                      <span>{tip}</span>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}

        {/* Info Box */}
        <div className="p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-xs text-blue-900 dark:text-blue-100">
            <strong>Note:</strong> Vastu Shastra recommendations are based on traditional principles.
            Consult with a professional Vastu expert for detailed guidance.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
