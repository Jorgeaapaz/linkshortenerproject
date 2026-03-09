# AGENTS.md — LLM Coding Instructions

This file is the entry point for AI agents and LLMs working in this repository. It defines the coding standards, architectural patterns, and conventions that **must** be followed when reading, writing, or modifying code.

**You MUST read all referenced `/docs` documents before making any changes to the codebase. This is mandatory — do not generate any code until you have read the relevant instruction files.**

---

## Project Summary

A link-shortener web application. Authenticated users can create, manage, and track shortened URLs. Built with Next.js 16 App Router, TypeScript, Drizzle ORM on Neon (PostgreSQL), Clerk authentication, and shadcn/ui components styled with Tailwind CSS v4.

---

## Documentation Index

> ⚠️ **CRITICAL — NON-NEGOTIABLE**: You **MUST** read the relevant `/docs` instruction file(s) in full **BEFORE writing a single line of code**. Skipping this step is not permitted under any circumstance, regardless of how simple or familiar the task appears. If a task touches authentication, UI, database, or any other documented domain, open and read the corresponding file first.

For detailed guidelines on specific topics, refer to the modular documentation in the `/docs` directory:

| Document | Contents |
|---|---|
| [docs/auth.md](docs/auth.md) | Clerk authentication, protected routes, modal sign-in/sign-up, middleware, accessing current user |
| [docs/ui.md](docs/ui.md) | shadcn/ui components, never building custom primitives, extending components, icons, `cn()` usage |


---

## Non-Negotiable Rules

These rules apply everywhere in the codebase. No exception unless explicitly noted in a referenced document.

1. **TypeScript strict mode** is enabled. No `any` types, no non-null assertions on external data.
2. **Use `cn()` from `@/lib/utils`** for all Tailwind class composition — never string concatenation.
3. **Never import `@/db` in a Client Component** or any `"use client"` file. Database access is server-side only.
4. **Scope every database query to the authenticated `userId`** to prevent cross-user data access.
5. **Use `@/` path aliases** — never use deep relative paths (`../../`) to cross directory boundaries.
6. **Do not edit `components/ui/`** (shadcn-generated). Wrap or extend these components instead.
7. **Do not expose secrets** in client-side code or `NEXT_PUBLIC_` variables.
8. **Use Server Actions for mutations** triggered from the UI rather than building an API route.
9. **Default to Server Components.** Add `"use client"` only when browser APIs, state, or event handlers require it.
10. **All database queries use Drizzle's query builder.** No raw SQL strings, no string interpolation of user input.
