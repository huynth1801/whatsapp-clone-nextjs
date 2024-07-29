import { useAuth } from '@/contexts/AuthContext'
import { auth } from '@/lib/firebase'
import { db } from '@/lib/firebase'
import { AppUser, Conversation } from '@/type'
import { getRecipientEmail } from '@/utils/getRecipientEmail'
import { collection, query, where } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'

export const useRecipient = (conversationUsers: Conversation['users']) => {
  const { user, loading } = useAuth()

  // get recipient email
  const recipientEmail = getRecipientEmail(conversationUsers, user)

  // get recipient avatar
  const queryGetRecipient = query(
    collection(db, 'users'),
    where('email', '==', recipientEmail),
  )
  const [recipientSnapshot, __loading, __error] =
    useCollection(queryGetRecipient)

  // recipientSnapshot
  const recipient = recipientSnapshot?.docs[0]?.data() as AppUser | undefined

  return { recipient, recipientEmail }
}
