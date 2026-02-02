"use client"

import { create } from "zustand"

export interface Homework {
  id: string
  title: string
  description: string
  attachments?: string[]
  dueDate: string
  status: "pending" | "submitted" | "checked"
  grade?: number
  feedback?: string
  submittedAt?: string
  checkedAt?: string
}

export interface Lesson {
  id: string
  clientId: string
  clientName: string
  specialistId: string
  specialistName: string
  subject: string
  date: string
  time: string
  duration: number // minutes
  format: "online" | "offline"
  status: "scheduled" | "completed" | "cancelled" | "missed"
  topic?: string
  description?: string
  homework?: Homework
  report?: {
    attendance: "present" | "absent" | "late"
    performance: number // 1-5
    behavior: number // 1-5
    comment: string
    strengths: string[]
    improvements: string[]
  }
  materials?: string[]
  isPaid: boolean
  price: number
}

export interface CalendarEvent {
  id: string
  userId: string
  title: string
  description?: string
  date: string
  time: string
  duration: number // minutes
  type: "personal" | "meeting" | "reminder" | "break"
  color?: string
}

interface LessonStore {
  lessons: Lesson[]
  events: CalendarEvent[]
  addLesson: (lesson: Omit<Lesson, "id">) => void
  updateLesson: (lessonId: string, updates: Partial<Lesson>) => void
  deleteLesson: (lessonId: string) => void
  getLessonsByClient: (clientId: string) => Lesson[]
  getLessonsBySpecialist: (specialistId: string) => Lesson[]
  getLessonsByClientAndSpecialist: (clientId: string, specialistId: string) => Lesson[]
  submitHomework: (lessonId: string, submissionData: { description?: string; attachments?: string[] }) => void
  checkHomework: (lessonId: string, grade: number, feedback: string) => void
  addEvent: (event: Omit<CalendarEvent, "id">) => void
  updateEvent: (eventId: string, updates: Partial<CalendarEvent>) => void
  deleteEvent: (eventId: string) => void
  getEventsByUser: (userId: string) => CalendarEvent[]
}

// Mock data
const mockLessons: Lesson[] = [
  {
    id: "1",
    clientId: "client-1",
    clientName: "Марія Коваленко",
    specialistId: "specialist-1",
    specialistName: "Олена Іваненко",
    subject: "Англійська мова",
    date: "2025-01-15",
    time: "14:00",
    duration: 60,
    format: "online",
    status: "completed",
    topic: "Present Perfect Tense",
    description: "Вивчали Present Perfect, виконували вправи",
    homework: {
      id: "hw-1",
      title: "Вправи на Present Perfect",
      description: "Виконати вправи 1-5 на сторінці 45",
      dueDate: "2025-01-17",
      status: "checked",
      grade: 5,
      feedback: "Відмінна робота! Всі вправи виконані правильно.",
      submittedAt: "2025-01-16T18:00:00Z",
      checkedAt: "2025-01-17T10:00:00Z",
    },
    report: {
      attendance: "present",
      performance: 5,
      behavior: 5,
      comment: "Чудовий прогрес! Марія активно працювала на уроці.",
      strengths: ["Швидко розуміє нову граматику", "Відмінна вимова"],
      improvements: ["Потрібно більше практикувати письмову мову"],
    },
    materials: ["Grammar Guide - Present Perfect.pdf", "Practice Exercises.pdf"],
    isPaid: true,
    price: 400,
  },
  {
    id: "2",
    clientId: "client-1",
    clientName: "Марія Коваленко",
    specialistId: "specialist-1",
    specialistName: "Олена Іваненко",
    subject: "Англійська мова",
    date: "2025-01-18",
    time: "14:00",
    duration: 60,
    format: "online",
    status: "completed",
    topic: "Past Simple vs Present Perfect",
    description: "Порівнювали два часи, виконували тести",
    homework: {
      id: "hw-2",
      title: "Тест на Past Simple та Present Perfect",
      description: "Пройти онлайн-тест та написати 5 речень",
      dueDate: "2025-01-20",
      status: "submitted",
      submittedAt: "2025-01-19T20:00:00Z",
    },
    report: {
      attendance: "present",
      performance: 4,
      behavior: 5,
      comment: "Добре опанувала матеріал, але потрібно більше практики.",
      strengths: ["Розуміє різницю між часами"],
      improvements: ["Іноді плутає часові маркери"],
    },
    materials: ["Tense Comparison Chart.pdf"],
    isPaid: true,
    price: 400,
  },
  {
    id: "3",
    clientId: "client-1",
    clientName: "Марія Коваленко",
    specialistId: "specialist-1",
    specialistName: "Олена Іваненко",
    subject: "Англійська мова",
    date: "2025-01-22",
    time: "14:00",
    duration: 60,
    format: "online",
    status: "scheduled",
    topic: "Future Tenses",
    isPaid: false,
    price: 400,
  },
]

export const useLessonStore = create<LessonStore>((set, get) => ({
  lessons: mockLessons,
  events: [],

  addLesson: (lesson) => {
    const newLesson: Lesson = {
      ...lesson,
      id: Math.random().toString(36).substr(2, 9),
    }
    set((state) => ({ lessons: [...state.lessons, newLesson] }))
  },

  updateLesson: (lessonId, updates) => {
    set((state) => ({
      lessons: state.lessons.map((lesson) => (lesson.id === lessonId ? { ...lesson, ...updates } : lesson)),
    }))
  },

  deleteLesson: (lessonId) => {
    set((state) => ({
      lessons: state.lessons.filter((lesson) => lesson.id !== lessonId),
    }))
  },

  getLessonsByClient: (clientId) => {
    return get().lessons.filter((lesson) => lesson.clientId === clientId)
  },

  getLessonsBySpecialist: (specialistId) => {
    return get().lessons.filter((lesson) => lesson.specialistId === specialistId)
  },

  getLessonsByClientAndSpecialist: (clientId, specialistId) => {
    return get()
      .lessons.filter((lesson) => lesson.clientId === clientId && lesson.specialistId === specialistId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  },

  submitHomework: (lessonId, submissionData) => {
    set((state) => ({
      lessons: state.lessons.map((lesson) => {
        if (lesson.id === lessonId && lesson.homework) {
          return {
            ...lesson,
            homework: {
              ...lesson.homework,
              status: "submitted",
              submittedAt: new Date().toISOString(),
            },
          }
        }
        return lesson
      }),
    }))
  },

  checkHomework: (lessonId, grade, feedback) => {
    set((state) => ({
      lessons: state.lessons.map((lesson) => {
        if (lesson.id === lessonId && lesson.homework) {
          return {
            ...lesson,
            homework: {
              ...lesson.homework,
              status: "checked",
              grade,
              feedback,
              checkedAt: new Date().toISOString(),
            },
          }
        }
        return lesson
      }),
    }))
  },

  addEvent: (event) => {
    const newEvent: CalendarEvent = {
      ...event,
      id: Math.random().toString(36).substr(2, 9),
    }
    set((state) => ({ events: [...state.events, newEvent] }))
  },

  updateEvent: (eventId, updates) => {
    set((state) => ({
      events: state.events.map((event) => (event.id === eventId ? { ...event, ...updates } : event)),
    }))
  },

  deleteEvent: (eventId) => {
    set((state) => ({
      events: state.events.filter((event) => event.id !== eventId),
    }))
  },

  getEventsByUser: (userId) => {
    return get().events.filter((event) => event.userId === userId)
  },
}))
