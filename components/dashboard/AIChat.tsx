'use client'

import { useState } from 'react'
import { X, Send, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface AIChatProps {
  isOpen: boolean
  onClose: () => void
  plotLength: number
  plotBreadth: number
}

const suggestedPrompts = [
  'Analyze space utilization',
  'Suggest furniture arrangement',
  'Check building code compliance',
  'Estimate material quantities',
  'Optimize natural lighting',
  'Improve traffic flow',
  'Calculate energy efficiency',
  'Recommend finishes',
  'Assess accessibility',
  'Suggest storage solutions',
]

export function AIChat({ isOpen, onClose, plotLength, plotBreadth }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hello! I'm your AI Floor Plan Assistant. I can help you analyze this ${plotLength}m × ${plotBreadth}m plot and provide recommendations on layout, materials, compliance, and more. What would you like to explore?`,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Based on the ${plotLength}m × ${plotBreadth}m floor plan, here are my insights on "${input}". This is a simulated response. Connect to a real AI service for live analysis.`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 800)
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
          onClick={onClose}
        />
      )}

      {/* Chat Panel */}
      <div
        className={cn(
          'fixed right-0 top-0 h-screen w-full md:w-96 bg-gradient-to-b from-[#0a0e27] to-[#0f1333] border-l border-primary/20 flex flex-col z-40 transition-transform duration-300 shadow-2xl shadow-primary/20',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-primary/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <MessageCircle size={16} className="text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-primary">AI Assistant</h2>
              <p className="text-xs text-foreground/50">Floor plan analysis</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <X size={18} className="text-foreground/60" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-center">
              <p className="text-foreground/50">No messages yet. Start a conversation!</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex gap-3 animate-fade-in',
                  message.role === 'user' && 'justify-end'
                )}
              >
                <div
                  className={cn(
                    'max-w-xs px-4 py-2 rounded-lg text-sm',
                    message.role === 'user'
                      ? 'bg-primary/20 border border-primary/40 text-primary'
                      : 'bg-secondary/10 border border-secondary/30 text-foreground/90'
                  )}
                >
                  {message.content}
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex gap-3">
              <div className="bg-secondary/10 border border-secondary/30 px-4 py-2 rounded-lg">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary/60 animate-pulse" />
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary/60 animate-pulse delay-100" />
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary/60 animate-pulse delay-200" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Prompts */}
        {messages.length <= 1 && (
          <div className="px-4 pb-4 border-b border-primary/10">
            <p className="text-xs text-foreground/50 mb-2 font-medium">Suggested:</p>
            <div className="grid grid-cols-2 gap-2">
              {suggestedPrompts.slice(0, 6).map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => setInput(prompt)}
                  className="text-xs px-2 py-1.5 rounded-lg bg-white/5 hover:bg-primary/15 border border-primary/20 text-foreground/70 hover:text-primary transition-all hover:border-primary/40"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t border-primary/10">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
              placeholder="Ask about the floor plan..."
              className="flex-1 bg-white/5 border border-primary/20 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className="p-2 rounded-lg bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-all"
            >
              <Send size={16} />
            </button>
          </div>
          <p className="text-xs text-foreground/40 mt-2">
            💡 Tip: Ask about materials, costs, or design improvements
          </p>
        </div>
      </div>
    </>
  )
}
