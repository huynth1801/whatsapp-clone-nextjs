import React, { FormEvent, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import Image from 'next/image'
import { Button } from '@mui/material'
import styled from 'styled-components'
import Whatsapplogo from '../assets/whatsapplogo.png'
import { app } from '../../firebase'

const StyledMain = styled.main`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
`

const StyledContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  padding: 2rem;
  text-align: center;
`

const StyledImageWrapper = styled.div`
  margin-bottom: 2rem;
`

const StyledTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1.5rem;
`

const StyledForm = styled.form`
  margin-top: 1rem;
  width: 100%;
`

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  text-align: left;
`

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: #555;
`

const StyledInput = styled.input`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  color: #333;
  font-size: 0.875rem;
  border-radius: 6px;
  width: 100%;
  padding: 0.75rem;
  transition: border-color 0.2s;

  &:focus {
    border-color: #0070f3;
    outline: none;
  }
`

const ErrorMessage = styled.div`
  background-color: #fdecea;
  border: 1px solid #f5c6cb;
  color: #e74c3c;
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 0.875rem;
`

const StyledButton = styled(Button)`
  && {
    width: 100%;
    color: white;
    background-color: #0070f3;
    border-radius: 6px;
    padding: 0.75rem;
    font-size: 1rem;
    font-weight: bold;
    transition: background-color 0.2s;

    &:hover {
      background-color: #005bb5;
    }
  }
`

const GoogleButton = styled(Button)`
  && {
    width: 100%;
    color: #333;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 0.75rem;
    font-size: 1rem;
    margin-top: 1rem;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f9f9f9;
    }
  }
`

const StyledText = styled.p`
  font-size: 0.875rem;
  color: #555;
  margin-top: 1rem;
`

const StyledLink = styled.a`
  font-size: 0.875rem;
  color: #0070f3;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError('')

    try {
      const credential = await signInWithEmailAndPassword(
        getAuth(app),
        email,
        password,
      )
      const idToken = await credential.user.getIdToken()
      console.log('idToken', idToken)

      await fetch('/api/login', {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      })

      router.push('/')
    } catch (e) {
      setError((e as Error).message)
    }
  }

  return (
    <StyledMain>
      <Head>
        <title>Login</title>
      </Head>
      <StyledContainer>
        <StyledImageWrapper>
          <Image
            src={Whatsapplogo}
            width={80}
            height={80}
            alt="whatsapp logo"
          />
        </StyledImageWrapper>
        <StyledTitle>Login to your account</StyledTitle>
        {error && <ErrorMessage role="alert">{error}</ErrorMessage>}
        <StyledForm onSubmit={handleSubmit} action="#">
          <FormGroup>
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
          </FormGroup>
          <FormGroup>
            <StyledLabel htmlFor="password">Password</StyledLabel>
            <StyledInput
              type="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              id="password"
              placeholder="Enter your password"
              required
            />
          </FormGroup>
          <StyledButton type="submit">Enter</StyledButton>
          <GoogleButton
            variant="outlined"
            onClick={() => {
              console.log('Signing in with Google')
            }}
          >
            Sign in with Google
          </GoogleButton>
          <StyledText>
            Don&apos;t have an account?{' '}
            <Link href="/register" passHref>
              Register here
            </Link>
          </StyledText>
        </StyledForm>
      </StyledContainer>
    </StyledMain>
  )
}

export default Login
