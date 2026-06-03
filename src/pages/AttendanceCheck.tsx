import dayjs from "dayjs"
import "dayjs/locale/ko"
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon, UserGroupIcon } from "@heroicons/react/24/outline"
import { PlusIcon, MinusIcon, CheckIcon } from "@heroicons/react/24/solid"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import Layout from "../components/Layout/Layout"
import { McyMember } from "../types/McyMember"
import { AttendanceStatus, CellData } from "../types/CheckedMember"
import PAGE_PATH from "../constants/path"

import { getMcyMemberApi } from "../api/mcyMemberApi"
import { getAttendanceStatusApi, updateAttendanceApi } from "../api/mcyAttendanceDataApi"

const CELL_COLORS = [
  {
    cardBg: "bg-[#CCCAF0]",
    panelBg: "bg-[#D9D7F4]",
    checkedBg: "bg-[#6664C8]",
    uncheckedBg: "bg-white",
    avatarBg: "bg-white",
    avatarText: "text-[#6664C8]",
  },
  {
    cardBg: "bg-[#C5DFC2]",
    panelBg: "bg-[#D5E9D3]",
    checkedBg: "bg-[#5E9E5A]",
    uncheckedBg: "bg-[#E8F4E7]",
    avatarBg: "bg-white",
    avatarText: "text-[#5E9E5A]",
  },
  {
    cardBg: "bg-[#F0E0A0]",
    panelBg: "bg-[#F7ECC4]",
    checkedBg: "bg-[#C4A030]",
    uncheckedBg: "bg-[#FAF4DA]",
    avatarBg: "bg-white",
    avatarText: "text-[#C4A030]",
  },
  {
    cardBg: "bg-[#F5C5C5]",
    panelBg: "bg-[#FAD8D8]",
    checkedBg: "bg-[#C45050]",
    uncheckedBg: "bg-[#FFF0F0]",
    avatarBg: "bg-white",
    avatarText: "text-[#C45050]",
  },
]

const getDayLabel = (date: dayjs.Dayjs) => {
  return date.day() === 0 ? "주일" : date.locale("ko").format("dddd")
}

const AttendanceCheck = () => {
  const navigate = useNavigate()
  const [totalMember, setTotalMember] = useState<number>(0)
  const [attendanceMember, setAttendanceMember] = useState<number>(0)
  const [adultCount, setAdultCount] = useState<number>(0)
  const [memberList, setMemberList] = useState<McyMember[]>([])
  const [selectedCell, setSelectedCell] = useState<McyMember | null>(null)
  const [currentDate, setCurrentDate] = useState<dayjs.Dayjs>(
    dayjs().locale("ko").day(0),
  )
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
  const [attendanceData, setAttendanceData] = useState<AttendanceStatus | null>(null)
  const [showCellDropdown, setShowCellDropdown] = useState<boolean>(false)

  const cellColorIndex = selectedCell
    ? memberList.findIndex(m => m.cell === selectedCell.cell) % CELL_COLORS.length
    : 0
  const cellColors = CELL_COLORS[Math.max(0, cellColorIndex)]

  const currentCellCheckedCount = selectedCell
    ? selectedCell.checkedMember.filter(member => checkedItems[`${selectedCell.cell}:${member}`]).length
    : 0

  const getCurrentDateStr = () => currentDate.format("YYYY-MM-DD")
  const calculateTotalCount = (memberCount: number, adult: number) => memberCount + adult

  const updateFirebaseAttendance = async (newData: AttendanceStatus) => {
    const dateStr = getCurrentDateStr()
    try {
      await updateAttendanceApi(dateStr, newData)
    } catch (error) {
      console.error("출석 데이터 업데이트 중 오류 발생:", error)
    }
  }

  useEffect(() => {
    const fetchMemberList = async () => {
      const data = await getMcyMemberApi()
      setMemberList(data)
      setSelectedCell(data[0])
    }
    fetchMemberList()
  }, [])

  const handleCellChange = (value: string) => {
    const cell = memberList.find(member => member.cell === value)
    if (cell) setSelectedCell(cell)
  }

  const loadAttendanceData = async () => {
    const dateStr = getCurrentDateStr()
    try {
      const data: AttendanceStatus | [] = await getAttendanceStatusApi(dateStr)
      if (Array.isArray(data) || !data) {
        const newData: AttendanceStatus = {
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
        setAttendanceData(data)
        const newCheckedItems: Record<string, boolean> = {}
        data.cellData.forEach((cellData: CellData) => {
          cellData.checkedMember.forEach((memberName: string) => {
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

  const handleAdultCountUpdate = async (newCount: number) => {
    if (!attendanceData) return
    const updatedData: AttendanceStatus = {
      ...attendanceData,
      adultCount: newCount,
      totalCount: calculateTotalCount(attendanceData.memberCount, newCount),
    }
    setAttendanceData(updatedData)
    setAdultCount(newCount)
    setTotalMember(calculateTotalCount(attendanceData.memberCount, newCount))
    await updateFirebaseAttendance(updatedData)
  }

  const handleAdultPlusMember = () => handleAdultCountUpdate(adultCount + 1)

  const handleAdultMinusMember = () => {
    if (adultCount > 0) handleAdultCountUpdate(adultCount - 1)
  }

  const handleCheckChange = async (compositeKey: string, checked: boolean) => {
    if (!attendanceData) return

    const [cell, memberName] = compositeKey.split(":")
    const newMemberCount = checked ? attendanceMember + 1 : attendanceMember - 1

    if (!checked && newMemberCount < 0) return

    setCheckedItems(prev => ({ ...prev, [compositeKey]: checked }))

    const updatedData = { ...attendanceData }
    const cellIndex = updatedData.cellData.findIndex(data => data.cell === cell)

    if (cellIndex >= 0) {
      if (checked) {
        if (!updatedData.cellData[cellIndex].checkedMember.includes(memberName)) {
          updatedData.cellData[cellIndex].checkedMember.push(memberName)
          updatedData.memberCount += 1
        }
      } else {
        const memberIndex = updatedData.cellData[cellIndex].checkedMember.indexOf(memberName)
        if (memberIndex !== -1) {
          updatedData.cellData[cellIndex].checkedMember.splice(memberIndex, 1)
          updatedData.memberCount -= 1
          if (updatedData.cellData[cellIndex].checkedMember.length === 0) {
            updatedData.cellData.splice(cellIndex, 1)
          }
        }
      }
    } else if (checked) {
      updatedData.cellData.push({ cell, checkedMember: [memberName] })
      updatedData.memberCount += 1
    }

    updatedData.totalCount = calculateTotalCount(updatedData.memberCount, updatedData.adultCount)

    setAttendanceData(updatedData)
    setAttendanceMember(updatedData.memberCount)
    setTotalMember(updatedData.totalCount)

    await updateFirebaseAttendance(updatedData)
  }

  const handlePrevWeek = () => setCurrentDate(currentDate.subtract(7, "day"))
  const handleNextWeek = () => setCurrentDate(currentDate.add(7, "day"))

  useEffect(() => {
    loadAttendanceData()
  }, [currentDate])

  const handleGoAttendanceStatus = () => navigate(PAGE_PATH.ATTENDANCE_STATUS)

  return (
    <div className="w-full min-h-[100dvh] flex flex-col">
      <Layout>
        <div className="w-full flex flex-col pb-32">
          {/* 날짜 헤더 */}
          <div className="w-full px-5 pt-6 pb-5 flex flex-col items-center gap-1">
            <span className="text-[11px] text-gray-400 font-medium tracking-widest">출석 체크 · CHECK-IN</span>
            <div className="flex items-center gap-8 mt-1">
              <button onClick={handlePrevWeek} className="p-1 rounded-full">
                <ChevronLeftIcon className="w-5 h-5 stroke-[2.5px] text-gray-500" />
              </button>
              <span className="text-[28px] font-bold tracking-tight text-gray-800">
                {currentDate.format("YYYY.MM.DD")}
              </span>
              <button onClick={handleNextWeek} className="p-1 rounded-full">
                <ChevronRightIcon className="w-5 h-5 stroke-[2.5px] text-gray-500" />
              </button>
            </div>
            <span className="text-sm text-gray-500 mt-0.5">{getDayLabel(currentDate)}</span>
          </div>

          {/* 셀 선택 */}
          <div className="w-full px-5 flex gap-3 relative">
            <div
              className={`flex-1 ${cellColors.cardBg} rounded-2xl px-4 py-3.5 flex items-center justify-between cursor-pointer`}
              onClick={() => setShowCellDropdown(prev => !prev)}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl ${cellColors.avatarBg} ${cellColors.avatarText} flex items-center justify-center font-bold text-xl flex-shrink-0`}
                >
                  {selectedCell?.cell.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-gray-800 text-[15px] leading-tight">{selectedCell?.cell}</div>
                  <div className="text-sm text-gray-500 mt-0.5">
                    출석 {currentCellCheckedCount} / {selectedCell?.checkedMember.length}
                  </div>
                </div>
              </div>
              <ChevronDownIcon
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ${showCellDropdown ? "rotate-180" : ""}`}
              />
            </div>

            {/* 전체 버튼 */}
            <div
              className={`w-16 ${cellColors.cardBg} rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer`}
              onClick={handleGoAttendanceStatus}
            >
              <UserGroupIcon className="w-7 h-7 text-gray-600" />
              <span className="text-xs text-gray-600 font-medium">전체</span>
            </div>

            {/* 셀 드롭다운 */}
            {showCellDropdown && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowCellDropdown(false)} />
                <div className="absolute top-[calc(100%+8px)] left-5 right-5 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                  {memberList.map((member, idx) => {
                    const isSelected = selectedCell?.cell === member.cell
                    const color = CELL_COLORS[idx % CELL_COLORS.length]
                    return (
                      <div
                        key={member.cell}
                        className={`px-4 py-3.5 flex items-center gap-3 cursor-pointer transition-colors ${isSelected ? color.cardBg : "hover:bg-gray-50"}`}
                        onClick={() => {
                          handleCellChange(member.cell)
                          setShowCellDropdown(false)
                        }}
                      >
                        <div
                          className={`w-8 h-8 rounded-lg ${color.cardBg} ${color.avatarText} flex items-center justify-center font-bold text-sm flex-shrink-0`}
                        >
                          {member.cell.charAt(0)}
                        </div>
                        <span className={`text-gray-800 ${isSelected ? "font-bold" : "font-medium"}`}>{member.cell}</span>
                        {isSelected && <CheckIcon className="w-4 h-4 ml-auto text-gray-500" />}
                      </div>
                    )
                  })}
                </div>
              </>
            )}
          </div>

          {/* 멤버 패널 */}
          <div className={`mx-5 mt-4 ${cellColors.panelBg} rounded-2xl p-4`}>
            <div className="flex items-center justify-between mb-3 px-0.5">
              <span className="font-semibold text-gray-700 text-[15px]">{selectedCell?.cell} 명단</span>
              <div className="flex items-baseline gap-0.5">
                <span className="font-bold text-gray-700 text-base">{currentCellCheckedCount}</span>
                <span className="text-gray-400 text-sm"> / {selectedCell?.checkedMember.length}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {selectedCell?.checkedMember.map((member, index) => {
                const key = `${selectedCell.cell}:${member}`
                const isChecked = checkedItems[key] || false
                return (
                  <div
                    key={index}
                    className={`${isChecked ? `${cellColors.checkedBg} text-white` : `${cellColors.uncheckedBg} text-gray-800`} rounded-xl px-3 py-3.5 flex items-center gap-2.5 cursor-pointer transition-all duration-150 active:scale-[0.97]`}
                    onClick={() => handleCheckChange(key, !isChecked)}
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 ${
                        isChecked ? "bg-white/25" : "border-[1.5px] border-gray-300"
                      }`}
                    >
                      {isChecked && <CheckIcon className="w-3 h-3 text-white" />}
                    </div>
                    <span className={`text-sm leading-tight ${isChecked ? "font-semibold" : "font-medium"}`}>{member}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* 하단 바 */}
        <div className="fixed bottom-0 left-0 right-0 px-5 pb-6 pt-3 flex items-center gap-3 bg-[#FFFCF6]/90 backdrop-blur-sm">
          <div className="flex-1 bg-[#5B4FCF] rounded-2xl px-5 py-3 flex flex-col justify-center min-h-[64px]">
            <span className="text-white/70 text-xs font-medium">전체 출석</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-white text-[28px] font-bold leading-none">{attendanceMember}</span>
              <span className="text-white/50 text-lg leading-none">/ {totalMember}</span>
            </div>
          </div>
          <button
            onClick={handleAdultPlusMember}
            className="w-[60px] h-[64px] bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 active:scale-95 transition-transform"
          >
            <PlusIcon className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={handleAdultMinusMember}
            className="w-[60px] h-[64px] bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 active:scale-95 transition-transform"
          >
            <MinusIcon className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </Layout>
    </div>
  )
}

export default AttendanceCheck
