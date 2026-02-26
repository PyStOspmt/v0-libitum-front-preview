"use client"

import { useDictionaryStore } from "@/store/dictionary.store"

import { create } from "zustand"

export type RequestStatus =
  | "pending" // Waiting for specialist response (3 hours)
  | "accepted" // Specialist accepted, needs to update communication status (2 hours)
  | "communicating" // Specialist is communicating with client
  | "trial_scheduled" // Trial lesson scheduled
  | "trial_completed" // Trial completed, waiting for results (2 hours)
  | "awaiting_payment" // Client continues, specialist must pay (24 hours)
  | "paid" // Specialist paid, lead successful
  | "rejected" // Specialist rejected
  | "expired" // Deadline passed
  | "cancelled" // Client cancelled

export type CommunicationStatus =
  | "agreed_on_trial" // Agreed on trial date/time
  | "client_not_responding" // Client not responding (available after 1 hour)
  | "client_cancelled" // Client cancelled
  | "negotiating" // Still negotiating date/time

export type TrialResult =
  | "client_continues" // Client wants to continue
  | "client_declined" // Client doesn't want to continue
  | "client_thinking" // Client is thinking / wants more trials
  | "client_not_responding" // Client not responding

export type LeadType = "public" | "private"

export interface BookingRequest {
  id: string
  type: LeadType // public (goes to exchange) or private (direct to specialist)
  clientId: string
  clientName: string
  clientPhone?: string
  clientTelegram?: string
  specialistId: string | null // null for public leads
  specialistName?: string
  subject: string
  level?: string
  date: string
  time: string
  format: "online" | "offline" | "in-person"
  message?: string
  location?: string
  status: RequestStatus
  rejectReason?: string
  communicationStatus?: CommunicationStatus
  trialResult?: TrialResult
  createdAt: string
  acceptedAt?: string
  responseDeadline: string
  communicationDeadline?: string
  trialResultDeadline?: string
  paymentDeadline?: string
  basePrice?: number // Starting price for the lead (e.g., 200 UAH)
  currentPrice?: number // Current price after auction降价
  minPriceLimit?: number // Minimum price threshold (e.g., 50 UAH)
  stepValue?: number // Price reduction step for the lead
  lastPriceUpdate?: string // Last time price was reduced
}

export type StudentType = "platform" | "own"

export interface Student {
  id: string
  tutorId: string
  name: string
  grade?: string
  age?: number
  phone?: string
  telegram?: string
  type: StudentType // platform (from lead) or own (added manually)
  subject: string
  addedAt: string
  status: "active" | "paused" | "archived"
  leadId?: string // Reference to original lead if platform student
}

interface RequestStore {
  requests: BookingRequest[]
  students: Student[]
  addRequest: (request: Omit<BookingRequest, "id" | "createdAt" | "status" | "responseDeadline">) => void
  addOwnStudent: (student: Omit<Student, "id" | "addedAt" | "type">) => void
  acceptRequest: (requestId: string) => void
  rejectRequest: (requestId: string, reason?: string) => void
  cancelRequest: (requestId: string) => void
  updateCommunicationStatus: (
    requestId: string,
    status: CommunicationStatus,
    trialDate?: string,
    trialTime?: string,
  ) => void
  updateTrialResult: (requestId: string, result: TrialResult) => void
  markAsPaid: (requestId: string) => void
  expireRequest: (requestId: string) => void
  getPublicLeads: () => BookingRequest[]
  takePublicLead: (requestId: string, specialistId: string) => void
  reduceLeadPrice: (requestId: string) => void
  autoReducePublicLeads: () => void
  getRequestsBySpecialist: (specialistId: string) => BookingRequest[]
  getRequestsByClient: (clientId: string) => BookingRequest[]
  getActiveTrialCount: (clientId: string) => number
  getStudentsByTutor: (tutorId: string) => Student[]
  updateStudentStatus: (studentId: string, status: "active" | "paused" | "archived") => void
}

// Mock initial data
const mockRequests: BookingRequest[] = [
  {
    id: "1",
    type: "private",
    clientId: "client-1",
    clientName: "Марія Коваленко",
    clientPhone: "+380501234567",
    clientTelegram: "@maria_k",
    specialistId: "specialist-1",
    specialistName: "Олена Іваненко",
    subject: "Англійська мова",
    level: "B1 (Intermediate)",
    date: "2025-01-22",
    time: "14:00",
    format: "online",
    message: "Хочу підготуватися до IELTS",
    status: "pending",
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    responseDeadline: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    type: "private",
    clientId: "client-1",
    clientName: "Марія Коваленко",
    clientPhone: "+380501234567",
    clientTelegram: "@maria_k",
    specialistId: "specialist-2",
    specialistName: "Ігор Петренко",
    subject: "Психологія",
    level: "Середній клас",
    date: "2025-01-20",
    time: "16:00",
    format: "offline",
    message: "Дитина має проблеми з адаптацією в школі",
    status: "accepted",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    responseDeadline: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    communicationDeadline: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    type: "public",
    clientId: "client-3",
    clientName: "Петро Сидоренко",
    specialistId: null, // No specialist assigned yet
    subject: "Математика",
    level: "Підготовка до ЗНО/НМТ",
    date: "2025-01-24",
    time: "18:00",
    format: "online",
    message: "Підготовка до ЗНО з математики",
    status: "pending",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    responseDeadline: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(),
    basePrice: 350,
    currentPrice: 350,
    minPriceLimit: 250,
    stepValue: 20,
  },
  {
    id: "4",
    type: "private",
    clientId: "client-3",
    clientName: "Петро Сидоренко",
    clientPhone: "+380671234567",
    specialistId: "specialist-3",
    specialistName: "Анна Мельник",
    subject: "Фізика",
    level: "9 клас",
    date: "2025-01-18",
    time: "15:30",
    format: "online",
    message: "Слабкі результати в школі з фізики",
    status: "trial_completed",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    responseDeadline: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    trialResultDeadline: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "5",
    type: "private",
    clientId: "client-1",
    clientName: "Марія Коваленко",
    clientPhone: "+380501234567",
    specialistId: "specialist-4",
    specialistName: "Олександр Ковальчук",
    subject: "Логопед",
    level: "Початкова школа",
    date: "2025-01-15",
    time: "10:00",
    format: "offline",
    message: "Проблеми з вимовою",
    status: "paid",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    responseDeadline: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "6",
    type: "private",
    clientId: "client-3",
    clientName: "Петро Сидоренко",
    clientPhone: "+380671234567",
    specialistId: "specialist-5",
    specialistName: "Світлана Павленко",
    subject: "Хімія",
    level: "10 клас",
    date: "2025-01-16",
    time: "17:00",
    format: "online",
    message: "Підготовка до контрольної з хімії",
    status: "awaiting_payment",
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    responseDeadline: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    paymentDeadline: new Date(Date.now() + 23 * 60 * 60 * 1000).toISOString(),
  },
]

const getPricingDefaults = (subjectName: string, levelLabel?: string) => {
  const { subjects } = useDictionaryStore.getState()
  const subject = subjects.find((item) => item.name === subjectName)
  if (!subject) {
    return {
      basePrice: undefined,
      minPriceLimit: undefined,
      stepValue: undefined,
    }
  }

  const level = levelLabel ? subject.levels.find((item) => item.label === levelLabel) : undefined
  return {
    basePrice: level?.basePrice ?? subject.defaultBasePrice,
    minPriceLimit: level?.minPrice ?? subject.defaultMinPrice,
    stepValue: level?.stepValue ?? subject.defaultStepValue,
  }
}

const mockStudents: Student[] = [
  {
    id: "s1",
    tutorId: "specialist-1",
    name: "Анна Іваненко",
    grade: "10 клас",
    phone: "+380671234567",
    type: "own",
    subject: "Англійська мова",
    addedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active",
  },
]

export const useRequestStore = create<RequestStore>((set, get) => ({
  requests: mockRequests,
  students: mockStudents,

  addRequest: (request) => {
    const now = new Date()
    const pricingDefaults = request.type === "public" ? getPricingDefaults(request.subject, request.level) : null
    const basePrice = request.basePrice ?? pricingDefaults?.basePrice
    const minPriceLimit = request.minPriceLimit ?? pricingDefaults?.minPriceLimit
    const stepValue = request.stepValue ?? pricingDefaults?.stepValue
    const newRequest: BookingRequest = {
      ...request,
      id: Math.random().toString(36).substr(2, 9),
      status: "pending",
      createdAt: now.toISOString(),
      responseDeadline: new Date(now.getTime() + 3 * 60 * 60 * 1000).toISOString(), // 3 hours
      basePrice,
      currentPrice: request.currentPrice ?? basePrice,
      minPriceLimit,
      stepValue,
    }
    set((state) => ({ requests: [...state.requests, newRequest] }))
  },

  addOwnStudent: (studentData) => {
    const newStudent: Student = {
      ...studentData,
      id: Math.random().toString(36).substr(2, 9),
      type: "own",
      addedAt: new Date().toISOString(),
    }
    set((state) => ({ students: [...state.students, newStudent] }))
  },

  acceptRequest: (requestId) => {
    const now = new Date()
    const request = get().requests.find((r) => r.id === requestId)
    const responseTime = request ? now.getTime() - new Date(request.createdAt).getTime() : 0
    const fastResponseBonus = responseTime <= 20 * 60 * 1000

    set((state) => ({
      requests: state.requests.map((req) =>
        req.id === requestId
          ? {
            ...req,
            status: "accepted" as RequestStatus,
            acceptedAt: now.toISOString(),
            communicationDeadline: new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString(),
          }
          : req,
      ),
    }))

    const acceptedRequest = get().requests.find((r) => r.id === requestId)
    if (acceptedRequest && acceptedRequest.specialistId) {
      const newStudent: Student = {
        id: `student-${requestId}`,
        tutorId: acceptedRequest.specialistId,
        name: acceptedRequest.clientName,
        phone: acceptedRequest.clientPhone,
        telegram: acceptedRequest.clientTelegram,
        type: "platform",
        subject: acceptedRequest.subject,
        addedAt: now.toISOString(),
        status: "active",
        leadId: requestId,
      }
      set((state) => ({ students: [...state.students, newStudent] }))
    }
  },

  rejectRequest: (requestId, reason) => {
    set((state) => ({
      requests: state.requests.map((req) =>
        req.id === requestId ? { ...req, status: "rejected" as RequestStatus, rejectReason: reason } : req,
      ),
    }))
  },

  cancelRequest: (requestId) => {
    set((state) => ({
      requests: state.requests.map((req) =>
        req.id === requestId ? { ...req, status: "cancelled" as RequestStatus } : req,
      ),
    }))
  },

  updateCommunicationStatus: (requestId, status, trialDate, trialTime) => {
    set((state) => ({
      requests: state.requests.map((req) => {
        if (req.id === requestId) {
          const updates: Partial<BookingRequest> = {
            communicationStatus: status,
            status: status === "agreed_on_trial" ? "trial_scheduled" : "communicating",
          }

          if (trialDate && trialTime) {
            updates.date = trialDate
            updates.time = trialTime
            const trialDateTime = new Date(`${trialDate}T${trialTime}`)
            updates.trialResultDeadline = new Date(trialDateTime.getTime() + 2 * 60 * 60 * 1000).toISOString()
          }

          return { ...req, ...updates }
        }
        return req
      }),
    }))
  },

  updateTrialResult: (requestId, result) => {
    const now = new Date()
    set((state) => ({
      requests: state.requests.map((req) => {
        if (req.id === requestId) {
          const updates: Partial<BookingRequest> = {
            trialResult: result,
            status: "trial_completed",
          }

          if (result === "client_continues") {
            updates.status = "awaiting_payment"
            updates.paymentDeadline = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString() // 24 hours to pay
          }

          return { ...req, ...updates }
        }
        return req
      }),
    }))
  },

  markAsPaid: (requestId) => {
    set((state) => ({
      requests: state.requests.map((req) => (req.id === requestId ? { ...req, status: "paid" as RequestStatus } : req)),
    }))
  },

  expireRequest: (requestId) => {
    set((state) => ({
      requests: state.requests.map((req) =>
        req.id === requestId ? { ...req, status: "expired" as RequestStatus } : req,
      ),
    }))
  },

  getPublicLeads: () => {
    return get().requests.filter((req) => req.type === "public" && req.status === "pending")
  },

  takePublicLead: (requestId, specialistId) => {
    const now = new Date()
    set((state) => ({
      requests: state.requests.map((req) =>
        req.id === requestId
          ? {
            ...req,
            specialistId,
            status: "accepted" as RequestStatus,
            acceptedAt: now.toISOString(),
            communicationDeadline: new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString(),
          }
          : req,
      ),
    }))
  },

  reduceLeadPrice: (requestId) => {
    set((state) => ({
      requests: state.requests.map((req) => {
        if (req.id === requestId && req.type === "public" && req.currentPrice && req.minPriceLimit) {
          const stepValue = req.stepValue ?? 100
          const newPrice = Math.max(req.currentPrice - stepValue, req.minPriceLimit)
          return {
            ...req,
            currentPrice: newPrice,
            lastPriceUpdate: new Date().toISOString(),
          }
        }
        return req
      }),
    }))
  },

  autoReducePublicLeads: () => {
    const nowMs = Date.now()
    set((state) => ({
      requests: state.requests.map((req) => {
        if (req.type !== "public" || req.status !== "pending" || !req.currentPrice || !req.minPriceLimit) {
          return req
        }

        const createdAtMs = new Date(req.createdAt).getTime()
        const lastUpdateMs = req.lastPriceUpdate ? new Date(req.lastPriceUpdate).getTime() : createdAtMs

        const nextDropAtMs = req.lastPriceUpdate ? lastUpdateMs + 60 * 60 * 1000 : createdAtMs + 2 * 60 * 60 * 1000
        if (Number.isNaN(nextDropAtMs) || nowMs < nextDropAtMs) {
          return req
        }

        const stepValue = req.stepValue ?? 100
        const newPrice = Math.max(req.currentPrice - stepValue, req.minPriceLimit)
        if (newPrice === req.currentPrice) {
          return req
        }

        return {
          ...req,
          currentPrice: newPrice,
          lastPriceUpdate: new Date(nowMs).toISOString(),
        }
      }),
    }))
  },

  getRequestsBySpecialist: (specialistId) => {
    return get().requests.filter((req) => req.specialistId === specialistId)
  },

  getRequestsByClient: (clientId) => {
    return get().requests.filter((req) => req.clientId === clientId)
  },

  getActiveTrialCount: (clientId) => {
    const activeStatuses: RequestStatus[] = ["pending", "accepted", "communicating", "trial_scheduled"]
    return get().requests.filter((req) => req.clientId === clientId && activeStatuses.includes(req.status)).length
  },

  getStudentsByTutor: (tutorId) => {
    return get().students.filter((s) => s.tutorId === tutorId)
  },

  updateStudentStatus: (studentId, status) => {
    set((state) => ({
      students: state.students.map((s) => (s.id === studentId ? { ...s, status } : s)),
    }))
  },
}))
