'use client'

import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Building2, Layers, Zap, Droplet } from 'lucide-react'

interface StructuralData {
  totalFloors: number
  groundFloor: {
    columns: number
    beams: number
    walls: number
    foundations: string
  }
  firstFloor?: {
    columns: number
    beams: number
    walls: number
  }
  roofStructure: {
    type: string
    material: string
    loadCapacity: string
  }
  utilities: {
    electrical: string
    plumbing: string
    ventilation: string
    fireExit: boolean
  }
}

interface BuildingStructureProps {
  numFloors?: number
  plotLength?: number
  plotBreadth?: number
}

export function BuildingStructure({
  numFloors = 1,
  plotLength = 30,
  plotBreadth = 40,
}: BuildingStructureProps) {
  // Calculate structural elements
  const calculateStructure = (): StructuralData => {
    const gridSpacing = 5 // meters
    const columnsLengthwise = Math.ceil(plotLength / gridSpacing) + 1
    const columnsBreadthwise = Math.ceil(plotBreadth / gridSpacing) + 1
    const totalColumns = columnsLengthwise * columnsBreadthwise

    return {
      totalFloors: numFloors,
      groundFloor: {
        columns: totalColumns,
        beams: (columnsLengthwise - 1) * columnsBreadthwise + (columnsBreadthwise - 1) * columnsLengthwise,
        walls: Math.round(2 * (plotLength + plotBreadth)),
        foundations: 'Reinforced Concrete with spread footings',
      },
      firstFloor: numFloors > 1 ? {
        columns: totalColumns,
        beams: (columnsLengthwise - 1) * columnsBreadthwise + (columnsBreadthwise - 1) * columnsLengthwise,
        walls: Math.round(2 * (plotLength + plotBreadth) * 0.8),
      } : undefined,
      roofStructure: {
        type: 'Flat RCC Terrace',
        material: 'Reinforced Cement Concrete',
        loadCapacity: '150 kg/m²',
      },
      utilities: {
        electrical: 'Main switchboard with sub-circuit distribution',
        plumbing: 'Separate hot and cold water lines with overhead tank',
        ventilation: 'Cross-ventilation with windows on opposite walls',
        fireExit: true,
      },
    }
  }

  const structure = calculateStructure()

  return (
    <Card className="p-6 bg-gradient-to-br from-card/50 to-card/30 border-primary/20 rounded-2xl">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h3 className="text-2xl font-bold text-primary flex items-center gap-2 mb-2">
            <Building2 className="w-6 h-6" />
            Building Structure & Details
          </h3>
          <p className="text-foreground/60">Complete structural breakdown and specifications</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
            <p className="text-sm text-foreground/60">Total Floors</p>
            <p className="text-2xl font-bold text-primary">{structure.totalFloors}</p>
          </div>
          <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
            <p className="text-sm text-foreground/60">Ground Columns</p>
            <p className="text-2xl font-bold text-secondary">{structure.groundFloor.columns}</p>
          </div>
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
            <p className="text-sm text-foreground/60">Perimeter</p>
            <p className="text-2xl font-bold text-accent">{(2 * (plotLength! + plotBreadth!)).toFixed(0)}m</p>
          </div>
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
            <p className="text-sm text-foreground/60">Plot Area</p>
            <p className="text-2xl font-bold text-orange-500">{(plotLength! * plotBreadth!).toFixed(0)}m²</p>
          </div>
        </div>

        {/* Detailed Tabs */}
        <Tabs defaultValue="structural" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-background/50">
            <TabsTrigger value="structural" className="flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span className="hidden sm:inline">Structural</span>
            </TabsTrigger>
            <TabsTrigger value="flooring" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span className="hidden sm:inline">Flooring</span>
            </TabsTrigger>
            <TabsTrigger value="utilities" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span className="hidden sm:inline">Utilities</span>
            </TabsTrigger>
            <TabsTrigger value="roof" className="flex items-center gap-2">
              <Droplet className="w-4 h-4" />
              <span className="hidden sm:inline">Roof</span>
            </TabsTrigger>
          </TabsList>

          {/* Structural Tab */}
          <TabsContent value="structural" className="space-y-4 mt-4">
            <div className="bg-background/50 rounded-lg p-4 space-y-3">
              <h4 className="font-semibold text-primary">Ground Floor Structural Elements</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground/70">Columns</p>
                  <p className="text-lg font-bold text-primary">{structure.groundFloor.columns} units</p>
                  <p className="text-xs text-foreground/60">@{Math.ceil(plotLength! / 5)}m spacing (L) × {Math.ceil(plotBreadth! / 5)}m (B)</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground/70">Beams</p>
                  <p className="text-lg font-bold text-secondary">{structure.groundFloor.beams} units</p>
                  <p className="text-xs text-foreground/60">Connecting columns</p>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded p-3">
                <p className="text-sm font-medium text-primary mb-1">Foundation</p>
                <p className="text-sm text-foreground/70">{structure.groundFloor.foundations}</p>
              </div>

              {structure.firstFloor && (
                <>
                  <h4 className="font-semibold text-primary pt-4 border-t border-primary/10">First Floor</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground/70">Columns</p>
                      <p className="text-lg font-bold text-primary">{structure.firstFloor.columns} units</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground/70">Beams</p>
                      <p className="text-lg font-bold text-secondary">{structure.firstFloor.beams} units</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </TabsContent>

          {/* Flooring Tab */}
          <TabsContent value="flooring" className="space-y-4 mt-4">
            <div className="bg-background/50 rounded-lg p-4 space-y-3">
              <h4 className="font-semibold text-secondary">Flooring Specifications</h4>
              
              <div className="space-y-3">
                <div className="border-l-4 border-secondary p-3 bg-secondary/5 rounded">
                  <p className="font-medium text-sm text-secondary">Ground Floor</p>
                  <p className="text-sm text-foreground/70 mt-1">• Polished concrete with ceramic tiles in wet areas</p>
                  <p className="text-sm text-foreground/70">• Vitrified tiles in living/bedrooms</p>
                  <p className="text-sm text-foreground/70">• Thickness: 100-150mm RCC slab</p>
                </div>

                <div className="border-l-4 border-accent p-3 bg-accent/5 rounded">
                  <p className="font-medium text-sm text-accent">First Floor {structure.totalFloors > 1 ? '(if applicable)' : ''}</p>
                  <p className="text-sm text-foreground/70 mt-1">• Wooden/vitrified flooring</p>
                  <p className="text-sm text-foreground/70">• Suspended slab with acoustic treatment</p>
                  <p className="text-sm text-foreground/70">• Thickness: 100mm RCC slab</p>
                </div>

                <div className="border-l-4 border-orange-500 p-3 bg-orange-500/5 rounded">
                  <p className="font-medium text-sm text-orange-500">Terrace/Roof</p>
                  <p className="text-sm text-foreground/70 mt-1">• {structure.roofStructure.material}</p>
                  <p className="text-sm text-foreground/70">• Waterproof membrane and insulation</p>
                  <p className="text-sm text-foreground/70">• Load capacity: {structure.roofStructure.loadCapacity}</p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Utilities Tab */}
          <TabsContent value="utilities" className="space-y-4 mt-4">
            <div className="bg-background/50 rounded-lg p-4 space-y-4">
              <h4 className="font-semibold text-primary mb-3">Building Utilities</h4>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <p className="font-medium text-sm text-foreground">Electrical</p>
                    <p className="text-sm text-foreground/70">{structure.utilities.electrical}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Droplet className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <p className="font-medium text-sm text-foreground">Plumbing</p>
                    <p className="text-sm text-foreground/70">{structure.utilities.plumbing}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <p className="font-medium text-sm text-foreground">Ventilation</p>
                    <p className="text-sm text-foreground/70">{structure.utilities.ventilation}</p>
                  </div>
                </div>

                {structure.utilities.fireExit && (
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 flex items-center justify-center text-red-500 flex-shrink-0 text-lg font-bold">!</span>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-foreground">Fire Safety</p>
                      <p className="text-sm text-foreground/70">Emergency exit & fire extinguisher provision included</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Roof Tab */}
          <TabsContent value="roof" className="space-y-4 mt-4">
            <div className="bg-background/50 rounded-lg p-4 space-y-3">
              <h4 className="font-semibold text-orange-500">Roof Structure</h4>
              
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-foreground/60 mb-1">Type</p>
                    <p className="font-semibold text-foreground">{structure.roofStructure.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60 mb-1">Material</p>
                    <p className="font-semibold text-foreground">{structure.roofStructure.material}</p>
                  </div>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/20 rounded p-4">
                  <p className="text-sm text-foreground/60 mb-2">Load Capacity</p>
                  <p className="text-lg font-bold text-orange-500">{structure.roofStructure.loadCapacity}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">Additional Features</p>
                  <ul className="text-sm text-foreground/70 space-y-1">
                    <li>• Waterproof membrane coating</li>
                    <li>• Thermal insulation layer</li>
                    <li>• Slope for water drainage: 2-3%</li>
                    <li>• Parapet walls: 1.2m height</li>
                    <li>• Access hatch for maintenance</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  )
}
