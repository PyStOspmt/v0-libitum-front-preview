"use client"

import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Clock } from "lucide-react"

interface TimePickerProps {
  value?: string
  onChange?: (time: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function TimePicker({ value, onChange, placeholder, className, disabled }: TimePickerProps) {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState(value || "")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    
    // Validate time format (HH:MM)
    const timeRegex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/
    if (timeRegex.test(newValue)) {
      onChange?.(newValue)
    }
  }

  const handleQuickSelect = (time: string) => {
    setInputValue(time)
    onChange?.(time)
    setOpen(false)
  }

  const morningTimes = ["09:00", "10:00", "11:00", "12:00"]
  const afternoonTimes = ["14:00", "15:00", "16:00", "17:00", "18:00", "19:00"]
  const eveningTimes = ["20:00", "21:00"]

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
          {value ? (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-emerald-600" />
              <span className="text-slate-900">{value}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-slate-400" />
              <span className="text-slate-500">{placeholder || "Оберіть час"}</span>
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" align="center">
        <div className="bg-white rounded-xl border border-slate-200 shadow-xl">
          {/* Manual Input */}
          <div className="p-4 border-b border-slate-100">
            <div className="text-sm font-semibold text-slate-900 mb-3">Введіть час</div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="00:00"
                className="flex-1 h-10 px-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 outline-none text-slate-900 placeholder-slate-400 transition-colors"
                maxLength={5}
              />
            </div>
            <p className="text-xs text-slate-500 mt-2">Формат: години:хвилини (наприклад: 14:30)</p>
          </div>

          {/* Quick Time Selection */}
          <div className="p-4">
            <div className="text-sm font-semibold text-slate-900 mb-3">Швидкий вибір</div>
            <div className="space-y-3">
              <div>
                <div className="text-xs font-medium text-slate-500 mb-2">Ранок</div>
                <div className="grid grid-cols-4 gap-2">
                  {morningTimes.map((time) => (
                    <Button
                      key={time}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickSelect(time)}
                      className={cn(
                        "h-8 px-2 text-xs rounded-lg border-slate-200 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 transition-colors",
                        value === time && "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700"
                      )}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-slate-500 mb-2">День</div>
                <div className="grid grid-cols-6 gap-2">
                  {afternoonTimes.map((time) => (
                    <Button
                      key={time}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickSelect(time)}
                      className={cn(
                        "h-8 px-2 text-xs rounded-lg border-slate-200 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 transition-colors",
                        value === time && "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700"
                      )}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-slate-500 mb-2">Вечір</div>
                <div className="grid grid-cols-3 gap-2">
                  {eveningTimes.map((time) => (
                    <Button
                      key={time}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickSelect(time)}
                      className={cn(
                        "h-8 px-2 text-xs rounded-lg border-slate-200 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 transition-colors",
                        value === time && "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700"
                      )}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
