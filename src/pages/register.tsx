'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/config/firebase'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const StyledMain = styled.main`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  padding: 2rem;
`

const StyledContainer = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 28rem;
  padding: 2rem;
  margin-top: 0;
`

const StyledTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 1.4;
  color: #1f2937;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: medium;
  color: #1f2937;
`

const StyledInput = styled.input`
  background-color: #f9fafb;
  border: 1px solid #d1d5db;
  color: #1f2937;
  font-size: 0.875rem;
  border-radius: 0.5rem;
  padding: 0.625rem;
  width: 100%;
  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px #bfdbfe;
  }
`

const StyledErrorMessage = styled.div`
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  color: #b91c1c;
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin-top: 0.5rem;
`

const StyledButton = styled.button`
  width: 100%;
  background-color: #4b5563;
  color: white;
  font-weight: medium;
  font-size: 0.875rem;
  border-radius: 0.5rem;
  padding: 0.625rem;
  &:hover {
    background-color: #374151;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #c7d2fe;
  }
`

const StyledText = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
`

const StyledLink = styled.a`
  font-weight: medium;
  color: #4b5563;
  &:hover {
    text-decoration: underline;
  }
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

  return (
    <StyledMain>
      <StyledContainer>
        <StyledTitle>
          Pray tell, who be this gallant soul seeking entry to mine humble
          abode?
          <StyledForm onSubmit={handleSubmit} action="#">
            <div>
              <StyledLabel htmlFor="email">Your email</StyledLabel>
              <StyledInput
                type="email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                id="email"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <StyledLabel htmlFor="password">Password</StyledLabel>
              <StyledInput
                type="password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                id="password"
                placeholder="••••••••"
                required
              />
            </div>
            <div>
              <StyledLabel htmlFor="confirm-password">
                Confirm password
              </StyledLabel>
              <StyledInput
                type="password"
                name="confirm-password"
                value={confirmation}
                onChange={e => setConfirmation(e.target.value)}
                id="confirm-password"
                placeholder="••••••••"
                required
              />
            </div>
            {error && <StyledErrorMessage>{error}</StyledErrorMessage>}
            <StyledButton type="submit">Create an account</StyledButton>
            <StyledText>
              Already have an account? <Link href="/login">Login here</Link>
            </StyledText>
          </StyledForm>
        </StyledTitle>
      </StyledContainer>
    </StyledMain>
  )
}
