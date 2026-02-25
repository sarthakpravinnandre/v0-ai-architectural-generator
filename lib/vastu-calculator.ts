// Vastu Shastra Compliance Calculator

import { Room, VastuCompliance } from './types'

// Vastu principles for directions
enum Direction {
  NORTH = 'North',
  SOUTH = 'South',
  EAST = 'East',
  WEST = 'West',
  NORTHEAST = 'Northeast',
  NORTHWEST = 'Northwest',
  SOUTHEAST = 'Southeast',
  SOUTHWEST = 'Southwest',
}

// Optimal room placements according to Vastu
const OPTIMAL_PLACEMENTS: Record<string, Direction[]> = {
  bedroom: [Direction.SOUTHWEST, Direction.SOUTH, Direction.WEST],
  kitchen: [Direction.SOUTHEAST, Direction.EAST],
  bathroom: [Direction.NORTHWEST, Direction.SOUTHEAST],
  living: [Direction.NORTHEAST, Direction.NORTH],
  dining: [Direction.WEST, Direction.NORTHWEST],
  hallway: [Direction.NORTH, Direction.EAST],
  pooja: [Direction.NORTHEAST],
  entrance: [Direction.NORTHEAST, Direction.NORTH, Direction.EAST],
}

export function calculateVastuCompliance(
  rooms: Room[],
  plotLength: number,
  plotBreadth: number,
  entranceDirection: Direction = Direction.NORTHEAST
): VastuCompliance {
  let score = 100
  const recommendations: string[] = []
  const details = {
    entranceDirection: entranceDirection === Direction.NORTHEAST,
    kitchenPlacement: false,
    bedroomPlacement: false,
    bathroomPlacement: false,
  }

  // Check entrance placement
  if (entranceDirection !== Direction.NORTHEAST && entranceDirection !== Direction.NORTH && entranceDirection !== Direction.EAST) {
    score -= 20
    recommendations.push('Entrance ideally should face Northeast, North, or East')
  } else {
    details.entranceDirection = true
  }

  // Check room placements
  const roomsByType = new Map<string, Room[]>()
  rooms.forEach((room) => {
    if (!roomsByType.has(room.type)) {
      roomsByType.set(room.type, [])
    }
    roomsByType.get(room.type)!.push(room)
  })

  // Kitchen compliance
  const kitchens = roomsByType.get('kitchen') || []
  if (kitchens.length > 0) {
    const kitchenDir = getDirectionFromPosition(kitchens[0], plotLength, plotBreadth)
    if (OPTIMAL_PLACEMENTS.kitchen.includes(kitchenDir)) {
      details.kitchenPlacement = true
    } else {
      score -= 15
      recommendations.push('Kitchen should be in Southeast or East for better Vastu compliance')
    }
  }

  // Bedroom compliance
  const bedrooms = roomsByType.get('bedroom') || []
  if (bedrooms.length > 0) {
    let allGood = true
    bedrooms.forEach((bedroom, idx) => {
      const bedDir = getDirectionFromPosition(bedroom, plotLength, plotBreadth)
      if (!OPTIMAL_PLACEMENTS.bedroom.includes(bedDir)) {
        allGood = false
        score -= 5
        recommendations.push(`Master bedroom (${bedroom.name}) ideally in Southwest direction`)
      }
    })
    if (allGood) {
      details.bedroomPlacement = true
    }
  }

  // Bathroom compliance
  const bathrooms = roomsByType.get('bathroom') || []
  if (bathrooms.length > 0) {
    let allGood = true
    bathrooms.forEach((bathroom) => {
      const bathDir = getDirectionFromPosition(bathroom, plotLength, plotBreadth)
      if (!OPTIMAL_PLACEMENTS.bathroom.includes(bathDir)) {
        allGood = false
        score -= 10
        recommendations.push('Bathrooms ideally in Northwest or Southeast corner')
      }
    })
    if (allGood) {
      details.bathroomPlacement = true
    }
  }

  // Additional recommendations
  if (!roomsByType.has('living')) {
    recommendations.push('Add a living room in the Northeast direction for positive energy')
  }

  // Check for proper proportions (preferably square or rectangular)
  const aspectRatio = plotLength / plotBreadth
  if (aspectRatio > 2 || aspectRatio < 0.5) {
    score -= 10
    recommendations.push('Plot shape is elongated; try to make it more balanced')
  }

  // Ensure minimum 25% open space
  const builtUpArea = rooms.reduce((sum, room) => sum + room.width * room.height, 0)
  const totalArea = plotLength * plotBreadth
  const openSpace = totalArea - builtUpArea
  if (openSpace / totalArea < 0.25) {
    score -= 15
    recommendations.push('Increase open/garden space to at least 25% of the plot area')
  }

  score = Math.max(0, Math.min(100, score))

  return {
    score,
    isCompliant: score >= 70,
    recommendations,
    details,
  }
}

function getDirectionFromPosition(
  room: Room,
  plotLength: number,
  plotBreadth: number
): Direction {
  const centerX = plotLength / 2
  const centerY = plotBreadth / 2
  const roomCenterX = room.x + room.width / 2
  const roomCenterY = room.y + room.height / 2

  const deltaX = roomCenterX - centerX
  const deltaY = roomCenterY - centerY

  const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI)
  const normalizedAngle = (angle + 360) % 360

  // Determine direction based on angle
  if (normalizedAngle >= 337.5 || normalizedAngle < 22.5) return Direction.EAST
  if (normalizedAngle >= 22.5 && normalizedAngle < 67.5) return Direction.SOUTHEAST
  if (normalizedAngle >= 67.5 && normalizedAngle < 112.5) return Direction.SOUTH
  if (normalizedAngle >= 112.5 && normalizedAngle < 157.5) return Direction.SOUTHWEST
  if (normalizedAngle >= 157.5 && normalizedAngle < 202.5) return Direction.WEST
  if (normalizedAngle >= 202.5 && normalizedAngle < 247.5) return Direction.NORTHWEST
  if (normalizedAngle >= 247.5 && normalizedAngle < 292.5) return Direction.NORTH
  return Direction.NORTHEAST
}

export function getVastuRecommendations(): string[] {
  return [
    'Entrance should ideally face Northeast, North, or East',
    'Kitchen should be in Southeast corner for prosperity',
    'Master bedroom should be in Southwest direction',
    'Living room should face Northeast for positive energy',
    'Bathrooms should be in Northwest or Southeast',
    'Maintain at least 25% open space on the plot',
    'Avoid having a staircase in the center of the building',
    'Place water features (garden, fountain) in Northeast',
    'Keep the plot more square than rectangular if possible',
    'North and East sides should be lower than South and West',
  ]
}

export function getVastuColors(): Record<Direction, string> {
  return {
    North: '#2563eb',
    South: '#ef4444',
    East: '#10b981',
    West: '#f59e0b',
    Northeast: '#a78bfa',
    Northwest: '#ec4899',
    Southeast: '#06b6d4',
    Southwest: '#dc2626',
  }
}

export function getDirectionInfo(direction: Direction): {
  element: string
  planet: string
  benefits: string[]
  cautions: string[]
} {
  const directionInfo: Record<Direction, any> = {
    North: {
      element: 'Water',
      planet: 'Mercury',
      benefits: ['Prosperity', 'Career Growth', 'Business'],
      cautions: ['Avoid heavy structures', 'Keep open spaces'],
    },
    South: {
      element: 'Fire',
      planet: 'Mars',
      benefits: ['Stability', 'Strength'],
      cautions: ['Not for main entrance', 'No heavy construction'],
    },
    East: {
      element: 'Air',
      planet: 'Sun',
      benefits: ['Health', 'Energy', 'Wisdom'],
      cautions: ['Avoid blocking windows', 'Keep bright'],
    },
    West: {
      element: 'Earth',
      planet: 'Venus',
      benefits: ['Creativity', 'Relationships'],
      cautions: ['Avoid main entrance', 'Good for guest rooms'],
    },
    Northeast: {
      element: 'Ether',
      planet: 'Jupiter',
      benefits: ['Spiritual Growth', 'Prosperity', 'Health'],
      cautions: ['Keep clean and bright', 'Best for pooja room'],
    },
    Northwest: {
      element: 'Air-Earth',
      planet: 'Saturn',
      benefits: ['Good for guests', 'Storage'],
      cautions: ['Not ideal for master bedroom', 'Good for bathrooms'],
    },
    Southeast: {
      element: 'Fire-Earth',
      planet: 'Venus',
      benefits: ['Kitchen', 'Cooking', 'Warmth'],
      cautions: ['Keep dry', 'Good for bathrooms'],
    },
    Southwest: {
      element: 'Earth-Fire',
      planet: 'Saturn',
      benefits: ['Master Bedroom', 'Storage', 'Stability'],
      cautions: ['Avoid main entrance', 'Keep heavy items here'],
    },
  }

  return directionInfo[direction]
}
