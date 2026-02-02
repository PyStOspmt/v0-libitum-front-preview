"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useChatStore } from "@/lib/chat-store"
import { ChatInterface } from "@/components/chat-interface"
import { useAuth } from "@/lib/auth-context"
import { formatDistanceToNow } from "date-fns"
import { uk } from "date-fns/locale"
import { MessageSquare } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

export default function ClientChatsPage() {
  const { user } = useAuth()
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null)
  const { getUserConversations } = useChatStore()
  const router = useRouter()
  const searchParams = useSearchParams()
  const children = [
    { id: "child-1", label: "Марія, 12 років" },
    { id: "child-2", label: "Іван, 9 років" },
  ]
  const initialChild = searchParams.get("child") || children[0].id
  const selectedChildId = children.find((c) => c.id === initialChild)?.id || children[0].id

  const conversations = user ? getUserConversations(user.email, "client") : []

  if (activeConversationId && user) {
    return (
      <ProtectedRoute allowedRoles={["client"]}>
        <SidebarLayout userType="client">
          <div className="container mx-auto max-w-7xl p-6">
            <div className="mb-4 flex flex-wrap gap-2">
              {children.map((child) => (
                <Button
                  key={child.id}
                  variant={child.id === selectedChildId ? "default" : "outline"}
                  size="sm"
                  onClick={() => router.push(`/client/chats?child=${child.id}`)}
                >
                  {child.label}
                </Button>
              ))}
            </div>
            <ChatInterface
              conversationId={activeConversationId}
              currentUserId={user.email}
              currentUserRole="client"
              onBack={() => setActiveConversationId(null)}
            />
          </div>
        </SidebarLayout>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute allowedRoles={["client"]}>
      <SidebarLayout userType="client">
        <div className="container mx-auto max-w-7xl space-y-6 p-6">
          <div>
            <h1 className="text-3xl font-bold">Чати</h1>
            <p className="text-muted-foreground">Спілкування зі спеціалістами</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {children.map((child) => (
                <Button
                  key={child.id}
                  variant={child.id === selectedChildId ? "default" : "outline"}
                  size="sm"
                  onClick={() => router.push(`/client/chats?child=${child.id}`)}
                >
                  {child.label}
                </Button>
              ))}
            </div>
          </div>

          {conversations.length === 0 ? (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <CardTitle>Немає активних чатів</CardTitle>
                    <CardDescription>Чати з'являться після бронювання занять</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ) : (
            <div className="grid gap-4">
              {conversations.map((conversation) => (
                <Card
                  key={conversation.id}
                  className="cursor-pointer transition-colors hover:bg-muted/50"
                  onClick={() => setActiveConversationId(conversation.id)}
                >
                  <CardContent className="flex items-center gap-4 p-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>{conversation.specialistName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{conversation.specialistName}</h3>
                        {conversation.lastMessageTime && (
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(conversation.lastMessageTime, { addSuffix: true, locale: uk })}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{conversation.lastMessage}</p>
                    </div>
                    {conversation.unreadCount > 0 && <Badge variant="default">{conversation.unreadCount}</Badge>}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
