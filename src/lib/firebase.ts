import { initializeApp, getApps } from 'firebase/app'
import { clientConfig } from '@/config/config'
import { getAuth } from 'firebase/auth'

const app = !getApps().length ? initializeApp(clientConfig) : getApps()[0]
const auth = getAuth(app)

export { app, auth }
