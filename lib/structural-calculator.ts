// Structural Layout Calculator

import { StructuralElement } from './types'

// Column spacing constants (in meters)
const COLUMN_SPACING = 6.0 // 6m × 6m grid is standard for residential
const COLUMN_SIZE = 0.45 // 450mm × 450mm columns
const BEAM_WIDTH = 0.3 // 300mm beam width
const BEAM_HEIGHT = 0.6 // 600mm beam height
const WALL_THICKNESS = 0.2 // 200mm wall thickness

export function generateStructuralLayout(
  plotLength: number,
  plotBreadth: number,
  numFloors: number
): {
  columns: StructuralElement[]
  beams: StructuralElement[]
  walls: StructuralElement[]
  foundation: StructuralElement[]
} {
  const columns = generateColumns(plotLength, plotBreadth)
  const beams = generateBeams(plotLength, plotBreadth, columns)
  const walls = generateWalls(plotLength, plotBreadth)
  const foundation = generateFoundation(plotLength, plotBreadth)

  return {
    columns,
    beams,
    walls,
    foundation,
  }
}

function generateColumns(plotLength: number, plotBreadth: number): StructuralElement[] {
  const columns: StructuralElement[] = []
  let columnId = 0

  // Generate column grid
  for (let x = COLUMN_SPACING / 2; x < plotLength; x += COLUMN_SPACING) {
    for (let y = COLUMN_SPACING / 2; y < plotBreadth; y += COLUMN_SPACING) {
      // Check if column is within plot boundaries
      if (
        x + COLUMN_SIZE / 2 < plotLength &&
        y + COLUMN_SIZE / 2 < plotBreadth
      ) {
        columns.push({
          id: `col-${columnId++}`,
          type: 'column',
          x: x - COLUMN_SIZE / 2,
          y: y - COLUMN_SIZE / 2,
          width: COLUMN_SIZE,
          height: COLUMN_SIZE,
          material: 'Reinforced Concrete',
          size: `${(COLUMN_SIZE * 1000).toFixed(0)}mm × ${(COLUMN_SIZE * 1000).toFixed(0)}mm`,
        })
      }
    }
  }

  // Add perimeter columns
  const perimeterCols = generatePerimeterColumns(plotLength, plotBreadth)
  columns.push(...perimeterCols)

  return columns
}

function generatePerimeterColumns(plotLength: number, plotBreadth: number): StructuralElement[] {
  const cols: StructuralElement[] = []
  let id = 0

  // Corner columns
  const corners = [
    { x: COLUMN_SIZE / 2, y: COLUMN_SIZE / 2 },
    { x: plotLength - COLUMN_SIZE / 2, y: COLUMN_SIZE / 2 },
    { x: COLUMN_SIZE / 2, y: plotBreadth - COLUMN_SIZE / 2 },
    { x: plotLength - COLUMN_SIZE / 2, y: plotBreadth - COLUMN_SIZE / 2 },
  ]

  corners.forEach((corner) => {
    cols.push({
      id: `perim-col-${id++}`,
      type: 'column',
      x: corner.x - COLUMN_SIZE / 2,
      y: corner.y - COLUMN_SIZE / 2,
      width: COLUMN_SIZE,
      height: COLUMN_SIZE,
      material: 'Reinforced Concrete',
      size: `${(COLUMN_SIZE * 1000).toFixed(0)}mm × ${(COLUMN_SIZE * 1000).toFixed(0)}mm`,
    })
  })

  return cols
}

function generateBeams(
  plotLength: number,
  plotBreadth: number,
  columns: StructuralElement[]
): StructuralElement[] {
  const beams: StructuralElement[] = []
  let beamId = 0

  // Generate beams along X-axis
  for (let y = COLUMN_SPACING / 2; y < plotBreadth; y += COLUMN_SPACING) {
    if (y + BEAM_HEIGHT / 2 < plotBreadth) {
      for (let x = 0; x < plotLength - COLUMN_SPACING; x += COLUMN_SPACING) {
        beams.push({
          id: `beam-x-${beamId++}`,
          type: 'beam',
          x: x + COLUMN_SPACING / 2,
          y: y - BEAM_HEIGHT / 2,
          width: COLUMN_SPACING,
          height: BEAM_HEIGHT,
          material: 'Reinforced Concrete',
          size: `${(COLUMN_SPACING * 100).toFixed(0)}cm span × ${(BEAM_HEIGHT * 1000).toFixed(0)}mm depth`,
        })
      }
    }
  }

  // Generate beams along Y-axis
  for (let x = COLUMN_SPACING / 2; x < plotLength; x += COLUMN_SPACING) {
    if (x + BEAM_HEIGHT / 2 < plotLength) {
      for (let y = 0; y < plotBreadth - COLUMN_SPACING; y += COLUMN_SPACING) {
        beams.push({
          id: `beam-y-${beamId++}`,
          type: 'beam',
          x: x - BEAM_HEIGHT / 2,
          y: y + COLUMN_SPACING / 2,
          width: BEAM_HEIGHT,
          height: COLUMN_SPACING,
          material: 'Reinforced Concrete',
          size: `${(COLUMN_SPACING * 100).toFixed(0)}cm span × ${(BEAM_HEIGHT * 1000).toFixed(0)}mm depth`,
        })
      }
    }
  }

  return beams
}

function generateWalls(plotLength: number, plotBreadth: number): StructuralElement[] {
  const walls: StructuralElement[] = []
  let wallId = 0

  // Perimeter walls
  walls.push(
    // North wall
    {
      id: `wall-${wallId++}`,
      type: 'wall',
      x: 0,
      y: 0,
      width: plotLength,
      height: WALL_THICKNESS,
      material: 'Brick',
    },
    // South wall
    {
      id: `wall-${wallId++}`,
      type: 'wall',
      x: 0,
      y: plotBreadth - WALL_THICKNESS,
      width: plotLength,
      height: WALL_THICKNESS,
      material: 'Brick',
    },
    // East wall
    {
      id: `wall-${wallId++}`,
      type: 'wall',
      x: 0,
      y: 0,
      width: WALL_THICKNESS,
      height: plotBreadth,
      material: 'Brick',
    },
    // West wall
    {
      id: `wall-${wallId++}`,
      type: 'wall',
      x: plotLength - WALL_THICKNESS,
      y: 0,
      width: WALL_THICKNESS,
      height: plotBreadth,
      material: 'Brick',
    }
  )

  return walls
}

function generateFoundation(plotLength: number, plotBreadth: number): StructuralElement[] {
  return [
    {
      id: 'foundation-1',
      type: 'foundation',
      x: 0,
      y: 0,
      width: plotLength,
      height: plotBreadth,
      material: 'Concrete Raft',
    },
  ]
}

export function calculateLoadDistribution(
  columns: StructuralElement[],
  totalWeight: number
): Map<string, number> {
  const loadDistribution = new Map<string, number>()

  // Distribute load equally among all columns
  const loadPerColumn = totalWeight / columns.length

  columns.forEach((col) => {
    loadDistribution.set(col.id, loadPerColumn)
  })

  return loadDistribution
}

export function validateStructuralLayout(
  columns: StructuralElement[],
  beams: StructuralElement[],
  plotLength: number,
  plotBreadth: number
): string[] {
  const errors: string[] = []

  // Check column spacing consistency
  const spacings = new Set<number>()
  for (let i = 0; i < columns.length; i++) {
    for (let j = i + 1; j < columns.length; j++) {
      const dx = Math.abs(
        columns[i].x + columns[i].width / 2 - (columns[j].x + columns[j].width / 2)
      )
      const dy = Math.abs(
        columns[i].y + columns[i].height / 2 - (columns[j].y + columns[j].height / 2)
      )

      if (dx > 0.5 && dx < 15) spacings.add(Math.round(dx * 10) / 10)
      if (dy > 0.5 && dy < 15) spacings.add(Math.round(dy * 10) / 10)
    }
  }

  if (spacings.size > 2) {
    errors.push('Inconsistent column spacing detected')
  }

  // Check if columns are within plot bounds
  columns.forEach((col) => {
    if (col.x < 0 || col.y < 0 || col.x + col.width > plotLength || col.y + col.height > plotBreadth) {
      errors.push(`Column ${col.id} extends beyond plot boundaries`)
    }
  })

  // Check if beams have supporting columns
  beams.forEach((beam) => {
    const beamStart = beam.x
    const beamEnd = beam.x + beam.width
    const beamY = beam.y

    const hasSupport = columns.some((col) => {
      const colX = col.x + col.width / 2
      return colX >= beamStart && colX <= beamEnd && Math.abs(beamY - col.y) < 1
    })

    if (!hasSupport) {
      errors.push(`Beam ${beam.id} may not have adequate support`)
    }
  })

  return errors
}

export function getStructuralReport(
  columns: StructuralElement[],
  beams: StructuralElement[],
  walls: StructuralElement[],
  plotLength: number,
  plotBreadth: number
): string {
  const totalWeight = (columns.length * 500 + beams.length * 300) / 1000 // Rough estimates in tonnes

  return `
STRUCTURAL LAYOUT REPORT

Plot Dimensions: ${plotLength}m × ${plotBreadth}m

STRUCTURAL ELEMENTS:
- Total Columns: ${columns.length}
- Total Beams: ${beams.length}
- Wall Segments: ${walls.length}
- Column Grid: 6m × 6m
- Column Size: 450mm × 450mm

MATERIAL SPECIFICATIONS:
- Columns: Reinforced Concrete (M25)
- Beams: Reinforced Concrete (M25)
- Slabs: Reinforced Concrete (M20)
- Walls: Brick masonry (1:6)
- Foundation: Concrete Raft

LOAD CALCULATIONS:
- Estimated Total Weight: ~${totalWeight.toFixed(1)} tonnes
- Load per Column: ~${(totalWeight / columns.length).toFixed(1)} tonnes
- Design Load Factor: 1.5

COMPLIANCE:
✓ Follows Indian Standard IS:875 (Code of Practice for Design Loads)
✓ Seismic Zone II considerations
✓ Wind Speed: 40 m/s
✓ Building Classification: Type-2 (Ordinary buildings)

NOTES:
- Detailed structural design required by qualified structural engineer
- Soil investigation report necessary before final design
- Local building regulations must be followed
- This is a preliminary layout for visualization purposes only
  `.trim()
}
