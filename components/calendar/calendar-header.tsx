
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, ChevronLeft, ChevronRight, Plus } from "lucide-react"

type ViewMode = "month" | "week" | "day"

interface CalendarHeaderProps {
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
  currentDate: Date
  formatDateRange: () => string
  goToToday: () => void
  previousPeriod: () => void
  nextPeriod: () => void
  userType: "client" | "tutor"
  onAddClick: () => void
}

export function CalendarHeader({
  viewMode,
  setViewMode,
  currentDate,
  formatDateRange,
  goToToday,
  previousPeriod,
  nextPeriod,
  userType,
  onAddClick,
}: CalendarHeaderProps) {
  return (
    <div className="flex flex-col gap-2 sm:gap-3 md:flex-row md:items-center md:justify-between mb-2 px-2 sm:px-3">
      <h2 className="text-lg sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
        <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-white shadow-sm border border-slate-200 flex-shrink-0">
          <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-slate-700" />
        </div>
        <span className="truncate">{formatDateRange()}</span>
      </h2>

      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 md:gap-4">
        {/* View mode tabs */}
        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)}>
          <TabsList className="h-8 sm:h-9">
            <TabsTrigger value="day" className="text-xs sm:text-sm px-2 sm:px-3">День</TabsTrigger>
            <TabsTrigger value="week" className="text-xs sm:text-sm px-2 sm:px-3">Тиждень</TabsTrigger>
            <TabsTrigger value="month" className="text-xs sm:text-sm px-2 sm:px-3">Місяць</TabsTrigger>
          </TabsList>
        </Tabs>

        {userType === "tutor" && (
          <Button variant="outline" size="sm" onClick={onAddClick} className="h-8 sm:h-9 text-xs sm:text-sm">
            <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Додати</span>
            <span className="sm:hidden">+</span>
          </Button>
        )}

        <Button variant="outline" size="sm" onClick={goToToday} className="h-8 sm:h-9 text-xs sm:text-sm">
          Сьогодні
        </Button>

        <div className="flex items-center gap-1">
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-lg h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0" 
            onClick={previousPeriod}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-lg h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0" 
            onClick={nextPeriod}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
