import { NextRequest, NextResponse } from "next/server"
import { locales, defaultLocale } from "@/lib/i18n/config"

const PUBLIC_FILE = /\.(.*)$/

export function middleware(request: NextRequest) {
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

  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname}`
  const response = NextResponse.rewrite(url)
  response.headers.set("x-locale", defaultLocale)
  return response
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
}
