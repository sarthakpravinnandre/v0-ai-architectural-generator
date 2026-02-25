'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowRight, Plus, Trash2, Download, Eye } from 'lucide-react'
import type { Plan } from '@/lib/types'

export default function DashboardPage() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load plans from localStorage (for MVP)
    const storedPlans = localStorage.getItem('visionary-plans')
    if (storedPlans) {
      try {
        setPlans(JSON.parse(storedPlans))
      } catch (err) {
        console.error('[v0] Error loading plans:', err)
      }
    }
    setIsLoading(false)
  }, [])

  const handleDelete = (id: string) => {
    const updated = plans.filter((p) => p.id !== id)
    setPlans(updated)
    localStorage.setItem('visionary-plans', JSON.stringify(updated))
  }

  const handleDownload = (plan: Plan) => {
    // Create a simple JSON export
    const dataStr = JSON.stringify(plan, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `plan-${plan.id}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const recentPlans = plans.slice(0, 5)
  const stats = {
    totalPlans: plans.length,
    totalArea: plans.reduce((sum, p) => sum + p.input.length * p.input.breadth, 0),
    averageCost: plans.length > 0 ? plans.reduce((sum, p) => sum + p.costEstimate.totalCost, 0) / plans.length : 0,
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
            <p className="text-foreground/60 mt-1">Manage and view your architectural plans</p>
          </div>
          <Link href="/generator">
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4" />
              New Plan
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground/60">
                Total Plans
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{stats.totalPlans}</p>
              <p className="text-xs text-foreground/50 mt-1">Created plans</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground/60">
                Total Plot Area
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-secondary">
                {stats.totalArea.toFixed(0)}m²
              </p>
              <p className="text-xs text-foreground/50 mt-1">Across all plans</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground/60">
                Avg. Project Cost
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                ₹{(stats.averageCost / 100000).toFixed(1)}L
              </p>
              <p className="text-xs text-foreground/50 mt-1">Average estimate</p>
            </CardContent>
          </Card>
        </div>

        {/* Plans Tabs */}
        <Tabs defaultValue="recent" className="w-full">
          <TabsList>
            <TabsTrigger value="recent">Recent Plans</TabsTrigger>
            <TabsTrigger value="all">All Plans ({plans.length})</TabsTrigger>
          </TabsList>

          {/* Recent Plans Tab */}
          <TabsContent value="recent" className="space-y-4 mt-4">
            {recentPlans.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentPlans.map((plan) => (
                  <Card key={plan.id} className="hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                      <CardDescription>
                        {plan.input.plotType} • {plan.input.numFloors} floors
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-foreground/60">Plot Size</p>
                          <p className="font-semibold">
                            {(plan.input.length * plan.input.breadth).toFixed(0)}m²
                          </p>
                        </div>
                        <div>
                          <p className="text-foreground/60">Est. Cost</p>
                          <p className="font-semibold text-primary">
                            ₹{(plan.costEstimate.totalCost / 100000).toFixed(1)}L
                          </p>
                        </div>
                      </div>

                      <p className="text-xs text-foreground/50">
                        Created {new Date(plan.createdAt).toLocaleDateString()}
                      </p>

                      <div className="flex gap-2">
                        <Link href={`/plan/${plan.id}`} className="flex-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full gap-1"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDownload(plan)}
                          className="gap-1"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(plan.id)}
                          className="gap-1 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <div className="space-y-4">
                  <p className="text-lg font-semibold">No plans yet</p>
                  <p className="text-foreground/60">Create your first architectural plan</p>
                  <Link href="/generator">
                    <Button className="gap-2 bg-primary hover:bg-primary/90">
                      <Plus className="w-4 h-4" />
                      Create New Plan
                    </Button>
                  </Link>
                </div>
              </Card>
            )}
          </TabsContent>

          {/* All Plans Tab */}
          <TabsContent value="all" className="mt-4">
            {plans.length > 0 ? (
              <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-foreground/5">
                      <th className="text-left p-3 font-semibold">Plan Name</th>
                      <th className="text-left p-3 font-semibold">Type</th>
                      <th className="text-left p-3 font-semibold">Plot Size</th>
                      <th className="text-left p-3 font-semibold">Floors</th>
                      <th className="text-left p-3 font-semibold">Est. Cost</th>
                      <th className="text-left p-3 font-semibold">Created</th>
                      <th className="text-left p-3 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plans.map((plan, idx) => (
                      <tr
                        key={plan.id}
                        className={`border-b ${idx % 2 === 0 ? 'bg-foreground/2' : ''}`}
                      >
                        <td className="p-3 font-medium">{plan.name}</td>
                        <td className="p-3 capitalize">{plan.input.plotType}</td>
                        <td className="p-3">
                          {(plan.input.length * plan.input.breadth).toFixed(0)}m²
                        </td>
                        <td className="p-3">{plan.input.numFloors}</td>
                        <td className="p-3 text-primary font-semibold">
                          ₹{(plan.costEstimate.totalCost / 100000).toFixed(1)}L
                        </td>
                        <td className="p-3 text-sm text-foreground/60">
                          {new Date(plan.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <Link href={`/plan/${plan.id}`}>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 w-7 p-0"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 w-7 p-0"
                              onClick={() => handleDownload(plan)}
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                              onClick={() => handleDelete(plan.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <Card className="p-12 text-center">
                <div className="space-y-4">
                  <p className="text-lg font-semibold">No plans created yet</p>
                  <p className="text-foreground/60">Start by creating your first architectural plan</p>
                  <Link href="/generator">
                    <Button className="gap-2 bg-primary hover:bg-primary/90">
                      <Plus className="w-4 h-4" />
                      Create New Plan
                    </Button>
                  </Link>
                </div>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
