# Visionary - AI Architectural Plan Generator

A professional web application that automatically generates 2D architectural floor plans, structural layouts, cost estimations, and 3D previews based on minimal user inputs.

## Features

### Core Features (Phase 1 - MVP)
- **2D Floor Plan Generation**: SVG-based, scalable floor plans with room labels and dimensions
- **Structural Layout**: Column placement, beam layout, and load distribution following Indian building standards (IS:875)
- **Cost Estimation**: Dynamic material and labor cost breakdowns with real-time updates
- **PDF Download**: Export complete construction documentation
- **Dashboard**: Manage and organize your architectural plans

### Advanced Features (Phase 2+)
- **3D Visualization**: Interactive 3D preview of building design
- **Vastu Compliance**: Check and optimize designs according to Vastu Shastra principles
- **AI Chat Assistant**: Get instant answers about design decisions
- **Plan History**: Save and manage multiple projects
- **DXF Export**: Export to AutoCAD format

## Tech Stack

### Frontend
- **Framework**: Next.js 16 with React 19.2
- **UI Components**: shadcn/ui + Tailwind CSS 4.2
- **Form Handling**: React Hook Form + Zod validation
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React

### Backend (Future)
- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL (Phase 2)
- **PDF Generation**: ReportLab
- **AI Integration**: OpenAI API / Claude

## Project Structure

```
/vercel/share/v0-project/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── generator/page.tsx       # Plan generator
│   ├── dashboard/page.tsx       # Plan history dashboard
│   ├── plan/[id]/page.tsx      # Plan detail view
│   ├── api/                     # API routes
│   │   └── generate-pdf/        # PDF generation
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/
│   ├── generator/
│   │   ├── InputForm.tsx        # Plot input form
│   │   ├── FloorPlanPreview.tsx # Floor plan display
│   │   ├── StructuralOverlay.tsx# Structural elements
│   │   ├── CostEstimator.tsx    # Cost breakdown
│   │   ├── ThreeDPreview.tsx    # 3D visualization
│   │   └── VastuPanel.tsx       # Vastu compliance
│   └── ui/                      # shadcn/ui components
├── lib/
│   ├── types.ts                 # TypeScript types
│   ├── svg-generator.ts         # SVG generation utilities
│   ├── layout-algorithms.ts     # Space optimization
│   ├── structural-calculator.ts # Structural design
│   ├── vastu-calculator.ts      # Vastu compliance
│   └── utils.ts                 # Helper functions
├── public/                      # Static assets
├── package.json
└── tsconfig.json
```

## Installation & Setup

### Prerequisites
- Node.js 18+ 
- pnpm (default package manager)

### Quick Start

1. **Install dependencies**
```bash
pnpm install
```

2. **Run development server**
```bash
pnpm dev
```

3. **Open browser**
Navigate to `http://localhost:3000`

## Key Components

### Input Form
- Accept plot dimensions, building type, number of floors
- Real-time area calculations
- Form validation using Zod

### Floor Plan Generation
- Grid-based space allocation algorithm
- Respects Indian building standards (IS:875)
- Room minimums enforced (9ft × 10ft for bedrooms, etc.)
- Returns SVG for scalable rendering

### Structural Layout
- 6m × 6m column grid (standard residential spacing)
- Automatic beam placement between columns
- Wall placement around perimeter
- Foundation design suggestions

### Cost Estimation
- Material cost calculation (concrete, steel, bricks, etc.)
- Labor cost estimation
- 10% contingency buffer
- Cost per sq.ft breakdown

### 3D Preview
- Canvas-based isometric projection
- Interactive rotation (drag to rotate)
- Building visualization with floors and windows
- Building statistics display

### Vastu Compliance
- Check room placements against traditional principles
- Score calculation (0-100%)
- Recommendations for improvements
- Direction-based room optimization

## Building Standards Implemented

### Indian Standards
- **IS:875**: Code of Practice for Design Loads
- **IS:1904**: Code of Practice for Architectural Practice
- Room minimums per usage type
- Seismic Zone II considerations
- Building Classification: Type-2 (Ordinary buildings)

### Design Constraints
- Column spacing: 6m × 6m
- Column size: 450mm × 450mm
- Beam height: 600mm
- Wall thickness: 200mm
- Minimum 25% open space

## API Routes

### Generate PDF
- **Endpoint**: `POST /api/generate-pdf`
- **Input**: Floor plan SVG, structural layout, cost data
- **Output**: PDF file download

### Future Endpoints
- `POST /api/optimize-plan` - AI-powered space optimization
- `POST /api/vastu-check` - Vastu compliance analysis
- `POST /api/export-dxf` - DXF format export

## Configuration

### Environment Variables
No environment variables required for MVP. Advanced features (Phase 2+) will require:
- `OPENAI_API_KEY` - For AI chat assistant
- `DATABASE_URL` - For plan persistence
- `PDF_SERVICE_URL` - For PDF generation backend

## Development Guidelines

### Code Style
- Use TypeScript for type safety
- Components should be functional and use hooks
- Utilize shadcn/ui components for consistency
- SVG generation uses raw DOM manipulation

### Adding New Features
1. Define types in `lib/types.ts`
2. Create calculation/algorithm in `lib/`
3. Build component in `components/`
4. Integrate into page or generator
5. Add tests (Phase 2)

### Performance Considerations
- SVG rendering optimized for up to 100+ rooms
- Floor plan generation completes in <2 seconds
- Cost calculation uses memoization for complex calculations

## Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Docker
Create `Dockerfile` for containerization (Phase 2)

### Build for Production
```bash
pnpm build
pnpm start
```

## Browser Support
- Chrome/Edge: Latest versions
- Firefox: Latest version
- Safari: 14+
- Mobile: iOS Safari 12+, Chrome Android

## Limitations & Future Work

### Current Limitations
- Single floor visualization (multi-floor support in Phase 2)
- Basic 3D preview (no complex geometry)
- No real-time collaboration
- Local storage only (no database)
- No user authentication

### Planned Features (Phase 2-3)
- Multi-floor support with proper 3D rendering
- User authentication and cloud storage
- Real-time collaboration
- Advanced room customization
- Fire safety compliance checks
- Energy efficiency calculations
- Integration with professional tools (CAD export)
- Mobile app
- AI-powered interior design suggestions

## Known Issues
- PDF generation returns HTML (needs integration with backend service)
- 3D preview limited to isometric projection
- No undo/redo functionality yet
- Plans only saved to browser localStorage

## Support & Contributions

For bug reports or feature requests, please create an issue in the repository.

## License

Proprietary - Visionary AI Solutions

## Credits

Built with v0, Next.js, and shadcn/ui. Architectural calculations follow Indian building standards and Vastu Shastra principles.

---

**Version**: 1.0.0 (MVP)  
**Last Updated**: February 2026  
**Status**: In Active Development
