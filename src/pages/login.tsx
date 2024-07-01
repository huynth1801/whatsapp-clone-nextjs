import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Button } from '@mui/material'
import styled from 'styled-components'
import Whatsapplogo from '../assets/whatsapplogo.png'

const StyledContainer = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;
  background-color: whitesmoke;
`

const StyledLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 100px;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
`

const StyledImageWrapper = styled.div`
  margin-bottom: 50px;
`

const Login = () => {
  return (
    <StyledContainer>
      <Head>
        <title>login</title>
      </Head>
      <StyledLoginContainer>
        <StyledImageWrapper>
          <Image
            src={Whatsapplogo}
            width={80}
            height={80}
            alt="whatsapp logo"
          />
        </StyledImageWrapper>
        <Button
          variant="outlined"
          onClick={() => {
            console.log('Signing in')
          }}
        >
          {' '}
          Sign in with Google{' '}
        </Button>
      </StyledLoginContainer>
    </StyledContainer>
  )
}

export default Login
