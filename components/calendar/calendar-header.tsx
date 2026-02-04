
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
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-6">
      <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm border border-slate-200">
          <CalendarIcon className="h-5 w-5 text-slate-700" />
        </div>
        {formatDateRange()}
      </h2>

      <div className="flex flex-wrap items-center gap-3">
        {/* View mode tabs */}
        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)}>
          <TabsList>
            <TabsTrigger value="day">День</TabsTrigger>
            <TabsTrigger value="week">Тиждень</TabsTrigger>
            <TabsTrigger value="month">Місяць</TabsTrigger>
          </TabsList>
        </Tabs>

        {userType === "tutor" && (
          <Button variant="outline" size="sm" onClick={onAddClick}>
            <Plus className="mr-2 h-4 w-4" />
            Додати
          </Button>
        )}

        <Button variant="outline" size="sm" onClick={goToToday}>
          Сьогодні
        </Button>

        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" onClick={previousPeriod}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextPeriod}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
