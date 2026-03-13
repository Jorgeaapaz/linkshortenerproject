---
description: Read this before implementing or modifying any authentication-related features. This file outlines the rules and best practices for using Clerk as the sole authentication provider in this application.
---

# Authentication — Clerk

All authentication in this application is handled exclusively by **Clerk**. No other auth libraries, custom session logic, or alternative providers should be used.

---

## Rules

- **Clerk is the only auth method.** Never implement custom authentication, NextAuth, or any other auth solution.
- **Sign in and sign up must always open as a modal.** Never route to a dedicated sign-in or sign-up page. Use Clerk's `<SignInButton mode="modal">` and `<SignUpButton mode="modal">`.
- **`/dashboard` is a protected route.** Users who are not authenticated must not be able to access it. Enforce this via Clerk middleware.
- **Redirect authenticated users away from `/`.** If a logged-in user visits the homepage, redirect them to `/dashboard`.

---

## Middleware

Use Clerk's `clerkMiddleware` in `proxy.ts` to protect routes and handle redirects. DO NOT create a middleware.ts file use proxy.ts

```ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // Redirect authenticated users away from homepage
  if (userId && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Protect dashboard routes
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
```

---

## Sign In / Sign Up Buttons

Always use Clerk's modal mode for auth triggers:

```tsx
import { SignInButton, SignUpButton } from "@clerk/nextjs";

<SignInButton mode="modal">
  <button>Sign In</button>
</SignInButton>

<SignUpButton mode="modal">
  <button>Sign Up</button>
</SignUpButton>
```

---

## Accessing the Current User

- **Server Components / Server Actions:** use `auth()` or `currentUser()` from `@clerk/nextjs/server`.
- **Client Components:** use `useAuth()` or `useUser()` from `@clerk/nextjs`.

Always scope database queries to the authenticated `userId` returned by Clerk.
