"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useChatStore } from "@/lib/chat-store"
import { ChatInterface } from "@/components/chat-interface"
import { useAuth } from "@/lib/auth-context"
import { formatDistanceToNow } from "date-fns"
import { uk } from "date-fns/locale"
import { MessageSquare } from "lucide-react"

export default function TutorChatsPage() {
  const { user } = useAuth()
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null)
  const { getUserConversations } = useChatStore()

  const conversations = user ? getUserConversations(user.email, "specialist") : []

  if (activeConversationId && user) {
    return (
      <ProtectedRoute allowedRoles={["specialist"]}>
        <SidebarLayout userType="tutor">
          <div className="container mx-auto max-w-7xl p-6">
            <ChatInterface
              conversationId={activeConversationId}
              currentUserId={user.email}
              currentUserRole="specialist"
              onBack={() => setActiveConversationId(null)}
            />
          </div>
        </SidebarLayout>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute allowedRoles={["specialist"]}>
      <SidebarLayout userType="tutor">
        <div className="container mx-auto max-w-7xl space-y-6 p-6">
          <div>
            <h1 className="text-3xl font-bold">Чати</h1>
            <p className="text-muted-foreground">Спілкування з учнями</p>
          </div>

          {conversations.length === 0 ? (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <CardTitle>Немає активних чатів</CardTitle>
                    <CardDescription>Чати з'являться після прийняття запитів</CardDescription>
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
                      <AvatarFallback>{conversation.clientName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{conversation.clientName}</h3>
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
