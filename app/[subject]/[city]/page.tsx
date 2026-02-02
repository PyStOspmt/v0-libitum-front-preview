import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { CatalogPageClient } from "@/components/catalog/catalog-page-client"
import { getCityBySlug, getSubjectBySlug } from "@/lib/catalog-dictionaries"

type PageProps = {
  params: Promise<{ subject: string; city: string }>
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { subject: subjectSlug, city: citySlug } = await params
  const subject = getSubjectBySlug(subjectSlug)
  const city = getCityBySlug(citySlug)

  if (!subject || !city) {
    return {}
  }

  const sp = (await searchParams) ?? {}
  const hasQueryParams = Object.keys(sp).length > 0
  const basePath = `/${subject.slug}/${city.slug}`

  return {
    title: `${subject.name} у ${city.name} | Libitum`,
    description: `Каталог спеціалістів: ${subject.name} у ${city.name}.`,
    alternates: {
      canonical: basePath,
    },
    robots: hasQueryParams ? { index: false, follow: true } : undefined,
  }
}

export default async function CatalogSeoPage({ params }: PageProps) {
  const { subject: subjectSlug, city: citySlug } = await params
  const subject = getSubjectBySlug(subjectSlug)
  const city = getCityBySlug(citySlug)

  if (!subject || !city) {
    notFound()
  }

  return <CatalogPageClient subjectSlug={subjectSlug} citySlug={citySlug} />
}
