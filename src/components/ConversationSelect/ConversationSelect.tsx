import { useRecipient } from '@/hooks/useRecipient'
import { Conversation } from '@/type'
import React from 'react'
import styled from 'styled-components'
import RecipientAvatar from '../RecipientAvatar/RecipientAvatar'
import { useRouter } from 'next/navigation'

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-all;
  transition: transform 0.2s ease-in-out;

  &:hover {
    background-color: #e9eaeb;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
`

const ConversationSelect = ({
  id,
  conversationUsers,
}: {
  id: string
  conversationUsers: Conversation['users']
}) => {
  const { recipient, recipientEmail } = useRecipient(conversationUsers)
  const router = useRouter()

  const onSelectConversation = () => {
    router.push(`/conversations/${id}`)
  }

  return (
    <StyledContainer onClick={onSelectConversation}>
      <RecipientAvatar recipient={recipient} recipientEmail={recipientEmail} />
      <span>{recipientEmail}</span>
    </StyledContainer>
  )
}

export default ConversationSelect
