"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { useRequestStore } from "@/lib/request-store"
import { RequestCard } from "@/components/request-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { useRouter, useSearchParams } from "next/navigation"

export default function ClientRequestsPage() {
  const { toast } = useToast()
  const { getRequestsByClient, cancelRequest } = useRequestStore()

  const router = useRouter()
  const searchParams = useSearchParams()
  const children = [
    { id: "child-1", label: "Марія, 12 років" },
    { id: "child-2", label: "Іван, 9 років" },
  ]
  const initialChild = searchParams.get("child") || children[0].id
  const selectedChildId = children.find((c) => c.id === initialChild)?.id || children[0].id

  const clientRequests = getRequestsByClient(selectedChildId)
  const pendingRequests = clientRequests.filter((req) => req.status === "pending")
  const activeRequests = clientRequests.filter((req) =>
    ["accepted", "communicating", "trial_scheduled"].includes(req.status),
  )
  const completedRequests = clientRequests.filter((req) => ["trial_completed", "paid"].includes(req.status))

  const handleCancelRequest = (requestId: string) => {
    cancelRequest(requestId)
    toast({
      title: "Запит скасовано",
      description: "Ви можете створити новий запит в будь-який час",
    })
  }

  return (
    <ProtectedRoute allowedRoles={["client"]}>
      <SidebarLayout userType="client">
        <div className="container mx-auto max-w-7xl space-y-8 p-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-slate-900">Мої запити</h1>
            <p className="text-muted-foreground">Управління запитами на заняття</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {children.map((child) => (
                <Button
                  key={child.id}
                  variant={child.id === selectedChildId ? "default" : "outline"}
                  size="sm"
                  onClick={() => router.push(`/client/requests?child=${child.id}`)}
                  className="rounded-full"
                >
                  {child.label}
                </Button>
              ))}
            </div>
          </div>

          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-3 rounded-full bg-slate-100/70 p-1">
              <TabsTrigger value="pending">Очікують ({pendingRequests.length})</TabsTrigger>
              <TabsTrigger value="active">Активні ({activeRequests.length})</TabsTrigger>
              <TabsTrigger value="completed">Завершені ({completedRequests.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-4">
              <Card className="border-slate-200/70 bg-white/80 shadow-sm">
                <CardHeader>
                  <CardTitle>Очікують відповіді</CardTitle>
                  <CardDescription>Спеціалісти мають 3 години для відповіді</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pendingRequests.length > 0 ? (
                    pendingRequests.map((request) => (
                      <RequestCard
                        key={request.id}
                        request={request}
                        userType="client"
                        onCancel={handleCancelRequest}
                      />
                    ))
                  ) : (
                    <p className="py-8 text-center text-muted-foreground">Немає запитів, що очікують</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="active" className="space-y-4">
              <Card className="border-slate-200/70 bg-white/80 shadow-sm">
                <CardHeader>
                  <CardTitle>Активні запити</CardTitle>
                  <CardDescription>Запити в процесі обробки</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeRequests.length > 0 ? (
                    activeRequests.map((request) => (
                      <RequestCard
                        key={request.id}
                        request={request}
                        userType="client"
                        onCancel={handleCancelRequest}
                      />
                    ))
                  ) : (
                    <p className="py-8 text-center text-muted-foreground">Немає активних запитів</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              <Card className="border-slate-200/70 bg-white/80 shadow-sm">
                <CardHeader>
                  <CardTitle>Завершені запити</CardTitle>
                  <CardDescription>Історія ваших запитів</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {completedRequests.length > 0 ? (
                    completedRequests.map((request) => (
                      <RequestCard key={request.id} request={request} userType="client" />
                    ))
                  ) : (
                    <p className="py-8 text-center text-muted-foreground">Немає завершених запитів</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
