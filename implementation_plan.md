# Implementation Plan - Fix Build and Prisma Errors

This plan addresses the current build failures and Prisma Client resolution issues.

## Problem Analysis
1.  **Prisma Client Resolution**: The IDE reports that `@prisma/client` has no exported member `PrismaClient`. This usually happens when the client is generated into a non-standard location or when `node_modules` is out of sync.
2.  **Build Crash**: The build fails during static optimization with a `useState` null error. This often points to a mismatch in React environments or Client Components being improperly rendered during static generation.
3.  **Layout Error**: The current `layout.tsx` uses `next/dynamic` with `ssr: false`, which is invalid in a Server Component.

## Proposed Changes

### 1. Fix Prisma Client Generation
- Ensure `prisma/schema.prisma` is using the default output.
- Run a clean generate to ensure it lands in `@prisma/client`.
- Fix `scripts/test-db.ts` if the import is actually broken.

### 2. Fix Layout and Static Generation
- Revert `layout.tsx` to use standard imports.
- Add `export const dynamic = 'force-dynamic'` to `src/app/not-found.tsx` to prevent it from trying to statically generate if it's hitting Hook issues.
- Ensure all Client Components used in the layout are properly initialized.

### 3. Resolve ESLint Obstacles
- Fix any remaining unused variables or type errors that block the build.

## Verification Plan
1.  Run `npx prisma generate` and verify the output location.
2.  Run `npm run build` locally.
3.  Verify that the application starts with `npm run dev`.
