"use client"

import { create } from "zustand"

export interface Message {
  id: string
  conversationId: string
  senderId: string
  senderName: string
  senderRole: "client" | "specialist"
  content: string
  timestamp: Date
  read: boolean
}

export interface Conversation {
  id: string
  clientId: string
  clientName: string
  specialistId: string
  specialistName: string
  lastMessage?: string
  lastMessageTime?: Date
  unreadCount: number
}

interface ChatStore {
  conversations: Conversation[]
  messages: Message[]
  activeConversationId: string | null
  setActiveConversation: (id: string | null) => void
  sendMessage: (
    conversationId: string,
    senderId: string,
    senderName: string,
    senderRole: "client" | "specialist",
    content: string,
  ) => void
  markAsRead: (conversationId: string, userId: string) => void
  getConversationMessages: (conversationId: string) => Message[]
  getUserConversations: (userId: string, userRole: "client" | "specialist") => Conversation[]
}

// Mock data
const mockConversations: Conversation[] = [
  {
    id: "conv-1",
    clientId: "client@test.com",
    clientName: "Іван Петренко",
    specialistId: "tutor@test.com",
    specialistName: "Марія Коваленко",
    lastMessage: "Дякую за урок!",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 30),
    unreadCount: 0,
  },
  {
    id: "conv-2",
    clientId: "client@test.com",
    clientName: "Іван Петренко",
    specialistId: "spec-2",
    specialistName: "Олена Шевченко",
    lastMessage: "Коли наступне заняття?",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2),
    unreadCount: 1,
  },
]

const mockMessages: Message[] = [
  {
    id: "msg-1",
    conversationId: "conv-1",
    senderId: "tutor@test.com",
    senderName: "Марія Коваленко",
    senderRole: "specialist",
    content: "Доброго дня! Готові до заняття?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    read: true,
  },
  {
    id: "msg-2",
    conversationId: "conv-1",
    senderId: "client@test.com",
    senderName: "Іван Петренко",
    senderRole: "client",
    content: "Так, готовий!",
    timestamp: new Date(Date.now() - 1000 * 60 * 50),
    read: true,
  },
  {
    id: "msg-3",
    conversationId: "conv-1",
    senderId: "client@test.com",
    senderName: "Іван Петренко",
    senderRole: "client",
    content: "Дякую за урок!",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: true,
  },
  {
    id: "msg-4",
    conversationId: "conv-2",
    senderId: "spec-2",
    senderName: "Олена Шевченко",
    senderRole: "specialist",
    content: "Привіт! Як справи з домашнім завданням?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
    read: true,
  },
  {
    id: "msg-5",
    conversationId: "conv-2",
    senderId: "client@test.com",
    senderName: "Іван Петренко",
    senderRole: "client",
    content: "Коли наступне заняття?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: false,
  },
]

export const useChatStore = create<ChatStore>((set, get) => ({
  conversations: mockConversations,
  messages: mockMessages,
  activeConversationId: null,

  setActiveConversation: (id) => set({ activeConversationId: id }),

  sendMessage: (conversationId, senderId, senderName, senderRole, content) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId,
      senderName,
      senderRole,
      content,
      timestamp: new Date(),
      read: false,
    }

    set((state) => ({
      messages: [...state.messages, newMessage],
      conversations: state.conversations.map((conv) =>
        conv.id === conversationId
          ? {
              ...conv,
              lastMessage: content,
              lastMessageTime: new Date(),
              unreadCount: senderId === conv.clientId ? conv.unreadCount : conv.unreadCount + 1,
            }
          : conv,
      ),
    }))
  },

  markAsRead: (conversationId, userId) => {
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.conversationId === conversationId && msg.senderId !== userId ? { ...msg, read: true } : msg,
      ),
      conversations: state.conversations.map((conv) =>
        conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv,
      ),
    }))
  },

  getConversationMessages: (conversationId) => {
    return get().messages.filter((msg) => msg.conversationId === conversationId)
  },

  getUserConversations: (userId, userRole) => {
    return get().conversations.filter((conv) =>
      userRole === "client" ? conv.clientId === userId : conv.specialistId === userId,
    )
  },
}))
