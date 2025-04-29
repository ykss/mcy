import dayjs from "dayjs"
import "dayjs/locale/ko"
import { ChevronLeftIcon, ChevronRightIcon, UserGroupIcon } from "@heroicons/react/24/outline"
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid"
import { useState, useEffect } from "react"

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Checkbox } from "../components/ui/checkbox"
import { Button } from "../components/ui/button"
import { McyMember } from "../types/McyMember"
import { getMcyMemberApi } from "../api/mcyMemberApi"
import Layout from "../components/Layout/Layout"
import { CheckedMember } from "../types/CheckedMember"
import { getAttendanceApi, updateAttendanceApi } from "../api/mcyAttendanceDataApi"

// 출석 업데이트를 위한 인터페이스 정의
interface AttendanceUpdateParams {
  date: string
  cell: string
  memberName: string
  isChecked: boolean
}

const AttendanceCheck = () => {
  const [totalMember, setTotalMember] = useState<number>(0)
  const [attendanceMember, setAttendanceMember] = useState<number>(0)
  const [adultMember, setAdultMember] = useState<number>(0)
  const [memberList, setMemberList] = useState<McyMember[]>([])
  const [selectedCell, setSelectedCell] = useState<McyMember | null>(null)
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

  // 체크 상태를 인덱스 대신 "셀명:멤버명" 형식의 키로 저장
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
  /*{
  "이화승셀:이화승": true,
  "신이슬셀:김선우": true,
  "대예배:박지훈": false
}*/

  // 체크박스 체크/해제 시 출석 수 업데이트 (key 형식: "cellName:memberName")
  const handleCheckChange = (compositeKey: string, checked: boolean) => {
    // 키에서 셀 이름과 멤버 이름 추출
    const [cellName, memberName] = compositeKey.split(":")

    // 체크박스 상태 업데이트
    setCheckedItems(prev => ({
      ...prev,
      [compositeKey]: checked,
    }))

    // 출석 인원 카운트 업데이트
    if (checked) {
      setAttendanceMember(prev => prev + 1)
      setTotalMember(attendanceMember + 1 + adultMember) // 출석인원 + 어른

      // 출석 데이터 업데이트 (멤버 추가)
      updateAttendance({
        date: currentDate.format("YYYY-MM-DD"),
        cell: cellName,
        memberName,
        isChecked: true,
      })
    } else {
      setAttendanceMember(prev => prev - 1)
      setTotalMember(attendanceMember - 1 + adultMember) // 출석인원 + 어른

      // 출석 데이터 업데이트 (멤버 제거)
      updateAttendance({
        date: currentDate.format("YYYY-MM-DD"),
        cell: cellName,
        memberName,
        isChecked: false,
      })
    }
  }

  // 현재 날짜의 출석 데이터 로드
  const loadAttendanceData = async () => {
    const dateStr = currentDate.format("YYYY-MM-DD")

    try {
      const data: CheckedMember | [] = await getAttendanceApi(dateStr)
      // 데이터가 없을 경우 모든 체크박스를 해제하고 카운트를 0으로 설정
      if (Array.isArray(data) && data.length === 0) {
        setCheckedItems({}) // 체크박스 상태 초기화
        setAttendanceMember(0)
        setAdultMember(0)
        setTotalMember(0)
        return
      }

      const attendanceData = data as CheckedMember

      // 체크된 멤버들의 상태를 업데이트
      const newCheckedItems: Record<string, boolean> = {}

      attendanceData.cellData.forEach(cellData => {
        cellData.checkedMember.forEach(memberName => {
          newCheckedItems[`${cellData.cell}:${memberName}`] = true
        })
      })

      setCheckedItems(newCheckedItems)
      setAttendanceMember(attendanceData.memberCount)
      setAdultMember(attendanceData.adultCount || 0)
      setTotalMember(attendanceData.memberCount + (attendanceData.adultCount || 0))
    } catch (error) {
      console.error("출석 데이터 로드 중 오류 발생:", error)
      // 오류 발생 시 상태 초기화
      setCheckedItems({})
      setAttendanceMember(0)
      setAdultMember(0)
      setTotalMember(0)
    }
  }

  // 컴포넌트 마운트 시 멤버 목록과 출석 데이터 로드
  useEffect(() => {
    const fetchMemberList = async () => {
      const data = await getMcyMemberApi()
      setMemberList(data)
      setSelectedCell(data[0])
    }

    fetchMemberList()
  }, [])

  // 날짜가 변경될 때마다 출석 데이터 로드
  useEffect(() => {
    loadAttendanceData()
  }, [currentDate])

  // 셀 선택 시 체크박스 목록 변경
  const handleCellChange = (value: string) => {
    const cell = memberList.find(member => member.cell === value)
    if (cell) {
      setSelectedCell(cell)
    }
  }

  const handleAdultPlusMember = () => {
    setAdultMember(prev => prev + 1)
    setTotalMember(attendanceMember + adultMember + 1)
  }

  const handleAdultMinusMember = () => {
    if (adultMember > 0) {
      setAdultMember(prev => prev - 1)
      setTotalMember(attendanceMember + adultMember - 1)
    }
  }

  // 예시: 출석 체크 데이터 업데이트
  const updateAttendance = async (params: AttendanceUpdateParams) => {
    const { date, cell, memberName, isChecked } = params

    try {
      // 1. 기존 데이터 가져오기
      const data: CheckedMember | [] = await getAttendanceApi(date)
      let attendanceData: CheckedMember

      if (Array.isArray(data) && data.length === 0) {
        // 새 데이터 생성 (체크 해제일 경우 이 부분은 실행되지 않을 것임)
        if (isChecked) {
          attendanceData = {
            adultCount: adultMember,
            cellData: [{ cell, checkedMember: [memberName] }],
            date,
            memberCount: 1,
            totalCount: 1 + adultMember,
          }
        } else {
          // 데이터가 없는데 체크 해제는 무시
          return
        }
      } else {
        // 기존 데이터 수정
        attendanceData = data as CheckedMember
        attendanceData.adultCount = adultMember // 현재 어른 출석 수 저장

        // 해당 셀 찾기
        const cellIndex = attendanceData.cellData.findIndex(c => c.cell === cell)

        if (cellIndex >= 0) {
          if (isChecked) {
            // 체크 설정: 멤버 추가
            if (!attendanceData.cellData[cellIndex].checkedMember.includes(memberName)) {
              attendanceData.cellData[cellIndex].checkedMember.push(memberName)
              attendanceData.memberCount += 1
              attendanceData.totalCount = attendanceData.memberCount + attendanceData.adultCount
            }
          } else {
            // 체크 해제: 멤버 제거
            const memberIndex = attendanceData.cellData[cellIndex].checkedMember.indexOf(memberName)
            if (memberIndex !== -1) {
              attendanceData.cellData[cellIndex].checkedMember.splice(memberIndex, 1)
              attendanceData.memberCount = Math.max(0, attendanceData.memberCount - 1)
              attendanceData.totalCount = attendanceData.memberCount + attendanceData.adultCount

              // 셀에 멤버가 없으면 셀 자체를 제거할 수도 있음
              if (attendanceData.cellData[cellIndex].checkedMember.length === 0) {
                attendanceData.cellData.splice(cellIndex, 1)
              }
            }
          }
        } else if (isChecked) {
          // 셀이 없고 체크 설정이면 새 셀 추가
          attendanceData.cellData.push({ cell, checkedMember: [memberName] })
          attendanceData.memberCount += 1
          attendanceData.totalCount = attendanceData.memberCount + attendanceData.adultCount
        }
      }

      // 2. 데이터 저장
      await updateAttendanceApi(date, attendanceData)
    } catch (error) {
      console.error("출석 데이터 업데이트 중 오류 발생:", error)
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
            {selectedCell?.checkedMember.map((member, index) => {
              const key = `${selectedCell.cell}:${member}`
              return (
                <div key={index} className="w-[122px] h-[43px] bg-[#F0F0F0] rounded-[18px] border border-solid border-black flex flex-row items-center justify-center gap-2 ">
                  <Checkbox id={key} checked={checkedItems[key] || false} onCheckedChange={checked => handleCheckChange(`${selectedCell.cell}:${member}`, checked as boolean)} />
                  <label htmlFor={key} className={`text-[20px] ${checkedItems[key] ? "font-bold" : "font-medium"}`}>
                    {member}
                  </label>
                </div>
              )
            })}
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
              onClick={handleAdultPlusMember}
              className="w-[70px] h-[70px] px-[5%] bg-[#DDD6F9] box-border border border-solid border-black rounded-[25px] [&_svg]:size-10 focus:bg-[#DDD6F9] focus:border-black">
              <PlusIcon />
            </Button>
            {/* 출석 인원 감소 */}
            <Button
              onClick={handleAdultMinusMember}
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
