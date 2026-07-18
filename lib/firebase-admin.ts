import { initializeApp, cert, ServiceAccount, getApp, getApps } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import serviceAccount from '@/serviceAccountKey.json';

const app = getApps().length == 0 ? initializeApp({ credential: cert(serviceAccount as ServiceAccount) }) : getApp()

export const db = getFirestore(app);