import dayjs from "dayjs"
import "dayjs/locale/ko"
import { ChevronLeftIcon, ChevronRightIcon, UserGroupIcon } from "@heroicons/react/24/outline"
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Checkbox } from "../components/ui/checkbox"
import { Button } from "../components/ui/button"
import { useState, useEffect } from "react"
import { McyMember } from "../types/McyMember"
import { getMcyMemberApi } from "../api/mcyMemberApi"
import Layout from "../components/Layout/Layout"

const AttendanceCheck = () => {
  const [totalMember, setTotalMember] = useState<number>(0)
  const [attendanceMember, setAttendanceMember] = useState<number>(0)
  const [otherMember, setOtherMember] = useState<number>(0)
  const [currentDate, setCurrentDate] = useState<dayjs.Dayjs>(
    dayjs().locale("ko").day(0), // 이번 주 일요일
  )

  // 이전 주 일요일로 이동
  const handlePrevWeek = () => {
    setCurrentDate(currentDate.subtract(7, "day"))
  }

  // 다음 주 일요일로 이동
  const handleNextWeek = () => {
    setCurrentDate(currentDate.add(7, "day"))
  }

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
  //키-값 쌍의 객체 타입을 정의하기 위해 사용.
  /* 저장된 체크박스 상태
  {
  "0": true,   // 0번 체크박스가 체크됨
  "1": false,  // 1번 체크박스가 체크되지 않음
  "2": true,   // 2번 체크박스가 체크됨
  // ...
} 
  */

  const handleCheckChange = (id: string, checked: boolean) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: checked,
    }))

    // 체크박스 체크/해제 시 출석 수 업데이트
    if (checked) {
      setTotalMember(prev => prev + 1)
      setAttendanceMember(prev => prev + 1)
    } else {
      setTotalMember(prev => prev - 1)
      setAttendanceMember(prev => prev - 1)
    }
  }

  const [memberList, setMemberList] = useState<McyMember[]>([])
  const [selectedCell, setSelectedCell] = useState<McyMember | null>(null)

  useEffect(() => {
    const fetchMemberList = async () => {
      const data = await getMcyMemberApi()
      setMemberList(data)
      setSelectedCell(data[0])
    }

    fetchMemberList()
  }, [])

  // 셀 선택 시 체크박스 목록 변경
  const handleCellChange = (value: string) => {
    const cell = memberList.find(member => member.cell === value)
    if (cell) {
      setSelectedCell(cell)
    }
  }

  const handleOtherPlusMember = () => {
    setTotalMember(totalMember + 1)
    setOtherMember(attendanceMember + 1)
  }

  const handleOtherMinusMember = () => {
    if (totalMember > 0) {
      setTotalMember(totalMember - 1)
      setOtherMember(otherMember - 1)
    }
  }
  return (
    <div className="w-full h-[100dvh] flex flex-col box-border">
      <Layout>
        {/* 날짜 */}
        <div className="w-full px-[5%] flex flex-row items-center justify-center gap-[30px] py-[20px] box-border">
          <ChevronLeftIcon className="w-5 h-5 stroke-[2px] cursor-pointer" onClick={handlePrevWeek} />
          <div className="text-[20px] font-semibold">{currentDate.format("YYYY.MM.DD")}</div>
          <ChevronRightIcon className="w-5 h-5 stroke-[2px] cursor-pointer" onClick={handleNextWeek} />
        </div>
        {/* 출석체크 */}
        {/* 선택 영역 */}
        <div className="w-full px-[5%] flex flex-row items-center justify-between box-border py-[20px]">
          <Select onValueChange={handleCellChange}>
            <SelectTrigger className="w-[77%] h-[71px] bg-[#C7BDEB] text-[24px] font-bold border border-solid border-black rounded-[22px] flex justify-between items-center px-7 box-border">
              <SelectValue placeholder={memberList[0]?.cell || "셀 선택"} data-slot="select-value" className="" />
            </SelectTrigger>
            <SelectContent className="w-full bg-[#DDD6F9] rounded-[22px] border border-solid border-black box-border overflow-y-auto max-h-[300px] ">
              <SelectGroup className="px-7 py-2 box-border">
                {memberList.map(member => (
                  <SelectItem className="w-full h-[55px] text-[18px] font-semibold" value={member.cell}>
                    <span className="">{member.cell}</span>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* 출석부 바로 가기 */}
          <div className="w-[71px] h-[71px] bg-[#DDD6F9] rounded-[22px] border border-solid border-black flex items-center justify-center">
            <UserGroupIcon className="w-11 h-11" />
          </div>
        </div>
        {/* 출석체크 */}
        <div className="w-full px-[5%] py-[20px] box-border bg-[#FFFCF6]">
          <div className="w-full px-[23px] py-[40px] bg-[#F8E6BA] border border-solid border-black rounded-[25px] box-border grid grid-cols-2 justify-items-center gap-[20px]">
            {selectedCell?.checkedMember.map((member, index) => (
              <div key={index} className="w-[122px] h-[43px] bg-[#F0F0F0] rounded-[18px] border border-solid border-black flex flex-row items-center justify-center gap-2 ">
                <Checkbox id={`${index}`} checked={checkedItems[`${index}`] || false} onCheckedChange={checked => handleCheckChange(`${index}`, checked as boolean)} />
                <label htmlFor={`${index}`} className={`text-[20px] ${checkedItems[`${index}`] ? "font-bold" : "font-medium"}`}>
                  {member}
                </label>
              </div>
            ))}
          </div>
        </div>
        {/* 출석 인원 */}
        <div className="w-full px-[5%] flex flex-row items-center justify-between box-border bg-[#FFFCF6] py-[20px]">
          <div className="w-full h-[70px] mr-[5px] bg-[#C7BDEB] border border-solid border-black rounded-[25px] flex flex-row items-center justify-center">
            <div className="text-[24px] font-bold">
              출석 : {attendanceMember} / {totalMember}
            </div>
          </div>
          <div className="flex flex-row items-center gap-[5px]">
            {/* 출석 인원 증가 */}
            <Button
              onClick={handleOtherPlusMember}
              className="w-[70px] h-[70px] px-[5%] bg-[#DDD6F9] box-border border border-solid border-black rounded-[25px] [&_svg]:size-10 focus:bg-[#DDD6F9] focus:border-black">
              <PlusIcon />
            </Button>
            {/* 출석 인원 감소 */}
            <Button
              onClick={handleOtherMinusMember}
              className="w-[70px] h-[70px] px-[5%] bg-[#DDD6F9] box-border border border-solid border-black rounded-[25px] [&_svg]:size-10 focus:bg-[#DDD6F9] focus:border-black">
              <MinusIcon />
            </Button>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default AttendanceCheck
