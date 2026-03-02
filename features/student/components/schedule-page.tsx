"use client"

import { CalendarView } from "@/components/calendar-view"
import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"

import { useAuth } from "@/lib/auth-context"
import { useLessonStore } from "@/lib/lesson-store"

export function StudentSchedulePage() {
    const { user } = useAuth()
    const { getLessonsByClient } = useLessonStore()

    const studentLessons = getLessonsByClient(user?.id || "student-child-1")

    return (
        <ProtectedRoute allowedRoles={["client"]}>
            <SidebarLayout userType="client">
                <div className="container mx-auto max-w-7xl space-y-6 p-6">
                    <div>
                        <h1 className="text-3xl font-bold">Мій розклад</h1>
                        <p className="text-muted-foreground">Перегляд запланованих занять</p>
                    </div>

                    <CalendarView sessions={studentLessons as any} userType="client" />
                </div>
            </SidebarLayout>
        </ProtectedRoute>
    )
}
