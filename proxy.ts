import { NextRequest, NextResponse } from "next/server"

const SESSION_COOKIE = "session_id"

const PROTECTED_ROUTES = ["/profile", "/cart", "/checkout", "/custom-order"]
const SELLER_ROUTES = ["/seller"]
const ADMIN_ROUTES = ["/admin"]
const GUEST_ONLY_ROUTES = ["/login", "/register", "/forgot-password"]

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionId = request.cookies.get(SESSION_COOKIE)?.value
  const isLoggedIn = !!sessionId

  // Guest-only: redirect về home nếu đã đăng nhập
  if (GUEST_ONLY_ROUTES.some((r) => pathname.startsWith(r)) && isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Protected: redirect về login nếu chưa đăng nhập
  if (PROTECTED_ROUTES.some((r) => pathname.startsWith(r)) && !isLoggedIn) {
    const url = new URL("/login", request.url)
    url.searchParams.set("redirect", pathname)
    return NextResponse.redirect(url)
  }

  // Seller & Admin: redirect về login nếu chưa đăng nhập
  // Role check thực sự xảy ra ở page/layout level qua getSession()
  if (
    [...SELLER_ROUTES, ...ADMIN_ROUTES].some((r) => pathname.startsWith(r)) &&
    !isLoggedIn
  ) {
    const url = new URL("/login", request.url)
    url.searchParams.set("redirect", pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/cart/:path*",
    "/checkout/:path*",
    "/custom-order/:path*",
    "/seller/:path*",
    "/admin/:path*",
    "/login",
    "/register",
    "/forgot-password",
  ],
}
