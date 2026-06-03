export type MemberRole = '대표리더' | '리더' | '셀원' | '임원'

export interface CellMember {
  name: string
  role: MemberRole
  position?: string
}
