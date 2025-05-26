import dayjs from "dayjs"
import "dayjs/locale/ko"
import { useState } from "react"
import html2canvas from "html2canvas"
import toast from "react-hot-toast"

import Layout from "../components/Layout/Layout"
import { Button } from "../components/ui/button"
import { useWeeklyAttendance } from "../hooks/useWeeklyAttendance"
import { DateSelector } from "../components/attendance/DateSelector"
import { CellList } from "../components/attendance/CellList"
import { AttendanceStats } from "../components/attendance/AttendanceStats"

dayjs.locale("ko")

const AttendanceStatus = () => {
  const [currentSunday, setCurrentSunday] = useState<dayjs.Dayjs>(dayjs().locale("ko").day(0))

  const { cellData, adultCount, memberCount, totalCount, maxRows } = useWeeklyAttendance(currentSunday)

  const handlePrevWeek = () => {
    setCurrentSunday(currentSunday.subtract(1, "week"))
  }

  const handleNextWeek = () => {
    setCurrentSunday(currentSunday.add(1, "week"))
  }

  const handleCapture = async () => {
    const element = document.getElementById("capture")
    if (!element) {
      toast.error("캡처할 요소를 찾을 수 없습니다.")
      return
    }

    try {
      const canvas = await html2canvas(element)
      const link = document.createElement("a")
      link.download = `${currentSunday.format("YYYY-MM-DD")}_출석현황.png`
      link.href = canvas.toDataURL()
      link.click()
      toast.success("사진이 저장되었습니다.")
    } catch (error) {
      console.error("Error capturing image:", error)
      toast.error("사진 저장에 실패했습니다.")
    }
  }

  return (
    <div className="w-full h-[100dvh]">
      <Layout>
        <div id="capture" className="w-full px-[5%] pt-[20px] pb-[35px] box-border bg-[#FFFCF6]">
          <div className="w-full px-[5%] py-[20px] flex flex-col gap-y-4 box-border rounded-[25px] border border-solid border-black bg-[#F0F0F0]">
            <DateSelector currentSunday={currentSunday} onPrevWeek={handlePrevWeek} onNextWeek={handleNextWeek} />
            <CellList cellData={cellData} maxRows={maxRows} />
            <AttendanceStats adultCount={adultCount} memberCount={memberCount} totalCount={totalCount} />
          </div>
        </div>
        <div className="w-full box-border px-[5%] flex justify-end items-center pb-[35px] bg-[#FFFCF6]">
          <Button onClick={handleCapture} className="w-[102px] h-[43px] text-[16px] border border-solid border-black rounded-[16px] bg-[#EDE8FF] focus:bg-[#EDE8FF] focus:border-black">
            공유하기
          </Button>
        </div>
      </Layout>
    </div>
  )
}

export default AttendanceStatus
