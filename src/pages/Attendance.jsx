import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import dayjs from "dayjs"
import "dayjs/locale/ko"
import { v4 as uuidv4 } from "uuid" // uuid import

import Stack from "@mui/material/Stack"
import { styled } from "@mui/material"
import Typography from "@mui/material/Typography"
import Checkbox from "@mui/material/Checkbox"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker"
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"
import SettingsIcon from "@mui/icons-material/Settings"
import PeopleAltIcon from "@mui/icons-material/PeopleAlt"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import ButtonGroup from "@mui/material/ButtonGroup"
import Button from "@mui/material/Button"

import Layout from "../components/Layout/Layout"
import { getMcyMemberApi } from "../api/mcyMemberApi"
import { getAttendanceApi, updateAttendanceApi } from "../api/attendanceDataApi"

const Attendance = () => {
  const [members, setMembers] = useState([])
  const [attendance, setAttendance] = useState([])
  const navigate = useNavigate()
  const [state, setState] = useState({
    selectedLeader: "대예배",
    adultCount: 0,
    memberCount: 0,
    totalCount: 0,
    attendanceAllData: {},
    isChecked: {},
    value: dayjs().subtract(dayjs().day() === 0 ? 7 : dayjs().day(), "day"),
    id: uuidv4(),
  })

  const handleNavigate = () => {
    navigate("/attendancestatus")
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const membersList = await getMcyMemberApi()
        setMembers(membersList)
      } catch (error) {
        console.log("Error fetching members:", error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const AttendancefetchData = async () => {
      try {
        const data = await getAttendanceApi()
        setAttendance(data)
      } catch (error) {
        console.error("Error fetching data: ", error)
      }
    }
    AttendancefetchData()
  }, [attendance])

  // 출석 데이터 저장
  const handleUpdateAttendance = async (isChecked, adultCount, totalCount) => {
    try {
      const { id } = state
      const attendanceData = {
        date: state.value.format("YYYY-MM-DD"),
        adultCount,
        memberCount: Object.values(isChecked).filter(Boolean).length,
        totalCount,
        cellData: members.reduce((acc, leader) => {
          acc[leader.cell] = leader?.cellMember?.filter(member => isChecked[member])
          return acc
        }, {}),
      }

      await updateAttendanceApi(id, attendanceData)
      console.log("Attendance data updated successfully!")
    } catch (error) {
      console.error("Error updating attendance data: ", error)
    }
  }

  useEffect(() => {
    const initialCheckedState = {}
    const currentDayOfWeek = dayjs().day()
    const daysToLastSunday = currentDayOfWeek === 0 ? 7 : currentDayOfWeek
    const lastSunday = dayjs().subtract(daysToLastSunday, "day")
    members.forEach(leader => {
      if (leader && leader.cellMember) {
        leader.cellMember.forEach(member => {
          initialCheckedState[member] = leader.isChecked || false
        })
      }
    })

    if (members.length > 0) {
      setState(prevState => ({
        ...prevState,
        isChecked: initialCheckedState,
        selectedLeader: "대예배",
        adultCount: 0,
        memberCount: 0,
        totalCount: 0,
        attendanceAllData: {},
        value: dayjs(lastSunday),
      }))
    }
  }, [members])

  // 지난주 날짜 변경
  const handlePrevDayClick = () => {
    setState(prevState => ({
      ...prevState,
      value: dayjs(prevState.value).subtract(7, "day"),
      selectedLeader: "대예배",
      adultCount: 0,
      memberCount: 0,
      totalCount: 0,
      isChecked: {},
      attendanceAllData: {},
    }))
  }

  // 다음주 날짜 변경
  const handleNextDayClick = () => {
    setState(prevState => ({
      ...prevState,
      value: dayjs(prevState.value).add(7, "day"),
      selectedLeader: "대예배",
      adultCount: 0,
      memberCount: 0,
      totalCount: 0,
      isChecked: {},
      attendanceAllData: {},
    }))
  }

  // 리더 선택
  const handleLeaderClick = cell => {
    setState(prevState => ({
      ...prevState,
      selectedLeader: cell,
    }))
  }

  // 셀원 체크
  const handleCheck = member => {
    setState(prevState => {
      const isChecked = { ...prevState.isChecked }
      isChecked[member] = !isChecked[member]
      let memberCount = prevState.memberCount
      if (isChecked[member]) memberCount++
      else memberCount--
      const totalCount = isChecked[member] ? prevState.totalCount + 1 : prevState.totalCount - 1

      return {
        ...prevState,
        isChecked,
        memberCount,
        totalCount,
      }
    })
  }

  // 어른 출석 체크 증가
  const handleAdultPlus = () => {
    setState(prevState => {
      const newAdultCount = prevState.adultCount + 1
      const newTotalCount = prevState.totalCount + 1

      return {
        ...prevState,
        adultCount: newAdultCount,
        totalCount: newTotalCount,
      }
    })
  }

  // 어른 출석 체크 감소
  const handleAdultMinus = () => {
    setState(prevState => {
      const newAdultCount = prevState.adultCount > 0 ? prevState.adultCount - 1 : 0
      const newTotalCount = prevState.adultCount > 0 ? prevState.totalCount - 1 : prevState.totalCount

      return {
        ...prevState,
        adultCount: newAdultCount,
        totalCount: newTotalCount,
      }
    })
  }

  useEffect(() => {
    const delay = setTimeout(() => {
      handleUpdateAttendance(state.isChecked, state.adultCount, state.totalCount)
    }, 300)
    return () => clearTimeout(delay) // 이펙트 정리
  }, [state.isChecked, state.adultCount, state.totalCount, state])

  return (
    <Layout>
      <AttendanceWrapper>
        <CalendarWrapper>
          <DateWrapper>
            <ArrowIconWrapper onClick={handlePrevDayClick} icon={ArrowLeftIcon} />
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
              <MobileDateWrapper value={state.value} format="YYYY.MM.DD" shouldDisableDate={date => date.day() !== 0} />
            </LocalizationProvider>
            <ArrowIconWrapper onClick={handleNextDayClick} icon={ArrowRightIcon} />
          </DateWrapper>
          <SettingsIcon />
        </CalendarWrapper>
        <LeaderInfoWrapper>
          <SelectWrapper
            value={state.selectedLeader ? state.selectedLeader : "대예배"}
            onChange={e => handleLeaderClick(e.target.value)}
            MenuProps={{
              PaperProps: {
                style: {
                  backgroundColor: "#DDD6f9",
                  borderRadius: "20px",
                },
              },
            }}>
            {members
              .sort((a, b) => a.cellNumber - b.cellNumber) // Sort by cellNumber
              .map(item => (
                <MenuItemWrapper key={item.id} value={item.cell || ""}>
                  {item.cell}
                </MenuItemWrapper>
              ))}
          </SelectWrapper>
          <StatusWrapper onClick={handleNavigate}>
            <PeopleAltIconWrapper />
          </StatusWrapper>
        </LeaderInfoWrapper>
        <DataWrapper>
          <DataAreaWrapper>
            <MemberDataAreaWrapper>
              {members.length > 0 &&
                (state.selectedLeader
                  ? members
                      .find(leader => leader.cell === state.selectedLeader)
                      ?.cellMember.map(member => (
                        <MemberDataWrapper key={member}>
                          <CheckBoxWrapper checked={!!state.isChecked[member]} onChange={() => handleCheck(member)} />
                          <CheckMemberWrapper checked={state.isChecked[member]} onClick={() => handleCheck(member)}>
                            {member}
                          </CheckMemberWrapper>
                        </MemberDataWrapper>
                      ))
                  : members[0]?.cellMember.map(member => (
                      <MemberDataWrapper key={member}>
                        <CheckBoxWrapper checked={!!state.isChecked[member]} onChange={() => handleCheck(member)} />
                        <CheckMemberWrapper checked={state.isChecked[member]} onClick={() => handleCheck(member)}>
                          {member}
                        </CheckMemberWrapper>
                      </MemberDataWrapper>
                    )))}
            </MemberDataAreaWrapper>
          </DataAreaWrapper>
        </DataWrapper>
        <CounterWrapper>
          <AdultDataWrapper variant="outlined">
            <AddIconWrapper onClick={handleAdultPlus}>+</AddIconWrapper>
            <MinusIconWrapper onClick={handleAdultMinus}>-</MinusIconWrapper>
          </AdultDataWrapper>
          <AttendanceTotalDataWrapper>
            <AttendanceTextWrapper>출석 :</AttendanceTextWrapper>
            <MemberCountWrapper>{state.memberCount}</MemberCountWrapper>
            <SlashWrapper>/</SlashWrapper>
            <TotalCountWrapper>{state.totalCount}</TotalCountWrapper>
          </AttendanceTotalDataWrapper>
        </CounterWrapper>
      </AttendanceWrapper>
    </Layout>
  )
}

const AttendanceWrapper = styled(Stack)`
  width: 100vw;
  height: calc(100dvh - 160px);
`

const CalendarWrapper = styled(Stack)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 10%;
  margin: 0 auto;
`

const DateWrapper = styled(Stack)`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex: 1;
`

const ArrowIconWrapper = styled(({ icon: IconComponent, ...props }) => <IconComponent {...props} />)`
  color: #69535f;
  font-size: 35px;
  font-weight: 700;
`

const MobileDateWrapper = styled(MobileDatePicker)`
  width: 40%;
  pointer-events: none;
  & .MuiInputBase-root {
    justify-content: center;
    align-items: center;
    padding: 0px;
    font-family: "Inter";
    font-weight: 600;
    font-size: 15px;
  }
  & .MuiInputBase-input {
    justify-content: center;
    align-items: center;
    padding: 0px;
    text-align: center;
  }
  & .MuiOutlinedInput-notchedOutline {
    border: none;
  }
`

const LeaderInfoWrapper = styled(Stack)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 15%;
  margin: 0 auto;
  gap: 13px;
`

const SelectWrapper = styled(Select)`
  font-family: "Noto Sans";
  font-weight: 600;
  font-size: 20px;
  background: #c7bdeb;
  border-radius: 22px;
  border: 1px solid red;
  width: 85%;
  height: 80%;
  border: 1px solid black;
  color: #404040;
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &.Mui-focused .MuiOutlinedInput-notchedOutline {
    border: none;
  }
`

const MenuItemWrapper = styled(MenuItem)`
  font-weight: 500;
  &.Mui-selected {
    font-weight: 700;
    font-size: 15px;
  }
`

const StatusWrapper = styled(Stack)`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #d9e8ea;
  width: 25%;
  height: 80%;
  border-radius: 22px;
  border: 1px solid black;
`

const PeopleAltIconWrapper = styled(PeopleAltIcon)`
  width: 80%;
  height: 70%;
`

const DataWrapper = styled(Stack)`
  display: flex;
  width: 90%;
  height: 60%;
  margin: 0 auto;
  border: 1px solid #000000;
  background-color: #f8e6ba;
  border-radius: 25px;
`
const DataAreaWrapper = styled(Stack)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
`
const MemberDataAreaWrapper = styled(Stack)`
  width: 90%;
  height: 90%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  overflow-y: auto;
  align-items: center;
  gap: 10px;
`
const MemberDataWrapper = styled(Stack)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  background-color: #f0f0f0;
  border-radius: 16px;
  width: 85%;
  height: 95%;
  margin: 0px auto;
`

const CheckBoxWrapper = styled(Checkbox)`
  & .MuiSvgIcon-root {
    font-weight: ${props => (props.checked ? 700 : 500)};
    color: #000;
    font-size: 25px;
  }
`

const CheckMemberWrapper = styled(Typography)`
  width: 50%;
  font-size: 20px;
  font-weight: ${props => (props.checked ? 700 : 500)};
  color: #000;
`

const CounterWrapper = styled(Stack)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 20%;
  margin: 0 auto;
  gap: 10px;
`

const AdultDataWrapper = styled(ButtonGroup)`
  width: 40%;
  height: 70%;
  justify-content: center;
  align-items: center;
`

const AddIconWrapper = styled(Button)`
  width: 50%;
  height: 100%;
  border: 1px solid #000;
  border-radius: 25px;
  background-color: #b4dfc3;
  font-size: 30px;
  font-weight: 700;
  color: #000;
  :active {
    border: 1px solid #000;
    border-bottom-left-radius: 22px;
    border-top-left-radius: 22px;
    background-color: #b4dfc3;
    font-size: 30px;
    font-weight: 700;
    color: #000;
  }
  :hover {
    border: 1px solid #000;
    border-bottom-left-radius: 25px;
    border-top-left-radius: 25px;
    background-color: #b4dfc3;
    font-size: 30px;
    font-weight: 700;
    color: #000;
  }
`

const MinusIconWrapper = styled(Button)`
  width: 50%;
  height: 100%;
  border: 1px solid #000;
  border-radius: 25px;
  background-color: #b4dfc3;
  font-size: 30px;
  font-weight: 700;
  color: #000;
  :active {
    border: 1px solid #000;
    border-bottom-right-radius: 22px;
    border-top-right-radius: 22px;
    background-color: #b4dfc3;
    font-size: 30px;
    font-weight: 700;
    color: #000;
  }
  :hover {
    border: 1px solid #000;
    border-bottom-right-radius: 25px;
    border-top-right-radius: 25px;
    background-color: #b4dfc3;
    font-size: 30px;
    font-weight: 700;
    color: #000;
  }
`

const AttendanceTotalDataWrapper = styled(Stack)`
  background-color: #f3c5c5;
  width: 60%;
  height: 70%;
  border: 1px solid black;
  flex-direction: row;
  gap: 10px;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
`

const AttendanceTextWrapper = styled(Typography)`
  font-size: 24px;
  font-weight: 700;
  font-family: "Noto Sans";
`

const MemberCountWrapper = styled(Typography)`
  font-size: 24px;
  font-weight: 700;
  font-family: "Noto Sans";
`

const SlashWrapper = styled(Typography)`
  font-size: 24px;
  font-weight: 700;
  font-family: "Noto Sans";
`

const TotalCountWrapper = styled(Typography)`
  font-size: 24px;
  font-weight: 700;
  font-family: "Noto Sans";
`

export default Attendance
