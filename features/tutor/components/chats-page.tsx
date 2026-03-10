"use client"

import { UserRoles } from "@/graphql/generated/graphql"
import { formatDistanceToNow } from "date-fns"
import { uk } from "date-fns/locale"
import { MessageSquare } from "lucide-react"
import { useState } from "react"

import { ChatInterface } from "@/components/chat-interface"
import { ProtectedRoute } from "@/components/protected-route"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { useAuthContext } from "@/features/auth/context/auth-context"

import { useChatStore } from "@/lib/chat-store"

export function TutorChatsPage() {
    const { user } = useAuthContext()
    const [activeConversationId, setActiveConversationId] = useState<string | null>(null)
    const { getUserConversations } = useChatStore()

    const conversations = user ? getUserConversations(user.email, "specialist") : []

    if (activeConversationId && user) {
        return (
            <ProtectedRoute allowedRoles={[UserRoles.Specialist]}>
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
        <ProtectedRoute allowedRoles={[UserRoles.Specialist]}>
            <SidebarLayout userType="tutor">
                <div className="container mx-auto max-w-7xl space-y-6 p-6">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Чати</h1>
                        <p className="text-slate-500">Спілкування з учнями</p>
                    </div>

                    {conversations.length === 0 ? (
                        <Card className="rounded-2xl border-dashed border-slate-200 bg-slate-50/50 shadow-none">
                            <CardHeader>
                                <div className="flex flex-col items-center gap-3 text-center py-8">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100">
                                        <MessageSquare className="h-8 w-8 text-slate-400" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg font-bold text-slate-900">Немає активних чатів</CardTitle>
                                        <CardDescription className="text-slate-500">
                                            Чати з'являться автоматично після прийняття запитів
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    ) : (
                        <div className="grid gap-4">
                            {conversations.map((conversation) => (
                                <Card
                                    key={conversation.id}
                                    className="cursor-pointer transition-all hover:bg-slate-50/50 hover:shadow-md rounded-2xl border-slate-200 shadow-sm group"
                                    onClick={() => setActiveConversationId(conversation.id)}
                                >
                                    <CardContent className="flex items-center gap-4 p-5">
                                        <Avatar className="h-12 w-12 border border-slate-100">
                                            <AvatarFallback className="bg-slate-100 text-slate-600 font-bold">
                                                {conversation.clientName.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <h3 className="font-bold text-slate-900 text-base">
                                                    {conversation.clientName}
                                                </h3>
                                                {conversation.lastMessageTime && (
                                                    <span className="text-xs font-medium text-slate-400">
                                                        {formatDistanceToNow(conversation.lastMessageTime, {
                                                            addSuffix: true,
                                                            locale: uk,
                                                        })}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-slate-500 truncate group-hover:text-slate-700 transition-colors">
                                                {conversation.lastMessage}
                                            </p>
                                        </div>
                                        {conversation.unreadCount > 0 && (
                                            <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-2 min-w-[1.25rem] h-5 flex items-center justify-center">
                                                {conversation.unreadCount}
                                            </Badge>
                                        )}
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
