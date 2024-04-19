import React, { useEffect } from "react"
import { Stack, styled, Grid, IconButton } from "@mui/material"
import Chip from "@mui/material/Chip"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import ChurchIcon from "@mui/icons-material/Church"
import Checkbox from "@mui/material/Checkbox"
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker"
import dayjs from "dayjs"

import Layout from "../components/Layout/Layout"
import Title from "../components/shared/Title"
import { mcyMember } from "../data/mcyMember"

const Attendance = () => {
  // 달력

  // 이번주 일요일 날짜 계산
  const calculateCurrentSunday = () => {
    const currentDate = dayjs()
    const currentDayOfWeek = currentDate.day() // 0은 일요일, 1은 월요일, ..., 6은 토요일
    const sundayDate = currentDate.subtract(currentDayOfWeek, "day")
    return sundayDate
  }

  const [currentSunday, setCurrentSunday] = React.useState(calculateCurrentSunday())
  const [isOpenCalendar, setIsOpenCalendar] = React.useState(false)

  const handleDateChange = newData => {
    setCurrentSunday(newData)
    setIsOpenCalendar(false)
  }

  const handleCalendarClick = () => {
    setIsOpenCalendar(true)
  }

  // 달력에서 일요일을 제외한 날짜를 비활성화합니다.
  const shouldDisableDate = date => {
    const dayOfWeek = dayjs(date).day()
    return dayOfWeek !== 0 // 일요일이 아닌 경우에는 true를 반환하여 비활성화합니다.
  }

  // 저번주 일요일 날짜로 변경
  const handlePreviousWeek = () => {
    const newDate = dayjs(currentSunday).subtract(7, "day")
    setCurrentSunday(newDate)
  }
  // 다음주 일요일 날짜로  변경
  const handleNextWeek = () => {
    const newDate = dayjs(currentSunday).add(7, "day")
    setCurrentSunday(newDate)
  }

  const handleArrowLeftButtonClick = () => {
    handlePreviousWeek()
  }

  const handleArrowRightButtonClick = () => {
    handleNextWeek()
  }

  // 칩

  const [cellChipId, setCellChipId] = React.useState(mcyMember[0].id)
  const [cellMemberInfo, setCellMemberInfo] = React.useState(mcyMember.find(member => member.id === cellChipId)) // 칩 아이디 === 데이터 아이디

  const handleChipClick = chipId => {
    setCellChipId(chipId)
  }

  useEffect(() => {
    setCellMemberInfo(mcyMember.filter(chip => chip.id === cellChipId)[0])
  }, [cellChipId])

  // 출석 체크
  const [adultCount, setAdultCount] = React.useState(0)
  const [memberCount, setMemberCount] = React.useState(0)
  const [totalCount, setTotalCount] = React.useState(0)

  useEffect(() => {
    setTotalCount(adultCount + memberCount)
  }, [adultCount, memberCount])

  // 출석수 증가
  const plus = () => {
    setAdultCount(adultCount + 1)
  }
  // 출석수 감소
  const minus = () => {
    if (adultCount > 0) {
      setAdultCount(adultCount - 1)
    }
  }

  // 체크 박스
  const handleChange = (event, memberId) => {
    const isChecked = event.target.checked

    const updatedMembers = cellMemberInfo.cellMember.map(member => {
      if (member.id === memberId) {
        member.isChecked = isChecked // mcyMember 배열의 해당 멤버 객체의 isChecked 값을 업데이트
        return member
      }
      return member
    })

    setCellMemberInfo({ ...cellMemberInfo, cellMember: updatedMembers })

    if (isChecked) {
      setMemberCount(memberCount + 1)
      setTotalCount(adultCount + memberCount + 1)
    } else {
      setMemberCount(memberCount - 1)
      setTotalCount(adultCount + memberCount - 1)
    }
    console.log(mcyMember)
  }

  return (
    <Layout>
      <AttendanceWrapper>
        <TitleWrapper>
          <ChurchIconWrapper />
          <Title>출석</Title>
        </TitleWrapper>
        <DateWrapper>
          <IconButton onClick={handleArrowLeftButtonClick}>
            <ArrowLeftIcon />
          </IconButton>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
            <CalendarMonthIcon onClick={handleCalendarClick} onChange={handleChange} />
            <MobileDateWrapper
              shouldDisableDate={shouldDisableDate}
              value={currentSunday}
              onChange={handleDateChange}
              format="YYYY.MM.DD"
              open={isOpenCalendar}
              onClose={() => setIsOpenCalendar(false)}
            />
          </LocalizationProvider>

          <IconButton onClick={handleArrowRightButtonClick}>
            <ArrowRightIcon />
          </IconButton>
        </DateWrapper>
        <ChipWrapper>
          {mcyMember.map(item => {
            return (
              <Chip
                key={item.id}
                label={item.cell}
                onClick={() => handleChipClick(item.id)}
                color={cellChipId === item.id ? "secondary" : "info"}
                sx={{
                  width: "30%",
                  height: "20%",
                  margin: "1%",
                  border: 2,
                  borderColor: "#986C6C",
                  fontSize: 10,
                  color: cellChipId === item.id ? "#fff" : "#000",
                }}
              />
            )
          })}
        </ChipWrapper>
        <CounterWrapper>
          <AdultCount>
            <Typography fontSize={15}>어른 :</Typography>
            <Button sx={{ width: 50 }} color="error" size="small" onClick={plus}>
              +
            </Button>
            {adultCount}
            <Button sx={{ width: 50 }} color="error" size="small" onClick={minus}>
              -
            </Button>
          </AdultCount>
          <Typography fontSize={15}>
            출석: {memberCount} / {totalCount}
          </Typography>
        </CounterWrapper>
        <ListWrapper>
          {cellMemberInfo.cellMember.map(member => (
            <List key={member.id} id={member.id}>
              <Checkbox defaultChecked={member.isChecked} onChange={event => handleChange(event, member.id)} color="success" />
              <Typography>{member.name}</Typography>
            </List>
          ))}
        </ListWrapper>
      </AttendanceWrapper>
    </Layout>
  )
}

const AttendanceWrapper = styled(Stack)`
  width: 100vw;
  height: calc(100dvh - 120px);
`
// 제목 및 아이콘
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
// 달력
const DateWrapper = styled(Stack)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
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
`
// chip
const ChipWrapper = styled(Stack)`
  height: 20%;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`
// 청년 및 어른 출석
const AdultCount = styled(Stack)`
  flex-direction: row;
  align-items: center;
  gap: 0px;
  width: 50%;
`
const CounterWrapper = styled(Stack)`
  height: 10%;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-evenly;
`
// 셀 리스트
const ListWrapper = styled(Grid)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  height: 30%;
  gap: 15px;
`
const List = styled(Stack)`
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20%;
`

export default Attendance
