import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware for cookie-based session persistence and route protection.
 * Using @supabase/ssr ensure that the session is correctly updated and synchronized.
 */
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // This is required to refresh and write cookies back
  const { data: { user } } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // 1. If user visits /admin/* (excluding login) and has NO user session
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!user) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    
    // Strict Access Control: only allow test-admin@cakehouse.com
    if (user.email !== 'test-admin@cakehouse.com') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // 2. If user visits /admin/login and already HAS a user session
  if (pathname === '/admin/login' && user && user.email === 'test-admin@cakehouse.com') {
    return NextResponse.redirect(new URL('/admin/orders', request.url))
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*'],
};
