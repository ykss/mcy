import { FirebaseOptions } from "firebase/app"

export interface EnvType extends FirebaseOptions {
  REACT_APP_SHARE_KAKAO_LINK_KEY: string
}

export interface FirebaseEnvType {
  VITE_FB_API_KEY: string
  VITE_FB_AUTH_DOMAIN: string
  VITE_PROJECT_ID: string
  VITE_STORAGE_BUCKET: string
  VITE_MESSAGING_SENDER_ID: string
  VITE_APP_ID: string
  REACT_APP_SHARE_KAKAO_LINK_KEY: string
}
