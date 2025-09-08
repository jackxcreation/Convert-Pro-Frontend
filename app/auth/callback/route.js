import { createRouteHandlerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') ?? '/';

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      
      if (error) {
        console.error('Auth callback error:', error);
        return NextResponse.redirect(new URL('/?error=auth_error', request.url));
      }

      return NextResponse.redirect(new URL(next, request.url));
      
    } catch (error) {
      console.error('Auth exchange error:', error);
      return NextResponse.redirect(new URL('/?error=auth_failed', request.url));
    }
  }

  return NextResponse.redirect(new URL('/', request.url));
}
