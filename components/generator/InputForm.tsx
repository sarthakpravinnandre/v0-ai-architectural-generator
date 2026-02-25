'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { PlotInput } from '@/lib/types'
import { Zap } from 'lucide-react'

const formSchema = z.object({
  length: z.number().min(5).max(500),
  breadth: z.number().min(5).max(500),
  plotType: z.enum(['residential', 'commercial', 'mixed']),
  numFloors: z.number().min(1).max(10),
})

interface InputFormProps {
  onGenerate: (input: PlotInput) => void
  isLoading?: boolean
}

export function InputForm({ onGenerate, isLoading = false }: InputFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      length: 30,
      breadth: 40,
      plotType: 'residential',
      numFloors: 2,
    },
  })

  const length = form.watch('length')
  const breadth = form.watch('breadth')
  const plotType = form.watch('plotType')
  const numFloors = form.watch('numFloors')

  // Calculate visualization scale (fit within container)
  const maxDim = Math.max(length, breadth)
  const scale = 200 / maxDim
  const displayLength = length * scale
  const displayBreadth = breadth * scale
  const area = length * breadth
  const perFloorArea = area / numFloors

  function onSubmit(values: z.infer<typeof formSchema>) {
    onGenerate({
      length: values.length,
      breadth: values.breadth,
      plotType: values.plotType,
      numFloors: values.numFloors,
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Live Plot Preview */}
        <div className="bg-card/50 backdrop-blur border border-primary/20 rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Live Plot Preview</h3>
            <span className="text-sm text-primary font-medium">{area.toFixed(0)} m² total</span>
          </div>
          
          <div className="flex items-center justify-center bg-background/50 rounded-lg p-8 border border-border/50">
            <svg width={displayLength + 60} height={displayBreadth + 60} viewBox={`0 0 ${displayLength + 60} ${displayBreadth + 60}`} className="drop-shadow-lg">
              {/* Grid background */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#00d9ff" strokeWidth="0.5" opacity="0.1"/>
                </pattern>
              </defs>
              
              {/* Plot boundary */}
              <rect x="30" y="30" width={displayLength} height={displayBreadth} fill="url(#grid)" stroke="#00d9ff" strokeWidth="2" />
              
              {/* Corner markers */}
              <circle cx="30" cy="30" r="3" fill="#00ff88" />
              <circle cx={30 + displayLength} cy="30" r="3" fill="#00ff88" />
              <circle cx="30" cy={30 + displayBreadth} r="3" fill="#00ff88" />
              <circle cx={30 + displayLength} cy={30 + displayBreadth} r="3" fill="#00ff88" />
              
              {/* Dimension labels */}
              <text x={30 + displayLength / 2} y="15" textAnchor="middle" fontSize="12" fill="#00d9ff" fontWeight="bold">
                {length}m (Length)
              </text>
              <text x="8" y={30 + displayBreadth / 2} textAnchor="middle" fontSize="12" fill="#00d9ff" fontWeight="bold" transform={`rotate(-90 8 ${30 + displayBreadth / 2})`}>
                {breadth}m (Breadth)
              </text>
              
              {/* Center indicator */}
              <circle cx={30 + displayLength / 2} cy={30 + displayBreadth / 2} r="2" fill="#0099ff" opacity="0.6" />
            </svg>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background/50 border border-border/50 rounded-lg p-3">
              <p className="text-xs text-foreground/60 uppercase tracking-wide">North-South</p>
              <p className="text-xl font-bold text-primary">{length}m</p>
            </div>
            <div className="bg-background/50 border border-border/50 rounded-lg p-3">
              <p className="text-xs text-foreground/60 uppercase tracking-wide">East-West</p>
              <p className="text-xl font-bold text-primary">{breadth}m</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Plot Length */}
          <FormField
            control={form.control}
            name="length"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plot Length (meters)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="30"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    min={5}
                    max={500}
                  />
                </FormControl>
                <FormDescription>
                  Length of your plot (North-South)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Plot Breadth */}
          <FormField
            control={form.control}
            name="breadth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plot Breadth (meters)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="40"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    min={5}
                    max={500}
                  />
                </FormControl>
                <FormDescription>
                  Breadth of your plot (East-West)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Plot Type */}
        <FormField
          control={form.control}
          name="plotType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Building Type</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select building type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="mixed">Mixed Use</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the primary use of your building
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Number of Floors */}
        <FormField
          control={form.control}
          name="numFloors"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Floors</FormLabel>
              <Select value={String(field.value)} onValueChange={(val) => field.onChange(Number(val))}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select number of floors" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <SelectItem key={num} value={String(num)}>
                      {num} Floor{num > 1 ? 's' : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                How many floors in your building?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Info Box */}
        <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4 space-y-2">
          <p className="text-sm font-medium text-primary">Plot Statistics</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-foreground/60">Total Plot Area</p>
              <p className="font-semibold text-primary">
                {(form.getValues('length') * form.getValues('breadth')).toFixed(0)} m²
              </p>
            </div>
            <div>
              <p className="text-foreground/60">Per Floor Area</p>
              <p className="font-semibold text-primary">
                {(form.getValues('length') * form.getValues('breadth') / form.getValues('numFloors')).toFixed(0)} m²
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          className="w-full gap-2 bg-primary hover:bg-primary/90 text-white"
          disabled={isLoading}
        >
          <Zap className="w-4 h-4" />
          {isLoading ? 'Generating Plan...' : 'Generate Floor Plan'}
        </Button>
      </form>
    </Form>
  )
}
