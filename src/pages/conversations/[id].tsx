import Head from 'next/head'
import styled from 'styled-components'
import Sidebar from '@/components/Sidebar/Sidebar'

const StyledContainer = styled.div`
  display: flex;
`

const Conversation = () => {
  return (
    <StyledContainer>
      <Head>
        <title>Conversation with RECIPIENT</title>
      </Head>
      <Sidebar />
      <h1>MESSAGES</h1>
    </StyledContainer>
  )
}

export default Conversation
