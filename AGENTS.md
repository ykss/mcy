# AGENTS.md

## Project Overview

**MCY**는 교회 청년부(MCY) 운영을 위한 내부 관리 웹 애플리케이션입니다.
매주 수기로 작성하던 출석 체크, 회원 정보 관리, 소식 전달 등의 불편함을 해소하기 위해 개발되었습니다.

- **배포**: Netlify
- **PWA 지원**: 모바일 홈 화면 설치 가능
- **인증**: Google OAuth (Firebase Auth)

---

## Tech Stack

| 분류 | 기술 |
|------|------|
| 프레임워크 | React 18 + TypeScript |
| 빌드 도구 | Vite |
| 백엔드/DB | Firebase (Firestore, Auth, Storage) |
| 스타일링 | Tailwind CSS, shadcn/ui, MUI v5 |
| 폼 관리 | React Hook Form + Zod |
| 라우팅 | React Router v6 |
| 날짜 처리 | dayjs |
| 알림 | react-hot-toast |
| 상태관리 | React 내장 훅 (useState, useEffect 등) |

---

## Directory Structure

```
src/
├── api/            # Firebase Firestore API 호출 함수
├── assets/         # 이미지, 아이콘 등 정적 파일
├── components/     # 재사용 가능한 UI 컴포넌트
│   ├── attendance/ # 출석 관련 컴포넌트
│   ├── BirthDay/   # 생일 관련 컴포넌트
│   ├── Layout/     # 레이아웃 컴포넌트
│   ├── Main/       # 메인 페이지 컴포넌트
│   ├── MenuDrawer/ # 네비게이션 드로어 컴포넌트
│   ├── shared/     # 공통 컴포넌트
│   └── ui/         # shadcn/ui 기반 기본 UI 컴포넌트
├── constants/      # 상수값 (라우트 경로 등)
├── hooks/          # Custom React Hooks
├── lib/            # 유틸리티 라이브러리 설정
├── pages/          # 라우트별 페이지 컴포넌트
├── types/          # TypeScript 타입/인터페이스 정의
└── utils/          # 공통 유틸리티 함수
```

---

## Firebase Collections

| 컬렉션 | 문서 | 설명 |
|--------|------|------|
| `mcyMember` | `memberInfo` | 전체 회원 정보 배열 (`mcyMember[]`) |
| `attendanceData` | `{날짜 문자열}` | 날짜별 출석 데이터 |

### 주요 타입

```typescript
interface McyMember {
  cell: string
  checkedMember: string[]
  history: string
}

interface AttendanceStatus {
  adultCount: number
  cellData: CellData[]
  date: string
  memberCount: number
  totalCount: number
}
```

---

## Coding Conventions

- 컴포넌트는 함수형 컴포넌트만 사용, PascalCase 명명
- 파일명: 컴포넌트는 `PascalCase.tsx`, 유틸/훅은 `camelCase.ts`
- 스타일: Tailwind CSS 클래스 우선, shadcn/ui 컴포넌트 활용
- 폼 처리: React Hook Form + Zod 스키마 조합 사용
- API 호출: 반드시 `src/api/` 폴더에 함수로 분리
- 라우트 경로: 하드코딩 금지, 항상 `PAGE_PATH` 상수 사용 (`src/constants/path.ts`)
- 토스트 알림: `react-hot-toast` 사용 (`react-toastify` 사용 금지)
- 날짜 처리: `dayjs` 사용

---

## Function Design: SRP (Single Responsibility Principle)

함수와 컴포넌트는 하나의 역할만 담당합니다.

| 역할 | 위치 |
|------|------|
| Firebase 통신 | `src/api/` |
| 비즈니스 로직 + 상태 관리 | `src/hooks/` |
| 날짜 계산, 순수 함수 | `src/utils/` |
| UI 렌더링 | `src/components/`, `src/pages/` |

---

## Code Review Guidelines

코드 리뷰 시 아래 항목을 반드시 확인합니다.

### 구조 & 아키텍처

- [ ] Firebase 호출이 `src/api/` 밖(컴포넌트, 훅 내부 등)에서 직접 발생하고 있지 않은지 확인
- [ ] 페이지/컴포넌트에 비즈니스 로직이 섞여 있지 않은지 확인 (SRP 위반 여부)
- [ ] Custom Hook이 UI 렌더링 로직을 포함하고 있지 않은지 확인

### TypeScript

- [ ] `any` 타입 사용 여부 — 명확한 타입 또는 `src/types/`의 인터페이스 사용 요구
- [ ] `src/types/` 외부에 인터페이스/타입이 중복 정의되어 있지 않은지 확인
- [ ] Firebase 응답 데이터에 타입 단언(`as`)이 과도하게 사용되고 있지 않은지 확인

### 컨벤션 위반

- [ ] `react-toastify` 등 금지된 라이브러리 임포트 여부 (`react-hot-toast`만 허용)
- [ ] 라우트 경로 문자열 하드코딩 여부 (`PAGE_PATH` 상수 사용 강제)
- [ ] 환경변수가 `import.meta.env.VITE_` 형식 외의 방식으로 접근되고 있지 않은지 확인
- [ ] 환경변수 값이 소스코드에 직접 노출되어 있지 않은지 확인

### 보안

- [ ] Firebase API 키 또는 민감한 설정값이 소스코드에 하드코딩되어 있지 않은지 확인
- [ ] 인증되지 않은 사용자가 접근 가능한 페이지/기능이 생기지 않는지 확인

### 코드 품질

- [ ] 불필요한 `console.log`가 남아 있지 않은지 확인
- [ ] 사용되지 않는 import, 변수, 함수가 없는지 확인
- [ ] 에러 처리 없이 Firebase 호출이 이루어지고 있지 않은지 확인 (try-catch 필수)

---

## Commands

```bash
yarn dev        # 개발 서버 실행
yarn build      # 프로덕션 빌드 (tsc + vite build)
yarn lint       # ESLint 검사
yarn preview    # 빌드 결과 로컬 미리보기
```
