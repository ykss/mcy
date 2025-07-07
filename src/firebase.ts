import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { getStorage } from "firebase/storage"
import type { FirebaseOptions } from "firebase/app"

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
}

const app = initializeApp(firebaseConfig)

// 앱과 firebase 연동 설정하는 부분 (위에서 import도 해주기)
const auth = getAuth(app) // 인증
const db = getFirestore(app) // 파이어스토어
const storage = getStorage(app) // 스토리지
const provider = new GoogleAuthProvider()

export { auth, db, storage, app, signInWithPopup, provider }
