import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: import.meta.env.REACT_APP_FB_API_KEY,
  authDomain: import.meta.env.REACT_APP_FB_AUTH_DOMAIN,
  projectId: import.meta.env.REACT_APP_PROJECT_ID,
  storageBucket: import.meta.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.REACT_APP_APP_ID,
}

const app = initializeApp(firebaseConfig)

// 앱과 firebase 연동 설정하는 부분 (위에서 import도 해주기)
const auth = getAuth(app) // 인증
const db = getFirestore(app) // 파이어스토어
const storage = getStorage(app) // 스토리지

export { auth, db, storage, app }
