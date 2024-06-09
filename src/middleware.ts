import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';


const routeMatcher = createRouteMatcher([
    "/auth(.*)",
    "/api(.*)",
])

export default clerkMiddleware((auth, req) => {
    if (!routeMatcher(req)) auth().protect();
})

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};