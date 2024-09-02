import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "../auth.config"
import { prisma } from "./libs/prisma"

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async session({token, session}) {
     if(token.sub && session.user) {
      session.user.id = token.sub
     }
     return session;
    }
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt", },
  ...authConfig,
})

// import { NextResponse } from "next/server";
// import { auth } from "./auth";
// import { publicRoutes } from "./routes";

// export default auth (req => {
//     const {nextUrl} = req;
//     const isLoggedIn = !!req.auth;

//     const isPublic = publicRoutes.includes(nextUrl.pathname)
//     const isAuthRoute = publicRoutes.includes(nextUrl.pathname)

//     if(isPublic) {
//         return NextResponse.next()
//     }

//     if(isAuthRoute) {
//         if(isLoggedIn) {
//             return NextResponse.redirect(new URL('/members', nextUrl))
//         }
//         return NextResponse.next();
//     }

//     if(!isPublic && !isLoggedIn) {
//         return NextResponse.redirect(new URL('/auth/login', nextUrl))
//     }

//     return NextResponse.next()
// }) 

// export const config ={
//     matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',]
