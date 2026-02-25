'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowRight, Lightbulb, BarChart3, Building2 } from 'lucide-react'
import Link from 'next/link'

export default function AIDemoPage() {
  const [selectedScenario, setSelectedScenario] = useState('optimization')

  const scenarios = {
    optimization: {
      title: 'Space Optimization Analysis',
      description: 'AI analyzes your design and suggests improvements',
      query: 'How can I optimize my design to improve space efficiency?',
      response: `Based on your 30m × 40m residential plot with 2 floors:

Current Status:
• Plot Area: 1,200 sqm
• Current Utilization: 62%
• Target Utilization: 70%

Optimization Opportunities:
1. Reduce circulation corridors from 30% to 25% → +60 sqm usable space
2. Implement open-plan living/dining → Save 15 sqm on walls
3. Compact staircase design (L-shaped) → Save 3 sqm per floor
4. Reconfigure parking layout → Gain 2 additional spaces

Estimated Impact:
• Additional usable area: +78 sqm (6.5% improvement)
• Cost savings: ₹14 lakhs through reduced material waste
• Timeline reduction: 2-3 weeks during construction

Recommended Changes:
→ Merge kitchen-dining into open plan layout
→ Move staircase to central location
→ Convert one storage to additional parking`,
      icon: Lightbulb,
    },
    compliance: {
      title: 'Building Code Compliance Check',
      description: 'Verify your design meets Indian building standards',
      query: 'Does my design comply with Indian building codes (IS:875)?',
      response: `Compliance Report for Your Design
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SETBACKS & MARGINS:
✓ Front Setback: 4.5m (Required: 4.5m) - COMPLIANT
✓ Rear Setback: 2.0m (Required: 2.0m) - COMPLIANT
✓ Left Setback: 2.0m (Required: 2.0m) - COMPLIANT
✓ Right Setback: 3.0m (Required: 3.0m) - COMPLIANT

COVERAGE RATIOS:
✓ Ground Coverage: 45% (Max: 60%) - COMPLIANT
✓ Floor Space Index: 1.8 (Max: 2.5) - COMPLIANT
✓ Plot Utilization: 62% (Target: 60-75%) - COMPLIANT

ROOM DIMENSIONS (Indian Standards):
✓ Master Bedroom: 3.6m × 4.2m (Min: 3.0m × 3.6m) - COMPLIANT
✓ Secondary Bedroom: 3.0m × 3.6m (Min: 3.0m × 3.6m) - COMPLIANT
✓ Kitchen: 2.4m × 3.0m (Min: 2.4m × 3.0m) - COMPLIANT
✓ Living Room: 4.5m × 4.5m (Min: 4.5m × 4.5m) - COMPLIANT
✓ Bathroom: 1.8m × 2.4m (Min: 1.8m × 2.4m) - COMPLIANT

VENTILATION & LIGHT:
✓ Cross-ventilation achieved in all rooms
✓ Natural light in 95% of usable spaces
✓ Balcony orientation: East-facing (optimal)

PARKING REQUIREMENT:
Required: 12 spaces (1 per 100 sqm built-up)
Provided: 14 spaces
Status: EXCEEDED

FIRE & SAFETY:
✓ Staircase width: 1.8m (Min: 1.5m) - COMPLIANT
✓ Emergency exit provided
✓ Fire rating of materials specified
✓ Accessible ramps provided

OVERALL STATUS: ✓ FULLY COMPLIANT
Your design meets all Indian building standards and is ready for municipal approval.`,
      icon: Building2,
    },
    cost: {
      title: 'Detailed Cost Estimation',
      description: 'AI-powered budget breakdown and cost analysis',
      query: 'What is the estimated total construction cost?',
      response: `CONSTRUCTION COST ESTIMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROJECT DETAILS:
• Location: Delhi/NCR (Tier-1 city)
• Built-up Area: 840 sqm
• Carpet Area: 714 sqm
• Number of Floors: 2
• Building Type: Residential

COST BREAKDOWN:

1. STRUCTURAL WORK (35%)
   • RCC Frame, Columns, Beams: ₹100 lakhs
   • Foundation & Footings: ₹18 lakhs
   • Structural Cost Total: ₹118 lakhs

2. MASONRY & WALLS (15%)
   • Brick Masonry: ₹45 lakhs
   • Block Masonry (partitions): ₹12 lakhs
   • Masonry Total: ₹57 lakhs

3. DOORS, WINDOWS & OPENINGS (8%)
   • Main Doors (Teak wood): ₹12 lakhs
   • Windows (Aluminum): ₹18 lakhs
   • Total: ₹30 lakhs

4. ELECTRICAL WORKS (12%)
   • Wiring & Switches: ₹25 lakhs
   • Panel & Breakers: ₹8 lakhs
   • AC/Lighting Fixtures: ₹28 lakhs
   • Electrical Total: ₹61 lakhs

5. PLUMBING & SANITARYWARE (10%)
   • Pipes & Fittings: ₹20 lakhs
   • Sanitaryware (fixtures): ₹25 lakhs
   • Plumbing Total: ₹45 lakhs

6. FLOORING & FINISHES (15%)
   • Flooring (ceramic tiles): ₹35 lakhs
   • Wall Finishes (paint): ₹18 lakhs
   • Ceiling (plaster & paint): ₹12 lakhs
   • Finishes Total: ₹65 lakhs

7. LABOR & SUPERVISION (12%)
   • Labor charges: ₹45 lakhs
   • Supervision & Management: ₹15 lakhs
   • Labor Total: ₹60 lakhs

SUMMARY:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Subtotal (Material + Labor): ₹436 lakhs
Contingency (12%): ₹52 lakhs
Taxes & Permits (5%): ₹24 lakhs
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOTAL ESTIMATED COST: ₹512 lakhs (₹51.2 Cr)

Per Square Meter (Built-up): ₹60,952
Per Square Meter (Carpet): ₹71,708

TIMELINE: 18-24 months
MARGIN FOR OVERRUN: 10-15%

Cost Comparison:
• Budget Option: ₹45-50 lakhs (₹54,000/sqm)
• Standard Option: ₹51-55 lakhs (₹62,000/sqm) - RECOMMENDED
• Premium Option: ₹60-70 lakhs (₹75,000/sqm)`,
      icon: BarChart3,
    },
    vastu: {
      title: 'Vastu Compliance Analysis',
      description: 'Traditional Vastu Shastra principles for your design',
      query: 'How well does my design follow Vastu principles?',
      response: `VASTU SHASTRA ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

OVERALL SCORE: 8.5/10 (Very Good)

ENTRANCE & MAIN DOOR:
✓ Main entrance: North-facing (Most auspicious)
✓ No direct alignment with kitchen
✓ Level threshold (no steps down)
Status: EXCELLENT

LIVING ROOM:
✓ Located in central/North area
✓ Natural light from East
✓ Well-ventilated
Status: GOOD (Consider adding North-facing window)

MASTER BEDROOM:
✓ Southwest corner position (Optimal for stability)
✓ Solid walls on South & West
✓ Light from East/North
Status: EXCELLENT

KITCHEN:
✓ Southeast corner location (Ideal for Agni element)
✓ East-facing window for morning sun
✓ Not adjacent to main door
Status: EXCELLENT

BATHROOMS:
✓ Located away from Northeast corner
✓ Proper drainage direction
Status: GOOD

POOJA ROOM (if applicable):
✓ Northeast corner recommended
◐ Current: Central location
Suggestion: Consider adding small pooja nook in Northeast

STAIRCASE:
◐ Central location (acceptable)
Suggestion: Ensure counter-clockwise rotation if spiral

RECOMMENDATIONS FOR IMPROVEMENT:

1. Add water feature (fountain/water body) in Northeast corner
   Impact: Wealth & prosperity enhancement (+1.5 points)

2. Install crystal/mirror in living room (North wall)
   Impact: Light & energy amplification (+0.5 points)

3. Ensure clear view from main door to back door
   Impact: Chi (life energy) flow (+1.0 point)

4. Avoid heavy furniture in Southwest
   Current: Compliant ✓

5. Add indoor plants in East corner
   Impact: Health & growth enhancement (+0.5 points)

With recommendations implemented: 10/10 (Perfect alignment)

Note: Vastu principles are traditional guidelines. Modern comfort and building codes take precedence. Use Vastu as supplementary design inspiration.`,
      icon: Building2,
    },
  }

  const activeScenario = scenarios[selectedScenario as keyof typeof scenarios]
  const Icon = activeScenario.icon

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-primary">Visionary AI</div>
          <div className="flex gap-4 items-center">
            <Link href="/" className="text-sm hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/generator">
              <Button size="sm" variant="default">
                Start Planning <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl lg:text-5xl font-bold text-pretty">
            AI Architectural Intelligence in Action
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            See how our AI assistant provides professional architectural guidance, compliance checking, and cost optimization for your designs
          </p>
        </div>

        {/* Demo Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Scenario Selector */}
          <div className="lg:col-span-1 space-y-4">
            <div className="text-sm font-semibold text-foreground/60">Select Demo Scenario</div>
            <div className="space-y-2">
              {Object.entries(scenarios).map(([key, scenario]) => (
                <button
                  key={key}
                  onClick={() => setSelectedScenario(key)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    selectedScenario === key
                      ? 'bg-primary/10 border-primary text-primary'
                      : 'border-border hover:border-primary/50 text-foreground'
                  }`}
                >
                  <div className="font-semibold text-sm">{scenario.title}</div>
                  <div className="text-xs text-foreground/60 mt-1">{scenario.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* AI Demo Display */}
          <div className="lg:col-span-2">
            <Card className="p-8 space-y-6 border border-border">
              {/* Scenario Header */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{activeScenario.title}</h2>
                  <p className="text-foreground/60 mt-1">{activeScenario.description}</p>
                </div>
              </div>

              {/* Query/Response */}
              <div className="bg-secondary/5 rounded-lg p-6 space-y-4 border border-secondary/20">
                <div>
                  <p className="text-sm font-semibold text-secondary mb-2">User Query:</p>
                  <p className="text-foreground italic">"{activeScenario.query}"</p>
                </div>

                <div className="border-t border-secondary/20 pt-4">
                  <p className="text-sm font-semibold text-primary mb-2">AI Response:</p>
                  <div className="text-sm text-foreground/80 whitespace-pre-wrap font-mono text-xs leading-relaxed max-h-96 overflow-y-auto">
                    {activeScenario.response}
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="pt-4 border-t border-border">
                <Link href="/generator">
                  <Button className="w-full gap-2" size="lg">
                    Try AI Assistant on Your Design <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>

        {/* Features Highlight */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <Card className="p-6 border border-border space-y-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold">Intelligent Optimization</h3>
            <p className="text-sm text-foreground/70">Get actionable suggestions to improve space efficiency, reduce costs, and optimize layouts based on your specific requirements.</p>
          </Card>

          <Card className="p-6 border border-border space-y-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold">Compliance Assurance</h3>
            <p className="text-sm text-foreground/70">Automatic verification against Indian building standards (IS:875), setbacks, parking requirements, and safety regulations.</p>
          </Card>

          <Card className="p-6 border border-border space-y-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold">Detailed Analysis</h3>
            <p className="text-sm text-foreground/70">Comprehensive cost breakdowns, timeline estimates, Vastu analysis, and professional recommendations for every design decision.</p>
          </Card>
        </div>
      </div>
    </div>
  )
}
