import type { MetadataRoute } from "next"

import { CITIES, SUBJECTS } from "@/lib/catalog-dictionaries"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "http://localhost:3000"

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      changefreq: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/specialists`,
      changefreq: "daily",
      priority: 0.8,
    },
  ]

  const catalogPages: MetadataRoute.Sitemap = SUBJECTS.flatMap((subject) =>
    CITIES.map((city) => ({
      url: `${baseUrl}/${subject.slug}/${city.slug}`,
      changefreq: "daily",
      priority: 0.7,
    })),
  )

  return [...staticPages, ...catalogPages]
}
