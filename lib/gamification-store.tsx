"use client"

import { create } from "zustand"

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt?: string
}

export interface Level {
  level: number
  title: string
  minSessions: number
  maxSessions: number
  benefits: string[]
}

export interface UserProgress {
  userId: string
  level: number
  totalSessions: number
  currentStreak: number
  longestStreak: number
  achievements: Achievement[]
  points: number
}

const levels: Level[] = [
  {
    level: 1,
    title: "Новачок",
    minSessions: 0,
    maxSessions: 9,
    benefits: ["Доступ до платформи", "Базова підтримка"],
  },
  {
    level: 2,
    title: "Активний учень",
    minSessions: 10,
    maxSessions: 24,
    benefits: ["Знижка 5%", "Пріоритетна підтримка", "Доступ до матеріалів"],
  },
  {
    level: 3,
    title: "Досвідчений спеціаліст",
    minSessions: 25,
    maxSessions: 49,
    benefits: ["Знижка 10%", "Топ в пошуку", "Преміум підтримка"],
  },
  {
    level: 4,
    title: "Експерт",
    minSessions: 50,
    maxSessions: 99,
    benefits: ["Знижка 15%", "Виділений профіль", "Ексклюзивні матеріали"],
  },
  {
    level: 5,
    title: "Майстер",
    minSessions: 100,
    maxSessions: Number.POSITIVE_INFINITY,
    benefits: ["Знижка 20%", "VIP статус", "Персональний менеджер"],
  },
]

const availableAchievements: Achievement[] = [
  {
    id: "first-session",
    title: "Перше заняття",
    description: "Завершіть своє перше заняття",
    icon: "🎯",
  },
  {
    id: "week-streak",
    title: "Тижнева серія",
    description: "7 днів поспіль з заняттями",
    icon: "🔥",
  },
  {
    id: "top-rating",
    title: "Топ-рейтинг",
    description: "Досягніть рейтингу 4.8+",
    icon: "⭐",
  },
  {
    id: "fast-response",
    title: "Швидка відповідь",
    description: "Відповідайте на запити менше ніж за 2 години",
    icon: "⚡",
  },
  {
    id: "reliable",
    title: "Надійний",
    description: "95%+ прийнятих запитів",
    icon: "✅",
  },
  {
    id: "50-sessions",
    title: "50 занять",
    description: "Проведіть 50 успішних занять",
    icon: "🏆",
  },
]

interface GamificationStore {
  userProgress: Record<string, UserProgress>
  getLevelInfo: (sessions: number) => Level
  getProgress: (userId: string) => UserProgress
  addSession: (userId: string) => void
  unlockAchievement: (userId: string, achievementId: string) => void
}

export const useGamificationStore = create<GamificationStore>((set, get) => ({
  userProgress: {
    "specialist-1": {
      userId: "specialist-1",
      level: 3,
      totalSessions: 48,
      currentStreak: 5,
      longestStreak: 12,
      achievements: [
        { ...availableAchievements[0], unlockedAt: "2024-12-01" },
        { ...availableAchievements[2], unlockedAt: "2024-12-15" },
        { ...availableAchievements[3], unlockedAt: "2025-01-05" },
      ],
      points: 2400,
    },
    "client-1": {
      userId: "client-1",
      level: 2,
      totalSessions: 15,
      currentStreak: 3,
      longestStreak: 7,
      achievements: [
        { ...availableAchievements[0], unlockedAt: "2024-11-20" },
        { ...availableAchievements[1], unlockedAt: "2024-12-10" },
      ],
      points: 750,
    },
  },

  getLevelInfo: (sessions: number) => {
    return levels.find((level) => sessions >= level.minSessions && sessions <= level.maxSessions) || levels[0]
  },

  getProgress: (userId: string) => {
    return (
      get().userProgress[userId] || {
        userId,
        level: 1,
        totalSessions: 0,
        currentStreak: 0,
        longestStreak: 0,
        achievements: [],
        points: 0,
      }
    )
  },

  addSession: (userId: string) => {
    set((state) => {
      const progress = state.getProgress(userId)
      const newSessions = progress.totalSessions + 1
      const newLevel = state.getLevelInfo(newSessions).level

      return {
        userProgress: {
          ...state.userProgress,
          [userId]: {
            ...progress,
            totalSessions: newSessions,
            level: newLevel,
            points: progress.points + 50,
          },
        },
      }
    })
  },

  unlockAchievement: (userId: string, achievementId: string) => {
    set((state) => {
      const progress = state.getProgress(userId)
      const achievement = availableAchievements.find((a) => a.id === achievementId)

      if (!achievement || progress.achievements.some((a) => a.id === achievementId)) {
        return state
      }

      return {
        userProgress: {
          ...state.userProgress,
          [userId]: {
            ...progress,
            achievements: [...progress.achievements, { ...achievement, unlockedAt: new Date().toISOString() }],
            points: progress.points + 100,
          },
        },
      }
    })
  },
}))

export { levels, availableAchievements }
