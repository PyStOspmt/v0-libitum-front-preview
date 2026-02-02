"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { useRequestStore } from "@/lib/request-store"
import { RequestCard } from "@/components/request-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function TutorRequestsPage() {
  const { toast } = useToast()
  const { getRequestsBySpecialist, acceptRequest } = useRequestStore()

  const specialistRequests = getRequestsBySpecialist("specialist-1")
  const pendingRequests = specialistRequests.filter((req) => req.status === "pending")
  const activeRequests = specialistRequests.filter((req) =>
    ["accepted", "communicating", "trial_scheduled"].includes(req.status),
  )
  const completedRequests = specialistRequests.filter((req) =>
    ["trial_completed", "awaiting_payment", "paid"].includes(req.status),
  )

  const handleAcceptRequest = (requestId: string) => {
    acceptRequest(requestId)
    toast({
      title: "Запит прийнято",
      description: "Заняття додано до вашого розкладу",
    })
  }

  const handleRejectRequest = (requestId: string) => {
    toast({
      title: "Запит відхилено",
      description: "Клієнт отримає повідомлення",
      variant: "destructive",
    })
  }

  return (
    <ProtectedRoute allowedRoles={["specialist"]}>
      <SidebarLayout userType="tutor">
        <div className="container mx-auto max-w-7xl space-y-6 p-6">
          <div>
            <h1 className="text-3xl font-bold">Запити на заняття</h1>
            <p className="text-muted-foreground">Управління запитами від клієнтів</p>
          </div>

          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pending">Нові ({pendingRequests.length})</TabsTrigger>
              <TabsTrigger value="active">Активні ({activeRequests.length})</TabsTrigger>
              <TabsTrigger value="completed">Завершені ({completedRequests.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Нові запити</CardTitle>
                  <CardDescription>Відповідайте протягом 3 годин для збереження рейтингу</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pendingRequests.length > 0 ? (
                    pendingRequests.map((request) => (
                      <RequestCard
                        key={request.id}
                        request={request}
                        userType="specialist"
                        onAccept={handleAcceptRequest}
                        onReject={handleRejectRequest}
                      />
                    ))
                  ) : (
                    <p className="py-8 text-center text-muted-foreground">Немає нових запитів</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="active" className="space-y-4">
              <Card>
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
                        userType="specialist"
                        onAccept={handleAcceptRequest}
                        onReject={handleRejectRequest}
                      />
                    ))
                  ) : (
                    <p className="py-8 text-center text-muted-foreground">Немає активних запитів</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Завершені запити</CardTitle>
                  <CardDescription>Історія ваших запитів</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {completedRequests.length > 0 ? (
                    completedRequests.map((request) => (
                      <RequestCard key={request.id} request={request} userType="specialist" />
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
