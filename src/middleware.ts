import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';


const routeMatcher = createRouteMatcher([
    "/auth(.*)",
    "/api(.*)",
])

export default clerkMiddleware(async (auth, req) => {
    if (!routeMatcher(req)) await auth.protect();
})

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};