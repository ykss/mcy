import dayjs from "dayjs"
import "dayjs/locale/ko"
dayjs.locale("ko")
import { Button } from "../components/ui/button"

import { useState, useEffect } from "react"
import { ChevronLeftIcon, ChevronRightIcon, UserGroupIcon } from "@heroicons/react/24/outline"
import html2canvas from "html2canvas"

import Layout from "../components/Layout/Layout"
const AttendanceStatus = () => {
  const [currentDate, setCurrentDate] = useState<dayjs.Dayjs>(
    dayjs().locale("ko").day(0), // 이번 주 일요일
  )
  // const today = dayjs()
  // const dayOfWeek = today.day() // 0은 일요일, 6은 토요일
  // const lastSunday = today.subtract(dayOfWeek, "day")
  // const [selectedDateInfo, setSelectedDateInfo] = useState(lastSunday.format("YYYY-MM-DD"))
  // const [cellData, setCellData] = useState([])
  // const [adultCount, setAdultCount] = useState()
  // const [memberCount, setMemberCount] = useState()
  // const [totalCount, setTotalCount] = useState()
  // const fetchData = async () => {
  //   try {
  //     const data = await getAttendanceApi(selectedDateInfo)
  //     setCellData(data.cellData)
  //     setAdultCount(data.adultCount)
  //     setMemberCount(data.memberCount)
  //     setTotalCount(data.totalCount)
  //   } catch (error) {
  //     console.error("Error fetching data: ", error)
  //   }
  // }
  // useEffect(() => {
  //   fetchData()
  // }, [selectedDateInfo])

  const handleCapture = async () => {
    const target = document.getElementById("download")
    if (!target) {
      return alert("사진 저장에 실패했습니다.")
    }
    html2canvas(target).then(canvas => {
      const link = document.createElement("a")
      document.body.appendChild(link)
      link.href = canvas.toDataURL("image/png")
      link.download = "mcyAttendance.png" // 다운로드 이미지 파일 이름
      link.click()
      document.body.removeChild(link)
    })
  }
  // // 이전 주 일요일로 이동
  const handlePrevWeek = () => {
    setCurrentDate(currentDate.subtract(7, "day"))
  }

  // // 다음 주 일요일로 이동
  const handleNextWeek = () => {
    setCurrentDate(currentDate.add(7, "day"))
  }
  return (
    <div className="w-full h-[100dvh]">
      <Layout>
        <div className="w-full px-[5%] pt-[20px] pb-[35px] box-border bg-[#FFFCF6]">
          <div className="w-full px-[5%] py-[20px] flex flex-col gap-y-4 box-border rounded-[25px] border border-solid border-black  bg-[#F0F0F0]">
            {/* 날짜 */}
            <div className="w-full px-[5%] flex flex-row items-center justify-center gap-[30px] box-border">
              <ChevronLeftIcon className="w-5 h-5 stroke-[2px] cursor-pointer" onClick={handlePrevWeek} />
              <div className="text-[20px] font-semibold">{currentDate.format("YYYY.MM.DD")}</div>
              <ChevronRightIcon className="w-5 h-5 stroke-[2px] cursor-pointer" onClick={handleNextWeek} />
            </div>
            {/* 출석 리스트 */}
            <div className="flex flex-col gap-y-2">
              {Array.from({ length: 10 }).map((_, index) => (
                <div className="w-full box-border flex border border-solid border-black">
                  <div className="w-[25%] flex items-center justify-center text-[12px] bg-[#D9D9D9] border-0 border-r border-solid border-black py-3">신중석셀</div>
                  <div className="w-[60%] px-3 flex flex-wrap items-center gap-y-2 text-[12px] box-border py-3">
                    <div className="w-1/4 flex justify-center items-center">신중석</div>
                    <div className="w-1/4 flex justify-center items-center">신중석</div>
                    <div className="w-1/4 flex justify-center items-center">신중석</div>
                    <div className="w-1/4 flex justify-center items-center">신중석</div>
                    <div className="w-1/4 flex justify-center items-center">신중석</div>
                    <div className="w-1/4 flex justify-center items-center">신중석</div>
                    <div className="w-1/4 flex justify-center items-center">신중석</div>
                    <div className="w-1/4 flex justify-center items-center">신중석</div>
                  </div>
                  <div className="w-[15%] flex items-center justify-center text-[12px] bg-[#D9D9D9] border-0 border-l border-solid border-black py-3">11</div>
                </div>
              ))}
            </div>
            {/* 출석 수 통계 */}
            <div className="w-full h-[60px] flex flex-row gap-x-2 justify-between text-[12px]">
              {/* 왼쪽 */}
              <div className="w-[50%] h-full border border-solid border-black">
                {/* 상단 출석 */}
                <div className="w-full h-[50%] flex flex-row items-center justify-between">
                  <div className="w-[30%] h-full flex items-center justify-center border-0 border-r border-b border-solid border-black">출석</div>
                  <div className="w-[70%] h-full flex items-center justify-center border-0 border-b border-solid border-black">108명</div>
                </div>
                {/* 하단 기타 */}
                <div className="w-full h-[50%] flex flex-row items-center justify-between ">
                  <div className="w-[30%] h-full flex items-center justify-center border-0 border-r border-solid border-black">기타</div>
                  <div className="w-[70%] h-full flex items-center justify-center">108명</div>
                </div>
              </div>
              {/* 오른쪽 */}
              <div className="w-[50%] h-full border border-solid border-black">
                {/* 상단 출석 */}
                <div className="w-full h-full flex flex-row items-center justify-between">
                  <div className="w-[30%] h-full flex items-center justify-center border-0 border-r border-solid border-black">출석</div>
                  <div className="w-[70%] h-full flex items-center justify-center">108명</div>
                </div>
              </div>
            </div>
          </div>

          {/* 공유 버튼 */}
          <div className="w-full flex justify-end items-center pt-[20px]">
            <Button className="w-[102px] h-[43px] text-[16px] border border-solid border-black rounded-[16px] bg-[#EDE8FF] focus:bg-[#EDE8FF] focus:border-black">공유하기</Button>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default AttendanceStatus
