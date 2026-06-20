# MCY 개발 로드맵

각 브랜치·커밋 단위로 작업 상태를 추적합니다.
상태: ✅ 완료 / 🔄 진행 중 / ⬜ 예정

---

## feat/cellMemberManagement 브랜치

| 상태 | 커밋 | 설명 |
|------|------|------|
| ✅ | `feat: 멤버 행 컴포넌트 추가 및 셀 카드에 적용` | MemberRow 컴포넌트 추가, CellCard에 적용 |
| ✅ | `feat: 셀/멤버 추가 다이얼로그 구현 및 CellMember 타입 개선` | AddCellDialog, AddMemberDialog 구현 |
| ✅ | `feat: 멤버 편집·삭제 및 셀 간 이동 기능 구현` | EditMemberDialog, MoveMembersDialog 구현 |
| ✅ | `feat: 셀 수정·삭제 다이얼로그 구현` | EditCellDialog 구현 |
| ✅ | `refactor: CellManagement 상태·로직을 useCellManagement 훅으로 분리` | 상태/로직 → useCellManagement 훅 분리 |
| ✅ | `feat: 임원 직책 칩 UI 개선 및 직책 삭제 기능 추가` | 직책 칩 인라인 ✕ 버튼, 직책 삭제, 토글 기능 |
| ✅ | `fix: EditMemberDialog 소속 셀 변경 시 Firebase 이동 반영` | selectedCell !== cellName일 때 moveMembersApi 호출 후 updateMemberApi로 역할/직책 업데이트 |
| ✅ | `fix: Firestore undefined 필드 저장 오류 수정` | saveMcyMembersApi에서 멤버 객체의 undefined 필드 제거 후 저장 |
| ✅ | `feat: MemberRole에 사역자·군인 타입 추가` | CellMember.ts MemberRole 타입 확장 |
| ✅ | `feat: MemberRow 역할 칩 스타일에 사역자·군인 추가` | ROLE_STYLES에 사역자·군인 색상 추가 |
| ✅ | `feat: EditMemberDialog 역할 토글에 사역자·군인 추가` | ROLES 배열·ROLE_ACTIVE_STYLE에 사역자·군인 추가 |
| ✅ | `feat: useCellManagement 멤버 필터 상태 추가` | FilterType·activeFilter·filteredCells 추가 |
| ✅ | `feat: 셀 관리 페이지 필터 칩 UI 추가` | 전체·사역자·군인·임원&리더 칩 렌더링, filteredCells 적용 |
