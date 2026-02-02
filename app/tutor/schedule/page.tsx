"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { FullCalendar } from "@/components/full-calendar"
import { useAuth } from "@/lib/auth-context"

export default function TutorSchedulePage() {
  const { user } = useAuth()

  return (
    <ProtectedRoute allowedRoles={["specialist"]}>
      <SidebarLayout userType="tutor">
        <div className="container mx-auto max-w-7xl space-y-6 p-6">
          <div>
            <h1 className="text-3xl font-bold">Розклад</h1>
            <p className="text-muted-foreground">Керуйте вашими заняттями та розкладом</p>
          </div>

          <FullCalendar userType="tutor" userId={user?.id || "specialist-1"} />
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
