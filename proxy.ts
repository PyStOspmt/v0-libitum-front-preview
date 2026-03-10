import { NextRequest, NextResponse } from "next/server"

import { defaultLocale, locales } from "@/lib/i18n/config"

const PUBLIC_FILE = /\.(.*)$/

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl

    console.log("Middleware request for:", pathname)

    const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

    if (pathnameHasLocale) {
        const localeInPath = locales.find((l) => pathname.startsWith(`/${l}`)) || defaultLocale
        const response = NextResponse.next()
        response.headers.set("x-locale", localeInPath)
        return response
    }

    const url = request.nextUrl.clone()
    url.pathname = `/${defaultLocale}${pathname}`

    if (pathname === `/${defaultLocale}${pathname}`) {
        return NextResponse.next()
    }

    const response = NextResponse.rewrite(url)
    response.headers.set("x-locale", defaultLocale)

    return response
}

export const config = {
    matcher: ["/((?!api|graphql|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
}
