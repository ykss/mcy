import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { addDoc, collection, getFirestore } from "firebase/firestore"

import dayjs from "dayjs"
import "dayjs/locale/ko"

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
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined"
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined"
import PeopleAltIcon from "@mui/icons-material/PeopleAlt"
import AddIcon from "@mui/icons-material/Add"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"

import Layout from "../components/Layout/Layout"
import { getMcyMemberApi } from "../api/mcyMemberApi"
import { getAttendanceApi } from "../api/attendanceDataApi"

const Attendance = () => {
  const [members, setMembers] = useState([])
  const [attendance, setAttendance] = useState([])
  const navigate = useNavigate()
  const [state, setState] = useState({
    selectedLeader: "대예배",
    adultCount: 0,
    memberCount: 0,
    attendanceAllData: {},
    isChecked: {},
    value: dayjs().subtract(dayjs().day() === 0 ? 7 : dayjs().day(), "day"),
    isBoxExpanded: false,
  })
  const db = getFirestore()

  const handleNavigate = () => {
    navigate("/attendancestatus")
  }

  useEffect(() => {
    const fetchData = async () => {
      const membersList = await getMcyMemberApi()
      setMembers(membersList)
    }
    fetchData()
  }, [])

  const AttendancefetchData = async () => {
    try {
      const data = await getAttendanceApi()
      setAttendance(data)
    } catch (error) {
      console.error("Error fetching data: ", error)
    }
  }

  useEffect(() => {
    AttendancefetchData()
  }, [attendance])

  useEffect(() => {
    const initialCheckedState = {}
    const currentDayOfWeek = dayjs().day()
    const daysToLastSunday = currentDayOfWeek === 0 ? 7 : currentDayOfWeek
    const lastSunday = dayjs().subtract(daysToLastSunday, "day")
    members.forEach(leader => {
      leader.cellMember.forEach(member => {
        initialCheckedState[member] = leader.isChecked || false
      })
    })

    setState(prevState => ({
      ...prevState,
      isChecked: initialCheckedState,
      selectedLeader: "",
      adultCount: 0,
      memberCount: 0,
      totalCount: 0,
      attendanceAllData: {},
      value: dayjs(lastSunday),
    }))
  }, [members])

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

        const leaderCellMembers = members.find(item => item.cell === leader)?.cellMember || []
        const checkedMembers = leaderCellMembers.filter(member => state.isChecked[member])

        if (leader) {
          updatedData[date].cellData[leader] = checkedMembers
        }

        updatedData[date].adultAttendance = state.adultCount
        updatedData[date].memberAttendance = Object.values(updatedData[date].cellData).reduce((acc, curr) => acc + curr.length, 0)
        updatedData[date].totalAttendance = updatedData[date].adultAttendance + updatedData[date].memberAttendance

        try {
          addDoc(collection(db, "attendanceData"), {
            date: date,
            adultCount: state.adultCount,
            memberCount: state.memberCount,
            totalCount: updatedData[date].totalAttendance,
            cellData: updatedData[date].cellData,
          })
          console.log("Data saved successfully!")
        } catch (e) {
          console.error("Error adding document: ", e)
        }
        console.log("출석 데이터 업데이트:", updatedData)

        return {
          ...prevState,
          attendanceAllData: updatedData,
        }
      })
    }

    if (state.selectedLeader !== "" || state.adultCount !== 0) {
      updateAttendanceData(state.value.format("YYYY-MM-DD"), state.selectedLeader)
    }
  }, [state.adultCount, state.isChecked, state.selectedLeader, members, state.value])

  const handlePrevDayClick = () => {
    setState(prevState => ({
      ...prevState,
      value: dayjs(prevState.value).subtract(7, "day"),
      selectedLeader: "",
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
      selectedLeader: "",
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

  const handleAdultDataWrapperClick = () => {
    setState(prevState => ({
      ...prevState,
      isBoxExpanded: !prevState.isBoxExpanded,
    }))
  }

  const handleAdultPlus = () => {
    setState(prevState => ({
      ...prevState,
      adultCount: prevState.adultCount + 1,
      totalCount: prevState.totalCount + 1,
      isBoxExpanded: !prevState,
    }))
  }

  const handleAdultMinus = () => {
    setState(prevState => ({
      ...prevState,
      adultCount: prevState.adultCount > 0 ? prevState.adultCount - 1 : 0,
      totalCount: prevState.totalCount > 0 ? prevState.totalCount - 1 : 0,
      isBoxExpanded: !prevState,
    }))
  }

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
            {members.map(item => (
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
                  : members[0].cellMember.map(member => (
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
          <AdultDataWrapper onClick={handleAdultDataWrapperClick}>
            <AddIconWrapper />
            {state.isBoxExpanded && (
              <ButtonWrapper>
                기타인원 :
                <AddBoxOutlinedIconWrapper onClick={handleAdultPlus} />
                <AdultCountWrapper>{state.adultCount}</AdultCountWrapper>
                <IndeterminateCheckBoxOutlinedIconWrapper onClick={handleAdultMinus} />
              </ButtonWrapper>
            )}
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
  font-size: 24px;
  background: #c7bdeb;
  border-radius: 22px;
  width: 80%;
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
  width: 20%;
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

const AdultDataWrapper = styled(Stack)`
  width: 20%;
  height: 70%;
  background-color: #b4dfc3;
  border: 1px solid #000;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
`
const AddIconWrapper = styled(AddIcon)`
  font-size: 50px;
  font-weight: 700;
`

const ButtonWrapper = styled(Stack)`
  flex-direction: row;
  gap: 10px;
  background: #d7f0e0;
  position: absolute;
  top: 430px;
  width: 90%;
  left: 20px;
  height: 15%;
  font-family: "Noto Sans";
  font-weight: 600;
  font-size: 24px;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
`

const AddBoxOutlinedIconWrapper = styled(AddBoxOutlinedIcon)`
  fill: #404040;
  font-size: 30px;
`

const AdultCountWrapper = styled(Typography)`
  font-size: 30px;
  font-weight: 700;
`

const IndeterminateCheckBoxOutlinedIconWrapper = styled(IndeterminateCheckBoxOutlinedIcon)`
  fill: #404040;
  font-size: 30px;
`

const AttendanceTotalDataWrapper = styled(Stack)`
  background-color: #f3c5c5;
  width: 80%;
  height: 70%;
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
