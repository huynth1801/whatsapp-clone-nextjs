'use client'
import Avatar from '@mui/material/Avatar'
import { signOut } from 'firebase/auth'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { auth, db } from '@/lib/firebase'
import ChatIcon from '@mui/icons-material/Chat'
import MoreVerticalIcon from '@mui/icons-material/MoreVert'
import LogoutIcon from '@mui/icons-material/Logout'
import SearchIcon from '@mui/icons-material/Search'
import Button from '@mui/material/Button'
import React, { useState } from 'react'
import * as EmailValidator from 'email-validator'
import styled from 'styled-components'
import { useRouter } from 'next/navigation'
import Loading from '../Loading/Loading'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material'
import { useAuth } from '@/contexts/AuthContext'
import { addDoc, collection, query, where } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'
import { Conversation } from '@/type'
import ConversationSelect from '../ConversationSelect/ConversationSelect'

const StyledContainer = styled.div`
  height: 100vh;
  min-width: 300px;
  max-width: 350px;
  overflow-y: scroll;
  background-color: white;
  border-right: 1px solid whitesmoke;
`
const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
`
const StyledSearch = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 2px;
`

const StyledSearchInput = styled.input`
  outline: none;
  border: none;
  flex: 1;
`
const StyledSidebarButton = styled(Button)`
  width: 100%;
  border-top: 1px solid whitesmoke;
  border-bottom: 1px solid whitesmoke;
`

const StyledUserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`

interface SidebarProps {
  email?: string
}

const Sidebar = ({ email }: SidebarProps) => {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const { user, loading } = useAuth()
  const [isOpenNewConversationDialog, setIsOpenNewConversationDialog] =
    useState(false)
  const [recipientEmail, setRecipientEmail] = useState('')

  const toggleNewConversationDialog = (isOpen: boolean) => {
    setIsOpenNewConversationDialog(isOpen)
    if (!isOpen) setRecipientEmail('')
  }

  const closeNewConversationDialog = () => {
    toggleNewConversationDialog(false)
  }

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await signOut(auth)
      router.push('/login')
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  const isInvitingSelf = recipientEmail === user?.email

  // Check if conversation already exists between the logged in user and recipientEmail
  const queryGetConversationForCurrentUser = query(
    collection(db, 'conversations'),
    where('users', 'array-contains', user?.email),
  )
  const [conversationSnapshots, __loading, __error] = useCollection(
    queryGetConversationForCurrentUser,
  )
  const isConversationAlreadyExists = (recipientEmail: string) => {
    return conversationSnapshots?.docs.find(conversation =>
      (conversation.data() as Conversation).users.includes(recipientEmail),
    )
  }

  const createConversation = async () => {
    if (!recipientEmail) return

    if (
      EmailValidator.validate(recipientEmail) &&
      !isInvitingSelf &&
      !isConversationAlreadyExists
    ) {
      // Add conversation user to db "conversation" collection
      // A conversation is between  the currently logged in user and the user invited
      await addDoc(collection(db, 'conversations'), {
        users: [user?.email, recipientEmail],
        createAt: new Date(),
      })
    }

    closeNewConversationDialog()
  }

  if (isLoggingOut) {
    return <Loading />
  }

  return (
    <StyledContainer>
      <StyledHeader>
        <Tooltip title={email} placement="right">
          <StyledUserAvatar src={user?.photoURL || ''} />
        </Tooltip>
        <div>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVerticalIcon />
          </IconButton>
          <IconButton onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </div>
      </StyledHeader>
      <StyledSearch>
        <SearchIcon />
        <StyledSearchInput placeholder="Search in conversations" />
      </StyledSearch>
      <StyledSidebarButton
        onClick={() => {
          toggleNewConversationDialog(true)
        }}
      >
        Start a new conversation
      </StyledSidebarButton>
      {/* List of conversation */}
      {conversationSnapshots?.docs.map(conversation => (
        <ConversationSelect
          key={conversation.id}
          id={conversation.id}
          conversationUsers={(conversation.data() as Conversation).users}
        />
      ))}

      <Dialog
        open={isOpenNewConversationDialog}
        onClose={closeNewConversationDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a Google email address for the user you wish to chat
          </DialogContentText>
          <TextField
            autoFocus
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={recipientEmail}
            onChange={event => setRecipientEmail(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeNewConversationDialog} color="primary">
            Cancel
          </Button>
          <Button
            disabled={!recipientEmail}
            onClick={createConversation}
            color="primary"
          >
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </StyledContainer>
  )
}

export default Sidebar
