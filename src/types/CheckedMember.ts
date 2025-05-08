interface CellData {
  cell: string
  checkedMember: string[]
}

export interface CheckedMember {
  adultCount: number
  cellData: CellData[]
  date: string
  memberCount: number
  totalCount: number
}
