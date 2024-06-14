import dayjs from "dayjs"

// 다음주 일요일 날짜 변경 함수
export const handleNextWeek = (selectedDateInfo, setSelectedDateInfo) => {
  const newDateInfo = dayjs(selectedDateInfo).add(7, "day").format("YYYY-MM-DD")
  setSelectedDateInfo(newDateInfo)
}
