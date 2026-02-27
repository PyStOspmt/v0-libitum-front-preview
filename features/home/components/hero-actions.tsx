"use client"

import { LocaleLink } from "@/components/locale-link"

import { useAuth } from "@/lib/hooks/use-auth"
import { useTranslation } from "@/lib/i18n"

import { ArrowRight } from "lucide-react"

export function HeroClientActions() {
    const { user } = useAuth()
    const { t } = useTranslation()
    const specialistHref = user?.legacyRole === "client" ? "/client/specialists" : "/specialists"

    return (
        <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
            <LocaleLink
                href={specialistHref}
                className="inline-flex items-center justify-center gap-2 bg-primary text-[#121117] border-2 border-transparent text-[16px] font-[600] h-[48px] px-6 rounded-[8px] w-full sm:w-auto hover:bg-primary/90 hover:border-[#121117] transition-colors duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            >
                {t("hero.cta")}
                <ArrowRight className="h-5 w-5" />
            </LocaleLink>
            <LocaleLink
                href="#how"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#121117] border-[2px] border-[#121117] text-[16px] font-[600] h-[48px] px-6 rounded-[8px] w-full sm:w-auto hover:bg-gray-50 transition-colors duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            >
                {t("nav.how_it_works")}
            </LocaleLink>
        </div>
    )
}
