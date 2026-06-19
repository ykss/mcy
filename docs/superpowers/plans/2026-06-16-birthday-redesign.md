# 생일 페이지 리디자인 로드맵

**브랜치:** `feat/BirthdayRedesign`  
**목표:** 핑크 배너·pill 월 칩·카드 스타일 리디자인 + SRP 구조 분리

---

## 변경 파일

| 동작 | 경로 |
|------|------|
| 생성 | `src/hooks/useBirthDay.ts` |
| 생성 | `src/components/BirthDay/BirthDayBanner.tsx` |
| 생성 | `src/components/BirthDay/MonthChips.tsx` |
| 수정 | `src/components/BirthDay/BirthDayCard.tsx` |
| 수정 | `src/pages/BirthDay.tsx` |
| 유지 | `src/api/mcyBirthdayApi.tsx` |
| 유지 | `src/types/BirthdayInfo.ts` |

---

## Task 1 — `useBirthDay` 훅 생성
> fetch + 월 필터 로직을 페이지에서 분리

- [ ] `src/hooks/useBirthDay.ts` 생성
  - `McyBirthdayApi()` 호출 → `birthDayData` 상태 저장
  - `selectedMonth` 상태 (기본값: 현재 월)
  - `selectedData` = `birthDayData` 중 `selectedMonth` 해당 항목 (파생값)
  - `return { selectedMonth, setSelectedMonth, selectedData }` 반환
- [ ] `yarn tsc --noEmit` 통과 확인
- [ ] 커밋: `feat: useBirthDay 훅 추가 — fetch + 월 필터 로직 분리`

---

## Task 2 — `BirthDayBanner` 컴포넌트 생성
> 상단 핑크 배너 UI

- [ ] `src/components/BirthDay/BirthDayBanner.tsx` 생성
  - Props: `month: number`, `count: number`
  - 연핑크 배경(`#FDEAEA`) + 둥근 모서리
  - 흰 원형 박스 안 🎂 이모지
  - `{month}월의 생일` (굵게) + `{count}명을 축하해요` (서브텍스트)
- [ ] `yarn tsc --noEmit` 통과 확인
- [ ] 커밋: `feat: BirthDayBanner 컴포넌트 추가 — 핑크 배너 UI`

---

## Task 3 — `MonthChips` 컴포넌트 생성
> pill 형태 월 선택 UI

- [ ] `src/components/BirthDay/MonthChips.tsx` 생성
  - Props: `selectedMonth: number`, `onSelect: (month: number) => void`
  - "월 선택" 레이블 표시
  - 1월~12월 pill 버튼, `flex-wrap` 수평 나열
  - 선택된 월: 다크(`#1A1A1A`) 배경 + 흰 텍스트
  - 비선택 월: 흰 배경 + 회색 테두리 + 회색 텍스트
  - 월별 인원 수 뱃지 없음
- [ ] `yarn tsc --noEmit` 통과 확인
- [ ] 커밋: `feat: MonthChips 컴포넌트 추가 — pill 형태 월 선택 UI`

---

## Task 4 — `BirthDayCard` 리라이트
> 좌측 핑크 바 제거, 카드 스타일 변경

- [ ] `src/components/BirthDay/BirthDayCard.tsx` 전체 교체
  - Props 유지: `name: string`, `date: string`
  - 좌측 핑크 바 제거
  - 흰 배경 + 연한 테두리(`#E5E5E5`) + 둥근 모서리
  - 상단: 📅 + `{day}일` (좌) / 요일 (우, 회색)
  - 하단: `{name}` (굵게, 큰 폰트)
- [ ] `yarn tsc --noEmit` 통과 확인
- [ ] 커밋: `style: BirthDayCard 리디자인 — 좌측 바 제거, 카드 스타일 변경`

---

## Task 5 — `BirthDay.tsx` 페이지 리라이트
> 로직 제거, UI 조합만 남김

- [ ] `src/pages/BirthDay.tsx` 전체 교체
  - `useBirthDay()` 훅 사용 (기존 fetch/filter 로직 제거)
  - `useFadeIn()` 적용: 배너 `delay=0`, 월 칩 `delay=100`, 카드 그리드 `delay=200`
  - 섹션 헤더: `{selectedMonth}월 생일을 축하합니다` + `{selectedData.length}명` 핑크 pill 배지
  - 빈 상태(0명): "이번 달 생일인 멤버가 없어요" 텍스트 표시
  - 카드 그리드: 2열 (`grid-cols-2`)
- [ ] `yarn tsc --noEmit && yarn build` 통과 확인
- [ ] `yarn dev` 실행 후 `http://localhost:5173/birthDay` 육안 확인
  - 핑크 배너 / 월 칩 선택 스타일 / 카드 2열 / 빈 상태 / 페이드인 애니메이션
- [ ] 커밋: `feat: 생일 페이지 리디자인 — 배너·월 칩·카드 스타일 적용 및 SRP 구조 분리`
