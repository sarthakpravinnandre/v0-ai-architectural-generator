'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Send, Loader2 } from 'lucide-react'
import { GoogleGenerativeAI } from '@google/generative-ai'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface AIChatbotProps {
  floorPlanData?: {
    builtUpArea?: number
    carpetArea?: number
    numRooms?: number
    plotLength?: number
    plotBreadth?: number
  }
}

export function AIChatbot({ floorPlanData }: AIChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI Floor Plan Assistant. Ask me anything about your building design, layout optimization, or architectural recommendations.',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const clientRef = useRef<any>(null)

  // Initialize Gemini client
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
    if (apiKey) {
      const genAI = new GoogleGenerativeAI(apiKey)
      clientRef.current = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    }
  }, [])

  // Auto-scroll to latest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!input.trim()) return
    if (!clientRef.current) {
      alert('Gemini API key not configured. Please set NEXT_PUBLIC_GEMINI_API_KEY environment variable.')
      return
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Build context about the floor plan
      const floorPlanContext = floorPlanData
        ? `Current Floor Plan Data: Built-up area: ${floorPlanData.builtUpArea}m², Carpet area: ${floorPlanData.carpetArea}m², Number of rooms: ${floorPlanData.numRooms}, Plot size: ${floorPlanData.plotLength}m × ${floorPlanData.plotBreadth}m`
        : ''

      const systemPrompt = `You are an expert architectural AI assistant specializing in floor plan design and building optimization. ${floorPlanContext} Help the user with layout suggestions, building design questions, and architectural recommendations. Provide practical, professional advice.`

      const response = await clientRef.current.generateContent({
        contents: [
          {
            role: 'user',
            parts: [{ text: systemPrompt + '\n\nUser query: ' + input }],
          },
        ],
      })

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.response.text(),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error('[v0] Chatbot error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again or check your API configuration.',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const suggestedPrompts = [
    'How can I optimize this floor plan?',
    'What\'s the best room layout?',
    'Suggest improvements for space efficiency',
    'How to improve natural lighting?',
    'Design recommendations for this plot',
    'How to maximize carpet area?',
  ]

  return (
    <Card className="h-full flex flex-col bg-gradient-to-br from-card/50 to-card/30 border-primary/20 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-4 border-b border-primary/10">
        <h3 className="font-semibold text-lg text-primary">AI Floor Plan Assistant</h3>
        <p className="text-sm text-foreground/60 mt-1">Powered by Gemini</p>
      </div>

      {/* Chat Area */}
      <ScrollArea className="flex-1 p-4 space-y-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-primary/20 text-primary rounded-br-none'
                    : 'bg-secondary/10 text-foreground rounded-bl-none'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <span className="text-xs opacity-60 mt-1 block">
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-secondary/10 px-4 py-3 rounded-lg rounded-bl-none flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-secondary" />
                <span className="text-sm text-foreground/70">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Suggested Prompts */}
      {messages.length === 1 && (
        <div className="px-4 py-3 bg-background/50 border-t border-primary/10">
          <p className="text-xs text-foreground/60 mb-2 font-medium">Suggested questions:</p>
          <div className="grid grid-cols-1 gap-2">
            {suggestedPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInput(prompt)
                  setTimeout(() => {
                    const form = document.querySelector('form')
                    if (form) form.dispatchEvent(new Event('submit', { bubbles: true }))
                  }, 0)
                }}
                className="text-left text-xs bg-primary/10 hover:bg-primary/20 text-primary p-2 rounded border border-primary/20 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <form onSubmit={sendMessage} className="p-4 border-t border-primary/10 bg-background/50">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your floor plan..."
            disabled={isLoading}
            className="bg-background/50 border-primary/20 focus:border-primary"
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            size="icon"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </form>
    </Card>
  )
}
