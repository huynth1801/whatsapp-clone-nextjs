import Image from 'next/image'
import { getTokens } from 'next-firebase-auth-edge'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import Sidebar from '@/components/Sidebar/Sidebar'
import { firebaseConfig, serverConfig } from '@/config/firebase'

export default async function Home() {
  const token = await getTokens(cookies(), {
    apiKey: firebaseConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  })

  if (!token) {
    notFound()
  }
  return (
    <main>
      <Sidebar />
    </main>
  )
}
