import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Protected routes go here
const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/forum(.*)"]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
