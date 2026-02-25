# Visionary - Feature Documentation

## Overview
Visionary is an AI-powered architectural plan generator that transforms basic plot information into professional 2D floor plans, structural layouts, and detailed cost estimates. This document outlines all features and their implementation details.

## Core Features

### 1. Landing Page
**Location**: `/` (app/page.tsx)

A professional landing page showcasing:
- Hero section with compelling headline
- Feature showcase cards (6 core features)
- "How It Works" section with 3-step process
- Call-to-action buttons
- Trust badges (statistics)
- Footer with links

**Design**: Navy primary (#1a3a52), white background, blue accents

### 2. Plan Generator
**Location**: `/generator` (app/generator/page.tsx)

The main application where users create floor plans.

#### Input Form Component
- **Inputs**:
  - Plot Length (meters): 5-500m
  - Plot Breadth (meters): 5-500m
  - Building Type: Residential, Commercial, Mixed
  - Number of Floors: 1-10

- **Validation**: Zod schema ensures all inputs are valid
- **Live Preview**: Area calculations update in real-time
- **Features**: 
  - Responsive layout
  - Clear labels and descriptions
  - Form validation messages

#### Floor Plan Preview
- **SVG-based rendering** with:
  - Room rectangles with color coding by type
  - Room dimensions (width × height in meters)
  - Area calculations (sqm)
  - Legend showing room type colors
  - Editable canvas support (future)

- **Room Types** (with colors):
  - Bedroom: Light purple (#e0e7ff)
  - Kitchen: Light yellow (#fef3c7)
  - Bathroom: Light green (#d1fae5)
  - Living: Light purple (#f3e8ff)
  - Dining: Light red (#fecaca)
  - Hallway: Light green (#f0fdf4)
  - Parking: Light gray (#e5e7eb)
  - Storage: Light blue (#dbeafe)
  - Balcony: Light yellow (#fef08a)

#### Space Optimization Algorithm
**File**: `lib/layout-algorithms.ts`

1. **Room Allocation**:
   - Calculate per-floor area (total area / number of floors)
   - Determine room types based on building classification
   - Assign room areas based on standard proportions

2. **Layout Generation**:
   - Grid-based placement (rooms arranged in rows)
   - Respects minimum room dimensions
   - Ensures no overlaps
   - Maintains plot boundaries

3. **Building Statistics**:
   - Total plot area (length × breadth)
   - Built-up area (sum of all rooms)
   - Carpet area (80-85% of built-up, accounting for walls)
   - Space efficiency percentage

### 3. Structural Layout
**Component**: StructuralOverlay (components/generator/StructuralOverlay.tsx)
**Calculator**: `lib/structural-calculator.ts`

Automatic generation of:

#### Columns
- Grid-based placement at 6m × 6m intervals
- Size: 450mm × 450mm
- Material: Reinforced Concrete (M25)
- Corner and perimeter columns included
- Unique IDs for tracking

#### Beams
- Connect columns along X and Y axes
- Size: 300mm width × 600mm height
- Span: 6 meters between columns
- Material: Reinforced Concrete (M25)
- Load calculation supported

#### Walls
- Perimeter walls (North, South, East, West)
- Thickness: 200mm
- Material: Brick masonry (1:6)
- Prevents building envelope violations

#### Foundation
- Concrete raft foundation
- Covers entire plot area
- Prevents unauthorized extensions

**Compliance**:
- Follows IS:875 (Indian Standard for Design Loads)
- Seismic Zone II considerations
- Wind speed: 40 m/s
- Building Classification: Type-2 (Ordinary)

### 4. Cost Estimation
**Component**: CostEstimator (components/generator/CostEstimator.tsx)
**Calculator**: `lib/layout-algorithms.ts`

#### Cost Categories
1. **Concrete** (M20/M25 grade)
   - Calculation: Built-up area × 0.4 (40% volume) × rate
   - Rate: ₹60/sqft

2. **Steel Reinforcement**
   - Calculation: Built-up area × 0.15 × rate
   - Rate: ₹50/sqft

3. **Brick Masonry**
   - Calculation: Built-up area × 0.6 × rate
   - Rate: ₹40/sqft

4. **Carpentry** (Doors & Windows)
   - Calculation: (number of rooms × 1.5) × fixed rate
   - Rate: ₹8,000 per unit

5. **Electrical**
   - Calculation: Carpet area × rate
   - Rate: ₹50/sqft

6. **Plumbing**
   - Calculation: Carpet area × rate
   - Rate: ₹40/sqft

7. **Finishing** (Flooring, walls, ceiling)
   - Calculation: Carpet area × rate
   - Rate: ₹100/sqft

8. **Labor**
   - Calculation: Built-up area × rate
   - Rate: ₹80/sqft

#### Cost Breakdown
- Material cost (concrete, steel, bricks, doors, electrical, plumbing, finishing)
- Labor cost (separate line)
- Contingency (10% buffer for unforeseen costs)
- **Total Estimated Cost**
- **Cost per sq.ft**

#### Visualization
- Pie chart showing distribution by category
- Bar chart showing detailed breakdown
- Table with line-by-line items
- Summary cards for major categories

### 5. 3D Building Preview
**Component**: ThreeDPreview (components/generator/ThreeDPreview.tsx)

#### Implementation
- Canvas-based isometric projection (not full 3D for MVP)
- Interactive rotation with mouse drag
- Reset view button
- Building visualization with:
  - Multi-floor representation
  - Window grid pattern
  - Roof visualization
  - Coordinate axes (X, Y, Z)

#### Statistics Display
- Total height
- Building footprint
- Number of stories

#### Controls
- Drag to rotate
- Reset button for default view
- Expand/minimize view
- Responsive sizing

### 6. Vastu Shastra Compliance
**Component**: VastuPanel (components/generator/VastuPanel.tsx)
**Calculator**: `lib/vastu-calculator.ts`

#### Principles Implemented
1. **Entrance Direction** (Weight: 20%)
   - Best: Northeast, North, East
   - Avoid: South, Southwest, West

2. **Kitchen Placement** (Weight: 15%)
   - Optimal: Southeast (Fire element)
   - Alternative: East
   - Benefits: Prosperity, warmth, cooking

3. **Bedroom Placement** (Weight: 15%)
   - Master: Southwest (stability)
   - Other bedrooms: South, West
   - Avoid: Northeast

4. **Bathroom Placement** (Weight: 10%)
   - Optimal: Northwest (for guests)
   - Alternative: Southeast
   - Avoid: Northeast, center

5. **Living Room** (Bonus: +5%)
   - Optimal: Northeast (positive energy)
   - Alternative: North
   - Benefits: Spiritual growth, prosperity

6. **Open Space** (Weight: 15%)
   - Minimum: 25% of plot area
   - Garden in Northeast corner
   - Balconies on North/East

7. **Plot Shape** (Weight: 10%)
   - Optimal: Square or rectangular
   - Avoid: Triangular, highly irregular

#### Compliance Score (0-100%)
- 100%: Perfect Vastu alignment
- 70%+: Highly compliant
- 50-69%: Moderately compliant
- <50%: Needs significant improvements

#### Direction Colors
- North: Blue (#2563eb)
- South: Red (#ef4444)
- East: Green (#10b981)
- West: Orange (#f59e0b)
- Northeast: Purple (#a78bfa)
- Southeast: Cyan (#06b6d4)
- Southwest: Dark Red (#dc2626)
- Northwest: Pink (#ec4899)

### 7. Dashboard & Plan History
**Location**: `/dashboard` (app/dashboard/page.tsx)

#### Features
- **Recent Plans**: Display last 5 plans
- **All Plans**: Table view of all plans with sorting
- **Statistics**:
  - Total plans created
  - Total plot area across all projects
  - Average project cost
  
#### Plan Cards Show
- Plan name
- Building type and floor count
- Plot size
- Estimated cost
- Created date
- Action buttons (View, Download, Delete)

#### Actions
- **View**: Open plan detail page (future)
- **Download**: Export as JSON
- **Delete**: Remove from history

#### Storage
- Plans saved to browser localStorage (MVP)
- JSON format for export
- Upgradable to database in Phase 2

### 8. PDF Generation
**Endpoint**: `POST /api/generate-pdf`
**File**: app/api/generate-pdf/route.ts

#### PDF Contents
- Project header with generation date
- Plot details (dimensions, type, floors)
- Building statistics table
- Floor plan diagram
- Structural layout diagram
- Cost estimation summary table
- Detailed cost breakdown table
- Important notes and disclaimers
- Generated timestamp

#### Output Format
- Currently returns HTML (can be converted to PDF)
- Downloadable with timestamp in filename
- Professional formatting with company branding

#### Future Enhancements
- Integration with ReportLab (Python backend)
- Multi-page PDF with professional design
- SVG to image conversion for better rendering
- DXF export for AutoCAD

## Advanced Features (Phase 2+)

### AI Chat Assistant
- Ask questions about design decisions
- Get recommendations for improvements
- Explanation of structural choices
- Integration with OpenAI/Claude API

### User Authentication
- Sign up / Login
- Cloud storage for plans
- Collaboration features
- Plan sharing and permissions

### Real-time Collaboration
- Multiple users working on same plan
- Live synchronization
- Comments and annotations
- Version history

### Advanced Customization
- Room dragging/resizing
- Custom room types
- Advanced material selection
- Design style preferences

### Compliance Checking
- Fire safety code compliance
- Energy efficiency standards
- Accessibility requirements
- Local building regulations

## Technical Specifications

### Performance Targets
- Floor plan generation: <2 seconds
- Cost calculation: <1 second
- Page load: <3 seconds (3G)
- SVG rendering: Smooth up to 100+ rooms

### Browser Support
- Chrome/Edge: v100+
- Firefox: v98+
- Safari: v14+
- Mobile Safari: v12+

### Accessibility
- WCAG 2.1 Level AA compliance
- Semantic HTML throughout
- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast ratios >7:1

### Security
- Input validation on all forms
- XSS protection via React escaping
- CSRF protection (standard Next.js)
- No sensitive data in localStorage
- SQL injection prevention (prepare for database)

## Future Roadmap

### Phase 1 (MVP - Current)
✅ 2D Floor Plan Generation
✅ Structural Layout
✅ Cost Estimation
✅ PDF Download
✅ Dashboard
✅ 3D Preview (basic)
✅ Vastu Compliance

### Phase 2 (3 months)
- User Authentication
- Database integration
- Cloud storage
- Improved 3D visualization (Three.js)
- AI Chat assistant
- Advanced customization
- Multi-floor editing

### Phase 3 (6 months)
- Collaboration features
- Advanced compliance checking
- Energy efficiency calculations
- Integration with professional CAD software
- Mobile application
- Desktop application (Electron)

### Phase 4+ (Future)
- AR/VR visualization
- IoT integration for smart buildings
- Sustainability analysis
- Construction timeline generation
- Vendor marketplace integration
