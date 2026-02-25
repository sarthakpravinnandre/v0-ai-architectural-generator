'use client'

import { CostEstimate } from '@/lib/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'

interface CostEstimatorProps {
  costEstimate: CostEstimate
}

export function CostEstimator({ costEstimate }: CostEstimatorProps) {
  // Prepare data for pie chart
  const categoryTotals = costEstimate.items.reduce((acc, item) => {
    const existing = acc.find((x) => x.name === item.category)
    if (existing) {
      existing.value += item.total
    } else {
      acc.push({ name: item.category, value: item.total })
    }
    return acc
  }, [] as Array<{ name: string; value: number }>)

  // Premium dark theme colors - cyan, blue, green, gold, pink
  const COLORS = ['#00d9ff', '#0099ff', '#00ff88', '#ffd700', '#ff6b9d', '#00ff88']

  const pieData = categoryTotals.map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length],
  }))

  // Prepare detailed breakdown
  const detailData = costEstimate.items.map((item) => ({
    ...item,
    totalDisplay: (item.total / 100000).toFixed(1), // Display in lakhs
  }))

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground/60">
              Material Cost
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">
              ₹{(costEstimate.materialCost / 100000).toFixed(1)}L
            </p>
            <p className="text-xs text-foreground/50 mt-1">
              {((costEstimate.materialCost / costEstimate.totalCost) * 100).toFixed(0)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground/60">
              Labor Cost
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-secondary">
              ₹{(costEstimate.laborCost / 100000).toFixed(1)}L
            </p>
            <p className="text-xs text-foreground/50 mt-1">
              {((costEstimate.laborCost / costEstimate.totalCost) * 100).toFixed(0)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground/60">
              Contingency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-orange-600">
              ₹{(costEstimate.contingency / 100000).toFixed(1)}L
            </p>
            <p className="text-xs text-foreground/50 mt-1">10% buffer</p>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-primary">
              Total Estimated Cost
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">
              ₹{(costEstimate.totalCost / 100000).toFixed(1)}L
            </p>
            <p className="text-xs text-foreground/50 mt-1">
              ₹{costEstimate.costPerSqft.toFixed(0)}/sqft
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Cost Distribution by Category</CardTitle>
            <CardDescription>Breakdown of total project cost</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `₹${(value as number / 100000).toFixed(1)}L`}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Cost by Category</CardTitle>
            <CardDescription>Detailed breakdown of expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {categoryTotals.map((category, index) => (
                <div key={category.name} className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">{category.name}</span>
                    <span className="text-foreground/60">
                      ₹{(category.value / 100000).toFixed(1)}L
                    </span>
                  </div>
                  <div className="w-full bg-foreground/10 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${(category.value / costEstimate.totalCost) * 100}%`,
                        backgroundColor: COLORS[index % COLORS.length],
                      }}
                    />
                  </div>
                  <p className="text-xs text-foreground/50">
                    {((category.value / costEstimate.totalCost) * 100).toFixed(1)}% of total
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Cost Breakdown</CardTitle>
          <CardDescription>Line-by-line itemization of all costs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-2 font-semibold text-foreground/70">
                    Item
                  </th>
                  <th className="text-right py-2 px-2 font-semibold text-foreground/70">
                    Qty
                  </th>
                  <th className="text-right py-2 px-2 font-semibold text-foreground/70">
                    Unit
                  </th>
                  <th className="text-right py-2 px-2 font-semibold text-foreground/70">
                    Rate
                  </th>
                  <th className="text-right py-2 px-2 font-semibold text-foreground/70">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {costEstimate.items.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-border/50 hover:bg-foreground/5"
                  >
                    <td className="py-2 px-2">
                      <p className="font-medium">{item.description}</p>
                      <p className="text-xs text-foreground/50">{item.category}</p>
                    </td>
                    <td className="py-2 px-2 text-right">
                      {item.quantity.toFixed(0)}
                    </td>
                    <td className="py-2 px-2 text-right text-foreground/60">
                      {item.unit}
                    </td>
                    <td className="py-2 px-2 text-right">₹{item.rate.toFixed(0)}</td>
                    <td className="py-2 px-2 text-right font-semibold">
                      ₹{(item.total / 100000).toFixed(1)}L
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Row */}
          <div className="mt-4 pt-4 border-t border-border space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">Material Cost:</span>
              <span className="font-semibold">
                ₹{(costEstimate.materialCost / 100000).toFixed(1)}L
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">Labor Cost:</span>
              <span className="font-semibold">
                ₹{(costEstimate.laborCost / 100000).toFixed(1)}L
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">Contingency (10%):</span>
              <span className="font-semibold">
                ₹{(costEstimate.contingency / 100000).toFixed(1)}L
              </span>
            </div>
            <div className="flex justify-between text-base font-bold pt-2 border-t border-border">
              <span>Total Estimated Cost:</span>
              <span className="text-primary">
                ₹{(costEstimate.totalCost / 100000).toFixed(1)}L
              </span>
            </div>
            <div className="flex justify-between text-sm pt-2">
              <span className="text-foreground/60">Cost per sq.ft:</span>
              <span className="font-semibold">
                ₹{costEstimate.costPerSqft.toFixed(0)}/sqft
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
