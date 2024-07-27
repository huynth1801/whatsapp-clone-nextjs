import { initializeApp, getApps } from 'firebase/app'
import { clientConfig } from '@/config/config'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const app = !getApps().length ? initializeApp(clientConfig) : getApps()[0]
const auth = getAuth(app)
const db = getFirestore(app)

export { app, auth, db }
