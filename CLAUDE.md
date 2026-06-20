# CLAUDE.md

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

## Pages & Routes

`src/constants/path.ts`에 라우트 경로가 정의되어 있습니다.

| 경로 | 페이지 | 설명 |
|------|--------|------|
| `/` | Login | Google 소셜 로그인 |
| `/main` | Main | 메인 홈 (소식 캐러셀 등) |
| `/birthDay` | BirthDay | MCY 회원 생일 목록 |
| `/attendanceCheck` | AttendanceCheck | 주간 출석 체크 |
| `/attendanceStatus` | AttendanceStatus | 출석 현황 통계 |

---

## Firebase Collections

| 컬렉션 | 문서 | 설명 |
|--------|------|------|
| `mcyMember` | `memberInfo` | 전체 회원 정보 배열 (`mcyMember[]`) |
| `attendanceData` | `{날짜 문자열}` | 날짜별 출석 데이터 |

### 주요 타입

```typescript
// 회원 정보
interface McyMember {
  cell: string          // 셀 이름
  checkedMember: string[] // 해당 셀 회원 이름 목록
  history: string       // 기수 (정렬 기준)
}

// 출석 데이터
interface AttendanceStatus {
  adultCount: number    // 어른 출석 수
  cellData: CellData[]  // 셀별 출석 데이터
  date: string          // 날짜
  memberCount: number   // 청년 출석 수
  totalCount: number    // 총 출석 수
}
```

---

## Coding Conventions

- **컴포넌트**: 함수형 컴포넌트만 사용, PascalCase 명명
- **파일명**: 컴포넌트는 `PascalCase.tsx`, 유틸/훅은 `camelCase.ts`
- **스타일**: Tailwind CSS 클래스 우선 사용, shadcn/ui 컴포넌트 활용
- **폼 처리**: React Hook Form + Zod 스키마 조합 사용
- **API 호출**: 반드시 `src/api/` 폴더에 함수로 분리
- **라우트 경로**: 하드코딩 금지, 항상 `PAGE_PATH` 상수 사용
- **토스트 알림**: `react-hot-toast` 사용 (`react-toastify` 사용 금지)
- **날짜 처리**: `dayjs` 사용

---

## Animation Conventions

### `useFadeIn` 훅

스크롤 진입 시 아래→위 페이드인(stagger) 애니메이션은 `src/hooks/useFadeIn.ts`를 사용합니다.

```tsx
const ref = useFadeIn()

return (
  <section ref={ref}>
    <h2 data-fade data-delay="0">제목</h2>
    <p data-fade data-delay="100">첫 번째 항목 (100ms 지연)</p>
    <p data-fade data-delay="200">두 번째 항목 (200ms 지연)</p>
  </section>
)
```

| 속성 | 타입 | 설명 |
|------|------|------|
| `data-fade` | boolean 속성 | 페이드인 대상 요소에 추가 |
| `data-delay` | `string` (ms 숫자) | 애니메이션 지연 시간 |

- `ref`는 `data-fade` 요소들의 공통 **부모**에 연결
- 초기 숨김 상태는 `index.css`의 `[data-fade]` 규칙으로 처리 (JS 실행 전 FOUC 방지)
- 애니메이션 키프레임은 `tailwind.config.ts`의 `fade-up`으로 정의 (`animate-fade-up` 클래스로 적용)
- 새 페이드인 키프레임이 필요하면 `tailwind.config.ts`에 추가하고, CSS 초기 상태를 `index.css`에 함께 정의

---

## Function Design Principles

### SRP (Single Responsibility Principle)

함수와 컴포넌트는 **하나의 역할만** 담당하도록 작성합니다.
역할이 늘어날수록 분리하는 것을 원칙으로 합니다.

| 역할 | 위치 |
|------|------|
| Firebase 통신 | `src/api/` |
| 비즈니스 로직 + 상태 관리 | `src/hooks/` |
| 날짜 계산, 순수 함수 | `src/utils/` |
| UI 렌더링 | `src/components/`, `src/pages/` |

**Bad** - 한 곳에 모든 로직이 섞인 경우

```typescript
const AttendanceCheck = () => {
  const handleSubmit = async (data) => {
    const date = dayjs().format("YYYY-MM-DD")        // 날짜 계산
    const docRef = doc(db, "attendanceData", date)   // Firebase 직접 호출
    await updateDoc(docRef, data)
    toast.success("저장되었습니다")
  }
}
```

**Good** - 역할별로 분리된 경우

```typescript
// src/api/mcyAttendanceDataApi.tsx → Firebase 호출만 담당
const updateAttendanceApi = async (date, data) => { ... }

// src/utils/ → 날짜 계산만 담당
const formatAttendanceDate = () => dayjs().format("YYYY-MM-DD")

// src/hooks/ → 제출 흐름만 담당
const useAttendanceSubmit = () => {
  const handleSubmit = async (data) => {
    const date = formatAttendanceDate()
    await updateAttendanceApi(date, data)
    toast.success("저장되었습니다")
  }
  return { handleSubmit }
}

// src/pages/ → UI 렌더링만 담당
const AttendanceCheck = () => {
  const { handleSubmit } = useAttendanceSubmit()
  return <form onSubmit={handleSubmit}>...</form>
}
```

---

## Environment Variables

`.env.local` 파일에 Firebase 설정을 작성합니다. `.env` 파일에 직접 시크릿을 커밋하지 않습니다.

```
VITE_FB_API_KEY=
VITE_FB_AUTH_DOMAIN=
VITE_PROJECT_ID=
VITE_STORAGE_BUCKET=
VITE_MESSAGING_SENDER_ID=
VITE_APP_ID=
```

---

## Workflow

모든 작업은 아래 순서를 반드시 따릅니다.

1. **계획 수립**: 작업 내용을 커밋 단위로 나누어 계획을 먼저 제시합니다.
2. **승인 요청**: 계획을 사용자에게 보여주고 작업 진행 승인을 받습니다.
3. **로드맵 기록**: 승인이 나면 `docs/plans.md`에 해당 커밋 계획을 로드맵으로 작성합니다. 상태는 `⬜ 예정 / 🔄 진행 중 / ✅ 완료`로 표시하며, 작업이 끝난 커밋은 즉시 완료로 갱신합니다.
4. **작업 진행**: 로드맵 기록 후 작업을 진행합니다.
5. **커밋 메시지 추천**: 작업 완료 후 커밋 메시지를 추천합니다.
6. **PR 작성**: 작업 완료 후 아래 PR 템플릿 형식에 맞게 PR 본문을 작성합니다.

### Commit Message Format

```
<type>: <제목> (50자 이내)

- <변경 이유 또는 맥락>
- <주요 변경 사항 1>
- <주요 변경 사항 2>
```

| type | 설명 |
|------|------|
| `feat` | 새 기능 추가 |
| `fix` | 버그 수정 |
| `refactor` | 기능 변경 없는 코드 개선 |
| `style` | 포매팅, 오타 등 로직 무관한 수정 |
| `docs` | 문서 수정 (CLAUDE.md 등) |
| `chore` | 빌드·설정 파일 변경 |

**예시**

```
feat: 출석 체크 페이지 날짜 선택 기능 추가

- 매주 날짜를 수동 입력하던 불편함 해소
- DatePicker 컴포넌트 신규 추가
- useAttendanceDate 훅으로 날짜 상태 분리
```

---

### PR Template (`.github/PULL_REQUEST_TEMPLATE.md`)

```markdown
## 작업내용

-

## 고민하거나 궁금한 부분

-

## 캡처 또는 영상 (optional)
```

---

## Commands

```bash
yarn dev        # 개발 서버 실행 (http://localhost:5173)
yarn build      # 프로덕션 빌드 (tsc + vite build)
yarn lint       # ESLint 검사
yarn preview    # 빌드 결과 로컬 미리보기
```
