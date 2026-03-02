import { ArrowRight, Check, CheckCircle2, MessageCircle, Search, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Header } from "@/components/header"
import { SpecialistCarousel, psychologists, speechTherapists, tutors } from "@/components/home/specialist-carousel"

import { FaqAccordion } from "@/features/home/components/faq-accordion"
import { HeroClientActions } from "@/features/home/components/hero-actions"

import { getTranslation } from "@/lib/i18n"
import { isValidLocale } from "@/lib/i18n/config"

export const dynamic = "force-dynamic"

export const metadata = {
    title: "Libitum | Знайдіть свого ідеального спеціаліста",
    description: "Професійні репетитори, психологи та логопеди для вашого успіху. Платформа з перевіреними спеціалістами.",
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale: rawLocale } = await params
    const locale = isValidLocale(rawLocale) ? rawLocale : "uk"
    const t = getTranslation(locale)
    const faqs = [
        { q: t("faq.q1.q"), a: t("faq.q1.a") },
        { q: t("faq.q2.q"), a: t("faq.q2.a") },
        { q: t("faq.q3.q"), a: t("faq.q3.a") },
        { q: t("faq.q4.q"), a: t("faq.q4.a") },
    ]

    return (
        <div className="min-h-screen bg-white text-[#111827] font-sans">
            <Header />

            <main>
                {/* Hero Section */}
                <section className="bg-[#f0f3f3]/50 relative overflow-visible pt-6 pb-8 lg:pt-10 lg:pb-10 border-b border-gray-200/50">
                    <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-8 lg:gap-16 relative">
                        {/* Left Content */}
                        <div className="w-full lg:w-[55%] xl:w-[50%] z-10 relative">
                            <div className="absolute -top-12 -left-8 w-[54px] h-[53px] text-[#ffc800] z-20 animate-[spin_10s_linear_infinite] opacity-80 hidden md:block">
                                <svg viewBox="0 0 54 53" fill="currentColor">
                                    <path
                                        fillRule="evenodd"
                                        d="M25.753.033c-3.111 2.37-5.076 5.617-7.859 8.283-4.008-2.656-7.798-5.322-11.834-7.792-2.316 4.39-3.791 9.176-5.46 13.882-5.405-3.32-10.45-6.852-16.143-9.87 0 5.485.498 10.873 2.062 16.111-5.187-.638-10.364-1.392-15.421-2.483 3.197 5.093 7.391 9.544 11.666 13.874-5.309 2.502-10.395 5.253-15.688 7.771 4.542 3.847 9.877 6.574 15.358 8.922-3.816 4.321-7.737 8.57-11.841 12.632 6.002 1.547 11.968 2.651 18.068 3.018-2.167 5.176-4.524 10.231-7.147 15.095 5.602-2.112 11.026-4.665 16.27-7.397.643 5.752 1.096 11.558 1.157 17.387 5.561-3.693 10.597-8.026 15.405-12.441 2.709 5.267 5.503 10.493 8.563 15.525 4.095-4.646 8.356-9.141 12.196-14.043 4.52 4.417 8.956 8.917 13.567 13.256-2.179-6.326-4.009-12.78-5.69-19.167 5.343 3.654 11.233 6.643 16.994 9.68-1.574-5.69-3.268-11.332-5.46-16.786 5.864 1.761 11.921 3.268 18.021 4.095-3.08-4.789-6.666-9.284-10.28-13.676 5.485-.295 11.01-1.077 16.516-1.921-4.757-3.81-9.983-7.135-15.333-10.05 5.534-1.503 11.166-2.735 16.892-3.791-5.626-2.42-10.961-5.421-16.204-8.583C45.318 20.301 48.337 14.894 51 9.308c-5.741.25-11.458.74-17.166 1.48C37.07 6.136 40.75 1.762 44.821-2.425c-5.913.689-11.758 1.905-17.514 3.411 1.748-4.832 3.847-9.528 5.892-14.188-5.267 1.831-10.375 4.195-15.346 6.837.283-4.646.126-9.284-.334-13.918"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>

                            <h1 className="text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.05] font-bold text-[#121117] tracking-[-0.03em] mb-6 text-center lg:text-left">
                                {t("hero.title")}
                            </h1>

                            {/* Client Component — auth-aware links */}
                            <HeroClientActions />
                        </div>

                        {/* Right Image */}
                        <div className="w-full lg:w-[45%] xl:w-[50%] relative hidden md:block">
                            <div className="relative w-full aspect-[4/3] rounded-[32px] overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] bg-slate-100">
                                <Image
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
                                    alt="Happy student learning"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            <div className="absolute top-12 -left-8 bg-white p-5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 flex items-center gap-4 rotate-[-3deg] animate-[bounce_6s_infinite] z-30">
                                <div className="bg-[#ffc800] p-3 rounded-full flex items-center justify-center">
                                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            d="m12 3 2.221 5.942 6.338.277-4.965 3.95 1.696 6.112L12 15.78l-5.29 3.501 1.695-6.113-4.965-3.95 6.338-.276z"
                                        ></path>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-[#121117] font-bold text-lg leading-tight">4.9/5</p>
                                    <p className="text-[#69686f] text-sm">{t("home.avg_rating") || "Середня оцінка"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Specialists Carousels */}
                <section className="relative z-20 mt-6 lg:mt-6 pb-12 lg:pb-16 bg-transparent overflow-visible">
                    <div className="max-w-[1440px] mx-auto w-full">
                        <SpecialistCarousel title={t("home.tutors_title") || "Репетитори"} specialists={tutors} theme="teal" />
                        <SpecialistCarousel
                            title={t("home.psychologists_title") || "Психологи"}
                            specialists={psychologists}
                            theme="amber"
                        />
                        <SpecialistCarousel
                            title={t("home.speech_title") || "Логопеди"}
                            specialists={speechTherapists}
                            theme="amber"
                        />

                        <div className="mt-4 flex justify-center w-full px-4 sm:px-0">
                            <Link
                                href="/specialists"
                                className="inline-flex items-center justify-center gap-2 bg-white text-[#121117] border-[2px] border-slate-200 text-[16px] font-[700] h-[52px] px-8 rounded-[12px] hover:border-[#121117] hover:bg-slate-50 transition-colors duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] shadow-sm"
                            >
                                {t("home.all_specialists_btn") || "Всі спеціалісти"} <ArrowRight className="w-5 h-5 ml-1" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* How it works */}
                <section id="how" className="py-20 lg:py-28 relative overflow-hidden bg-white">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#f0f3f3] rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3 z-0"></div>
                    <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <h2 className="text-[32px] sm:text-[44px] font-bold tracking-tight text-[#121117] mb-4">
                                {t("nav.how_it_works")}
                            </h2>
                            <p className="text-[18px] text-[#69686f] leading-relaxed">
                                {t("how.subtitle") ||
                                    "Почніть свій шлях до нових знань всього за три простих кроки. Ми зробили процес пошуку спеціаліста максимально зручним."}
                            </p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8 relative">
                            <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-[#00c5a6]/0 via-[#00c5a6]/30 to-[#00c5a6]/0 z-0"></div>
                            {[
                                {
                                    title: t("how.step1.title"),
                                    icon: <Search className="w-8 h-8 text-[#00c5a6]" />,
                                    desc: t("how.step1.desc"),
                                },
                                {
                                    title: t("how.step2.title"),
                                    icon: <MessageCircle className="w-8 h-8 text-[#00c5a6]" />,
                                    desc: t("how.step2.desc"),
                                },
                                {
                                    title: t("how.step3.title"),
                                    icon: <CheckCircle2 className="w-8 h-8 text-[#00c5a6]" />,
                                    desc: t("how.step3.desc"),
                                },
                            ].map((step, idx) => (
                                <div
                                    key={step.title}
                                    className="rounded-[20px] sm:rounded-[24px] bg-white p-6 sm:p-8 border border-slate-100 relative z-10 hover:-translate-y-2 transition-transform duration-300 group"
                                    style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.04)" }}
                                >
                                    <div className="w-[80px] h-[80px] rounded-[24px] bg-[#e8fffb] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 group-hover:rotate-3 shadow-inner">
                                        {step.icon}
                                    </div>
                                    <div className="absolute top-8 right-8 text-[64px] font-black text-slate-50/80 leading-none pointer-events-none select-none">
                                        {idx + 1}
                                    </div>
                                    <h3 className="text-[24px] font-bold text-[#121117] mb-4 pr-8">{step.title}</h3>
                                    <p className="text-[16px] text-[#69686f] leading-relaxed font-medium">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Guarantee */}
                <section className="py-20 bg-[#121117] text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=2000&q=80')] opacity-10 bg-cover bg-center"></div>
                    <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center gap-12 lg:gap-24">
                        <div className="w-full md:w-1/2">
                            <h2
                                className="text-[32px] sm:text-[44px] font-bold tracking-tight mb-6 leading-tight"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        t("guarantee.title") ||
                                        'Гарантуємо якість <br /> <span class="text-[#00c5a6]">кожного заняття</span>',
                                }}
                            />
                            <p className="text-[18px] text-slate-300 leading-relaxed mb-8">
                                {t("guarantee.desc") ||
                                    "Якщо перше заняття вам не сподобається, ми безкоштовно підберемо іншого спеціаліста або повернемо гроші. Ваш результат — наш пріоритет."}
                            </p>
                            <ul className="space-y-4 mb-10">
                                {[
                                    t("guarantee.point1") || "Перевірені дипломи та сертифікати",
                                    t("guarantee.point2") || "Реальні відгуки від учнів",
                                    t("guarantee.point3") || "Безпечна оплата через платформу",
                                ].map((text, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-[#00c5a6]/20 flex items-center justify-center shrink-0">
                                            <Check className="w-4 h-4 text-[#00c5a6]" />
                                        </div>
                                        <span className="text-slate-200 font-medium">{text}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href="/specialists"
                                className="inline-flex items-center justify-center gap-2 bg-[#00c5a6] text-[#121117] text-[16px] font-[700] h-[52px] px-8 rounded-[12px] hover:bg-[#00a389] transition-colors duration-200"
                            >
                                {t("guarantee.try_free") || "Спробувати безкоштовно"}
                            </Link>
                        </div>
                        <div className="w-full md:w-1/2 relative">
                            <div className="relative rounded-[24px] overflow-hidden shadow-2xl border border-white/10 aspect-[4/3] w-full">
                                <Image
                                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80"
                                    alt="Student success"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-8 -left-8 bg-white text-[#121117] p-6 rounded-[20px] shadow-xl border border-slate-100 flex items-center gap-5">
                                <div className="w-14 h-14 rounded-full bg-[#ffc800]/20 flex items-center justify-center text-[#ffc800]">
                                    <Star className="w-7 h-7 fill-[#ffc800]" />
                                </div>
                                <div>
                                    <p className="text-[32px] font-black leading-none mb-1">4.9</p>
                                    <p className="text-[14px] text-[#69686f] font-medium">
                                        {t("home.avg_rating_all") || "Середній рейтинг"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ — Client Component */}
                <section id="faq" className="py-20 lg:py-28 bg-[#f8f9fa]">
                    <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-[32px] sm:text-[40px] font-bold tracking-tight text-[#121117] mb-4">
                                {t("faq.title") || "Часті запитання"}
                            </h2>
                            <p className="text-[18px] text-[#69686f]">
                                {t("faq.desc") || "Все, що вам потрібно знати про платформу Libitum"}
                            </p>
                        </div>
                        <FaqAccordion faqs={faqs} />
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-12 text-[15px]">
                    <div>
                        <p className="font-bold text-[#121117] text-lg mb-4">LIBITUM</p>
                        <p className="text-[#69686f] leading-relaxed">{t("about.desc")}</p>
                    </div>
                    <div>
                        <p className="font-bold text-[#121117] mb-6 uppercase tracking-wider text-[13px]">
                            {t("contact.title")}
                        </p>
                        <div className="space-y-4 text-[#69686f]">
                            <p className="hover:text-[#121117] cursor-pointer transition-colors">{t("contact.email")}</p>
                            <p className="hover:text-[#121117] cursor-pointer transition-colors">{t("contact.telegram")}</p>
                            <p className="hover:text-[#121117] cursor-pointer transition-colors">{t("contact.hours")}</p>
                        </div>
                    </div>
                    <div>
                        <p className="font-bold text-[#121117] mb-6 uppercase tracking-wider text-[13px]">{t("rules.title")}</p>
                        <div className="space-y-4 text-[#69686f]">
                            <p className="hover:text-[#121117] cursor-pointer transition-colors">{t("rules.item1")}</p>
                            <p className="hover:text-[#121117] cursor-pointer transition-colors">{t("rules.item2")}</p>
                        </div>
                    </div>
                    <div>
                        <p className="font-bold text-[#121117] mb-6 uppercase tracking-wider text-[13px]">
                            {t("footer.nav") || "Навігація"}
                        </p>
                        <div className="space-y-4">
                            <Link href="/specialists" className="block text-[#69686f] hover:text-[#121117] transition-colors">
                                {t("nav.specialists")}
                            </Link>
                            <Link href="#how" className="block text-[#69686f] hover:text-[#121117] transition-colors">
                                {t("nav.how_it_works")}
                            </Link>
                            <Link href="#faq" className="block text-[#69686f] hover:text-[#121117] transition-colors">
                                {t("nav.reviews")}
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-gray-200 text-[14px] text-[#69686f]">
                    2024 Libitum Education. {t("footer.rights")}
                </div>
            </footer>
        </div>
    )
}
