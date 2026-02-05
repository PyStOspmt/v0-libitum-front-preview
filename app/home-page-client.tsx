"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import {
  ArrowRight,
  BookOpen,
  Brain,
  Check,
  ChevronDown,
  MessageSquare,
  Play,
  Search,
  Star,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth-context"
import { useTranslation } from "@/lib/i18n"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function HomePageClient() {
  const { user } = useAuth()
  const { t } = useTranslation(user?.language || "UA")
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const specialistHref = user?.role === "client" ? "/client/requests/new" : "/specialists"

  const features = [
    { icon: "📚", title: "Personalized Approach", color: "bg-emerald-100" },
    { icon: "👥", title: "3-4 People In Each Group", color: "bg-orange-100" },
    { icon: "🎯", title: "Easy And Fun Modules", color: "bg-amber-100" },
    { icon: "💬", title: "School Lesson Support", color: "bg-teal-100" },
  ]

  const advantages = [
    {
      title: "Flexible training schedule",
      tag: "CLASS TIME",
      tagColor: "bg-emerald-500",
      description: "It's ideal for busy people who want to balance language learning with their work and personal life.",
    },
    {
      title: "Personalized approach",
      tag: "ACHIEVE GOALS QUICKLY", 
      tagColor: "bg-emerald-500",
      description: "Each student receives an individual learning plan based on their goals and current level.",
    },
    {
      title: "Access to quality resources",
      tag: "IMPROVING KNOWLEDGE",
      tagColor: "bg-emerald-500", 
      description: "Get access to modern educational materials, interactive exercises, and video lessons.",
    },
  ]

  const plans = [
    {
      lessons: "4 LESSONS",
      name: "STARTER PACK",
      price: "990 UAH",
      oldPrice: null,
      features: ["4 grammar and vocabulary lessons", "Access to educational materials", "Homework with verification", "Recommendations for further learning", "Teacher support"],
      highlight: false,
      buttonStyle: "bg-slate-900 text-white",
    },
    {
      lessons: "12 LESSONS",
      name: "PROGRESS PACK",
      price: "2199 UAH",
      oldPrice: "2590",
      badge: "WOW! BEST OFFER",
      features: ["24 lessons with an average load", "Access to educational materials", "Homework with detailed review", "Regular tests to track progress", "Personalized sessions"],
      highlight: true,
      buttonStyle: "bg-emerald-600 text-white",
    },
    {
      lessons: "24 LESSONS",
      name: "MASTERY PACK",
      price: "5199 UAH",
      oldPrice: null,
      features: ["24 lessons with in-depth study", "Access to advanced materials", "Intensive homework with feedback", "Monthly tests and progress reports", "Preparation for exams"],
      highlight: false,
      buttonStyle: "bg-emerald-600 text-white",
    },
  ]

  const faqs = [
    { q: "What level of English can I achieve by studying at your school?", a: "At our school, you can reach any level, from beginner to advanced, thanks to an individualized approach and effective methods." },
    { q: "How long will the course take to become fluent in English?", a: "Depending on your level and intensity, significant results can be achieved in as little as 3-6 months of regular lessons." },
    { q: "Can I combine my studies with work or university studies?", a: "Yes, our courses are flexible, with the ability to choose your own class times, including weekends." },
    { q: "Do I need any special knowledge to start studying?", a: "No, we offer courses for any level, even for complete beginners, and we will select a program just for you." },
    { q: "What makes your school special?", a: "Modern methods, individual approach, experienced teachers, and interactive platforms make our training effective and interesting." },
    { q: "Can I try your lessons before signing up for a course?", a: "Yes, we offer a free trial lesson so that you can evaluate our approach and quality of instruction." },
  ]

  return (
    <div className="min-h-screen bg-emerald-50/30">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-9 w-9 overflow-hidden rounded-xl">
                <Image src="/logo-education.jpg" alt="Libitum" fill className="object-cover" />
              </div>
              <span className="text-lg font-bold text-slate-900">LIBITUM</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              <Link href={specialistHref} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                Teachers
              </Link>
              <Link href="#about" className="text-sm font-medium text-slate-600 hover:text-slate-900 border-b-2 border-slate-900 pb-0.5 transition-colors">
                About us
              </Link>
              <Link href="#contact" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                Contacts
              </Link>
              <Link href="#plans" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                Plans
              </Link>
              <LanguageSwitcher />
            </nav>

            <div className="flex items-center gap-3">
              {user ? (
                <Link href={user.role === "specialist" ? "/tutor" : user.role === "admin" ? "/admin" : "/client"}>
                  <Button className="h-9 rounded-full bg-emerald-600 px-5 text-sm font-medium text-white hover:bg-emerald-700">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline" className="h-9 rounded-full px-5 text-sm font-medium border-slate-300">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="h-9 rounded-full bg-emerald-600 px-5 text-sm font-medium text-white hover:bg-emerald-700">
                      Create Account
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative py-8 px-4 lg:px-8">
          <div className="container mx-auto">
            {/* Main Hero Card */}
            <div className="relative bg-white rounded-[2rem] p-8 lg:p-12 overflow-hidden">
              {/* Decorative shapes - flat, no blur */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100 rounded-full translate-x-1/3 -translate-y-1/3" />
              <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-amber-100 rounded-full translate-y-1/2" />
              <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-teal-100 rounded-full" />
              
              {/* Organic blob shape */}
              <svg className="absolute right-20 top-20 w-64 h-64 text-emerald-100/80" viewBox="0 0 200 200">
                <path fill="currentColor" d="M45.3,-51.2C58.3,-40.9,68.1,-25.5,71.2,-8.5C74.3,8.5,70.6,27.1,60.1,40.3C49.6,53.5,32.3,61.3,14.1,66.1C-4.1,70.9,-23.2,72.7,-39.7,66.1C-56.2,59.5,-70.1,44.5,-75.4,27C-80.7,9.5,-77.4,-10.5,-68.4,-26.3C-59.4,-42.1,-44.7,-53.7,-29.5,-63.2C-14.3,-72.7,1.4,-80.1,15.7,-77.3C30,-74.5,32.3,-61.5,45.3,-51.2Z" transform="translate(100 100)" />
              </svg>

              <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div>
                  <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-[1.1] font-heading">
                    The easiest way
                    <br />
                    to learn English
                  </h1>

                  <Link href={specialistHref}>
                    <Button className="h-12 rounded-full bg-emerald-600 pl-6 pr-4 text-base font-semibold text-white hover:bg-emerald-700 gap-2 mb-10">
                      GET FREE LESSON
                      <span className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </Button>
                  </Link>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-xl ${feature.color} flex items-center justify-center text-lg`}>
                          {feature.icon}
                        </div>
                        <span className="text-sm font-medium text-slate-700">{feature.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Content - Floating Cards */}
                <div className="relative h-[400px] hidden lg:block">
                  {/* Main teacher card */}
                  <div className="absolute top-0 right-0 bg-white rounded-2xl shadow-lg p-4 w-56">
                    <div className="relative h-32 bg-emerald-100 rounded-xl mb-3 overflow-hidden">
                      <div className="absolute bottom-2 left-2 bg-emerald-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <Play className="h-3 w-3 fill-white" />
                      </div>
                    </div>
                    <div className="font-semibold text-slate-900">Ivan Shevchenko</div>
                    <div className="text-xs text-slate-500">13 Years Old</div>
                  </div>

                  {/* Second card */}
                  <div className="absolute top-24 left-0 bg-white rounded-2xl shadow-lg p-4 w-52">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="relative h-16 w-16 bg-amber-100 rounded-xl overflow-hidden">
                        <div className="absolute bottom-1 left-1 bg-emerald-600 text-white text-[10px] p-1 rounded-full">
                          <Play className="h-2.5 w-2.5 fill-white" />
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 text-sm">Olga Petrenko and</div>
                        <div className="font-semibold text-slate-900 text-sm">Oleksandr Honchar</div>
                        <div className="text-xs text-slate-500">Peers Of 8 Years Old</div>
                      </div>
                    </div>
                  </div>

                  {/* Third card */}
                  <div className="absolute bottom-0 right-8 bg-white rounded-2xl shadow-lg p-4 w-48">
                    <div className="relative h-24 bg-rose-100 rounded-xl mb-3 overflow-hidden">
                      <div className="absolute bottom-2 left-2 bg-emerald-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <Play className="h-3 w-3 fill-white" />
                      </div>
                    </div>
                    <div className="font-semibold text-slate-900 text-sm">Maria Kovalchuk</div>
                    <div className="text-xs text-slate-500">16 Years Old</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Advantages Section */}
        <section id="about" className="py-16 px-4 lg:px-8">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 font-heading">Our advantages</h2>
              <div className="flex gap-2">
                <button className="h-10 w-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50">
                  <ChevronDown className="h-5 w-5 -rotate-90" />
                </button>
                <button className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center text-white">
                  <ChevronDown className="h-5 w-5 rotate-90" />
                </button>
              </div>
            </div>

            {/* Advantage Card */}
            <div className="relative bg-gradient-to-br from-teal-50 to-emerald-50 rounded-[2rem] p-8 lg:p-12 overflow-hidden">
              {/* Decorative blob */}
              <svg className="absolute left-0 top-0 w-96 h-96 text-emerald-200/50" viewBox="0 0 200 200">
                <path fill="currentColor" d="M47.5,-57.2C59.5,-47.3,65.8,-30.6,68.6,-13.3C71.4,4,70.8,22,62.5,35.5C54.2,49,38.2,58,21.3,63.3C4.4,68.6,-13.4,70.2,-29.3,65.1C-45.2,60,-59.2,48.2,-66.8,33.1C-74.4,18,-75.6,-0.4,-70.8,-16.5C-66,-32.6,-55.2,-46.4,-41.8,-56C-28.4,-65.6,-12.4,-71,2.6,-74.2C17.6,-77.4,35.5,-67.1,47.5,-57.2Z" transform="translate(100 100)" />
              </svg>

              <div className="relative z-10 grid lg:grid-cols-2 gap-12">
                <div>
                  <div className="inline-block bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4">
                    FIRST LESSON
                  </div>
                  <h3 className="text-4xl font-bold text-slate-900 mb-4 font-heading">free</h3>
                  <p className="text-slate-600 leading-relaxed max-w-md">
                    It gives you the opportunity to experience our teaching style and see how our courses can help you achieve your language goals.
                  </p>
                </div>

                <div className="flex items-center justify-center">
                  <div className="relative">
                    <div className="bg-white rounded-2xl shadow-lg p-6 w-72">
                      <div className="h-40 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl mb-4" />
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-2">
                          <Play className="h-5 w-5 text-emerald-600 fill-emerald-600" />
                          <span className="text-sm text-slate-500">3 min</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Trust Us */}
        <section className="py-16 px-4 lg:px-8">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 font-heading">
                Why you <span className="text-emerald-600">(LIBITUM)</span> can trust us
              </h2>
            </div>

            <div className="space-y-4">
              {advantages.map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 flex items-center gap-6 hover:shadow-md transition-shadow">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-500 text-sm">{item.description}</p>
                  </div>
                  <div className={`${item.tagColor} text-white text-xs font-bold px-4 py-2 rounded-full whitespace-nowrap`}>
                    {item.tag}
                  </div>
                  <div className="w-32 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="plans" className="py-16 px-4 lg:px-8">
          <div className="container mx-auto">
            <div className="text-center mb-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 font-heading mb-4">
                Choose your ideal
                <br />
                knowledge investment!
              </h2>
            </div>

            {/* Toggle */}
            <div className="flex justify-center gap-2 mb-12">
              <button className="px-6 py-2.5 rounded-full bg-slate-100 text-sm font-medium text-slate-900">
                Personal lessons
              </button>
              <button className="px-6 py-2.5 rounded-full text-sm font-medium text-slate-500 hover:bg-slate-50">
                Group classes
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {plans.map((plan, i) => (
                <div 
                  key={i} 
                  className={`relative rounded-3xl p-6 ${
                    plan.highlight 
                      ? "bg-emerald-600 text-white" 
                      : "bg-white border border-slate-200"
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 left-6 bg-lime-400 text-emerald-900 text-xs font-bold px-3 py-1 rounded-full">
                      {plan.badge}
                    </div>
                  )}

                  <div className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-4 ${
                    plan.highlight ? "bg-white/20 text-white" : "bg-emerald-50 text-emerald-700"
                  }`}>
                    {plan.lessons}
                  </div>

                  <h3 className={`text-lg font-bold mb-2 ${plan.highlight ? "text-white" : "text-emerald-700"}`}>
                    {plan.name}
                  </h3>
                  
                  <p className={`text-sm mb-4 ${plan.highlight ? "text-white/80" : "text-slate-500"}`}>
                    for those who want to start learning
                  </p>

                  <div className="flex items-baseline gap-2 mb-6">
                    {plan.oldPrice && (
                      <span className={`text-sm line-through ${plan.highlight ? "text-white/60" : "text-slate-400"}`}>
                        {plan.oldPrice}
                      </span>
                    )}
                    <span className={`text-3xl font-bold ${plan.highlight ? "text-white" : "text-slate-900"}`}>
                      {plan.price}
                    </span>
                  </div>

                  <Button className={`w-full h-11 rounded-full font-semibold mb-6 ${
                    plan.highlight 
                      ? "bg-white text-emerald-700 hover:bg-white/90" 
                      : "bg-emerald-600 text-white hover:bg-emerald-700"
                  }`}>
                    TRY PACK
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <div className="space-y-3">
                    {plan.features.map((feature, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <Check className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                          plan.highlight ? "text-lime-300" : "text-emerald-600"
                        }`} />
                        <span className={`text-sm ${plan.highlight ? "text-white/90" : "text-slate-600"}`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 lg:px-8">
          <div className="container mx-auto">
            <div className="relative bg-gradient-to-br from-slate-50 to-emerald-50/50 rounded-[2rem] p-8 lg:p-12 overflow-hidden">
              {/* Decorative shapes */}
              <svg className="absolute right-0 top-0 w-64 h-64 text-emerald-100" viewBox="0 0 200 200">
                <path fill="currentColor" d="M39.5,-47.6C52.9,-37.3,66.8,-27.2,71.8,-13.6C76.8,0,72.9,17.1,64.1,30.8C55.3,44.5,41.6,54.8,26.5,60.7C11.4,66.6,-5.1,68.1,-20.3,64.1C-35.5,60.1,-49.4,50.6,-58.8,37.5C-68.2,24.4,-73.1,7.7,-71.4,-8.3C-69.7,-24.3,-61.4,-39.6,-49.3,-50.1C-37.2,-60.6,-21.3,-66.3,-5.3,-60.1C10.7,-53.9,26.1,-57.9,39.5,-47.6Z" transform="translate(100 100)" />
              </svg>

              <div className="relative z-10">
                <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 font-heading text-center mb-12">
                  Why do they
                  <br />
                  choose us?
                </h2>

                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {faqs.slice(0, 6).map((faq, i) => (
                    <div 
                      key={i}
                      className="bg-white rounded-2xl p-6 cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      <h3 className="font-bold text-slate-900 mb-2">{faq.q}</h3>
                      <p className={`text-sm text-slate-500 ${openFaq === i ? "" : "line-clamp-2"}`}>
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-10">
                  <Link href="#contact">
                    <Button variant="outline" className="h-11 rounded-full px-8 font-semibold border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                      FREE CONSULTATION
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 lg:px-8">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Left Card */}
              <div className="relative bg-emerald-600 rounded-[2rem] p-8 lg:p-10 overflow-hidden text-white">
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500 rounded-full translate-x-1/3 -translate-y-1/3" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="relative h-8 w-8 overflow-hidden rounded-lg">
                      <Image src="/logo-education.jpg" alt="Libitum" fill className="object-cover" />
                    </div>
                    <span className="font-bold">LIBITUM</span>
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-bold mb-4 font-heading">
                    Buy a ticket to a free
                    <br />
                    conversation club
                  </h3>

                  <p className="text-white/80 text-sm mb-6 max-w-sm">
                    Flexible schedule, native speakers, and personalized approach for comfortable language improvement.
                  </p>

                  <Button className="h-10 rounded-full bg-white text-emerald-700 hover:bg-white/90 font-semibold px-6">
                    Buy ticket
                  </Button>

                  <div className="flex gap-8 mt-8">
                    <div>
                      <div className="text-xs text-white/60 mb-1">When</div>
                      <div className="font-semibold">Every Saturday</div>
                    </div>
                    <div>
                      <div className="text-xs text-white/60 mb-1">Price</div>
                      <div className="font-semibold">UAH 0.00</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Card */}
              <div className="relative bg-slate-100 rounded-[2rem] p-8 lg:p-10 overflow-hidden">
                <div className="h-full flex items-center justify-center">
                  <div className="relative w-full max-w-sm">
                    <div className="bg-slate-200 rounded-2xl h-64 w-full flex items-center justify-center">
                      <div className="h-14 w-14 rounded-full bg-emerald-600 flex items-center justify-center">
                        <Play className="h-6 w-6 text-white fill-white ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 text-sm text-slate-600">
                      3 min
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-emerald-600 text-white py-12 px-4 lg:px-8 rounded-t-[2rem]">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="relative h-8 w-8 overflow-hidden rounded-lg bg-white">
                    <Image src="/logo-education.jpg" alt="Libitum" fill className="object-cover" />
                  </div>
                  <span className="font-bold">LIBITUM</span>
                </div>
                <p className="text-2xl font-bold mb-6">smart.english@com</p>
                <Button variant="outline" className="rounded-full border-white/30 text-white hover:bg-white/10">
                  WRITE IN TELEGRAM
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div>
                <p className="font-semibold mb-2">Learn with inspiration!</p>
                <p className="text-white/80 text-sm">Follow us for tips and motivation.</p>
              </div>

              <div className="flex flex-wrap gap-3">
                {["FACEBOOK", "INSTAGRAM", "YOUTUBE", "LINKEDIN", "TELEGRAM"].map(social => (
                  <span key={social} className="px-4 py-2 rounded-full border border-white/30 text-sm font-medium hover:bg-white/10 cursor-pointer transition-colors">
                    {social}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mt-12 pt-8 border-t border-white/20">
              <LanguageSwitcher />
              <nav className="flex gap-6 text-sm">
                <Link href="/specialists" className="hover:underline">Teachers</Link>
                <Link href="#about" className="hover:underline">About us</Link>
                <Link href="#contact" className="hover:underline">Contact</Link>
                <Link href="#plans" className="hover:underline">Plans</Link>
              </nav>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
