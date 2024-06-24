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
import { db } from "../firebase"

const Attendance = () => {
  const [members, setMembers] = useState([])
  const navigate = useNavigate()
  const [selectedLeader, setSelectedLeader] = useState("대예배")
  const [adultCount, setAdultCount] = useState(0)
  const [memberCount, setMemberCount] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [isChecked, setIsChecked] = useState({})
  const [value, setValue] = useState(dayjs().subtract(dayjs().day() === 0 ? 7 : dayjs().day(), "day"))
  const [isBoxExpanded, setIsBoxExpanded] = useState(false)
  const [checkedMembers, setCheckedMembers] = useState([])

  const handleNavigate = () => {
    navigate("/attendancestatus")
  }

  useEffect(() => {
    const fetchData = async () => {
      const membersList = await getMcyMemberApi()
      setMembers(membersList)
      const initialCheckedMembers = membersList.map(item => ({
        leader: item.cell,
        members: [],
      }))
      setCheckedMembers(initialCheckedMembers)
    }
    fetchData()
  }, [])

  // 날짜 변경
  const handlePrevDayClick = () => {
    reset()
    setValue(dayjs(value).subtract(7, "day"))
  }

  const handleNextDayClick = () => {
    reset()
    setValue(dayjs(value).add(7, "day"))
  }

  // 체크박스, 출석 수, 저장된 데이터 초기화
  const reset = () => {
    const initialCheckedMembers = members.map(item => ({
      leader: item.cell,
      members: [],
    }))
    setCheckedMembers(initialCheckedMembers)
    setIsChecked({})
    setMemberCount(0)
    setTotalCount(0)
  }

  const handleLeaderClick = cell => {
    setSelectedLeader(cell)
  }

  // 츨석체크
  const handleCheck = member => {
    const updatedIsChecked = { ...isChecked }
    updatedIsChecked[member] = !updatedIsChecked[member]

    // 출석 체크시 출석 수 증가 및 감소
    let updatedMemberCount = memberCount
    if (updatedIsChecked[member]) updatedMemberCount++
    else updatedMemberCount--

    const updatedTotalCount = updatedIsChecked[member] ? totalCount + 1 : totalCount - 1

    setIsChecked(updatedIsChecked)
    setMemberCount(updatedMemberCount)
    setTotalCount(updatedTotalCount)

    // 출석 체크시 객체에서 해당되는 리더가 속한 객체에 값 저장
    const updatedCheckedMembers = checkedMembers.map(item => {
      if (item.leader === selectedLeader) {
        if (updatedIsChecked[member]) {
          return { ...item, members: [...item.members, member] }
        } else {
          return { ...item, members: item.members.filter(m => m !== member) }
        }
      }
      return item
    })

    setCheckedMembers(updatedCheckedMembers)
    console.log(checkedMembers)
  }

  // 데이터 저장
  const saveData = async () => {
    try {
      await addDoc(collection(db, "attendanceData"), {
        date: value.format("YYYY-MM-DD"),
        adultCount: adultCount,
        memberCount: memberCount,
        totalCount: totalCount,
        checkedMembers: checkedMembers,
      })
      console.log("Data saved successfully!")
    } catch (e) {
      console.error("Error adding document: ", e)
    }
  }

  const handleAdultDataWrapperClick = () => {
    setIsBoxExpanded(!isBoxExpanded)
  }

  const handleAdultPlus = () => {
    setAdultCount(adultCount + 1)
    setTotalCount(totalCount + 1)
    setIsBoxExpanded(!isBoxExpanded)
  }

  const handleAdultMinus = () => {
    setAdultCount(adultCount > 0 ? adultCount - 1 : 0)
    setTotalCount(totalCount > 0 ? totalCount - 1 : 0)
    setIsBoxExpanded(!isBoxExpanded)
  }

  return (
    <Layout>
      <AttendanceWrapper>
        <CalendarWrapper>
          <DateWrapper>
            <ArrowIconWrapper onClick={handlePrevDayClick} icon={ArrowLeftIcon} />
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
              <MobileDateWrapper value={value} format="YYYY.MM.DD" shouldDisableDate={date => date.day() !== 0} />
            </LocalizationProvider>
            <ArrowIconWrapper onClick={handleNextDayClick} icon={ArrowRightIcon} />
          </DateWrapper>
          <SettingsIcon />
        </CalendarWrapper>
        <LeaderInfoWrapper>
          <SelectWrapper
            value={selectedLeader ? selectedLeader : "대예배"}
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
                (selectedLeader
                  ? members
                      .find(leader => leader.cell === selectedLeader)
                      ?.cellMember.map(member => (
                        <MemberDataWrapper key={member}>
                          <CheckBoxWrapper checked={!!isChecked[member]} onChange={() => handleCheck(member)} />
                          <CheckMemberWrapper checked={isChecked[member]} onClick={() => handleCheck(member)}>
                            {member}
                          </CheckMemberWrapper>
                        </MemberDataWrapper>
                      ))
                  : members[0].cellMember.map(member => (
                      <MemberDataWrapper key={member}>
                        <CheckBoxWrapper checked={!!isChecked[member]} onChange={() => handleCheck(member)} />
                        <CheckMemberWrapper checked={isChecked[member]} onClick={() => handleCheck(member)}>
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
            {isBoxExpanded && (
              <ButtonWrapper>
                기타인원 :
                <AddBoxOutlinedIconWrapper onClick={handleAdultPlus} />
                <AdultCountWrapper>{adultCount}</AdultCountWrapper>
                <IndeterminateCheckBoxOutlinedIconWrapper onClick={handleAdultMinus} />
              </ButtonWrapper>
            )}
          </AdultDataWrapper>
          <AttendanceTotalDataWrapper>
            <AttendanceTextWrapper>출석 :</AttendanceTextWrapper>
            <MemberCountWrapper>{memberCount}</MemberCountWrapper>
            <SlashWrapper>/</SlashWrapper>
            <TotalCountWrapper>{totalCount}</TotalCountWrapper>
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
