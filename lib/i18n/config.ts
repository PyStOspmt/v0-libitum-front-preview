export const locales = ["uk", "en", "ru"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "uk"

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}
