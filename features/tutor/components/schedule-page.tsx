"use client"

import { UserRoles } from "@/graphql/generated/graphql"

import { FullCalendar } from "@/components/full-calendar"
import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"

import { useAuthContext } from "@/features/auth/context/auth-context"

export function TutorSchedulePage() {
    const { user } = useAuthContext()

    return (
        <ProtectedRoute allowedRoles={[UserRoles.Specialist]}>
            <SidebarLayout userType="tutor">
                <div className="container mx-auto max-w-7xl px-1 py-4 sm:p-6">
                    <div className="mb-4 sm:mb-6 px-3 sm:px-0">
                        <h1 className="text-3xl font-bold text-slate-900">Розклад</h1>
                        <p className="text-muted-foreground">Управляйте своїм розкладом та заняттями</p>
                    </div>
                    <div className="bg-white rounded-[20px] sm:rounded-[24px] border border-slate-200/80 p-2 sm:p-6 shadow-[0_15px_35px_rgba(0,0,0,0.08)] overflow-hidden">
                        <FullCalendar userType="tutor" userId={user?.id || "tutor-1"} />
                    </div>
                </div>
            </SidebarLayout>
        </ProtectedRoute>
    )
}
