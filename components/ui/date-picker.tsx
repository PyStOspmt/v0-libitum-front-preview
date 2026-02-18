"use client"

import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { uk } from "date-fns/locale"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface DatePickerProps {
  value?: string
  onChange?: (date: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function DatePicker({ value, onChange, placeholder, className, disabled }: DatePickerProps) {
  const [open, setOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const selectedDate = value ? new Date(value) : null

  const handleSelect = (day: Date | undefined) => {
    if (!day) return
    
    const formattedDate = format(day, "yyyy-MM-dd")
    onChange?.(formattedDate)
    setOpen(false)
  }

  const handlePreviousMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
  }

  const handleToday = () => {
    const today = new Date()
    setCurrentMonth(today)
    const formattedDate = format(today, "yyyy-MM-dd")
    onChange?.(formattedDate)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            "h-10 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 transition-colors",
            "focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
          disabled={disabled}
        >
          {selectedDate ? (
            <div className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-slate-400" />
              <span className="text-slate-900">{format(selectedDate, "dd MMMM yyyy", { locale: uk })}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-slate-400" />
              <span className="text-slate-500">{placeholder || "Оберіть дату"}</span>
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" align="center">
        <div className="bg-white rounded-xl border border-slate-200 shadow-xl">
          <div className="flex items-center justify-between p-4 border-b border-slate-100">
            <div className="text-sm font-semibold text-slate-900">
              {format(currentMonth, "MMMM yyyy", { locale: uk })}
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePreviousMonth}
                className="h-8 w-8 p-0 hover:bg-slate-100 rounded-lg"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNextMonth}
                className="h-8 w-8 p-0 hover:bg-slate-100 rounded-lg"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="p-3">
            <Calendar
              mode="single"
              selected={selectedDate || undefined}
              onSelect={handleSelect}
              month={currentMonth}
              onMonthChange={setCurrentMonth}
              locale={uk}
              className="rounded-lg"
              classNames={{
                months: "flex flex-col sm:flex-row gap-2",
                month: "p-2",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-sm font-medium hidden",
                nav: "hidden",
                nav_button: "hidden",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell: "text-muted-foreground font-medium text-[0.875rem] h-8",
                cell: "h-8 w-8 p-0 text-center text-sm relative",
                day: "h-8 w-8 p-0 text-sm rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors",
                day_selected: "bg-emerald-600 text-white hover:bg-emerald-700 focus:bg-emerald-700",
                day_today: "bg-slate-100 text-slate-900 font-semibold",
                day_outside: "text-slate-400",
                day_disabled: "text-slate-300 opacity-50 cursor-not-allowed",
                day_range_middle: "bg-slate-200",
                day_range_start: "bg-emerald-600 text-white",
                day_range_end: "bg-emerald-600 text-white",
              }}
            />
          </div>
          <div className="p-3 border-t border-slate-100 flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={handleToday}
              className="h-8 px-3 text-xs rounded-lg border-slate-200 hover:bg-slate-50"
            >
              Сьогодні
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
