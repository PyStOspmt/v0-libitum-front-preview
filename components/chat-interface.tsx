"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useChatStore } from "@/lib/chat-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, ArrowLeft } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { uk } from "date-fns/locale"

interface ChatInterfaceProps {
  conversationId: string
  currentUserId: string
  currentUserRole: "client" | "specialist"
  onBack: () => void
}

export function ChatInterface({ conversationId, currentUserId, currentUserRole, onBack }: ChatInterfaceProps) {
  const [message, setMessage] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)
  const { conversations, getConversationMessages, sendMessage, markAsRead } = useChatStore()

  const conversation = conversations.find((c) => c.id === conversationId)
  const messages = getConversationMessages(conversationId)

  const otherUserName = currentUserRole === "client" ? conversation?.specialistName : conversation?.clientName

  useEffect(() => {
    markAsRead(conversationId, currentUserId)
  }, [conversationId, currentUserId, markAsRead])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    if (!message.trim() || !conversation) return

    const senderName = currentUserRole === "client" ? conversation.clientName : conversation.specialistName

    sendMessage(conversationId, currentUserId, senderName, currentUserRole, message)
    setMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!conversation) return null

  return (
    <Card className="flex h-[calc(100vh-12rem)] flex-col">
      <CardHeader className="border-b">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Avatar>
            <AvatarFallback>{otherUserName?.charAt(0)}</AvatarFallback>
          </Avatar>
          <CardTitle>{otherUserName}</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4 p-0">
        <ScrollArea ref={scrollRef} className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((msg) => {
              const isOwn = msg.senderId === currentUserId
              return (
                <div key={msg.id} className={`flex gap-3 ${isOwn ? "flex-row-reverse" : ""}`}>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">{msg.senderName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className={`flex max-w-[70%] flex-col gap-1 ${isOwn ? "items-end" : ""}`}>
                    <div
                      className={`rounded-lg px-4 py-2 ${isOwn ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                    >
                      <p className="text-sm">{msg.content}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(msg.timestamp, { addSuffix: true, locale: uk })}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>

        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Напишіть повідомлення..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button onClick={handleSend} disabled={!message.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
