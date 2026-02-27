"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface SubGoal {
  id: string
  title: string
  completed: boolean
  order: number
}

export interface Goal {
  id: string
  lessonId: string
  title: string
  subGoals: SubGoal[]
  createdAt: string
  updatedAt: string
}

interface GoalStore {
  goals: Record<string, Goal> // keyed by lessonId
  getGoalByLesson: (lessonId: string) => Goal | undefined
  createGoal: (lessonId: string, title: string, subGoals?: string[]) => void
  updateGoal: (lessonId: string, updates: Partial<Goal>) => void
  deleteGoal: (lessonId: string) => void
  addSubGoal: (lessonId: string, title: string) => void
  updateSubGoal: (lessonId: string, subGoalId: string, updates: Partial<SubGoal>) => void
  deleteSubGoal: (lessonId: string, subGoalId: string) => void
  toggleSubGoal: (lessonId: string, subGoalId: string) => void
  reorderSubGoals: (lessonId: string, subGoalIds: string[]) => void
  clearGoal: (lessonId: string) => void
  getProgress: (lessonId: string) => { completed: number; total: number; percentage: number }
}

export const useGoalStore = create<GoalStore>()(
  persist(
    (set, get) => ({
      goals: {},

      getGoalByLesson: (lessonId: string) => {
        return get().goals[lessonId]
      },

      createGoal: (lessonId: string, title: string, subGoals: string[] = []) => {
        const now = new Date().toISOString()
        const newGoal: Goal = {
          id: `goal-${Date.now()}`,
          lessonId,
          title,
          subGoals: subGoals.map((sg, idx) => ({
            id: `subgoal-${Date.now()}-${idx}`,
            title: sg,
            completed: false,
            order: idx,
          })),
          createdAt: now,
          updatedAt: now,
        }
        set((state) => ({
          goals: { ...state.goals, [lessonId]: newGoal },
        }))
      },

      updateGoal: (lessonId: string, updates: Partial<Goal>) => {
        set((state) => {
          const goal = state.goals[lessonId]
          if (!goal) return state
          return {
            goals: {
              ...state.goals,
              [lessonId]: { ...goal, ...updates, updatedAt: new Date().toISOString() },
            },
          }
        })
      },

      deleteGoal: (lessonId: string) => {
        set((state) => {
          const { [lessonId]: _, ...rest } = state.goals
          return { goals: rest }
        })
      },

      addSubGoal: (lessonId: string, title: string) => {
        set((state) => {
          const goal = state.goals[lessonId]
          if (!goal) return state
          const newSubGoal: SubGoal = {
            id: `subgoal-${Date.now()}`,
            title,
            completed: false,
            order: goal.subGoals.length,
          }
          return {
            goals: {
              ...state.goals,
              [lessonId]: {
                ...goal,
                subGoals: [...goal.subGoals, newSubGoal],
                updatedAt: new Date().toISOString(),
              },
            },
          }
        })
      },

      updateSubGoal: (lessonId: string, subGoalId: string, updates: Partial<SubGoal>) => {
        set((state) => {
          const goal = state.goals[lessonId]
          if (!goal) return state
          return {
            goals: {
              ...state.goals,
              [lessonId]: {
                ...goal,
                subGoals: goal.subGoals.map((sg) =>
                  sg.id === subGoalId ? { ...sg, ...updates } : sg
                ),
                updatedAt: new Date().toISOString(),
              },
            },
          }
        })
      },

      deleteSubGoal: (lessonId: string, subGoalId: string) => {
        set((state) => {
          const goal = state.goals[lessonId]
          if (!goal) return state
          return {
            goals: {
              ...state.goals,
              [lessonId]: {
                ...goal,
                subGoals: goal.subGoals.filter((sg) => sg.id !== subGoalId),
                updatedAt: new Date().toISOString(),
              },
            },
          }
        })
      },

      toggleSubGoal: (lessonId: string, subGoalId: string) => {
        set((state) => {
          const goal = state.goals[lessonId]
          if (!goal) return state
          return {
            goals: {
              ...state.goals,
              [lessonId]: {
                ...goal,
                subGoals: goal.subGoals.map((sg) =>
                  sg.id === subGoalId ? { ...sg, completed: !sg.completed } : sg
                ),
                updatedAt: new Date().toISOString(),
              },
            },
          }
        })
      },

      reorderSubGoals: (lessonId: string, subGoalIds: string[]) => {
        set((state) => {
          const goal = state.goals[lessonId]
          if (!goal) return state
          const reordered = subGoalIds
            .map((id) => goal.subGoals.find((sg) => sg.id === id))
            .filter(Boolean) as SubGoal[]
          return {
            goals: {
              ...state.goals,
              [lessonId]: {
                ...goal,
                subGoals: reordered.map((sg, idx) => ({ ...sg, order: idx })),
                updatedAt: new Date().toISOString(),
              },
            },
          }
        })
      },

      clearGoal: (lessonId: string) => {
        set((state) => {
          const goal = state.goals[lessonId]
          if (!goal) return state
          return {
            goals: {
              ...state.goals,
              [lessonId]: {
                ...goal,
                title: "",
                subGoals: [],
                updatedAt: new Date().toISOString(),
              },
            },
          }
        })
      },

      getProgress: (lessonId: string) => {
        const goal = get().goals[lessonId]
        if (!goal || goal.subGoals.length === 0) {
          return { completed: 0, total: 0, percentage: 0 }
        }
        const completed = goal.subGoals.filter((sg) => sg.completed).length
        const total = goal.subGoals.length
        return {
          completed,
          total,
          percentage: Math.round((completed / total) * 100),
        }
      },
    }),
    {
      name: "goal-storage",
    }
  )
)
