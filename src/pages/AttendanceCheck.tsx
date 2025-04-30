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

const AttendanceCheck = () => {
  const [totalMember, setTotalMember] = useState<number>(0)
  const [attendanceMember, setAttendanceMember] = useState<number>(0)
  const [adultCount, setAdultCount] = useState<number>(0)
  const [memberList, setMemberList] = useState<McyMember[]>([])
  const [selectedCell, setSelectedCell] = useState<McyMember | null>(null)
  const [currentDate, setCurrentDate] = useState<dayjs.Dayjs>(
    dayjs().locale("ko").day(0), // 이번 주 일요일
  )
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
  const [attendanceData, setAttendanceData] = useState<CheckedMember | null>(null)

  // 공통으로 사용되는 함수들
  const getCurrentDateStr = () => currentDate.format("YYYY-MM-DD") // 현재 날짜 문자열 반환

  const calculateTotalCount = (memberCount: number, adultCount: number) => memberCount + adultCount // 총 인원 수 계산

  const updateFirebaseAttendance = async (newData: CheckedMember) => {
    // 출석 데이터 업데이트
    const dateStr = getCurrentDateStr()
    try {
      await updateAttendanceApi(dateStr, newData)
    } catch (error) {
      console.error("출석 데이터 업데이트 중 오류 발생:", error)
    }
  }
  // 컴포넌트 마운트 시 멤버 목록과 출석 데이터 로드
  useEffect(() => {
    const fetchMemberList = async () => {
      const data = await getMcyMemberApi() // 셀 정보 가져오기
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

  // 현재 날짜의 출석 데이터 로드
  const loadAttendanceData = async () => {
    const dateStr = getCurrentDateStr()
    try {
      const data: CheckedMember | [] = await getAttendanceApi(dateStr)
      if (Array.isArray(data) || !data) {
        // 새 데이터 생성
        const newData: CheckedMember = {
          adultCount: 0,
          cellData: [],
          date: dateStr,
          memberCount: 0,
          totalCount: 0,
        }
        setAttendanceData(newData)
        setCheckedItems({})
        setAttendanceMember(0)
        setAdultCount(0)
        setTotalMember(0)
      } else {
        // 기존 데이터 설정
        setAttendanceData(data)
        const newCheckedItems: Record<string, boolean> = {}
        data.cellData.forEach(cellData => {
          cellData.checkedMember.forEach(memberName => {
            newCheckedItems[`${cellData.cell}:${memberName}`] = true
          })
        })
        setCheckedItems(newCheckedItems)
        setAttendanceMember(data.memberCount)
        setAdultCount(data.adultCount || 0)
        setTotalMember(data.memberCount + (data.adultCount || 0))
      }
    } catch (error) {
      console.error("출석 데이터 로드 중 오류 발생:", error)
      setAttendanceData(null)
      setCheckedItems({})
      setAttendanceMember(0)
      setAdultCount(0)
      setTotalMember(0)
    }
  }

  // 어른 카운트 업데이트 공통 함수
  const handleAdultCountUpdate = async (newCount: number) => {
    if (!attendanceData) return

    const updatedData: CheckedMember = {
      ...attendanceData,
      adultCount: newCount,
      totalCount: calculateTotalCount(attendanceData.memberCount, newCount),
    }

    setAttendanceData(updatedData)
    setAdultCount(newCount)
    setTotalMember(calculateTotalCount(attendanceMember, newCount))

    // Firebase 업데이트
    await updateFirebaseAttendance(updatedData)
  }

  // 어른 수 증가
  const handleAdultPlusMember = () => {
    handleAdultCountUpdate(adultCount + 1)
  }

  // 어른 수 감소
  const handleAdultMinusMember = () => {
    if (adultCount > 0) {
      handleAdultCountUpdate(adultCount - 1)
    }
  }

  // 체크박스 상태 변경 처리
  const handleCheckChange = async (compositeKey: string, checked: boolean) => {
    if (!attendanceData) return

    const [cell, memberName] = compositeKey.split(":")
    const newMemberCount = checked ? attendanceMember + 1 : attendanceMember - 1

    if (!checked && newMemberCount < 0) return

    // 체크박스 상태 업데이트
    setCheckedItems(prev => ({
      ...prev,
      [compositeKey]: checked,
    }))

    // 출석 데이터 업데이트
    const updatedData = { ...attendanceData }
    const cellIndex = updatedData.cellData.findIndex(data => data.cell === cell)

    if (cellIndex >= 0) {
      if (checked) {
        // 체크 설정: 멤버 추가
        if (!updatedData.cellData[cellIndex].checkedMember.includes(memberName)) {
          updatedData.cellData[cellIndex].checkedMember.push(memberName)
          updatedData.memberCount += 1
        }
      } else {
        // 체크 해제: 멤버 제거
        const memberIndex = updatedData.cellData[cellIndex].checkedMember.indexOf(memberName)
        if (memberIndex !== -1) {
          updatedData.cellData[cellIndex].checkedMember.splice(memberIndex, 1)
          updatedData.memberCount -= 1

          //셀에 멤버가 없으면 셀 자체를 제거
          if (updatedData.cellData[cellIndex].checkedMember.length === 0) {
            updatedData.cellData.splice(cellIndex, 1)
          }
        }
      }
    } else if (checked) {
      // 출석체크에 셀이 없고 체크 설정이면 새 셀 추가
      updatedData.cellData.push({ cell, checkedMember: [memberName] })
      updatedData.memberCount += 1
    }

    updatedData.totalCount = calculateTotalCount(updatedData.memberCount, updatedData.adultCount)

    // 상태 업데이트
    setAttendanceData(updatedData)
    setAttendanceMember(updatedData.memberCount)
    setTotalMember(updatedData.totalCount)

    // Firebase 업데이트
    await updateFirebaseAttendance(updatedData)
  }

  // 이전 주 일요일로 이동
  const handlePrevWeek = () => {
    setCurrentDate(currentDate.subtract(7, "day"))
  }

  // 다음 주 일요일로 이동
  const handleNextWeek = () => {
    setCurrentDate(currentDate.add(7, "day"))
  }

  // 날짜가 변경될 때마다 출석 데이터 로드
  useEffect(() => {
    loadAttendanceData()
  }, [currentDate])

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
