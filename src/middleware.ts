import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { defaultLang, isValidLang } from "@/lib/i18n"

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Redirect root to default language
  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${defaultLang}`, request.url))
  }

  // If first segment looks like a lang code (2 chars) but is invalid, redirect to default
  const segment = pathname.split("/")[1]
  if (segment?.length === 2 && !isValidLang(segment)) {
    const rest = pathname.slice(segment.length + 1) || "/"
    return NextResponse.redirect(new URL(`/${defaultLang}${rest ? "/" + rest : ""}`, request.url))
  }

  return NextResponse.next()
}
