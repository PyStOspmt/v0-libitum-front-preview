import { Locale } from "./i18n"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface I18nState {
    language: Locale
    setLanguage: (lang: Locale) => void
}

export const useI18nStore = create<I18nState>()(
    persist(
        (set) => ({
            language: "UA",
            setLanguage: (lang: Locale) => set({ language: lang }),
        }),
        {
            name: "libitum-i18n-storage", // name of the item in the storage (must be unique)
        }
    )
)
