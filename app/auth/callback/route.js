# OAuth Callback Handler for Convert Pro

```javascript
// app/auth/callback/route.js

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
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
        // Redirect to home with error parameter
        return NextResponse.redirect(new URL('/?error=auth_error', request.url));
      }

      // Success - redirect to intended destination or home
      return NextResponse.redirect(new URL(next, request.url));
      
    } catch (error) {
      console.error('Auth exchange error:', error);
      return NextResponse.redirect(new URL('/?error=auth_failed', request.url));
    }
  }

  // No code parameter, redirect to home
  return NextResponse.redirect(new URL('/', request.url));
}
```

## Alternative Middleware Approach (Optional):

```javascript
// middleware.js (in root of project)

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Handle auth callback
  if (req.nextUrl.pathname === '/auth/callback') {
    const code = req.nextUrl.searchParams.get('code');
    
    if (code) {
      await supabase.auth.exchangeCodeForSession(code);
    }
    
    return NextResponse.redirect(new URL('/', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/auth/callback', '/((?!api|_next/static|_next/image|favicon.ico).*)']
};
```

## Usage in Supabase Dashboard:

### Google OAuth Setup:
1. Go to Google Cloud Console
2. Create OAuth 2.0 credentials
3. Authorized redirect URIs:
   ```
   https://your-supabase-project.supabase.co/auth/v1/callback
   ```
4. Add Client ID & Secret to Supabase

### GitHub OAuth Setup:
1. Go to GitHub â†’ Settings â†’ Developer settings â†’ OAuth Apps
2. New OAuth App
3. Authorization callback URL:
   ```
   https://your-supabase-project.supabase.co/auth/v1/callback
   ```
4. Add Client ID & Secret to Supabase

### Site URL Configuration in Supabase:
```
Site URL: https://your-domain.vercel.app
Additional redirect URLs: 
- https://your-domain.vercel.app/auth/callback
- https://localhost:3000 (for development)
- https://localhost:3000/auth/callback (for development)
```
