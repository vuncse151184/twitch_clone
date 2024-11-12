import { clerkMiddleware } from '@clerk/nextjs/server'
import { NextResponse, NextRequest } from 'next/server'

const publicRoutes = ['/api/webhooks', '/']; // Define public routes

export default clerkMiddleware({ publicRoutes: ['/api/webhooks(.*)', '/'] });


export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
