export interface CellData {
  cell: string
  checkedMember: string[]
}
export interface AttendanceStatus {
  adultCount: number
  cellData: CellData[]
  date: string
  memberCount: number
  totalCount: number
}
