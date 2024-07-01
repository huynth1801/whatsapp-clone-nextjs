'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/config/firebase'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const StyledContainer = styled.main`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  padding: 32px;
`

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    setError('')

    if (password !== confirmation) {
      setError("Password don't match")
      return
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password)
      router.push('/login')
    } catch (e) {
      setError((e as Error).message)
    }
  }

  return <StyledContainer></StyledContainer>
}
