'use client'

import { useState, ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { AIChat } from './AIChat'

interface DashboardLayoutProps {
  children: ReactNode
  plotLength: number
  plotBreadth: number
}

export function DashboardLayout({
  children,
  plotLength,
  plotBreadth,
}: DashboardLayoutProps) {
  const [activeMenuItem, setActiveMenuItem] = useState('floor-plan')
  const [isChatOpen, setIsChatOpen] = useState(false)

  const handleMenuClick = (id: string) => {
    setActiveMenuItem(id)
    if (id === 'ai-chat') {
      setIsChatOpen(!isChatOpen)
    }
  }

  return (
    <div className="flex h-screen w-screen bg-[#0a0e27] overflow-hidden">
      {/* Sidebar */}
      <Sidebar activeItem={activeMenuItem} onItemClick={handleMenuClick} />

      {/* Main Content */}
      <div className="ml-64 flex-1 flex flex-col h-screen overflow-hidden">
        {children}
      </div>

      {/* AI Chat Panel */}
      <AIChat
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        plotLength={plotLength}
        plotBreadth={plotBreadth}
      />
    </div>
  )
}
