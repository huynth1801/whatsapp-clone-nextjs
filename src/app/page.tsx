'use client'
import Image from 'next/image'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Sidebar from '@/components/Sidebar/Sidebar'
import { clientConfig, serverConfig } from '@/config/config'

export default function Home() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  if (!user) return null

  return (
    <main>
      <Sidebar email={user.email!} />
      {/* <h1>Welcome to your dashboard, {user.email}!</h1>; */}
    </main>
  )
}
