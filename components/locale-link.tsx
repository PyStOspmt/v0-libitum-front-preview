"use client"

import Link from "next/link"
import { useLocale } from "@/lib/locale-context"
import { defaultLocale } from "@/lib/i18n/config"
import type { ComponentProps } from "react"

type LocaleLinkProps = ComponentProps<typeof Link>

export function LocaleLink({ href, ...props }: LocaleLinkProps) {
    const locale = useLocale()

    const localizedHref = (() => {
        if (typeof href !== "string") return href

        if (href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
            return href
        }
        if (locale === defaultLocale) {
            return href
        }

        return `/${locale}${href.startsWith("/") ? "" : "/"}${href}`
    })()

    return <Link href={localizedHref} {...props} />
}
