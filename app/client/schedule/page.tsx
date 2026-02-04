"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { FullCalendar } from "@/components/full-calendar"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"

export default function ClientSchedulePage() {
  const { user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const children = [
    { id: "child-1", label: "Марія, 12 років" },
    { id: "child-2", label: "Іван, 9 років" },
  ]
  const initialChild = searchParams.get("child") || children[0].id
  const selectedChildId = children.find((child) => child.id === initialChild)?.id || children[0].id

  return (
    <ProtectedRoute allowedRoles={["client"]}>
      <SidebarLayout userType="client">
        <div className="container mx-auto max-w-7xl space-y-6 p-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Розклад</h1>
            <p className="text-slate-500">Ваші заплановані заняття</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {children.map((child) => (
                <Button
                  key={child.id}
                  variant={child.id === selectedChildId ? "default" : "outline"}
                  size="sm"
                  onClick={() => router.push(`/client/schedule?child=${child.id}`)}
                >
                  {child.label}
                </Button>
              ))}
            </div>
          </div>

          <FullCalendar userType="client" userId={selectedChildId || user?.id || "client-1"} />
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
