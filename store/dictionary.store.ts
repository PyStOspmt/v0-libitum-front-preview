import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Level = {
    id: string
    label: string // e.g., "B1", "B2", "Beginner"
    basePrice: number
    minPrice: number
    stepValue: number
}

export type Subject = {
    id: string
    name: string
    slug: string
    status: "active" | "inactive"
    levels: Level[]
    defaultBasePrice: number
    defaultMinPrice: number
    defaultStepValue: number
}

export type City = {
    id: string
    name: string
    slug: string
    status: "active" | "inactive"
}

interface DictionaryStore {
    subjects: Subject[]
    cities: City[]
    addSubject: (subject: Omit<Subject, "id" | "levels">) => void
    updateSubject: (id: string, data: Partial<Subject>) => void
    toggleSubjectStatus: (id: string) => void
    addLevel: (subjectId: string, level: Omit<Level, "id">) => void
    updateLevel: (subjectId: string, levelId: string, data: Partial<Level>) => void
    removeLevel: (subjectId: string, levelId: string) => void
    addCity: (city: Omit<City, "id">) => void
    toggleCityStatus: (id: string) => void
    getSubjectBySlug: (slug: string) => Subject | undefined
}

export const useDictionaryStore = create<DictionaryStore>()(
    persist(
        (set, get) => ({
            subjects: [
                {
                    id: "math",
                    name: "Математика",
                    slug: "math",
                    status: "active",
                    defaultBasePrice: 250,
                    defaultMinPrice: 150,
                    defaultStepValue: 10,
                    levels: [
                        { id: "math-1", label: "1-4 класи", basePrice: 200, minPrice: 150, stepValue: 10 },
                        { id: "math-2", label: "5-9 класи", basePrice: 250, minPrice: 180, stepValue: 10 },
                        { id: "math-3", label: "10-11 класи", basePrice: 300, minPrice: 200, stepValue: 15 },
                        { id: "math-4", label: "Підготовка до ЗНО/НМТ", basePrice: 350, minPrice: 250, stepValue: 20 },
                        { id: "math-5", label: "Вища математика", basePrice: 400, minPrice: 300, stepValue: 25 },
                    ],
                },
                {
                    id: "english",
                    name: "Англійська мова",
                    slug: "english",
                    status: "active",
                    defaultBasePrice: 300,
                    defaultMinPrice: 200,
                    defaultStepValue: 10,
                    levels: [
                        { id: "eng-1", label: "A1 (Beginner)", basePrice: 250, minPrice: 200, stepValue: 10 },
                        { id: "eng-2", label: "A2 (Elementary)", basePrice: 280, minPrice: 220, stepValue: 10 },
                        { id: "eng-3", label: "B1 (Intermediate)", basePrice: 320, minPrice: 250, stepValue: 15 },
                        { id: "eng-4", label: "B2 (Upper-Intermediate)", basePrice: 350, minPrice: 280, stepValue: 15 },
                        { id: "eng-5", label: "C1 (Advanced)", basePrice: 400, minPrice: 320, stepValue: 20 },
                    ],
                },
                {
                    id: "ukrainian",
                    name: "Українська мова",
                    slug: "ukrainian",
                    status: "active",
                    defaultBasePrice: 250,
                    defaultMinPrice: 180,
                    defaultStepValue: 10,
                    levels: [
                        { id: "ukr-1", label: "Шкільна програма", basePrice: 250, minPrice: 180, stepValue: 10 },
                        { id: "ukr-2", label: "Підготовка до ЗНО", basePrice: 350, minPrice: 250, stepValue: 15 },
                    ],
                },
                {
                    id: "psychology",
                    name: "Психологія",
                    slug: "psychology",
                    status: "active",
                    defaultBasePrice: 600,
                    defaultMinPrice: 400,
                    defaultStepValue: 50,
                    levels: [
                        { id: "psy-1", label: "Консультація", basePrice: 600, minPrice: 400, stepValue: 50 },
                        { id: "psy-2", label: "Терапія", basePrice: 700, minPrice: 500, stepValue: 50 },
                    ],
                },
                {
                    id: "speech-therapy",
                    name: "Логопедія",
                    slug: "speech-therapy",
                    status: "active",
                    defaultBasePrice: 400,
                    defaultMinPrice: 300,
                    defaultStepValue: 20,
                    levels: [
                        { id: "speech-1", label: "Постановка звуків", basePrice: 400, minPrice: 300, stepValue: 20 },
                        { id: "speech-2", label: "Запуск мовлення", basePrice: 450, minPrice: 350, stepValue: 25 },
                    ],
                },
            ],
            cities: [
                { id: "kyiv", name: "Київ", slug: "kyiv", status: "active" },
                { id: "lviv", name: "Львів", slug: "lviv", status: "active" },
                { id: "odesa", name: "Одеса", slug: "odesa", status: "active" },
                { id: "dnipro", name: "Дніпро", slug: "dnipro", status: "active" },
                { id: "kharkiv", name: "Харків", slug: "kharkiv", status: "active" },
            ],

            addSubject: (subject) =>
                set((state) => ({
                    subjects: [...state.subjects, { ...subject, id: Math.random().toString(36).substr(2, 9), levels: [] }],
                })),

            updateSubject: (id, data) =>
                set((state) => ({
                    subjects: state.subjects.map((s) => (s.id === id ? { ...s, ...data } : s)),
                })),

            toggleSubjectStatus: (id) =>
                set((state) => ({
                    subjects: state.subjects.map((s) =>
                        s.id === id ? { ...s, status: s.status === "active" ? "inactive" : "active" } : s,
                    ),
                })),

            addLevel: (subjectId, level) =>
                set((state) => ({
                    subjects: state.subjects.map((s) =>
                        s.id === subjectId
                            ? {
                                  ...s,
                                  levels: [...s.levels, { ...level, id: Math.random().toString(36).substr(2, 9) }],
                              }
                            : s,
                    ),
                })),

            updateLevel: (subjectId, levelId, data) =>
                set((state) => ({
                    subjects: state.subjects.map((s) =>
                        s.id === subjectId
                            ? {
                                  ...s,
                                  levels: s.levels.map((l) => (l.id === levelId ? { ...l, ...data } : l)),
                              }
                            : s,
                    ),
                })),

            removeLevel: (subjectId, levelId) =>
                set((state) => ({
                    subjects: state.subjects.map((s) =>
                        s.id === subjectId
                            ? {
                                  ...s,
                                  levels: s.levels.filter((l) => l.id !== levelId),
                              }
                            : s,
                    ),
                })),

            addCity: (city) =>
                set((state) => ({
                    cities: [...state.cities, { ...city, id: Math.random().toString(36).substr(2, 9) }],
                })),

            toggleCityStatus: (id) =>
                set((state) => ({
                    cities: state.cities.map((c) =>
                        c.id === id ? { ...c, status: c.status === "active" ? "inactive" : "active" } : c,
                    ),
                })),

            getSubjectBySlug: (slug) => get().subjects.find((s) => s.slug === slug),
        }),
        {
            name: "dictionary-store",
        },
    ),
)
