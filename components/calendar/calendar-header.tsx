import { CalendarIcon, ChevronLeft, ChevronRight, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6 px-2 sm:px-0 font-sans">
            <h2 className="text-[20px] sm:text-[24px] font-bold text-[#121117] flex items-center gap-3">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-[12px] bg-[#f0f3f3] flex-shrink-0">
                    <CalendarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-[#121117]" />
                </div>
                <span className="truncate tracking-tight">{formatDateRange()}</span>
            </h2>

            <div className="flex flex-wrap items-center gap-3">
                {/* View mode tabs */}
                <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)}>
                    <TabsList className="h-[40px] sm:h-[48px] rounded-[8px] bg-[#f0f3f3] p-1">
                        <TabsTrigger
                            value="day"
                            className="text-[14px] sm:text-[15px] font-[600] px-4 rounded-[6px] data-[state=active]:bg-white data-[state=active]:text-[#121117] data-[state=active]:shadow-sm"
                        >
                            День
                        </TabsTrigger>
                        <TabsTrigger
                            value="week"
                            className="text-[14px] sm:text-[15px] font-[600] px-4 rounded-[6px] data-[state=active]:bg-white data-[state=active]:text-[#121117] data-[state=active]:shadow-sm"
                        >
                            Тиждень
                        </TabsTrigger>
                        <TabsTrigger
                            value="month"
                            className="text-[14px] sm:text-[15px] font-[600] px-4 rounded-[6px] data-[state=active]:bg-white data-[state=active]:text-[#121117] data-[state=active]:shadow-sm"
                        >
                            Місяць
                        </TabsTrigger>
                    </TabsList>
                </Tabs>

                {userType === "tutor" && (
                    <button
                        onClick={onAddClick}
                        className="h-[40px] sm:h-[48px] px-4 sm:px-6 rounded-[8px] border-2 border-transparent bg-[#121117] text-white hover:bg-[#121117]/90 flex items-center justify-center font-[600] text-[14px] sm:text-[16px] transition-colors duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                    >
                        <Plus className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                        <span className="hidden sm:inline">Додати</span>
                        <span className="sm:hidden">Додати</span>
                    </button>
                )}

                <button
                    onClick={goToToday}
                    className="h-[40px] sm:h-[48px] px-4 sm:px-6 rounded-[8px] border-2 border-[#121117] bg-white text-[#121117] hover:bg-gray-50 flex items-center justify-center font-[600] text-[14px] sm:text-[16px] transition-colors duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                >
                    Сьогодні
                </button>

                <div className="flex items-center gap-2">
                    <button
                        className="h-[40px] w-[40px] sm:h-[48px] sm:w-[48px] rounded-[8px] border-2 border-[#121117] bg-white text-[#121117] hover:bg-gray-50 flex flex-shrink-0 items-center justify-center transition-colors duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                        onClick={previousPeriod}
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                        className="h-[40px] w-[40px] sm:h-[48px] sm:w-[48px] rounded-[8px] border-2 border-[#121117] bg-white text-[#121117] hover:bg-gray-50 flex flex-shrink-0 items-center justify-center transition-colors duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                        onClick={nextPeriod}
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}
