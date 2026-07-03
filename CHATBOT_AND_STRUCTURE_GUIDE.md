# AI Chatbot & Building Structure Integration Guide

## Overview
Your floor plan generator now includes two powerful features:
1. **AI Chatbot** - Powered by Google Gemini for architectural advice
2. **Building Structure** - Detailed structural analysis and specifications

## Features Implemented

### 1. AI Chatbot Section
Located in the **"AI Assistant"** tab, the chatbot provides:

**Functionality:**
- Real-time conversation with Google Gemini AI
- Floor plan context awareness (built-up area, carpet area, room count)
- 6 suggested prompts for quick queries
- Message history with timestamps
- Auto-scrolling conversation

**Sample Prompts:**
- "How can I optimize this floor plan?"
- "What's the best room layout?"
- "Suggest improvements for space efficiency"
- "How to improve natural lighting?"
- "Design recommendations for this plot"
- "How to maximize carpet area?"

**API Integration:**
- Uses `@google/generative-ai` package
- Model: `gemini-1.5-flash`
- Requires: `NEXT_PUBLIC_GEMINI_API_KEY` environment variable

### 2. Building Structure Section
Located in the **"Structure"** tab with four sub-sections:

**Structural Tab:**
- Ground floor columns, beams, and walls calculation
- Foundation type (Reinforced Concrete with spread footings)
- First floor details (if multi-story)
- Automatic calculation based on plot dimensions

**Flooring Tab:**
- Ground floor specifications (ceramic tiles, vitrified)
- First floor details (wooden/vitrified flooring)
- Terrace/roof specifications
- Waterproof and insulation details

**Utilities Tab:**
- Electrical system (Main switchboard with sub-circuit distribution)
- Plumbing system (Hot/cold water lines with overhead tank)
- Ventilation (Cross-ventilation design)
- Fire safety (Emergency exits & extinguisher provision)

**Roof Tab:**
- Type: Flat RCC Terrace
- Material: Reinforced Cement Concrete
- Load capacity: 150 kg/m²
- Features: Waterproof membrane, thermal insulation, drainage slope, parapet walls

## Environment Setup

### Required Configuration
```env
NEXT_PUBLIC_GEMINI_API_KEY=your_actual_api_key_here
```

### How to Get Gemini API Key
1. Visit [Google AI Studio](https://ai.google.dev/)
2. Click "Get API Key" button
3. Create a new API key in Google Cloud
4. Copy the key to your `.env.local` file

### Production Deployment
- Ensure `NEXT_PUBLIC_GEMINI_API_KEY` is set in Vercel project settings
- All environment variables starting with `NEXT_PUBLIC_` are safe to expose

## Component Details

### AIChatbot Component
**Location:** `/components/generator/AIChatbot.tsx`

**Props:**
```typescript
interface AIChatbotProps {
  floorPlanData?: {
    builtUpArea?: number
    carpetArea?: number
    numRooms?: number
    plotLength?: number
    plotBreadth?: number
  }
}
```

**Features:**
- Auto-initializes Gemini client on mount
- Manages message state with timestamps
- Handles API errors gracefully with user-friendly messages
- Auto-scrolls to latest message
- Disabled state during loading

### BuildingStructure Component
**Location:** `/components/generator/BuildingStructure.tsx`

**Props:**
```typescript
interface BuildingStructureProps {
  numFloors?: number
  plotLength?: number
  plotBreadth?: number
}
```

**Features:**
- Auto-calculates structural elements based on plot dimensions
- 5-meter column spacing (configurable)
- Generates appropriate number of beams and columns
- Displays comprehensive utility information
- Fully responsive tabbed interface

## Integration in Generator Page

Both components are integrated into `/app/generator/page.tsx`:

```typescript
// Chatbot Tab
<TabsContent value="ai" className="space-y-4 min-h-96">
  <AIChatbot
    floorPlanData={{
      builtUpArea: generatedPlan.buildingStats.builtUpArea,
      carpetArea: generatedPlan.buildingStats.carpetArea,
      numRooms: generatedPlan.rooms.length,
      plotLength: generatedPlan.input.length,
      plotBreadth: generatedPlan.input.breadth,
    }}
  />
</TabsContent>

// Structure Tab
<TabsContent value="structure" className="space-y-4">
  <BuildingStructure
    numFloors={generatedPlan.input.numFloors}
    plotLength={generatedPlan.input.length}
    plotBreadth={generatedPlan.input.breadth}
  />
</TabsContent>
```

## Usage Guide

### For Users
1. Generate a floor plan using the Building Details form
2. Navigate to **"Structure"** tab to see complete structural breakdown
3. Navigate to **"AI Assistant"** tab to chat with the architectural AI
4. Select suggested prompts or type custom questions

### For Developers
1. The chatbot is stateless - conversation doesn't persist between page reloads
2. To add persistence, implement a database storage layer for messages
3. To change the AI model, update the `model` parameter in the initialization
4. The BuildingStructure calculations can be customized by modifying the `calculateStructure()` function

## Error Handling

**Chatbot Error States:**
- Missing API key: Shows alert and disables submit button
- API failure: Displays user-friendly error message
- Network timeout: Handled gracefully with error response

**Structure Section:**
- No error states (calculations are deterministic)
- Gracefully handles edge cases with minimum values

## Future Enhancements

Potential improvements:
- Add message export/download functionality
- Implement conversation history persistence
- Add custom column spacing configuration
- Export structural drawings as PDF
- Multi-language support for chatbot
- Voice input/output for chatbot
- 3D visualization of structural elements

## Support

For issues:
1. Verify Gemini API key is correctly set
2. Check browser console for error messages
3. Ensure `@google/generative-ai` package is installed
4. Test API key at [Google AI Studio](https://ai.google.dev/)
