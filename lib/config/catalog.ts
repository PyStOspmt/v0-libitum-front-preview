export type CatalogDictionaryItem = {
    slug: string
    name: string
}

export const SUBJECTS: CatalogDictionaryItem[] = [
    { slug: "math", name: "Математика" },
    { slug: "english", name: "Англійська мова" },
    { slug: "physics", name: "Фізика" },
    { slug: "speech-therapist", name: "Логопед" },
    { slug: "psychologist", name: "Психолог" },
]

export const CITIES: CatalogDictionaryItem[] = [
    { slug: "kyiv", name: "Київ" },
    { slug: "lviv", name: "Львів" },
    { slug: "online", name: "Онлайн" },
]

export function getSubjectBySlug(slug: string): CatalogDictionaryItem | undefined {
    return SUBJECTS.find((s) => s.slug === slug)
}

export function getCityBySlug(slug: string): CatalogDictionaryItem | undefined {
    return CITIES.find((c) => c.slug === slug)
}
