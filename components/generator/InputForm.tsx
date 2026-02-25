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
