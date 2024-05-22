import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';


const routeMatcher = createRouteMatcher([
    '/auth(.*)',
])

export default clerkMiddleware((auth, req)=> {
    if (!routeMatcher(req)) auth().protect();
})

export const config = {
    // The following matcher runs middleware on all routes
    // except static assets.
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};