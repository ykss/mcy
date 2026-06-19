import dayjs from "dayjs"
import "dayjs/locale/ko"
import { useState } from "react"
import html2canvas from "html2canvas"
import toast from "react-hot-toast"

import { ShareIcon } from "@heroicons/react/24/solid"
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
    <div className="w-full min-h-[100dvh] bg-[#FFFCF6]">
      <Layout>
        <div id="capture" className="w-full px-5 pb-6 bg-[#FFFCF6]">
          <DateSelector currentSunday={currentSunday} onPrevWeek={handlePrevWeek} onNextWeek={handleNextWeek} />
          <div className="flex flex-col gap-4 mt-2">
            <AttendanceStats adultCount={adultCount} memberCount={memberCount} totalCount={totalCount} />
            <CellList cellData={cellData} maxRows={maxRows} />
          </div>
        </div>
        <div className="w-full px-5 flex justify-end pb-8 bg-[#FFFCF6]">
          <Button
            onClick={handleCapture}
            className="w-full h-12 text-base rounded-2xl bg-[#6355C7] text-white border-0 font-semibold hover:bg-[#6355C7]/90 active:bg-[#6355C7]/80 flex items-center justify-center gap-2 my-2">
            <ShareIcon className="w-5 h-5" />
            공유하기
          </Button>
        </div>
      </Layout>
    </div>
  )
}

export default AttendanceStatus
