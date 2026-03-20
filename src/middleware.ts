import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/2026/dashboard(.*)",
  "/2026/onboarding(.*)",
]);

const isAdminProtectedRoute = createRouteMatcher([
  "/2026/admin/teams(.*)",
  "/2026/admin/individuals(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // Admin cookie check before Clerk auth
  if (isAdminProtectedRoute(req)) {
    const adminSession = req.cookies.get("admin_session");
    if (adminSession?.value !== "authenticated") {
      return NextResponse.redirect(new URL("/2026/admin", req.url));
    }
  }

  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
