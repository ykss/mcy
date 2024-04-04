import React from "react"
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
  const [isOpenCalendar, setIsOpenCalendar] = React.useState(false)
  const [selectedLeader, setSelectedLeader] = React.useState(null)
  const [adultCount, setAdultCount] = React.useState(0)
  const [memberCount, setMemberCount] = React.useState(0)
  const totalCount = adultCount + memberCount
  const [attendanceAllData, setAttendanceAllData] = React.useState({})
  const [isChecked, setIsChecked] = React.useState({})
  const currentDayOfWeek = dayjs().day()
  const daysToLastSunday = currentDayOfWeek === 0 ? 7 : currentDayOfWeek
  const lastSunday = dayjs().subtract(daysToLastSunday, "day")
  const [value, setValue] = React.useState(dayjs(lastSunday))

  React.useEffect(() => {
    const initialCheckedState = {}
    mcyMember.forEach(leader => {
      leader.cellMember.forEach(member => {
        initialCheckedState[member] = false
      })
    })
    setIsChecked(initialCheckedState)
    setSelectedLeader(null)
    setAdultCount(0)
    setMemberCount(0)
    setAttendanceAllData({})
  }, [value])

  const handleChange = newData => {
    setValue(newData)
    setIsOpenCalendar(false)
  }

  const handlePrevDayClick = () => {
    const newDate = dayjs(value).subtract(7, "day")
    setValue(newDate)
  }

  const handleNextDayClick = () => {
    const newDate = dayjs(value).add(7, "day")
    setValue(newDate)
  }

  const handleLeaderClick = cell => {
    setSelectedLeader(cell)
  }

  const handleCheck = member => {
    setIsChecked(prevState => ({
      ...prevState,
      [member]: !prevState[member],
    }))
    isChecked[member] ? setMemberCount(memberCount - 1) : setMemberCount(memberCount + 1)
    updateAttendanceData(value.format("YYYY-MM-DD"), selectedLeader, member)
  }

  const handleCalendarClick = () => {
    setIsOpenCalendar(true)
  }

  const shouldDisableDate = date => {
    return date.day() !== 0
  }

  const handleAdultData = action => {
    action === "add" ? setAdultCount(adultCount + 1) : adultCount > 0 ? setAdultCount(adultCount - 1) : 0
    updateAttendanceData(value.format("YYYY-MM-DD"), selectedLeader, "adults", action)
  }

  const updateAttendanceData = (date, leader, member, action) => {
    const updatedData = { ...attendanceAllData }

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
        if (action === "add") {
          updatedData[date].cellData.adults.push(member)
          updatedData[date].adultAttendance++
        } else if (action === "remove") {
          updatedData[date].cellData.adults.pop()
          updatedData[date].adultAttendance--
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
        if (action === "add") {
          updatedData[date].cellData.adults.push(member)
          updatedData[date].adultAttendance++
        } else if (action === "remove") {
          updatedData[date].cellData.adults.pop()
          updatedData[date].adultAttendance--
        }
      } else {
        if (updatedData[date].cellData[leader].includes(member)) {
          updatedData[date].cellData[leader] = updatedData[date].cellData[leader].filter(m => m !== member)
          updatedData[date].adultAttendance--
          updatedData[date].memberAttendance--
        } else {
          updatedData[date].cellData[leader].push(member)
          updatedData[date].adultAttendance++
          updatedData[date].memberAttendance++
        }
      }
    }

    setAttendanceAllData(updatedData)
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
                value={value}
                onChange={handleChange}
                format="YYYY.MM.DD"
                open={isOpenCalendar}
                onClose={() => setIsOpenCalendar(false)}
                shouldDisableDate={shouldDisableDate}
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
                  color={selectedLeader === item.cell ? "secondary" : "info"}
                  sx={{
                    width: "100%",
                    height: "80%",
                    border: selectedLeader === item.cell ? "none" : "2px solid #c27979",
                    fontWeight: "700",
                    fontSize: "10px",
                    color: selectedLeader === item.cell ? "#fff" : "#000",
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
                {adultCount}
              </Typography>
              <IndeterminateCheckBoxOutlinedIcon onClick={() => handleAdultData("remove")} sx={{ fill: "#69535F" }} />
            </ButtonWrapper>
          </AdultWrapper>
          <AttendanceTotalDataWrapper>
            <Typography fontSize={15} fontWeight={700}>
              출석 :
            </Typography>
            <Typography fontSize={15} fontWeight={700}>
              {memberCount}
            </Typography>
            <Typography fontSize={15} fontWeight={700}>
              /
            </Typography>
            <Typography fontSize={15} fontWeight={700}>
              {totalCount}
            </Typography>
          </AttendanceTotalDataWrapper>
        </CounterWrapper>
        <DataWrapper sx={{ display: selectedLeader === null ? "none" : "grid" }}>
          {mcyMember.map(leader => {
            if (leader.cell === selectedLeader) {
              return leader.cellMember.map(member => (
                <MemberDataWrapper key={member}>
                  <Checkbox
                    onClick={() => handleCheck(member)}
                    checked={isChecked[member]}
                    sx={{
                      "& .MuiSvgIcon-root": {
                        color: isChecked[member] ? "#3F805D" : "#000",
                      },
                    }}
                  />
                  <Typography
                    fontSize={14}
                    fontWeight={"bold"}
                    width={"100%"}
                    sx={{
                      color: isChecked[member] ? "#3F805D" : "#000",
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
