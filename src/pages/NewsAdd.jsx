import { useState } from "react"
import dayjs from "dayjs"
import "dayjs/locale/ko"
dayjs.locale("ko")

import { Stack, styled } from "@mui/system"
import AddIcon from "@mui/icons-material/Add"
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"
import Chip from "@mui/material/Chip"
import TextField from "@mui/material/TextField"

import Layout from "../components/Layout/Layout"
import { IconButton, Typography } from "@mui/material"

import { collection, addDoc } from "firebase/firestore"
import { db } from "../firebase" // firebase 설정 파일을 임포트

const NewsAdd = () => {
  const today = dayjs()
  const dayOfWeek = today.day() // 0은 일요일, 6은 토요일
  const lastSunday = today.subtract(dayOfWeek, "day")
  const [selectedDateInfo, setSelectedDateInfo] = useState(lastSunday)
  const [textValue, setTextValue] = useState("") // 텍스트 상태 추가

  const handlePreviousMonth = () => {
    const newDateInfo = selectedDateInfo.subtract(7, "day")
    setSelectedDateInfo(newDateInfo)
  }

  const handleNextMonth = () => {
    const newDateInfo = selectedDateInfo.add(7, "day")
    setSelectedDateInfo(newDateInfo)
  }

  const handleTextChange = event => {
    setTextValue(event.target.value)
  }

  const handleSave = async () => {
    try {
      await addDoc(collection(db, "news"), {
        year: selectedDateInfo.year(),
        month: selectedDateInfo.month() + 1, // month()는 0부터 시작하므로 +1
        day: selectedDateInfo.date(),
        content: textValue,
      })
      alert("Data saved successfully!")
    } catch (e) {
      console.error("Error adding document: ", e)
      alert("Error saving data.")
    }
  }

  return (
    <Layout>
      <NewsAddWrapper>
        <PlusIcon>
          <AddIcon />
        </PlusIcon>
        <DateWrapper>
          <IconButton onClick={handlePreviousMonth}>
            <StyledArrowLeftIcon />
          </IconButton>
          <Typography fontSize={28}>{selectedDateInfo.format("M월 D일")}</Typography>
          <IconButton onClick={handleNextMonth}>
            <StyledArrowRightIcon />
          </IconButton>
        </DateWrapper>
        <RenderingAreaLayout>
          <RenderingArea>
            <StyledTextField
              id="outlined-textarea"
              label="Multiline"
              multiline
              rows={4}
              value={textValue} // 상태 값으로 설정
              onChange={handleTextChange} // onChange 핸들러 추가
            />
          </RenderingArea>
        </RenderingAreaLayout>
        <SaveChipWrapper>
          <StyledSaveChip label="저장" onClick={handleSave} />
        </SaveChipWrapper>
      </NewsAddWrapper>
    </Layout>
  )
}

const NewsAddWrapper = styled(Stack)`
  width: 90vw;
  height: 90%;
  background-color: #b4dfc3;
  border: 1px solid #000000;
  border-radius: 13px;
`
const PlusIcon = styled(Stack)`
  position: relative;
  top: 3px;
  right: 3px;
  flex-direction: row;
  justify-content: right;
  align-items: center;
  height: 4%;
`
const DateWrapper = styled(Stack)`
  flex-direction: row;
  align-items: center;
  height: 5%;
`

const StyledArrowLeftIcon = styled(ArrowLeftIcon)`
  &.MuiSvgIcon-root {
    font-size: 60px;
  }
`
const StyledArrowRightIcon = styled(ArrowRightIcon)`
  &.MuiSvgIcon-root {
    font-size: 60px;
  }
`
const RenderingAreaLayout = styled(Stack)`
  flex-direction: center;
  align-items: center;
  width: 100%;
  height: 75%;
  margin-top: 25px;
`
const StyledTextField = styled(TextField)`
  background-color: #fffcf6;
  border: 1px solid #000000;
  width: 80%;
  height: 40%;
  font-size: 35px;
`
const RenderingArea = styled(Stack)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 95%;
  height: 550px;
  overflow-y: auto; /* 스크롤이 있는 경우만 스크롤바를 표시 */
  &::-webkit-scrollbar {
    width: 0;
  }
  background-color: #f0f0f0;
  border: 1px solid #000000;
  border-radius: 22px;
`

const SaveChipWrapper = styled(Stack)`
  flex-direction: row;
  height: 10%;
  width: 95%;
  justify-content: right;
  align-items: center;
`
const StyledSaveChip = styled(Chip)`
  width: 80px;
  height: 35px;
  background-color: #f0f0f0;
  border: 1px solid #000000;
`
export default NewsAdd
