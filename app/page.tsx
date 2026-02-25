'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Zap, BarChart3, FileText, Box, Brain } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/30 bg-background/40 backdrop-blur-xl supports-[backdrop-filter]:bg-background/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Visionary</div>
          <div className="flex gap-8 items-center">
            <Link href="#features" className="text-sm text-foreground/70 hover:text-primary transition-colors">Features</Link>
            <Link href="#how-it-works" className="text-sm text-foreground/70 hover:text-primary transition-colors">How It Works</Link>
            <Link href="/generator" className="text-sm text-foreground/70 hover:text-primary transition-colors">Start Building</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center space-y-8">
          <div className="inline-block">
            <span className="px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
              AI-Powered Architecture
            </span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold text-pretty leading-tight">
            Generate Professional Floor Plans in Seconds
          </h1>
          
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto text-balance">
            Visionary uses advanced AI algorithms to automatically generate 2D floor plans, structural layouts, and cost estimates. From concept to construction-ready drawings in minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/generator">
              <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 text-white">
                Start Planning <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/ai-demo">
              <Button size="lg" variant="outline">
                View AI Demo
              </Button>
            </Link>
          </div>

          {/* Capabilities Showcase */}
          <div className="pt-12 border-t border-border">
            <p className="text-sm text-foreground/60 mb-8">Enterprise-grade architectural planning platform</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-lg font-semibold text-primary mb-2">Intelligent Space Optimization</div>
                <p className="text-sm text-foreground/60">60–75% plot utilization with optimal room distributions and zoning</p>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-primary mb-2">Building Code Compliance</div>
                <p className="text-sm text-foreground/60">Indian Standards (IS:875), proper setbacks, parking, and circulation zones</p>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-primary mb-2">Production-Ready Output</div>
                <p className="text-sm text-foreground/60">Professional SVG, PDF, and structural documentation instantly</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-secondary/5 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">Core Features</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">Everything you need to create professional architectural plans</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 2D Floor Plans */}
            <div className="group relative bg-card/40 backdrop-blur border border-primary/20 rounded-xl p-8 space-y-4 hover:border-primary/50 transition-all duration-300 hover:bg-card/60">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-12 h-12 bg-gradient-to-br from-primary/30 to-primary/10 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h3 className="relative text-xl font-semibold">2D Floor Plans</h3>
              <p className="relative text-foreground/70">Automatically generate detailed SVG-based floor plans with labeled rooms, dimensions, and full editable capabilities.</p>
            </div>

            {/* Structural Layout */}
            <div className="group relative bg-card/40 backdrop-blur border border-secondary/20 rounded-xl p-8 space-y-4 hover:border-secondary/50 transition-all duration-300 hover:bg-card/60">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-12 h-12 bg-gradient-to-br from-secondary/30 to-secondary/10 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="relative text-xl font-semibold">Structural Analysis</h3>
              <p className="relative text-foreground/70">Column placement, beam layouts, and load distribution calculations following Indian building standards (IS:875).</p>
            </div>

            {/* Cost Estimation */}
            <div className="group relative bg-card/40 backdrop-blur border border-accent/20 rounded-xl p-8 space-y-4 hover:border-accent/50 transition-all duration-300 hover:bg-card/60">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-12 h-12 bg-gradient-to-br from-accent/30 to-accent/10 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-accent" />
              </div>
              <h3 className="relative text-xl font-semibold">Cost Estimation</h3>
              <p className="relative text-foreground/70">Dynamic material and labor cost breakdowns with real-time updates as you modify your plan.</p>
            </div>

            {/* PDF Download */}
            <div className="group relative bg-card/40 backdrop-blur border border-primary/20 rounded-xl p-8 space-y-4 hover:border-primary/50 transition-all duration-300 hover:bg-card/60">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-12 h-12 bg-gradient-to-br from-primary/30 to-primary/10 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h3 className="relative text-xl font-semibold">Professional PDFs</h3>
              <p className="relative text-foreground/70">Export complete construction documentation including floor plans, structural details, and cost breakdowns.</p>
            </div>

            {/* 3D Preview */}
            <div className="group relative bg-card/40 backdrop-blur border border-secondary/20 rounded-xl p-8 space-y-4 hover:border-secondary/50 transition-all duration-300 hover:bg-card/60">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-12 h-12 bg-gradient-to-br from-secondary/30 to-secondary/10 rounded-lg flex items-center justify-center">
                <Box className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="relative text-xl font-semibold">3D Visualization</h3>
              <p className="relative text-foreground/70">Interactive 3D preview of your building design with space visualization and walkthroughs.</p>
            </div>

            {/* AI Chat */}
            <div className="group relative bg-card/40 backdrop-blur border border-accent/20 rounded-xl p-8 space-y-4 hover:border-accent/50 transition-all duration-300 hover:bg-card/60">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-12 h-12 bg-gradient-to-br from-accent/30 to-accent/10 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-accent" />
              </div>
              <h3 className="relative text-xl font-semibold">AI Assistant</h3>
              <p className="relative text-foreground/70">Get instant answers about your design, optimization suggestions, and architectural best practices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-foreground/70">Three simple steps to your perfect floor plan</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold">Input Your Requirements</h3>
              <p className="text-foreground/70">Specify plot dimensions, building type (residential, commercial), and number of floors</p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold">AI Generates Plans</h3>
              <p className="text-foreground/70">Our algorithm optimizes space, ensures building code compliance, and generates layouts</p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold">Export & Build</h3>
              <p className="text-foreground/70">Download PDFs, SVGs, and share with your team or take to construction</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-pretty">
            Ready to Transform Your Design Process?
          </h2>
          <p className="text-lg opacity-90">
            Join hundreds of architects and builders already using Visionary to accelerate their projects.
          </p>
          <Link href="/generator">
            <Button size="lg" variant="secondary" className="gap-2">
              Start Your First Plan <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li><Link href="#" className="hover:text-primary transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Updates</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li><Link href="#" className="hover:text-primary transition-colors">Documentation</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">API Reference</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li><Link href="#" className="hover:text-primary transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Privacy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Social</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li><Link href="#" className="hover:text-primary transition-colors">Twitter</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">LinkedIn</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">GitHub</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-foreground/60">
            <p>&copy; 2026 Visionary. All rights reserved. Built with v0.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
