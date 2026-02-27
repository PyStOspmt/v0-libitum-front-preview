"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { type BookingFormValues,bookingSchema } from "@/features/booking/schemas/booking.schema"
import { useToast } from "@/hooks/use-toast"

import { AlertTriangle, Clock, Home, Loader2,Video } from "lucide-react"
import { useForm } from "react-hook-form"

interface Specialist {
  id: string
  name: string
  priceOnline: number
  priceOffline: number
}

interface BookingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  specialist: Specialist
}

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00",
  "17:00", "18:00", "19:00", "20:00",
]

export function BookingModal({ open, onOpenChange, specialist }: BookingModalProps) {
  const { toast } = useToast()
  
  // Mock active trial count for demo
  const activeTrialCount = 1
  const hasReachedLimit = activeTrialCount >= 3

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      format: "online",
      phone: "",
      message: "",
    },
  })

  const { isSubmitting } = form.formState

  const format = form.watch("format")
  const date = form.watch("date")
  const time = form.watch("time")

  const onSubmit = async (values: BookingFormValues) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast({
      title: "Запит відправлено",
      description: "Спеціаліст отримає ваш запит та відповість протягом 3 годин",
    })

    onOpenChange(false)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Записатися до {specialist.name}</DialogTitle>
          <DialogDescription>Оберіть зручний час та формат заняття</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {hasReachedLimit && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Досягнуто ліміт активних пробних</AlertTitle>
              <AlertDescription>
                Ви вже маєте {activeTrialCount} активні пробні заняття. Щоб записатися до нового спеціаліста, скасуйте
                одну з попередніх заявок у вашому кабінеті.
              </AlertDescription>
            </Alert>
          )}

          {activeTrialCount > 0 && activeTrialCount < 3 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Активні пробні: {activeTrialCount} з 3</AlertTitle>
              <AlertDescription>Ви можете мати максимум 3 активні пробні заняття одночасно.</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Format Selection */}
              <FormField
                control={form.control}
                name="format"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Формат заняття</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={hasReachedLimit}
                        className="space-y-0"
                      >
                        <div className="flex items-center justify-between rounded-t-lg border p-4">
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="online" id="online" disabled={hasReachedLimit} />
                            <Label htmlFor="online" className="flex items-center gap-2 font-normal cursor-pointer">
                              <Video className="h-4 w-4" />
                              Онлайн заняття
                            </Label>
                          </div>
                          <span className="font-bold">{specialist.priceOnline} ₴/год</span>
                        </div>
                        <div className="flex items-center justify-between rounded-b-lg border-x border-b border-t-0 p-4">
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="offline" id="offline" disabled={hasReachedLimit} />
                            <Label htmlFor="offline" className="flex items-center gap-2 font-normal cursor-pointer">
                              <Home className="h-4 w-4" />
                              Офлайн заняття
                            </Label>
                          </div>
                          <span className="font-bold">{specialist.priceOffline} ₴/год</span>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date Selection */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Оберіть дату</FormLabel>
                    <div className="flex justify-center rounded-lg border p-4">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={hasReachedLimit || ((date) => date < new Date(new Date().setHours(0,0,0,0)))}
                        className="rounded-md"
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Time Selection */}
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Оберіть час</FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-4 gap-2">
                        {timeSlots.map((slot) => (
                          <Button
                            key={slot}
                            type="button"
                            variant={field.value === slot ? "default" : "outline"}
                            className="w-full"
                            onClick={() => field.onChange(slot)}
                            disabled={hasReachedLimit}
                          >
                            <Clock className="mr-1 h-3 w-3" />
                            {slot}
                          </Button>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Контактний телефон</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="+380..."
                        disabled={hasReachedLimit}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Message */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Повідомлення спеціалісту (необов&apos;язково)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Розкажіть про свої цілі та очікування від занять..."
                        disabled={hasReachedLimit}
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Summary */}
              {date && time && !hasReachedLimit && (
                <div className="rounded-lg border bg-muted/50 p-4">
                  <h4 className="mb-3 font-medium">Деталі запису</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Дата:</span>
                      <span className="font-medium">{date.toLocaleDateString("uk-UA")}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Час:</span>
                      <span className="font-medium">{time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Формат:</span>
                      <Badge variant={format === "online" ? "default" : "secondary"}>
                        {format === "online" ? "Онлайн" : "Офлайн"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between border-t pt-2">
                      <span className="text-muted-foreground">Вартість:</span>
                      <span className="text-lg font-bold">
                        {format === "online" ? specialist.priceOnline : specialist.priceOffline} ₴
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1" 
                  onClick={() => onOpenChange(false)}
                >
                  {hasReachedLimit ? "Закрити" : "Скасувати"}
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-[#00c5a6] hover:bg-[#00a389] text-white" 
                  disabled={hasReachedLimit || isSubmitting}
                >
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Відправити заявку"}
                </Button>
              </div>

              {!hasReachedLimit && (
                <p className="text-center text-xs text-muted-foreground">
                  Спеціаліст має 3 години для відповіді на ваш запит
                </p>
              )}
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
