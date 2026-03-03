import { NextRequest, NextResponse } from "next/server"

const locales = ["uk", "en", "ru"] as const
const defaultLocale = "uk"

const PUBLIC_FILE = /\.(.*)$/

export function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl

    if (
      pathname.startsWith("/_next") ||
      pathname.startsWith("/api") ||
      PUBLIC_FILE.test(pathname)
    ) {
      return NextResponse.next()
    }

    const pathnameLocale = locales.find(
      (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (pathnameLocale) {
      const response = NextResponse.next()
      response.headers.set("x-locale", pathnameLocale)
      return response
    }

    const url = new URL(`/${defaultLocale}${pathname === "/" ? "" : pathname}`, request.url)
    url.search = request.nextUrl.search
    
    const response = NextResponse.rewrite(url)
    response.headers.set("x-locale", defaultLocale)
    return response
  } catch (err) {
    console.error("Middleware error:", err)
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
}
