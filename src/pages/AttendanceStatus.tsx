import dayjs from "dayjs"
import "dayjs/locale/ko"
import { useState, useEffect } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import html2canvas from "html2canvas"
import toast from "react-hot-toast"

import Layout from "../components/Layout/Layout"
import { Button } from "../components/ui/button"

import { getAttendanceStatusApi } from "../api/mcyAttendanceDataApi"
import { CellData } from "../types/CheckedMember"

dayjs.locale("ko")

const AttendanceStatus = () => {
  const [selectedDateInfo, setSelectedDateInfo] = useState<dayjs.Dayjs>(
    dayjs().locale("ko").day(0), // 이번 주 일요일
  )

  const [cellData, setCellData] = useState<CellData[]>([])
  const [adultCount, setAdultCount] = useState<number>(0)
  const [memberCount, setMemberCount] = useState<number>(0)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [maxRows, setMaxRows] = useState<number>(0)

  const getCurrentDateStr = () => selectedDateInfo.format("YYYY-MM-DD") // 현재 날짜 문자열 반환

  const fetchData = async () => {
    const dateStr = getCurrentDateStr()
    try {
      const data = await getAttendanceStatusApi(dateStr)
      if (!Array.isArray(data) && data) {
        setCellData(data.cellData)
        setAdultCount(data.adultCount)
        setMemberCount(data.memberCount)
        setTotalCount(data.totalCount)

        // 가장 많은 멤버를 가진 셀의 행 수 계산
        const maxMemberCount = Math.max(...data.cellData.map(cell => cell.checkedMember.length))
        setMaxRows(Math.ceil(maxMemberCount / 4)) // 4명씩 한 줄이므로 4로 나눔
      }
    } catch (error) {
      console.error("Error fetching data: ", error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [selectedDateInfo])

  const handleCapture = async () => {
    const target = document.getElementById("captureArea")
    if (!target) {
      toast.error("사진 저장에 실패했습니다.")
      return
    }

    try {
      const canvas = await html2canvas(target, {
        backgroundColor: "#F0F0F0",
        scale: 2, // 더 선명한 이미지를 위해 2배 스케일 적용
      })

      const link = document.createElement("a")
      document.body.appendChild(link)
      link.href = canvas.toDataURL("image/png")
      link.download = `Mcy${selectedDateInfo.format("YYYYMMDD")}.png`
      link.click()
    } catch (error) {
      console.error("캡쳐 중 오류 발생:", error)
      toast.error("사진 저장에 실패했습니다.")
    }
  }
  // 이전 주 일요일로 이동
  const handlePrevWeek = () => {
    setSelectedDateInfo(selectedDateInfo.subtract(7, "day"))
  }

  // 다음 주 일요일로 이동
  const handleNextWeek = () => {
    setSelectedDateInfo(selectedDateInfo.add(7, "day"))
  }
  return (
    <div className="w-full h-[100dvh]">
      <Layout>
        <div id="captureArea" className="w-full px-[5%] pt-[20px] pb-[35px] box-border bg-[#FFFCF6]">
          <div className="w-full px-[5%] py-[20px] flex flex-col gap-y-4 box-border rounded-[25px] border border-solid border-black  bg-[#F0F0F0]">
            {/* 날짜 */}
            <div className="w-full px-[5%] flex flex-row items-center justify-center gap-[30px] box-border">
              <ChevronLeftIcon className="w-5 h-5 stroke-[2px] cursor-pointer" onClick={handlePrevWeek} />
              <div className="text-[20px] font-semibold">{selectedDateInfo.format("YYYY.MM.DD")}</div>
              <ChevronRightIcon className="w-5 h-5 stroke-[2px] cursor-pointer" onClick={handleNextWeek} />
            </div>
            {/* 출석 리스트 */}
            <div className="flex flex-col gap-y-2">
              {cellData.map((cell, index) => (
                <div key={cell.cell + index} className="w-full box-border flex border border-solid border-black" style={{ height: `${Math.max(80, maxRows * 40)}px` }}>
                  <div className="w-[30%] flex items-center justify-center text-[12px] bg-[#D9D9D9] border-0 border-r border-solid border-black">{cell.cell}</div>
                  <div className="w-[55%] px-3 flex flex-wrap items-center gap-y-2 text-[12px] box-border py-3">
                    {cell.checkedMember.length > 0 &&
                      cell.checkedMember.map((member, index) => (
                        <div key={member + index} className="w-1/4 flex justify-center items-center">
                          {member}
                        </div>
                      ))}
                  </div>
                  <div className="w-[15%] flex items-center justify-center text-[12px] bg-[#D9D9D9] border-0 border-l border-solid border-black">{cell.checkedMember.length}</div>
                </div>
              ))}
            </div>
            {/* 출석 수 통계 */}
            <div className="w-full h-[60px] flex flex-row gap-x-2 justify-between text-[12px] bg">
              {/* 왼쪽 */}
              <div className="w-[50%] h-full border border-solid border-black">
                {/* 상단 출석 */}
                <div className="w-full h-[50%] flex flex-row items-center justify-between">
                  <div className="w-[30%] h-full flex items-center justify-center border-0 border-r border-b border-solid border-black">출석</div>
                  <div className="w-[70%] h-full flex items-center justify-center border-0 border-b border-solid border-black">{memberCount}명</div>
                </div>
                {/* 하단 기타 */}
                <div className="w-full h-[50%] flex flex-row items-center justify-between ">
                  <div className="w-[30%] h-full flex items-center justify-center border-0 border-r border-solid border-black">기타</div>
                  <div className="w-[70%] h-full flex items-center justify-center">{adultCount}명</div>
                </div>
              </div>
              {/* 오른쪽 */}
              <div className="w-[50%] h-full border border-solid border-black">
                {/* 상단 출석 */}
                <div className="w-full h-full flex flex-row items-center justify-between">
                  <div className="w-[30%] h-full flex items-center justify-center border-0 border-r border-solid border-black">총인원</div>
                  <div className="w-[70%] h-full flex items-center justify-center">{totalCount}명</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 공유 버튼 */}
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
