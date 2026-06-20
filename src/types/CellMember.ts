export type MemberRole = '임원' | '리더' | '셀원' | '사역자' | '군인'

export interface CellMember {
  name: string
  roles: MemberRole[]
  position?: string
}
