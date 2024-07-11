import Image from 'next/image'
import { getTokens } from 'next-firebase-auth-edge'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import Sidebar from '@/components/Sidebar/Sidebar'
import { clientConfig, serverConfig } from '@/config/config'

export default async function Home() {
  const tokens = await getTokens(cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  })

  if (!tokens) {
    notFound()
  }
  return (
    <main>
      <Sidebar email={tokens?.decodedToken.email} />
    </main>
  )
}
