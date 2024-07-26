// import { NextRequest, NextResponse } from 'next/server'
// import {
//   authMiddleware,
//   redirectToHome,
//   redirectToLogin,
// } from 'next-firebase-auth-edge'
// import { clientConfig, serverConfig } from '@/config/config'

// const PUBLIC_PATHS = ['/register', '/login']

// export async function middleware(request: NextRequest) {
//   return authMiddleware(request, {
//     loginPath: '/api/login',
//     logoutPath: '/api/logout',
//     apiKey: clientConfig.apiKey,
//     cookieName: 'AuthToken',
//     cookieSignatureKeys: serverConfig.cookieSignatureKeys,
//     cookieSerializeOptions: serverConfig.cookieSerializeOptions,
//     serviceAccount: serverConfig.serviceAccount,
//     handleValidToken: async ({ token, decodedToken }, headers) => {
//       console.log('Valid token:', token)
//       console.log('Decoded token:', decodedToken)
//       if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
//         return redirectToHome(request)
//       }

//       return NextResponse.next({
//         request: {
//           headers,
//         },
//       })
//     },

//     handleInvalidToken: async reason => {
//       console.info('Missing or malformed credentials', { reason })

//       return redirectToLogin(request, {
//         path: '/login',
//         publicPaths: PUBLIC_PATHS,
//       })
//     },
//     handleError: async error => {
//       console.error('Unhandled authentication error', { error })

//       return redirectToLogin(request, {
//         path: '/login',
//         publicPaths: PUBLIC_PATHS,
//       })
//     },
//   })
// }

// export const config = {
//   matcher: [
//     '/',
//     '/api/login',
//     '/api/logout',
//     '/((?!_next/static|favicon.ico).*)',
//   ],
// }
