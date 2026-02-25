'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Send, Loader } from 'lucide-react'
import { Room } from '@/lib/types'

interface AIAssistantProps {
  rooms: Room[]
  plotLength: number
  plotBreadth: number
  numFloors: number
  onOptimize?: (suggestion: string) => void
}

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export function AIAssistant({
  rooms,
  plotLength,
  plotBreadth,
  numFloors,
  onOptimize,
}: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'I\'m your AI architectural assistant. Ask me about your design, optimization suggestions, or building standards compliance.',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    // Architectural advice responses
    if (lowerMessage.includes('optimize') || lowerMessage.includes('efficiency')) {
      return `Based on your design:
• Plot Area: ${(plotLength * plotBreadth).toFixed(0)} sqm
• Current utilization: ${((rooms.reduce((sum, r) => sum + r.width * r.height, 0) / (plotLength * plotBreadth)) * 100).toFixed(1)}%
• Target: 60-75% built-up area

Suggestions:
1. Reduce circulation area from 30% to 25% to gain +5% efficiency
2. Consider compact staircase design (spiral stairs save 3-4 sqm per floor)
3. Optimize parking layout to achieve 2-3 additional spaces
4. Implement open-plan living areas where feasible`
    }

    if (lowerMessage.includes('setback') || lowerMessage.includes('regulation')) {
      return `Building Code Compliance (Indian Standards IS:875):

Your Plot: ${plotLength}m × ${plotBreadth}m

Required Setbacks:
• Front (North): 4.5m
• Rear (South): 2.0m
• Left (East): 2.0m
• Right (West): 3.0m

Ground Coverage Ratio (GCR): Max 50-60% (Current: ${((rooms.filter(r => r.floor === 1).reduce((sum, r) => sum + r.width * r.height, 0) / (plotLength * plotBreadth)) * 100).toFixed(1)}%)

Floor Space Index (FSI): Max 2.0-3.0 depending on zone`
    }

    if (lowerMessage.includes('cost') || lowerMessage.includes('price') || lowerMessage.includes('budget')) {
      const builtUpArea = rooms.reduce((sum, r) => sum + r.width * r.height, 0)
      const costPerSqm = 18000 // INR per sqm (avg)
      const totalCost = builtUpArea * costPerSqm
      return `Cost Estimation:
• Built-up Area: ${builtUpArea.toFixed(0)} sqm
• Average Cost: ₹${costPerSqm.toLocaleString()} per sqm
• Estimated Total: ₹${(totalCost / 10000000).toFixed(2)} Cr

Breakdown:
• Structural: 35% (₹${((totalCost * 0.35) / 10000000).toFixed(2)} Cr)
• Finishing: 30% (₹${((totalCost * 0.30) / 10000000).toFixed(2)} Cr)
• MEP: 20% (₹${((totalCost * 0.20) / 10000000).toFixed(2)} Cr)
• Contingency: 15% (₹${((totalCost * 0.15) / 10000000).toFixed(2)} Cr)`
    }

    if (lowerMessage.includes('room') || lowerMessage.includes('bedroom')) {
      const bedrooms = rooms.filter(r => r.type === 'bedroom').length
      const livingAreas = rooms.filter(r => r.type === 'living').length
      return `Room Analysis:
• Total Rooms: ${rooms.length}
• Bedrooms: ${bedrooms}
• Living/Common Areas: ${livingAreas}
• Bathrooms: ${rooms.filter(r => r.type === 'bathroom' || r.type === 'toilet').length}

Room Dimensions (min per IS code):
• Master Bedroom: 3.6m × 4.2m
• Secondary Bedroom: 3.0m × 3.6m
• Living: 4.5m × 4.5m
• Kitchen: 2.4m × 3.0m
• Bathroom: 1.8m × 2.4m

Your design meets all minimum standards for comfortable living.`
    }

    if (lowerMessage.includes('vastu') || lowerMessage.includes('direction')) {
      return `Vastu Shastra Principles for Residential Design:

Key Recommendations:
1. Master Bedroom: Southwest corner
2. Kitchen: Southeast corner
3. Pooja Room: Northeast corner (if applicable)
4. Main Entrance: North or East facing (preferred)
5. Living Room: Center or North area
6. Bathrooms: Avoid Northeast corner

Your current layout aligns with traditional Vastu principles. Consider:
• Ensuring natural light from East and North
• Water features (if any) in Northeast
• Heavier furniture in Southwest`
    }

    // Default helpful response
    return `I'm your AI architectural assistant. I can help you with:
• Space optimization and efficiency analysis
• Building code and setback compliance
• Cost estimation and budget planning
• Room layout recommendations
• Vastu principles and orientation
• Structural design considerations
• Material selection and finishes

What specific aspect would you like to explore?`
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAIResponse(input),
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, aiResponse])
      setIsLoading(false)
    }, 800)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Card className="flex flex-col h-96 bg-background border border-border">
      {/* Chat Header */}
      <div className="border-b border-border p-4">
        <h3 className="font-semibold text-lg">AI Architectural Assistant</h3>
        <p className="text-xs text-foreground/60">Powered by architectural expertise</p>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs rounded-lg px-4 py-2 whitespace-pre-wrap text-sm ${
                  message.role === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-secondary/10 text-foreground border border-secondary/20'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2 bg-secondary/10 rounded-lg px-4 py-2">
                <Loader className="w-4 h-4 animate-spin" />
                <span className="text-xs text-foreground/60">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-border p-4">
        <div className="flex gap-2">
          <Input
            placeholder="Ask about optimization, costs, or building codes..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="text-sm"
          />
          <Button
            size="sm"
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className="gap-1"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
