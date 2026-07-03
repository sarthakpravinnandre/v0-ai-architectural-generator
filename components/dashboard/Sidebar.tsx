'use client'

import { useState } from 'react'
import {
  LayoutDashboard,
  Building2,
  Zap,
  Droplet,
  Wind,
  Package,
  DollarSign,
  Leaf,
  Sofa,
  Sparkles,
  FileText,
  MessageCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarItem {
  id: string
  label: string
  icon: React.ReactNode
  isSpecial?: boolean
}

const menuItems: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { id: 'floor-plan', label: 'Floor Plan', icon: <Building2 size={20} /> },
  { id: 'structural', label: 'Structural Analysis', icon: <Zap size={20} /> },
  { id: 'electrical', label: 'Electrical Layout', icon: <Zap size={20} /> },
  { id: 'plumbing', label: 'Plumbing Layout', icon: <Droplet size={20} /> },
  { id: 'ventilation', label: 'Ventilation', icon: <Wind size={20} /> },
  { id: 'materials', label: 'Material Estimation', icon: <Package size={20} /> },
  { id: 'cost', label: 'Cost Analysis', icon: <DollarSign size={20} /> },
  { id: 'energy', label: 'Energy Efficiency', icon: <Leaf size={20} /> },
  { id: 'furniture', label: 'Furniture Layout', icon: <Sofa size={20} /> },
  { id: 'ai-rec', label: 'AI Recommendations', icon: <Sparkles size={20} /> },
  { id: 'reports', label: 'Reports', icon: <FileText size={20} /> },
  { id: 'ai-chat', label: 'AI Chatbot', icon: <MessageCircle size={20} />, isSpecial: true },
]

interface SidebarProps {
  activeItem: string
  onItemClick: (id: string) => void
}

export function Sidebar({ activeItem, onItemClick }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-screen bg-gradient-to-b from-[#0a0e27] to-[#0f1333] border-r border-primary/10 transition-all duration-300 flex flex-col',
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-primary/10">
        <div className={cn(
          'flex items-center gap-3 transition-opacity duration-300',
          isCollapsed && 'justify-center opacity-0 w-0 overflow-hidden'
        )}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Building2 size={18} className="text-white" />
          </div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Visionary
          </h1>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick(item.id)}
            className={cn(
              'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 relative group',
              activeItem === item.id
                ? item.isSpecial
                  ? 'bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/50 text-primary shadow-lg shadow-primary/20'
                  : 'bg-primary/15 border border-primary/50 text-primary shadow-lg shadow-primary/15'
                : 'text-foreground/60 hover:text-foreground/90 hover:bg-white/5'
            )}
            title={item.label}
          >
            <span className={cn(
              'flex-shrink-0 transition-all',
              activeItem === item.id && 'drop-shadow-lg'
            )}>
              {item.icon}
            </span>
            {!isCollapsed && (
              <span className="text-sm font-medium truncate">{item.label}</span>
            )}
            {activeItem === item.id && !isCollapsed && (
              <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            )}
            {activeItem === item.id && !isCollapsed && item.isSpecial && (
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/0 to-primary/5 pointer-events-none" />
            )}
          </button>
        ))}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-4 border-t border-primary/10">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full py-2 px-3 rounded-lg hover:bg-white/5 transition-colors text-foreground/60 hover:text-foreground/90 text-sm"
          title={isCollapsed ? 'Expand' : 'Collapse'}
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>
    </aside>
  )
}
