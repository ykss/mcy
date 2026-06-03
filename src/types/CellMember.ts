export type MemberRole = '임원' | '리더' | '셀원'

export interface CellMember {
  name: string
  roles: MemberRole[]
  position?: string
}
