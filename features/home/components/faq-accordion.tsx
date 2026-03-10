"use client"

import { ChevronDown } from "lucide-react"
import { useState } from "react"

export interface FaqItem {
    q: string
    a: string
}

export function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
    const [openFaq, setOpenFaq] = useState<number | null>(0)

    return (
        <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 overflow-hidden">
            {faqs.map((faq, idx) => (
                <div key={faq.q} className="border-b border-gray-100 last:border-0">
                    <button
                        className={`w-full py-6 px-6 sm:px-8 flex items-center justify-between text-left font-[700] text-[18px] transition-colors duration-200 ${
                            openFaq === idx ? "text-[#00c5a6] bg-slate-50/50" : "text-[#121117] hover:bg-slate-50/50"
                        }`}
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    >
                        <span className="pr-4">{faq.q}</span>
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                                openFaq === idx ? "bg-[#e8fffb] text-[#00c5a6]" : "bg-slate-100 text-slate-500"
                            }`}
                        >
                            <ChevronDown
                                className={`h-5 w-5 transition-transform duration-300 ${openFaq === idx ? "rotate-180" : ""}`}
                            />
                        </div>
                    </button>
                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            openFaq === idx ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                        }`}
                    >
                        <div className="pb-8 px-6 sm:px-8 pt-2">
                            <p className="text-[16px] text-[#69686f] leading-relaxed font-medium">{faq.a}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
