import { useState, useEffect } from "react"

import dayjs from "dayjs"
import "dayjs/locale/ko"

import { Stack, styled } from "@mui/material"
import Chip from "@mui/material/Chip"
import Typography from "@mui/material/Typography"
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

      updateAttendanceData(state.value.format("YYYY-MM-DD"), state.selectedLeader, member)

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

  const handleAdultData = id => {
    setState(
      prevState => {
        const adultCount = id === "add" ? prevState.adultCount + 1 : prevState.adultCount > 0 ? prevState.adultCount - 1 : 0
        // const totalCount = prevState.memberCount + adultCount

        return {
          ...prevState,
          adultCount,
          totalCount: prevState.memberCount + adultCount,
        }
      },
      updateAttendanceData(state.value.format("YYYY-MM-DD"), state.selectedLeader, "adults", id),
    )
  }

  const updateAttendanceData = (date, leader, member, id) => {
    const updatedData = { ...state.attendanceAllData }

    if (!updatedData[date]) {
      updatedData[date] = {
        adultAttendance: 0,
        memberAttendance: 0,
        cellData: {},
      }
    }

    const isLeaderEmpty = !leader

    if (isLeaderEmpty) {
      if (!updatedData[date].cellData.adults) {
        updatedData[date].cellData.adults = []
      }
      if (member === "adults") {
        if (id === "add") {
          updatedData[date].cellData.adults.push(member)
          updatedData[date].adultAttendance++
          setState(prevState => ({
            ...prevState,
            totalCount: prevState.adultCount + prevState.memberCount,
          }))
        } else if (id === "remove") {
          if (updatedData[date].adultAttendance > 0) {
            updatedData[date].cellData.adults.pop()
            updatedData[date].adultAttendance--
            setState(prevState => ({
              ...prevState,
              totalCount: prevState.adultCount > 0 ? prevState.adultCount - 1 : 0,
            }))
          }
        }
      }
    } else {
      if (!updatedData[date].cellData[leader]) {
        updatedData[date].cellData[leader] = []
      }
      if (member === "adults") {
        if (!updatedData[date].cellData.adults) {
          updatedData[date].cellData.adults = []
        }
        if (id === "add") {
          updatedData[date].cellData.adults.push(member)
          updatedData[date].adultAttendance++
          setState(prevState => ({
            ...prevState,
            totalCount: prevState.adultCount + prevState.memberCount,
          }))
        } else if (id === "remove") {
          if (updatedData[date].adultAttendance > 0) {
            updatedData[date].cellData.adults.pop()
            updatedData[date].adultAttendance--
            setState(prevState => ({
              ...prevState,
              totalCount: prevState.adultCount > 0 ? prevState.adultCount - 1 : 0,
            }))
          }
        }
      } else {
        if (updatedData[date].cellData[leader].includes(member)) {
          updatedData[date].cellData[leader] = updatedData[date].cellData[leader].filter(m => m !== member)
          if (updatedData[date].adultAttendance > 0) {
            updatedData[date].adultAttendance--
            updatedData[date].memberAttendance--
            setState(prevState => ({
              ...prevState,
              totalCount: prevState.adultCount > 0 ? prevState.adultCount - 1 : 0,
            }))
          }
        } else {
          updatedData[date].cellData[leader].push(member)
          updatedData[date].adultAttendance++
          updatedData[date].memberAttendance++
          setState(prevState => ({
            ...prevState,
            totalCount: prevState.adultCount + prevState.memberCount,
          }))
        }
      }
    }
    console.log("출석 데이터 업데이트:", updatedData)
    setState(prevState => ({
      ...prevState,
      attendanceAllData: updatedData,
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
        <LeaderWrapper>
          {mcyMember.map(item => {
            return (
              <ChipItem key={item.id} onClick={() => handleLeaderClick(item.cell)}>
                <Chip
                  label={item.cell}
                  color={state.selectedLeader === item.cell ? "secondary" : "info"}
                  sx={{
                    width: "100%",
                    height: "80%",
                    border: state.selectedLeader === item.cell ? "none" : "2px solid #c27979",
                    fontWeight: "700",
                    fontSize: "10px",
                    color: state.selectedLeader === item.cell ? "#fff" : "#000",
                  }}
                />
              </ChipItem>
            )
          })}
        </LeaderWrapper>
        <CounterWrapper>
          <AdultWrapper>
            <Typography fontSize={15} fontWeight={700}>
              어른 :
            </Typography>
            <ButtonWrapper>
              <AddBoxOutlinedIcon onClick={() => handleAdultData("add")} sx={{ fill: "#69535F" }} />
              <Typography fontSize={15} fontWeight={700}>
                {state.adultCount}
              </Typography>
              <IndeterminateCheckBoxOutlinedIcon onClick={() => handleAdultData("remove")} sx={{ fill: "#69535F" }} />
            </ButtonWrapper>
          </AdultWrapper>
          <AttendanceTotalDataWrapper>
            <Typography fontSize={15} fontWeight={700}>
              출석 :
            </Typography>
            <Typography fontSize={15} fontWeight={700}>
              {state.memberCount}
            </Typography>
            <Typography fontSize={15} fontWeight={700}>
              /
            </Typography>
            <Typography fontSize={15} fontWeight={700}>
              {state.totalCount}
            </Typography>
          </AttendanceTotalDataWrapper>
        </CounterWrapper>
        <DataWrapper sx={{ display: state.selectedLeader === null ? "none" : "grid" }}>
          {mcyMember.map(leader => {
            if (leader.cell === state.selectedLeader) {
              return leader.cellMember.map(member => (
                <MemberDataWrapper key={member}>
                  <Checkbox
                    checked={state.isChecked[member] || false}
                    onChange={() => handleCheck(member)}
                    sx={{
                      "& .MuiSvgIcon-root": {
                        color: state.isChecked[member] ? "#3F805D" : "#000",
                      },
                    }}
                  />
                  <Typography
                    fontSize={14}
                    fontWeight={"bold"}
                    width={"100%"}
                    sx={{
                      color: state.isChecked[member] ? "#3F805D" : "#000",
                    }}>
                    {member}
                  </Typography>
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
export default Attendance

const AttendanceWrapper = styled(Stack)`
  width: 100vw;
  height: calc(100dvh - 120px);
`
const TitleWrapper = styled(Stack)`
  flex-direction: row;
  align-items: center;
  height: 10%;
  gap: 15px;
  padding: 0 10px;
`
const ChurchIconWrapper = styled(ChurchIcon)`
  font-size: 40px;
`
const CalendarWrapper = styled(Stack)`
  width: 90%;
  height: 10%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`
const DateWrapper = styled(Stack)`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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
    font-family: "Inter";
    font-weight: 600;
    font-size: 15px;
    padding: 0px;
  }
  & .MuiInputBase-input {
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0px;
  }
  & .MuiOutlinedInput-notchedOutline {
    border: none;
  }
`
const LeaderWrapper = styled(Stack)`
  height: 20%;
  width: 90%;
  margin: 0 auto;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  list-style: none;
`
const ChipItem = styled(Stack)`
  width: 30%;
  height: 25%;
  margin-left: 10px;
`
const CounterWrapper = styled(Stack)`
  width: 90%;
  height: 10%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`
const AdultWrapper = styled(Stack)`
  flex: 1;
  flex-direction: row;
  gap: 10px;
`

const ButtonWrapper = styled(Stack)`
  flex-direction: row;
  gap: 10px;
`
const AttendanceTotalDataWrapper = styled(Stack)`
  flex-direction: row;
  gap: 10px;
`

const DataWrapper = styled(Stack)`
  width: 90%;
  height: 45%;
  border: 2px solid #986c6c;
  border-radius: 8px;
  overflow-y: auto;
  grid-template-columns: repeat(3, 1fr);
  margin: 0 auto;
  gap: 10px;
`

const MemberDataWrapper = styled(Stack)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
