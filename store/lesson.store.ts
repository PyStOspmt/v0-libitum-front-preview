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
  photoUrl?: string
  homework?: Homework
  report?: {
    attendance: "present" | "absent" | "late"
    performance: number
    behavior: number
    comment: string
    strengths: string[]
    improvements: string[]
    tag?: {
      id: string
      text: string
      color: string
    }
  }
  materials?: string[]
  isPaid: boolean
  price: number
  meetingUrl?: string // URL for online lessons
  location?: string // Address for offline lessons
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
      comment: "Відмінна робота! Марія швидко засвоїла нову тему і без помилок виконала всі вправи.",
      strengths: ["Швидке засвоєння матеріалу", "Уважність"],
      improvements: [],
      tag: {
        id: "tag-4",
        text: "Сьогодні ти перевершив(ла) себе!",
        color: "bg-amber-100 text-amber-800 border-amber-200"
      }
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
    photoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "4",
    clientId: "child-1",
    clientName: "Марія Коваленко",
    specialistId: "specialist-2",
    specialistName: "Ігор Петренко",
    subject: "Математика",
    date: "2025-02-15",
    time: "16:00",
    duration: 90,
    format: "offline",
    status: "scheduled",
    topic: "Дроби та відсотки",
    description: "Робота з десятковими дробами",
    isPaid: false,
    price: 500,
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "5",
    clientId: "child-1",
    clientName: "Марія Коваленко",
    specialistId: "specialist-3",
    specialistName: "Анна Мельник",
    subject: "Психологія",
    date: "2026-02-15",
    time: "15:30",
    duration: 60,
    format: "online",
    status: "scheduled",
    topic: "Управління стресом",
    description: "Техніки розслаблення та концентрації",
    meetingUrl: "https://zoom.us/j/1234567890",
    photoUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    isPaid: false,
    price: 600,
  },
  {
    id: "7",
    clientId: "child-1",
    clientName: "Марія Коваленко",
    specialistId: "specialist-2",
    specialistName: "Ігор Петренко",
    subject: "Математика",
    date: "2026-02-01",
    time: "17:00",
    duration: 75,
    format: "offline",
    status: "completed",
    topic: "Відсотки та дроби",
    description: "Закріпили обрахунок відсотків, робили практичні задачі",
    homework: {
      id: "hw-7",
      title: "Розрахунки відсотків",
      description: "Задачі 3-8 зі зошита, підготувати 3 приклади",
      dueDate: "2026-02-05",
      status: "checked",
      grade: 4.5,
      feedback: "Помилка в одній задачі, решта правильно",
      submittedAt: "2026-02-03T18:00:00Z",
      checkedAt: "2026-02-04T12:00:00Z",
    },
    report: {
      attendance: "present",
      performance: 4,
      behavior: 5,
      comment: "Добре засвоїла тему, потрібно більше тренуватись у швидкості рахунку",
      strengths: ["Розуміє логіку задач", "Акуратні обчислення"],
      improvements: ["Тренувати ментальний рахунок"],
    },
    materials: ["Percent_Practice.pdf", "Fractions_worksheet.docx"],
    isPaid: true,
    price: 500,
  },
  {
    id: "8",
    clientId: "child-2",
    clientName: "Іван Коваленко",
    specialistId: "specialist-4",
    specialistName: "Олександр Сидоренко",
    subject: "Фізика",
    date: "2026-02-02",
    time: "14:30",
    duration: 60,
    format: "online",
    status: "completed",
    topic: "Основи кінематики",
    description: "Розбирали рівномірний рух, графіки швидкості",
    homework: {
      id: "hw-8",
      title: "Графіки руху",
      description: "Побудувати 2 графіки V(t) та обчислити шлях",
      dueDate: "2026-02-06",
      status: "submitted",
      submittedAt: "2026-02-05T19:30:00Z",
    },
    report: {
      attendance: "present",
      performance: 4,
      behavior: 4,
      comment: "Добре знає формули, але потребує більше практики графіків",
      strengths: ["Швидко рахує"],
      improvements: ["Акуратність побудови графіків", "Підписувати осі"],
    },
    materials: ["Kinematics_intro.pdf", "Practice_graphs.xlsx"],
    isPaid: true,
    price: 450,
  },
  {
    id: "6",
    clientId: "child-2",
    clientName: "Іван Коваленко",
    specialistId: "specialist-4",
    specialistName: "Олександр Сидоренко",
    subject: "Фізика",
    date: "2026-02-16",
    time: "14:30",
    duration: 60,
    format: "online",
    status: "scheduled",
    topic: "Основи механіки",
    description: "Сили та рух",
    isPaid: false,
    price: 450,
  },
  {
    id: "7",
    clientId: "child-2",
    clientName: "Іван Коваленко",
    specialistId: "specialist-5",
    specialistName: "Марія Ковальчук",
    subject: "Музика",
    date: "2026-02-16",
    time: "13:00",
    duration: 45,
    format: "offline",
    status: "scheduled",
    topic: "Гра на гітарі - основи",
    description: "Вивчення акордів",
    location: "вул. Хрещатик, 10, Київ",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    isPaid: false,
    price: 350,
  },
  {
    id: "8",
    clientId: "child-1",
    clientName: "Марія Коваленко",
    specialistId: "specialist-1",
    specialistName: "Олена Іваненко",
    subject: "Англійська мова",
    date: "2026-02-19",
    time: "14:00",
    duration: 60,
    format: "online",
    status: "scheduled",
    topic: "Conditionals",
    description: "Умовні речення в англійській мові",
    isPaid: false,
    price: 400,
    photoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "9",
    clientId: "child-1",
    clientName: "Марія Коваленко",
    specialistId: "specialist-2",
    specialistName: "Ігор Петренко",
    subject: "Математика",
    date: "2026-02-17",
    time: "16:00",
    duration: 90,
    format: "offline",
    status: "scheduled",
    topic: "Алгебраїчні вирази",
    description: "Спрощення виразів",
    location: "вул. Хрещатик, 10, Київ",
    isPaid: false,
    price: 500,
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
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
