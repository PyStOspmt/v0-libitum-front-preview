import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const locales = ["uk", "en", "ru"]
const defaultLocale = "uk"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {
    const locale = locales.find(
      (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
    )
    const response = NextResponse.next()
    if (locale) {
      response.headers.set("x-locale", locale)
    }
    return response
  }

  // Redirect if there is no locale
  request.nextUrl.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, images, favicon, api)
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
