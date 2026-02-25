// Architectural Plan Types

export interface PlotInput {
  length: number; // in meters
  breadth: number; // in meters
  plotType: 'residential' | 'commercial' | 'mixed';
  numFloors: number;
  carpet_area?: number;
}

export interface Room {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'bedroom' | 'kitchen' | 'bathroom' | 'living' | 'dining' | 'hallway' | 'parking' | 'storage' | 'balcony';
  floor: number;
}

export interface FloorPlan {
  id: string;
  floorNumber: number;
  rooms: Room[];
  totalArea: number;
  builtUpArea: number;
  carpetArea: number;
  svg: string;
}

export interface StructuralElement {
  id: string;
  type: 'column' | 'beam' | 'wall' | 'foundation';
  x: number;
  y: number;
  width: number;
  height: number;
  material: string;
  size?: string;
}

export interface StructuralLayout {
  columns: StructuralElement[];
  beams: StructuralElement[];
  walls: StructuralElement[];
  foundation: StructuralElement[];
}

export interface CostItem {
  category: string;
  description: string;
  quantity: number;
  unit: string;
  rate: number;
  total: number;
}

export interface CostEstimate {
  items: CostItem[];
  materialCost: number;
  laborCost: number;
  contingency: number;
  totalCost: number;
  costPerSqft: number;
  currency: string;
}

export interface Plan {
  id: string;
  name: string;
  input: PlotInput;
  floors: FloorPlan[];
  structural: StructuralLayout;
  costEstimate: CostEstimate;
  createdAt: Date;
  updatedAt: Date;
  exportedAt?: Date;
}

export interface GeneratePlanResponse {
  success: boolean;
  data?: {
    floorPlanSvg: string;
    structuralSvg: string;
    roomLayout: Room[];
    costData: CostEstimate;
    metadata: {
      totalArea: number;
      builtUpArea: number;
      carpetArea: number;
      estimatedTime: number; // in seconds
    };
  };
  error?: string;
}

export interface OptimizationOptions {
  optimizeForEfficiency: boolean;
  applyVastuRules: boolean;
  useGreenBuilding: boolean;
}

export interface VastuCompliance {
  score: number;
  isCompliant: boolean;
  recommendations: string[];
  details: {
    entranceDirection: boolean;
    kitchenPlacement: boolean;
    bedroomPlacement: boolean;
    bathroomPlacement: boolean;
  };
}
