import dayjs from "dayjs"
import { HandleDateWeekParams } from "../types/HandleDateWeekParams"

// 저번주 일요일 날짜 변경 함수
export const handlePreviousWeek = ({ selectedDateInfo, setSelectedDateInfo }: HandleDateWeekParams) => {
  const newDateInfo = dayjs(selectedDateInfo).subtract(7, "day").format("YYYY-MM-DD")
  setSelectedDateInfo(newDateInfo)
}
