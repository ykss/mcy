import dayjs from "dayjs"

import Layout from "../components/Layout/Layout"
import { Button } from "../components/ui/button"
import BirthDayList from "../components/BirthDay/BirthDayList"
import { useState, useEffect } from "react"
import { McyBirthdayApi } from "../api/mcyBirthdayApi"
import { BirthdayInfo } from "../types/BirthdayInfo"

const BirthDay = () => {
  const [monthChipId, setMonthChipId] = useState<number>(dayjs().month() + 1)
  const [birthDayData, setBirthDayData] = useState<BirthdayInfo[]>([]) // 파이어베이스 저장된 전체 생일 데이터
  const [selectedData, setSelectedData] = useState<BirthdayInfo[]>([]) // 선택된 해당 월 생일 데이터

  // 파이어베이스에서 데이터 가져오기
  const fetchData = async (): Promise<void> => {
    try {
      const data = await McyBirthdayApi()
      setBirthDayData(data)
    } catch (error) {
      console.error("Error fetching data: ", error)
    }
  }

  // 해당 월 생일 데이터 필터링
  const filterData = (): void => {
    const filteredData = birthDayData.filter(item => {
      const date = dayjs(item.date, "MM-DD")
      const month = date.month() + 1
      return month === monthChipId
    })
    setSelectedData(filteredData)
  }

  const handleChipClick = (targetId: number): void => {
    setMonthChipId(targetId)
  }

  // 첫 렌더링시 파이어베이스에서 데이터 가져오기
  useEffect(() => {
    fetchData()
  }, [])

  // birthDayData가 변경되거나 monthChipId가 변경될 때 필터링 실행
  useEffect(() => {
    if (birthDayData.length > 0) {
      filterData()
    }
  }, [birthDayData, monthChipId])

  return (
    <Layout>
      <div className="w-full h-full flex flex-col">
        {/* 월 선택 버튼 */}
        <div className="w-[90%] h-[30%] mx-auto flex flex-col justify-center gap-[20px]">
          <div className="text-2xl font-bold">월 선택</div>
          <div className="grid grid-cols-6 gap-1">
            {Array.from({ length: 12 }, (_, i) => (
              <Button
                key={i}
                variant="ghost"
                className={`p-0 w-full h-[50px] bg-[#F0F0F0] rounded-none hover:bg-[#F0F0F0] border-0  ${i === 0 ? "rounded-tl-lg" : i === 5 ? "rounded-tr-lg" : i === 6 ? "rounded-bl-lg" : i === 11 ? "rounded-br-lg" : ""}`}
                onClick={() => handleChipClick(i + 1)}>
                <div className="text-sm text-[#7C7C7C]">{i + 1}월</div>
              </Button>
            ))}
          </div>
        </div>

        {/* 생일 리스트 */}
        <div className="w-[90%] h-[70%] mt-[20px] mx-auto bg-[#F3C5C5] rounded-[17px] border border-solid border-black box-border flex flex-col justify-center gap-1">
          <div className="w-[90%] h-[10%] mx-auto text-xl font-bold">{monthChipId}월 생일을 축하합니다</div>
          <div
            className="bg-[#F0F0F0] w-[90%] h-[75%] mx-auto rounded-[17px] border border-solid border-black grid grid-cols-2 gap-6 justify-items-center content-start box-border p-4 py-6 overflow-y-scroll"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {selectedData.map((item, index) => (
              <BirthDayList key={index} date={item.date} name={item.name} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default BirthDay
