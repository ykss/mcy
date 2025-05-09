import { useState, useEffect } from "react"
import dayjs from "dayjs"
import { CellData } from "../types/CheckedMember"
import { getAttendanceStatusApi } from "../api/mcyAttendanceDataApi"

interface UseWeeklyAttendanceReturn {
  cellData: CellData[]
  adultCount: number
  memberCount: number
  totalCount: number
  maxRows: number
}

export const useWeeklyAttendance = (currentSunday: dayjs.Dayjs): UseWeeklyAttendanceReturn => {
  const [cellData, setCellData] = useState<CellData[]>([])
  const [adultCount, setAdultCount] = useState<number>(0)
  const [memberCount, setMemberCount] = useState<number>(0)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [maxRows, setMaxRows] = useState<number>(0)

  useEffect(() => {
    const fetchWeeklyAttendance = async () => {
      try {
        const dateStr = currentSunday.format("YYYY-MM-DD")
        const data = await getAttendanceStatusApi(dateStr)

        if (!Array.isArray(data) && data) {
          // 데이터가 있을 때만 상태 업데이트
          const cells = data.cellData || []
          setCellData(cells)
          setAdultCount(data.adultCount || 0)
          setMemberCount(data.memberCount || 0)
          setTotalCount(data.totalCount || 0)

          // 셀 데이터가 있을 때만 최대 멤버 수 계산
          const maxMemberCount = cells.length > 0 ? Math.max(...cells.map((cell: CellData) => (cell.checkedMember || []).length)) : 0
          setMaxRows(Math.ceil(maxMemberCount / 4))
        } else {
          // 데이터가 없거나 잘못된 형식일 때 초기화
          setCellData([])
          setAdultCount(0)
          setMemberCount(0)
          setTotalCount(0)
          setMaxRows(0)
        }
      } catch (error) {
        console.error("Error fetching attendance data:", error)
        // 에러 발생 시 데이터 초기화
        setCellData([])
        setAdultCount(0)
        setMemberCount(0)
        setTotalCount(0)
        setMaxRows(0)
      } finally {
      }
    }

    fetchWeeklyAttendance()
  }, [currentSunday])

  return {
    cellData,
    adultCount,
    memberCount,
    totalCount,
    maxRows,
  }
}
