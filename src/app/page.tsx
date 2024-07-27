'use client'
import Image from 'next/image'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Sidebar from '@/components/Sidebar/Sidebar'
import { clientConfig, serverConfig } from '@/config/config'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function Home() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  useEffect(() => {
    const setUserInDb = async () => {
      try {
        await setDoc(
          doc(db, 'users', user?.uid as string),
          {
            email: user?.email,
            lastSeen: serverTimestamp(),
            photoURL: user?.photoURL,
          },
          {
            merge: true,
          },
        )
      } catch (error) {
        console.error('Error setting user info in DB', error)
      }
    }

    if (user) {
      setUserInDb()
    }
  }, [user])

  if (!user) return null

  return (
    <main>
      <Sidebar email={user.email!} />
      {/* <h1>Welcome to your dashboard, {user.email}!</h1>; */}
    </main>
  )
}
