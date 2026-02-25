"use client"

import { useState, useCallback, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { ArrowRight, Star } from "lucide-react"
import { useTranslation } from "@/lib/i18n"

export const tutors = [
    {
        id: "1",
        name: "Олена І.",
        specialization: "Репетитор",
        subjects: ["Англійська мова", "Німецька мова"],
        rating: 4.9,
        reviews: 48,
        price: 400,
        activeStudents: 49,
        lessonsCompleted: 4975,
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "4",
        name: "Анна С.",
        specialization: "Репетитор",
        subjects: ["Математика", "Фізика"],
        rating: 4.9,
        reviews: 89,
        price: 350,
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "5",
        name: "Дмитро В.",
        specialization: "Репетитор",
        subjects: ["Програмування", "Веб-розробка"],
        rating: 5.0,
        reviews: 120,
        price: 500,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "10",
        name: "Катерина С.",
        specialization: "Репетитор",
        subjects: ["Хімія", "Біологія"],
        rating: 5.0,
        reviews: 75,
        price: 450,
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "11",
        name: "Максим Л.",
        specialization: "Репетитор",
        subjects: ["Англійська мова", "IELTS"],
        rating: 4.9,
        reviews: 210,
        price: 550,
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "12",
        name: "Софія М.",
        specialization: "Репетитор",
        subjects: ["Українська мова", "ЗНО"],
        rating: 4.8,
        reviews: 94,
        price: 350,
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    }
];

export const psychologists = [
    {
        id: "2",
        name: "Марія К.",
        specialization: "Психолог",
        subjects: ["Індивідуальна терапія", "Сімейна терапія"],
        rating: 5.0,
        reviews: 62,
        price: 600,
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "6",
        name: "Олександр М.",
        specialization: "Психолог",
        subjects: ["Дитяча психологія", "Стрес"],
        rating: 4.8,
        reviews: 45,
        price: 550,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "7",
        name: "Вікторія Д.",
        specialization: "Психолог",
        subjects: ["Когнітивно-поведінкова терапія"],
        rating: 4.9,
        reviews: 112,
        price: 700,
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "13",
        name: "Роман П.",
        specialization: "Психолог",
        subjects: ["Підліткова психологія", "Депресія"],
        rating: 4.7,
        reviews: 40,
        price: 500,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "14",
        name: "Юлія Т.",
        specialization: "Психолог",
        subjects: ["Арт-терапія", "Тривожність"],
        rating: 5.0,
        reviews: 88,
        price: 650,
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "15",
        name: "Денис В.",
        specialization: "Психолог",
        subjects: ["Гештальт-терапія", "Кризи"],
        rating: 4.8,
        reviews: 65,
        price: 550,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    }
];

export const speechTherapists = [
    {
        id: "3",
        name: "Ігор П.",
        specialization: "Логопед",
        subjects: ["Корекція звуковимови", "Розвиток мовлення"],
        rating: 4.8,
        reviews: 35,
        price: 450,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "8",
        name: "Наталія Л.",
        specialization: "Логопед",
        subjects: ["Постановка звуків", "Логопедичний масаж"],
        rating: 5.0,
        reviews: 80,
        price: 500,
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "9",
        name: "Євген С.",
        specialization: "Логопед",
        subjects: ["Дизартрія", "Заїкання"],
        rating: 4.7,
        reviews: 29,
        price: 400,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "16",
        name: "Ірина К.",
        specialization: "Логопед",
        subjects: ["Алалія", "Дошкільнята"],
        rating: 4.9,
        reviews: 82,
        price: 450,
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "17",
        name: "Анастасія Ф.",
        specialization: "Логопед",
        subjects: ["Розвиток мовлення", "Дислексія"],
        rating: 5.0,
        reviews: 50,
        price: 500,
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "18",
        name: "Павло З.",
        specialization: "Логопед",
        subjects: ["Корекція звуковимови", "Масаж"],
        rating: 4.8,
        reviews: 41,
        price: 350,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    }
];

export function SpecialistCarousel({ title, specialists, theme }: { title: string, specialists: any[], theme: 'teal' | 'amber' }) {
    const { t } = useTranslation()
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: 'center',
        skipSnaps: false,
        dragFree: false,
        containScroll: 'trimSnaps',
    })
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [isTouchMode, setIsTouchMode] = useState(false)

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    useEffect(() => {
        const mediaQuery = window.matchMedia("(hover: none) and (pointer: coarse)")

        const syncTouchMode = () => {
            setIsTouchMode(mediaQuery.matches)
        }

        syncTouchMode()
        mediaQuery.addEventListener("change", syncTouchMode)

        return () => {
            mediaQuery.removeEventListener("change", syncTouchMode)
        }
    }, [])

    useEffect(() => {
        if (!emblaApi) return

        const onSelect = () => {
            setSelectedIndex(emblaApi.selectedScrollSnap())
        }

        onSelect()
        emblaApi.on("select", onSelect)
        emblaApi.on("reInit", onSelect)

        return () => {
            emblaApi.off("select", onSelect)
            emblaApi.off("reInit", onSelect)
        }
    }, [emblaApi])

    const themeClasses: Record<'teal' | 'amber', { bg: string, text: string, borderHighlight: string, arrowBg: string, arrowText: string, pill: string }> = {
        teal: { bg: 'group-hover:bg-[#e8fffb]', text: 'group-hover:text-[#00a389]', borderHighlight: 'group-hover:border-[#00c5a6]/30', arrowBg: 'bg-[#00c5a6]/10 group-hover:bg-[#00c5a6]', arrowText: 'text-[#00c5a6] group-hover:text-[#121117]', pill: 'bg-[#e8fffb] text-[#00a389]' },
        amber: { bg: 'group-hover:bg-[#fff8e1]', text: 'group-hover:text-[#d87b00]', borderHighlight: 'group-hover:border-[#ffc800]/40', arrowBg: 'bg-[#ffc800]/20 group-hover:bg-[#ffc800]', arrowText: 'text-[#d87b00] group-hover:text-[#121117]', pill: 'bg-[#fff8e1] text-[#d87b00]' },
    };

    const tClass = themeClasses[theme];
    const activeThemeClasses = theme === "teal"
        ? {
            card: "border-[#00c5a6]/30 shadow-[0_12px_40px_rgba(0,0,0,0.12)]",
            text: "text-[#00a389]",
            chip: "bg-[#e8fffb] text-[#00a389] border-[#00c5a6]/30",
            arrow: "bg-[#00c5a6] text-[#121117]",
            deco: "opacity-[0.06] scale-[1.8]",
            divider: "border-slate-200",
        }
        : {
            card: "border-[#ffc800]/40 shadow-[0_12px_40px_rgba(0,0,0,0.12)]",
            text: "text-[#d87b00]",
            chip: "bg-[#fff8e1] text-[#d87b00] border-[#ffc800]/40",
            arrow: "bg-[#ffc800] text-[#121117]",
            deco: "opacity-[0.06] scale-[1.8]",
            divider: "border-slate-200",
        }

    return (
        <div className="mb-10 last:mb-0 relative z-20 max-w-[1440px] mx-auto">
            <div className="flex items-center justify-between mb-4 px-3 sm:px-6 lg:px-8">
                <Link href="/specialists" className="group/title flex items-center gap-2 active:scale-95 transition-all">
                    <h2 className="text-[22px] sm:text-[28px] font-bold tracking-tight text-[#121117] group-hover/title:text-primary transition-colors">
                        {title}
                    </h2>
                    <div className="flex h-7 w-7 sm:h-auto sm:w-auto items-center justify-center rounded-full bg-slate-100 sm:bg-transparent">
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary sm:opacity-0 sm:-translate-x-2 group-hover/title:opacity-100 group-hover/title:translate-x-0 transition-all" />
                    </div>
                </Link>
                <div className="flex gap-2">
                    <button
                        onClick={scrollPrev}
                        className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-[#121117] hover:bg-white hover:border-slate-300 transition-colors shadow-sm bg-white/50"
                        aria-label="Previous specialist"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                    </button>
                    <button
                        onClick={scrollNext}
                        className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-[#121117] hover:bg-white hover:border-slate-300 transition-colors shadow-sm bg-white/50"
                        aria-label="Next specialist"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                    </button>
                </div>
            </div>

            <div className="overflow-hidden pb-8 pt-2" ref={emblaRef}>
                <div className="flex touch-pan-y gap-3 sm:gap-6 px-3 sm:px-6 lg:px-8 pr-[15vw] sm:pr-6" style={{ backfaceVisibility: 'hidden' }}>
                    {specialists.map((specialist, idx) => {
                        const isActiveSlide = isTouchMode && selectedIndex === idx
                        const isMobileActive = isTouchMode

                        return (
                            <div
                                key={specialist.id}
                                className="flex-none w-[80vw] sm:w-[320px] md:w-[340px] min-w-0"
                            >
                                <Link href={`/specialists/${specialist.id}`} className="block h-full group">
                                    <div className={`bg-white border flex-1 border-slate-200/80 rounded-[20px] sm:rounded-[24px] p-5 sm:p-6 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] ${tClass.borderHighlight} transition-all duration-300 h-full flex flex-col items-start translate-y-0 hover:-translate-y-1.5 relative overflow-hidden ${isActiveSlide ? activeThemeClasses.card : ""} ${isMobileActive ? activeThemeClasses.card : ""}`}>

                                        <div className={`absolute -right-12 -top-12 w-32 h-32 rounded-full opacity-[0.03] transition-transform duration-500 group-hover:scale-[1.8] group-hover:opacity-[0.06] ${theme === 'teal' ? 'bg-[#00c5a6]' : 'bg-[#ffc800]'} ${isActiveSlide ? activeThemeClasses.deco : ''} ${isMobileActive ? activeThemeClasses.deco : ''}`} />

                                        <div className="flex gap-4 items-start w-full mb-5 relative z-10">
                                            <div className="relative w-[80px] h-[80px] rounded-full overflow-hidden shrink-0 shadow-sm border-2 border-white ring-1 ring-slate-100">
                                                <Image
                                                    src={specialist.image}
                                                    alt={specialist.name}
                                                    fill
                                                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                                    sizes="80px"
                                                />
                                                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#00c5a6] border-2 border-white rounded-full"></div>
                                            </div>
                                            <div className="pt-1 flex-1 min-w-0">
                                                <h3 className={`font-bold text-[18px] text-[#121117] leading-tight ${tClass.text} transition-colors truncate ${isActiveSlide ? activeThemeClasses.text : ""} ${isMobileActive ? activeThemeClasses.text : ""}`}>{specialist.name}</h3>
                                                <p className="text-[14px] text-[#69686f] font-medium mt-1 truncate">{specialist.specialization}</p>
                                                <div className="flex items-center gap-1.5 mt-2.5 bg-[#fff8e1]/80 w-fit px-2 py-0.5 rounded-[6px] border border-[#ffc800]/20">
                                                    <Star className="w-3.5 h-3.5 fill-[#ffc800] text-[#ffc800]" />
                                                    <span className="text-[13px] font-bold text-[#f57c00] leading-none">{specialist.rating}</span>
                                                    <span className="text-[12px] font-medium text-[#f57c00]/80 border-l border-[#f57c00]/20 pl-1.5 ml-0.5 leading-none">
                                                        {specialist.reviews}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-4 w-full relative z-10 flex-1">
                                            <div className="flex items-center gap-2 mb-2 text-[13px] text-[#69686f] font-medium">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
                                                <span>Викладає {specialist.subjects.length} {specialist.subjects.length === 1 ? 'предмет' : 'предмети'}</span>
                                            </div>
                                            <div className="flex flex-wrap items-start gap-1.5">
                                                {specialist.subjects.slice(0, 3).map((subject: string, idx: number) => (
                                                    <span key={idx} className={`bg-[#f0f3f3] text-[#4d4c53] px-2 py-1 rounded-lg text-[12px] font-[600] leading-tight border border-slate-100 transition-colors ${tClass.bg} ${tClass.text} ${tClass.borderHighlight} ${isActiveSlide ? activeThemeClasses.chip : ""} ${isMobileActive ? activeThemeClasses.chip : ""}`}>
                                                        {subject}
                                                    </span>
                                                ))}
                                                {specialist.subjects.length > 3 && (
                                                    <span className={`bg-[#f0f3f3] text-[#4d4c53] px-2 py-1 rounded-lg text-[12px] font-[600] leading-tight border border-slate-100 transition-colors ${tClass.bg} ${tClass.text} ${tClass.borderHighlight} ${isActiveSlide ? activeThemeClasses.chip : ""} ${isMobileActive ? activeThemeClasses.chip : ""}`}>
                                                        +{specialist.subjects.length - 2}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex flex-col mt-auto w-full relative z-10 pt-2">
                                            <div className={`flex items-center justify-between pt-3 border-t border-gray-100 w-full group-hover:border-slate-200 transition-colors ${isActiveSlide ? activeThemeClasses.divider : ""} ${isMobileActive ? activeThemeClasses.divider : ""}`}>
                                                <div>
                                                    <span className="text-[20px] font-bold text-[#121117]">₴{specialist.price}</span>
                                                    <span className="text-[13px] text-[#69686f] ml-1 font-medium">/ 50 хв</span>
                                                </div>
                                                <div className={`px-4 py-2 rounded-[10px] text-[14px] font-[700] transition-all duration-300 flex items-center gap-1.5 shrink-0 ${isMobileActive ? activeThemeClasses.arrow : `${tClass.arrowBg} ${tClass.arrowText}`}`}>
                                                    Детальніше
                                                    <ArrowRight className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
