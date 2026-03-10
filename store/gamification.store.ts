"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Achievement {
    id: string
    title: string
    description: string
    icon: string
    unlockedAt?: string
    category: "junior" | "pro" | "expert"
}

export interface Level {
    level: number
    title: string
    category: "junior" | "pro" | "expert"
    minXP: number
    maxXP: number
    benefits: string[]
}

export interface UserProgress {
    userId: string
    level: number
    category: "junior" | "pro" | "expert"
    totalXP: number
    totalSessions: number
    currentStreak: number
    longestStreak: number
    achievements: Achievement[]
    referralXP: number
    ownStudentXP: number
}

const generateLevels = (): Level[] => {
    const levels: Level[] = []
    for (let i = 1; i <= 20; i++) {
        levels.push({
            level: i,
            title: getLevelTitle(i, "junior"),
            category: "junior",
            minXP: (i - 1) * 100,
            maxXP: i * 100,
            benefits: getJuniorBenefits(i),
        })
    }
    for (let i = 21; i <= 80; i++) {
        levels.push({
            level: i,
            title: getLevelTitle(i, "pro"),
            category: "pro",
            minXP: 2000 + (i - 21) * 150,
            maxXP: 2000 + (i - 20) * 150,
            benefits: getProBenefits(i),
        })
    }
    for (let i = 81; i <= 100; i++) {
        levels.push({
            level: i,
            title: getLevelTitle(i, "expert"),
            category: "expert",
            minXP: 11000 + (i - 81) * 200,
            maxXP: i === 100 ? Number.POSITIVE_INFINITY : 11000 + (i - 80) * 200,
            benefits: getExpertBenefits(i),
        })
    }
    return levels
}

function getLevelTitle(level: number, category: string): string {
    if (category === "junior") {
        if (level === 1) return "Новачок"
        if (level <= 5) return "Початківець"
        if (level <= 10) return "Учень"
        if (level <= 15) return "Практикант"
        return "Молодший спеціаліст"
    }
    if (category === "pro") {
        if (level <= 30) return "Спеціаліст"
        if (level <= 40) return "Досвідчений спеціаліст"
        if (level <= 50) return "Професіонал"
        if (level <= 60) return "Експерт"
        if (level <= 70) return "Ведучий експерт"
        return "Старший експерт"
    }
    if (level <= 90) return "Ментор"
    if (level <= 95) return "Головний ментор"
    return "Майстер"
}

function getJuniorBenefits(level: number): string[] {
    const benefits = ["Доступ до платформи", "Базова підтримка"]
    if (level >= 5) benefits.push("Знижка 5% на матеріали")
    if (level >= 10) benefits.push("Доступ до базових шаблонів")
    if (level >= 15) benefits.push("Пріоритет у черзі підтримки")
    if (level >= 20) benefits.push("Бейдж 'Випускник'")
    return benefits
}

function getProBenefits(level: number): string[] {
    const benefits = ["Знижка 10% на матеріали", "Доступ до всіх шаблонів"]
    if (level >= 30) benefits.push("Публічний профіль")
    if (level >= 40) benefits.push("Кастомні бейджі")
    if (level >= 50) benefits.push("Топ позиція в пошуку")
    if (level >= 60) benefits.push("VIP підтримка")
    if (level >= 70) benefits.push("Ранній доступ до новинок")
    if (level >= 80) benefits.push("Бейдж 'Про-експерт'")
    return benefits
}

function getExpertBenefits(level: number): string[] {
    const benefits = ["Знижка 15% на все", "Персональний менеджер"]
    if (level >= 85) benefits.push("Ексклюзивні матеріали")
    if (level >= 90) benefits.push("Відкриті вакансії для учнів")
    if (level >= 95) benefits.push("Доступ до закритих подій")
    if (level === 100) benefits.push("Статус 'Легенда платформи'")
    return benefits
}

const availableAchievements: Achievement[] = [
    {
        id: "first-session",
        title: "Перше заняття",
        description: "Завершіть своє перше заняття",
        icon: "🎯",
        category: "junior",
    },
    { id: "first-week", title: "Перший тиждень", description: "Проведіть 5 занять", icon: "📅", category: "junior" },
    {
        id: "fast-response",
        title: "Швидка відповідь",
        description: "Відповідайте на запити менше ніж за 2 години",
        icon: "⚡",
        category: "junior",
    },
    { id: "first-referral", title: "Перший реферал", description: "Запросіть першого колегу", icon: "👥", category: "junior" },
    { id: "week-streak", title: "Тижнева серія", description: "7 днів поспіль з заняттями", icon: "🔥", category: "pro" },
    { id: "top-rating", title: "Топ-рейтинг", description: "Досягніть рейтингу 4.8+", icon: "⭐", category: "pro" },
    { id: "reliable", title: "Надійний", description: "95%+ прийнятих запитів", icon: "✅", category: "pro" },
    { id: "50-sessions", title: "50 занять", description: "Проведіть 50 успішних занять", icon: "🏆", category: "pro" },
    { id: "100-sessions", title: "100 занять", description: "Проведіть 100 успішних занять", icon: "💯", category: "pro" },
    {
        id: "master-of-subject",
        title: "Майстер предмету",
        description: "Проведіть 200 занять з одного предмету",
        icon: "📚",
        category: "pro",
    },
    { id: "500-sessions", title: "500 занять", description: "Проведіть 500 успішних занять", icon: "🎖️", category: "expert" },
    { id: "year-streak", title: "Річна серія", description: "365 днів активності", icon: "🌟", category: "expert" },
    {
        id: "referral-master",
        title: "Майстер рефералів",
        description: "Запросіть 10 активних колег",
        icon: "🤝",
        category: "expert",
    },
    {
        id: "perfect-score",
        title: "Ідеальний бал",
        description: "Середній рейтинг 5.0 з 50+ відгуків",
        icon: "💎",
        category: "expert",
    },
]

const levels = generateLevels()

interface GamificationStore {
    userProgress: Record<string, UserProgress>
    getLevelInfo: (xp: number) => Level
    getProgress: (userId: string) => UserProgress
    addSession: (userId: string) => void
    addReferralXP: (userId: string, amount: number) => void
    addOwnStudentXP: (userId: string, amount: number) => void
    unlockAchievement: (userId: string, achievementId: string) => void
    getCategoryProgress: (userId: string) => { current: number; next: number; percentage: number; category: string }
}

export const useGamificationStore = create<GamificationStore>()(
    persist(
        (set, get) => ({
            userProgress: {
                "specialist-1": {
                    userId: "specialist-1",
                    level: 45,
                    category: "pro",
                    totalXP: 5750,
                    totalSessions: 48,
                    currentStreak: 5,
                    longestStreak: 12,
                    achievements: [
                        { ...availableAchievements[0], unlockedAt: "2024-12-01" },
                        { ...availableAchievements[4], unlockedAt: "2024-12-15" },
                        { ...availableAchievements[5], unlockedAt: "2025-01-05" },
                        { ...availableAchievements[7], unlockedAt: "2025-01-20" },
                    ],
                    referralXP: 300,
                    ownStudentXP: 450,
                },
                "client-1": {
                    userId: "client-1",
                    level: 15,
                    category: "junior",
                    totalXP: 1450,
                    totalSessions: 15,
                    currentStreak: 3,
                    longestStreak: 7,
                    achievements: [
                        { ...availableAchievements[0], unlockedAt: "2024-11-20" },
                        { ...availableAchievements[4], unlockedAt: "2024-12-10" },
                    ],
                    referralXP: 0,
                    ownStudentXP: 0,
                },
            },

            getLevelInfo: (xp: number) => levels.find((level) => xp >= level.minXP && xp < level.maxXP) || levels[0],

            getProgress: (userId: string) =>
                get().userProgress[userId] || {
                    userId,
                    level: 1,
                    category: "junior",
                    totalXP: 0,
                    totalSessions: 0,
                    currentStreak: 0,
                    longestStreak: 0,
                    achievements: [],
                    referralXP: 0,
                    ownStudentXP: 0,
                },

            getCategoryProgress: (userId: string) => {
                const progress = get().getProgress(userId)
                const currentLevel = levels.find((l) => l.level === progress.level)
                if (!currentLevel) return { current: 0, next: 100, percentage: 0, category: "junior" }
                const current = progress.totalXP - currentLevel.minXP
                const next = currentLevel.maxXP - currentLevel.minXP
                const percentage = next === Number.POSITIVE_INFINITY ? 100 : Math.min(100, Math.round((current / next) * 100))
                return { current, next, percentage, category: currentLevel.category }
            },

            addSession: (userId: string) => {
                set((state) => {
                    const progress = state.getProgress(userId)
                    const newXP = progress.totalXP + 50
                    const newLevelInfo = state.getLevelInfo(newXP)
                    return {
                        userProgress: {
                            ...state.userProgress,
                            [userId]: {
                                ...progress,
                                totalSessions: progress.totalSessions + 1,
                                totalXP: newXP,
                                level: newLevelInfo.level,
                                category: newLevelInfo.category,
                            },
                        },
                    }
                })
            },

            addReferralXP: (userId: string, amount: number) => {
                set((state) => {
                    const progress = state.getProgress(userId)
                    const newXP = progress.totalXP + amount
                    const newLevelInfo = state.getLevelInfo(newXP)
                    return {
                        userProgress: {
                            ...state.userProgress,
                            [userId]: {
                                ...progress,
                                totalXP: newXP,
                                referralXP: progress.referralXP + amount,
                                level: newLevelInfo.level,
                                category: newLevelInfo.category,
                            },
                        },
                    }
                })
            },

            addOwnStudentXP: (userId: string, amount: number) => {
                set((state) => {
                    const progress = state.getProgress(userId)
                    const newXP = progress.totalXP + amount
                    const newLevelInfo = state.getLevelInfo(newXP)
                    return {
                        userProgress: {
                            ...state.userProgress,
                            [userId]: {
                                ...progress,
                                totalXP: newXP,
                                ownStudentXP: progress.ownStudentXP + amount,
                                level: newLevelInfo.level,
                                category: newLevelInfo.category,
                            },
                        },
                    }
                })
            },

            unlockAchievement: (userId: string, achievementId: string) => {
                set((state) => {
                    const progress = state.getProgress(userId)
                    const achievement = availableAchievements.find((a) => a.id === achievementId)
                    if (!achievement || progress.achievements.some((a) => a.id === achievementId)) return state
                    const newXP = progress.totalXP + 100
                    const newLevelInfo = state.getLevelInfo(newXP)
                    return {
                        userProgress: {
                            ...state.userProgress,
                            [userId]: {
                                ...progress,
                                achievements: [
                                    ...progress.achievements,
                                    { ...achievement, unlockedAt: new Date().toISOString() },
                                ],
                                totalXP: newXP,
                                level: newLevelInfo.level,
                                category: newLevelInfo.category,
                            },
                        },
                    }
                })
            },
        }),
        { name: "gamification-storage" },
    ),
)

export { availableAchievements, levels }
