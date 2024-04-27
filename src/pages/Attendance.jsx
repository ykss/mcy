import { useState, useEffect } from "react"

import dayjs from "dayjs"
import "dayjs/locale/ko"

import Stack from "@mui/material/Stack"
import { styled } from "@mui/material"
import Typography from "@mui/material/Typography"
import Chip from "@mui/material/Chip"
import Checkbox from "@mui/material/Checkbox"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import ChurchIcon from "@mui/icons-material/Church"
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"
import SettingsIcon from "@mui/icons-material/Settings"
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined"
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined"

import Layout from "../components/Layout/Layout"
import Title from "../components/shared/Title"
import { mcyMember } from "../data/mcyMember"

const Attendance = () => {
  const [state, setState] = useState({
    isOpenCalendar: false,
    selectedLeader: null,
    adultCount: 0,
    memberCount: 0,
    attendanceAllData: {},
    isChecked: {},
    value: dayjs().subtract(dayjs().day() === 0 ? 7 : dayjs().day(), "day"),
  })

  useEffect(() => {
    const initialCheckedState = {}
    const currentDayOfWeek = dayjs().day()
    const daysToLastSunday = currentDayOfWeek === 0 ? 7 : currentDayOfWeek
    const lastSunday = dayjs().subtract(daysToLastSunday, "day")
    mcyMember.forEach(leader => {
      leader.cellMember.forEach(member => {
        initialCheckedState[member] = leader.isChecked
      })
    })
    setState(prevState => ({
      ...prevState,
      isChecked: initialCheckedState,
      selectedLeader: null,
      adultCount: 0,
      memberCount: 0,
      totalCount: 0,
      attendanceAllData: {},
      value: dayjs(lastSunday),
    }))
  }, [])

  useEffect(() => {
    const updateAttendanceData = (date, leader) => {
      setState(prevState => {
        const updatedData = { ...prevState.attendanceAllData }

        if (!updatedData[date]) {
          updatedData[date] = {
            adultAttendance: 0,
            memberAttendance: 0,
            cellData: {},
          }
        }

        const leaderCellMembers = mcyMember.find(item => item.cell === leader)?.cellMember || []
        const checkedMembers = leaderCellMembers.filter(member => state.isChecked[member])

        if (leader) {
          updatedData[date].cellData[leader] = checkedMembers
        }

        updatedData[date].adultAttendance = state.adultCount
        updatedData[date].memberAttendance = Object.values(updatedData[date].cellData).reduce((acc, curr) => acc + curr.length, 0)
        updatedData[date].totalAttendance = updatedData[date].adultAttendance + updatedData[date].memberAttendance

        console.log("출석 데이터 업데이트:", updatedData)

        return {
          ...prevState,
          attendanceAllData: updatedData,
        }
      })
    }

    if (state.selectedLeader !== null || state.adultCount !== 0) {
      updateAttendanceData(state.value.format("YYYY-MM-DD"), state.selectedLeader)
    }
  }, [state.adultCount, state.isChecked])

  const handleChange = newData => {
    setState(prevState => ({
      ...prevState,
      value: newData,
      isOpenCalendar: false,
    }))
  }

  const handlePrevDayClick = () => {
    setState(prevState => ({
      ...prevState,
      value: dayjs(prevState.value).subtract(7, "day"),
      selectedLeader: null,
      adultCount: 0,
      memberCount: 0,
      totalCount: 0,
      isChecked: {},
      attendanceAllData: {},
    }))
  }

  const handleNextDayClick = () => {
    setState(prevState => ({
      ...prevState,
      value: dayjs(prevState.value).add(7, "day"),
      selectedLeader: null,
      adultCount: 0,
      memberCount: 0,
      totalCount: 0,
      isChecked: {},
      attendanceAllData: {},
    }))
  }

  const handleLeaderClick = cell => {
    setState(prevState => ({
      ...prevState,
      selectedLeader: cell,
    }))
  }

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

  const handleCalendarClick = () => {
    setState(prevState => ({
      ...prevState,
      isOpenCalendar: true,
      selectedLeader: null,
      adultCount: 0,
      memberCount: 0,
      totalCount: 0,
      isChecked: {},
      attendanceAllData: {},
    }))
  }

  const handleAdultPlus = () => {
    setState(prevState => ({
      ...prevState,
      adultCount: prevState.adultCount + 1,
      totalCount: prevState.totalCount + 1,
    }))
  }

  const handleAdultMinus = () => {
    setState(prevState => ({
      ...prevState,
      adultCount: prevState.adultCount > 0 ? prevState.adultCount - 1 : 0,
      totalCount: prevState.totalCount > 0 ? prevState.totalCount - 1 : 0,
    }))
  }

  return (
    <Layout>
      <AttendanceWrapper>
        <TitleWrapper>
          <ChurchIconWrapper />
          <Title>출석</Title>
        </TitleWrapper>
        <CalendarWrapper>
          <DateWrapper>
            <ArrowIconWrapper onClick={handlePrevDayClick} icon={ArrowLeftIcon} />
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
              <CalendarMonthIcon onClick={handleCalendarClick} onChange={handleChange} />
              <MobileDateWrapper
                value={state.value}
                onChange={handleChange}
                format="YYYY.MM.DD"
                open={state.isOpenCalendar}
                onClose={() => setState(prevState => ({ ...prevState, isOpenCalendar: false }))}
                shouldDisableDate={date => date.day() !== 0}
                minDate={dayjs("2024-01-01")}
                views={["month", "year", "day"]}
                slots={{
                  toolbar: "none",
                  actionBar: "none",
                }}
              />
            </LocalizationProvider>
            <ArrowIconWrapper onClick={handleNextDayClick} icon={ArrowRightIcon} />
          </DateWrapper>
          <SettingsIcon />
        </CalendarWrapper>
        <LeaderInfoWrapper>
          {mcyMember.map(item => {
            return (
              <ChipItem key={item.id} onClick={() => handleLeaderClick(item.cell)}>
                <LeaderWrapper label={item.cell} isSelected={state.selectedLeader === item.cell} />
              </ChipItem>
            )
          })}
        </LeaderInfoWrapper>
        <CounterWrapper>
          <AdultDataWrapper>
            <AdultWrapper>어른 :</AdultWrapper>
            <ButtonWrapper>
              <AddBoxOutlinedIconWrapper onClick={handleAdultPlus} />
              <AdultCountWrapper>{state.adultCount}</AdultCountWrapper>
              <IndeterminateCheckBoxOutlinedIconWrapper onClick={handleAdultMinus} />
            </ButtonWrapper>
          </AdultDataWrapper>
          <AttendanceTotalDataWrapper>
            <AttendanceTextWrapper>출석 :</AttendanceTextWrapper>
            <MemberCountWrapper>{state.memberCount}</MemberCountWrapper>
            <SlashWrapper>/</SlashWrapper>
            <TotalCountWrapper>{state.totalCount}</TotalCountWrapper>
          </AttendanceTotalDataWrapper>
        </CounterWrapper>
        <DataWrapper isSelected={state.selectedLeader === null}>
          {mcyMember.map(leader => {
            if (leader.cell === state.selectedLeader) {
              return leader.cellMember.map(member => (
                <MemberDataWrapper key={member}>
                  <CheckBoxWrapper checked={state.isChecked[member]} onChange={() => handleCheck(member)} />
                  <CheckMemberWrapper checked={state.isChecked[member]} onClick={() => handleCheck(member)}>
                    {member}
                  </CheckMemberWrapper>
                </MemberDataWrapper>
              ))
            }
            return null
          })}
        </DataWrapper>
      </AttendanceWrapper>
    </Layout>
  )
}

const AttendanceWrapper = styled(Stack)`
  width: 100vw;
  height: calc(100dvh - 120px);
`

const TitleWrapper = styled(Stack)`
  flex-direction: row;
  align-items: center;
  gap: 15px;
  height: 10%;
  padding: 0 10px;
`

const ChurchIconWrapper = styled(ChurchIcon)`
  font-size: 40px;
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
  flex-wrap: wrap;
  width: 90%;
  height: 20%;
  margin: 0 auto;
  list-style: none;
`

const ChipItem = styled(Stack)`
  width: 30%;
  height: 25%;
  margin-left: 10px;
`

const LeaderWrapper = styled(Chip)`
  width: 100%;
  height: 80%;
  background-color: ${props => (props.isSelected ? "#c27979" : "transparent")};
  border: ${props => (props.isSelected ? "none" : "2px solid #c27979")};
  font-weight: 700;
  font-size: 10px;
  color: ${props => (props.isSelected ? "#fff" : "#000")};
`

const CounterWrapper = styled(Stack)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 10%;
  margin: 0 auto;
`

const AdultDataWrapper = styled(Stack)`
  gap: 10px;
  flex: 1;
  flex-direction: row;
`

const AdultWrapper = styled(Typography)`
  font-size: 15px;
  font-weight: 700;
`

const ButtonWrapper = styled(Stack)`
  flex-direction: row;
  gap: 10px;
`

const AddBoxOutlinedIconWrapper = styled(AddBoxOutlinedIcon)`
  fill: #69535f;
`

const AdultCountWrapper = styled(Typography)`
  font-size: 15px;
  font-weight: 700;
`

const IndeterminateCheckBoxOutlinedIconWrapper = styled(IndeterminateCheckBoxOutlinedIcon)`
  fill: #69535f;
`

const AttendanceTotalDataWrapper = styled(Stack)`
  flex-direction: row;
  gap: 10px;
`

const AttendanceTextWrapper = styled(Typography)`
  font-size: 15px;
  font-weight: 700;
`

const MemberCountWrapper = styled(Typography)`
  font-size: 15px;
  font-weight: 700;
`

const SlashWrapper = styled(Typography)`
  font-size: 15px;
  font-weight: 700;
`

const TotalCountWrapper = styled(Typography)`
  font-size: 15px;
  font-weight: 700;
`

const DataWrapper = styled(Stack)`
  display: ${props => (props.isSelected ? "none" : "grid")};
  grid-template-columns: repeat(3, 1fr);
  overflow-y: auto;
  gap: 10px;
  width: 90%;
  height: 45%;
  margin: 0 auto;
  border: 2px solid #986c6c;
  border-radius: 8px;
`

const MemberDataWrapper = styled(Stack)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const CheckBoxWrapper = styled(Checkbox)`
  & .MuiSvgIcon-root {
    color: ${props => (props.checked ? "#3F805D" : "#000")};
  }
`

const CheckMemberWrapper = styled(Typography)`
  width: 100%;
  font-size: 14px;
  font-weight: 700;
  color: ${props => (props.checked ? "#3F805D" : "#000")};
`

export default Attendance
