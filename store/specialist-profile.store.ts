"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export type SpecialistType = "tutor" | "psychologist" | "speech-therapist"

export interface SpecialistProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  specialization: SpecialistType
  subjects: string[]
  experience: number
  education: string
  bio: string
  priceOnline: number
  priceOffline: number
  priceHomeVisit: number
  formats: {
    online: boolean
    offline: boolean
    homeVisit: boolean
  }
  location: string
  avatar?: string
  documents: {
    diploma?: string
    certificates?: string[]
  }
}

interface SpecialistProfileStore {
  profiles: Record<string, SpecialistProfile>
  getProfile: (id: string) => SpecialistProfile | undefined
  updateProfile: (id: string, data: Partial<SpecialistProfile>) => void
  createProfile: (id: string, data: Partial<SpecialistProfile>) => void
}

const defaultProfile: Partial<SpecialistProfile> = {
  firstName: "Олена",
  lastName: "Іваненко",
  phone: "+380 50 123 45 67",
  specialization: "tutor",
  subjects: ["Англійська мова", "Німецька мова"],
  experience: 5,
  education: "Київський національний університет імені Тараса Шевченка, філологічний факультет",
  bio: "Маю 5 років досвіду викладання англійської мови. Працюю з учнями різного віку та рівня підготовки. Використовую комунікативну методику та сучасні матеріали.",
  priceOnline: 400,
  priceOffline: 500,
  priceHomeVisit: 600,
  formats: {
    online: true,
    offline: true,
    homeVisit: false,
  },
  location: "Київ",
  documents: {},
}

export const useSpecialistProfileStore = create<SpecialistProfileStore>()(
  persist(
    (set, get) => ({
      profiles: {},

      getProfile: (id: string) => {
        const state = get()
        return state.profiles[id] || { ...defaultProfile, id } as SpecialistProfile
      },

      updateProfile: (id: string, data: Partial<SpecialistProfile>) => {
        set((state) => ({
          profiles: {
            ...state.profiles,
            [id]: {
              ...(state.profiles[id] || { ...defaultProfile, id }),
              ...data,
              id,
            },
          },
        }))
      },

      createProfile: (id: string, data: Partial<SpecialistProfile>) => {
        set((state) => ({
          profiles: {
            ...state.profiles,
            [id]: {
              ...defaultProfile,
              ...data,
              id,
            } as SpecialistProfile,
          },
        }))
      },
    }),
    {
      name: "specialist-profile-storage",
    }
  )
)
