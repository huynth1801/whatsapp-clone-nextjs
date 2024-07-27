'use client'
import Avatar from '@mui/material/Avatar'
import { signOut } from 'firebase/auth'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { auth } from '@/lib/firebase'
import ChatIcon from '@mui/icons-material/Chat'
import MoreVerticalIcon from '@mui/icons-material/MoreVert'
import LogoutIcon from '@mui/icons-material/Logout'
import SearchIcon from '@mui/icons-material/Search'
import Button from '@mui/material/Button'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/navigation'
import Loading from '../Loading/Loading'

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
  return (
    <>
      {isLoggingOut && <Loading />}
      <StyledContainer>
        <StyledHeader>
          <Tooltip title={email} placement="right">
            <StyledUserAvatar />
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
        <StyledSidebarButton>Start a new conversation</StyledSidebarButton>
      </StyledContainer>
    </>
  )
}

export default Sidebar
