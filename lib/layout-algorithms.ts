// Layout Algorithm for Space Optimization

import { Room, PlotInput, CostEstimate } from './types';

// Minimum room dimensions (in meters) per Indian building standards
const ROOM_MINIMUMS = {
  bedroom: { width: 3.0, height: 3.6 }, // 9ft × 12ft
  kitchen: { width: 2.4, height: 3.0 }, // 8ft × 10ft
  bathroom: { width: 1.8, height: 2.4 }, // 6ft × 8ft
  living: { width: 4.5, height: 4.5 }, // 15ft × 15ft
  dining: { width: 3.6, height: 3.6 }, // 12ft × 12ft
  hallway: { width: 1.2, height: 3.0 }, // 4ft × 10ft
  parking: { width: 2.4, height: 5.0 }, // 8ft × 16ft (per space)
  storage: { width: 1.8, height: 2.1 }, // 6ft × 7ft
  balcony: { width: 1.5, height: 3.0 }, // 5ft × 10ft
};

const DEFAULT_ROOM_AREAS = {
  bedroom: 13.5, // ~150 sqft
  kitchen: 9.3, // ~100 sqft
  bathroom: 5.6, // ~60 sqft
  living: 23.2, // ~250 sqft
  dining: 13.9, // ~150 sqft
  hallway: 5.6, // ~60 sqft
  parking: 12.0, // per space
  storage: 4.6, // ~50 sqft
  balcony: 7.4, // ~80 sqft
};

export function generateOptimalLayout(input: PlotInput): Room[] {
  const plotArea = input.length * input.breadth;
  const perFloorArea = plotArea / input.numFloors;
  const rooms: Room[] = [];
  
  let roomId = 0;
  let yOffset = 0;
  
  // Determine room types based on plot type and size
  const roomTypes = determineRoomTypes(input, perFloorArea);
  
  // Arrange rooms in a grid-like pattern
  let xOffset = 0;
  let rowHeight = 0;
  
  for (const roomType of roomTypes) {
    const minDims = ROOM_MINIMUMS[roomType];
    const width = Math.max(minDims.width, Math.sqrt(DEFAULT_ROOM_AREAS[roomType]));
    const height = Math.max(minDims.height, DEFAULT_ROOM_AREAS[roomType] / width);
    
    // Check if room fits in current row
    if (xOffset + width > input.length * 0.9) {
      // Move to next row
      yOffset += rowHeight + 0.3; // 0.3m spacing
      xOffset = 0.3;
      rowHeight = 0;
    }
    
    // Check if it exceeds plot depth
    if (yOffset + height > input.breadth * 0.9) {
      continue; // Skip this room if it doesn't fit
    }
    
    rooms.push({
      id: `room-${roomId++}`,
      name: generateRoomName(roomType, rooms.filter(r => r.type === roomType).length),
      type: roomType,
      x: xOffset,
      y: yOffset,
      width: width,
      height: height,
      floor: 1,
    });
    
    xOffset += width + 0.3;
    rowHeight = Math.max(rowHeight, height);
  }
  
  return rooms;
}

function determineRoomTypes(input: PlotInput, areaPerFloor: number): Array<keyof typeof ROOM_MINIMUMS> {
  const types: Array<keyof typeof ROOM_MINIMUMS> = [];
  
  if (input.plotType === 'residential') {
    // Main layout rooms
    types.push('parking'); // Mandatory parking
    types.push('hallway');
    
    if (areaPerFloor > 200) {
      types.push('living');
      types.push('dining');
      types.push('kitchen');
      types.push('bedroom', 'bedroom', 'bedroom');
      types.push('bathroom', 'bathroom');
      types.push('balcony');
    } else if (areaPerFloor > 100) {
      types.push('living');
      types.push('kitchen');
      types.push('bedroom', 'bedroom');
      types.push('bathroom');
      types.push('balcony');
    } else {
      types.push('living');
      types.push('kitchen');
      types.push('bedroom');
      types.push('bathroom');
    }
    types.push('storage');
  } else if (input.plotType === 'commercial') {
    types.push('parking');
    types.push('hallway');
    types.push('living'); // Use as office space
    types.push('bathroom', 'bathroom');
    types.push('storage');
  } else {
    // Mixed use
    types.push('parking');
    types.push('hallway');
    types.push('living');
    types.push('kitchen');
    types.push('bedroom', 'bedroom');
    types.push('bathroom');
  }
  
  return types;
}

function generateRoomName(type: string, count: number): string {
  const typeName = type.charAt(0).toUpperCase() + type.slice(1);
  return count > 0 ? `${typeName} ${count + 1}` : typeName;
}

export function calculateBuildingStats(rooms: Room[], plotLength: number, plotBreadth: number) {
  const totalPlotArea = plotLength * plotBreadth;
  const builtUpArea = rooms.reduce((sum, room) => sum + room.width * room.height, 0);
  
  // Carpet area is typically 80-90% of built-up area (accounting for walls, etc.)
  const carpetArea = builtUpArea * 0.85;
  
  // Calculate efficiency
  const efficiency = (carpetArea / totalPlotArea) * 100;
  
  return {
    totalPlotArea,
    builtUpArea,
    carpetArea,
    efficiency: Math.round(efficiency * 10) / 10, // One decimal place
  };
}

export function estimateCosts(
  rooms: Room[],
  buildingStats: ReturnType<typeof calculateBuildingStats>,
  numFloors: number
): CostEstimate {
  // Rate assumptions (INR per sqft) for Indian market
  const rates = {
    concrete: 60,
    steel: 50,
    bricks: 40,
    wood: 300,
    electrical: 50,
    plumbing: 40,
    finishing: 100,
    labor: 80,
  };
  
  const items = [
    {
      category: 'Structure',
      description: 'Concrete (M20 grade)',
      quantity: buildingStats.builtUpArea * numFloors * 0.4, // 40% volume is concrete
      unit: 'sqft',
      rate: rates.concrete,
      total: 0,
    },
    {
      category: 'Structure',
      description: 'Steel reinforcement',
      quantity: buildingStats.builtUpArea * numFloors * 0.15,
      unit: 'sqft',
      rate: rates.steel,
      total: 0,
    },
    {
      category: 'Masonry',
      description: 'Brick walls',
      quantity: buildingStats.builtUpArea * numFloors * 0.6,
      unit: 'sqft',
      rate: rates.bricks,
      total: 0,
    },
    {
      category: 'Carpentry',
      description: 'Doors and windows',
      quantity: Math.ceil((rooms.length * numFloors) * 1.5),
      unit: 'unit',
      rate: 8000,
      total: 0,
    },
    {
      category: 'Electrical',
      description: 'Electrical wiring and fixtures',
      quantity: buildingStats.carpetArea * numFloors,
      unit: 'sqft',
      rate: rates.electrical,
      total: 0,
    },
    {
      category: 'Plumbing',
      description: 'Plumbing and sanitary ware',
      quantity: buildingStats.carpetArea * numFloors,
      unit: 'sqft',
      rate: rates.plumbing,
      total: 0,
    },
    {
      category: 'Finishing',
      description: 'Flooring, walls, and ceiling finishes',
      quantity: buildingStats.carpetArea * numFloors,
      unit: 'sqft',
      rate: rates.finishing,
      total: 0,
    },
    {
      category: 'Labor',
      description: 'Labor charges',
      quantity: buildingStats.builtUpArea * numFloors,
      unit: 'sqft',
      rate: rates.labor,
      total: 0,
    },
  ];
  
  // Calculate totals
  items.forEach((item) => {
    item.total = item.quantity * item.rate;
  });
  
  const materialCost = items
    .filter((item) => item.category !== 'Labor')
    .reduce((sum, item) => sum + item.total, 0);
  const laborCost = items
    .filter((item) => item.category === 'Labor')
    .reduce((sum, item) => sum + item.total, 0);
  const contingency = (materialCost + laborCost) * 0.1; // 10% contingency
  const totalCost = materialCost + laborCost + contingency;
  const costPerSqft = totalCost / buildingStats.carpetArea;
  
  return {
    items: items.map((item) => ({
      category: item.category,
      description: item.description,
      quantity: item.quantity,
      unit: item.unit,
      rate: item.rate,
      total: item.total,
    })),
    materialCost,
    laborCost,
    contingency,
    totalCost,
    costPerSqft,
    currency: 'INR',
  };
}

export function validateLayout(rooms: Room[], plotLength: number, plotBreadth: number): string[] {
  const errors: string[] = [];
  
  // Check if rooms fit within plot
  for (const room of rooms) {
    if (room.x + room.width > plotLength) {
      errors.push(`${room.name} exceeds plot length`);
    }
    if (room.y + room.height > plotBreadth) {
      errors.push(`${room.name} exceeds plot breadth`);
    }
    
    // Check minimum dimensions
    const minDims = ROOM_MINIMUMS[room.type];
    if (room.width < minDims.width || room.height < minDims.height) {
      errors.push(`${room.name} is below minimum dimensions`);
    }
  }
  
  // Check for overlaps
  for (let i = 0; i < rooms.length; i++) {
    for (let j = i + 1; j < rooms.length; j++) {
      const r1 = rooms[i];
      const r2 = rooms[j];
      
      const overlap =
        r1.x < r2.x + r2.width &&
        r1.x + r1.width > r2.x &&
        r1.y < r2.y + r2.height &&
        r1.y + r1.height > r2.y;
      
      if (overlap) {
        errors.push(`${r1.name} and ${r2.name} overlap`);
      }
    }
  }
  
  return errors;
}
