/// <reference types="vite/client" />
// Vite와의 통합
// Vite는 TypeScript를 사용할 때 환경 변수에 대한 타입 정보가 필요합니다

interface ImportMetaEnv {
  readonly VITE_FB_API_KEY: string
  readonly VITE_FB_AUTH_DOMAIN: string
  readonly VITE_PROJECT_ID: string
  readonly VITE_STORAGE_BUCKET: string
  readonly VITE_MESSAGING_SENDER_ID: string
  readonly VITE_APP_ID: string
  readonly REACT_APP_SHARE_KAKAO_LINK_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
