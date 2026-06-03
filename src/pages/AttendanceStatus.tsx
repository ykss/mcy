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
      const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, "image/png"))
      if (!blob) {
        toast.error("이미지 변환에 실패했습니다.")
        return
      }

      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      if (isMobile && navigator.canShare && navigator.canShare({ files: [new File([blob], `${currentSunday.format("YYYY-MM-DD")}_출석현황.png`, { type: blob.type })] })) {
        const file = new File([blob], `${currentSunday.format("YYYY-MM-DD")}_출석현황.png`, { type: blob.type })
        await navigator.share({
          files: [file],
          title: "출석 현황",
          text: "출석 현황 이미지를 공유합니다.",
        })
        toast.success("공유가 완료되었습니다.")
      } else {
        // fallback: 다운로드 링크 제공
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = `${currentSunday.format("YYYY-MM-DD")}_출석현황.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        toast("이미지가 다운로드되었습니다. 갤러리에 저장하려면 파일 앱에서 이동하세요.", { icon: "📷" })
      }
    } catch (error) {
      toast.error("사진 저장에 실패했습니다.")
    }
  }

  return (
    <div className="w-full min-h-[100dvh]">
      <Layout>
        <div id="capture" className="w-full px-[5%] pt-5 pb-9 box-border bg-[#FFFCF6]">
          <div className="w-full px-[5%] py-5 flex flex-col gap-y-4 box-border rounded-[25px] border border-solid border-black bg-[#F0F0F0]">
            <DateSelector currentSunday={currentSunday} onPrevWeek={handlePrevWeek} onNextWeek={handleNextWeek} />
            <CellList cellData={cellData} maxRows={maxRows} />
            <AttendanceStats adultCount={adultCount} memberCount={memberCount} totalCount={totalCount} />
          </div>
        </div>
        <div className="w-full box-border px-[5%] flex justify-end items-center pb-9 bg-[#FFFCF6]">
          <Button
            onClick={handleCapture}
            className="w-[102px] h-11 text-base border border-solid border-black rounded-2xl bg-[#EDE8FF] focus:bg-[#EDE8FF] focus:border-black text-black hover:bg-[#EDE8FF] hover:border-black active:bg-[#EDE8FF] active:border-black">
            공유하기
          </Button>
        </div>
      </Layout>
    </div>
  )
}

export default AttendanceStatus
