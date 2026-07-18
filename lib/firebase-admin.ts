import { initializeApp, cert, ServiceAccount, getApp, getApps } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!)

const app = getApps().length == 0 ? initializeApp({ credential: cert(serviceAccount as ServiceAccount) }) : getApp()

export const db = getFirestore(app);