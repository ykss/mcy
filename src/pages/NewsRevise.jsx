import { useState, useEffect } from "react"
import dayjs from "dayjs"
import "dayjs/locale/ko"
dayjs.locale("ko")
import { Stack, styled } from "@mui/system"
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"
import Chip from "@mui/material/Chip"
import TextField from "@mui/material/TextField"
import Layout from "../components/Layout/Layout"
import { IconButton, Typography } from "@mui/material"

import { getMcyNewsApi } from "../api/newsApi"
import { updateDoc, doc } from "firebase/firestore"
import { db } from "../firebase" // firebase 설정 파일을 임포트

const NewsRevise = () => {
  const [newsData, setNewsData] = useState([])
  const [selectedDocId, setSelectedDocId] = useState(null) // 선택된 문서 ID 상태 추가
  const today = dayjs()
  const dayOfWeek = today.day() // 0은 일요일, 6은 토요일
  const lastSunday = today.subtract(dayOfWeek, "day")
  const [selectedDateInfo, setSelectedDateInfo] = useState(lastSunday)
  const [textValue, setTextValue] = useState("") // 텍스트 상태 추가

  useEffect(() => {
    // Firebase Firestore를 사용하여 데이터를 가져오는 예시
    const fetchData = async () => {
      try {
        const data = await getMcyNewsApi()
        setNewsData(data)
      } catch (error) {
        console.error("Error fetching data: ", error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    // selectedDateInfo가 변경될 때마다 데이터를 필터링하여 textValue를 설정합니다.
    const currentData = newsData.find(item => item.year === selectedDateInfo.year() && item.month === selectedDateInfo.month() + 1 && item.day === selectedDateInfo.date())
    if (currentData) {
      setTextValue(currentData.content)
      setSelectedDocId(currentData.id)
    } else {
      setTextValue("")
      setSelectedDocId(null)
    }
  }, [selectedDateInfo, newsData])

  const handlePreviousWeek = () => {
    const newDateInfo = selectedDateInfo.subtract(7, "day")
    setSelectedDateInfo(newDateInfo)
  }

  const handleNextWeek = () => {
    const newDateInfo = selectedDateInfo.add(7, "day")
    setSelectedDateInfo(newDateInfo)
  }

  const handleTextChange = event => {
    setTextValue(event.target.value)
  }
  const handleUpdate = async () => {
    try {
      if (selectedDocId) {
        // 기존 문서 업데이트
        const docRef = doc(db, "news", selectedDocId)
        await updateDoc(docRef, {
          content: textValue,
        })
        alert("Data updated successfully!")
      } else {
        alert("No document found to update.")
      }
    } catch (e) {
      console.error("Error updating document: ", e)
      alert("Error updating data.")
    }
  }

  return (
    <Layout>
      <NewsReviseWrapper>
        <DateRenderingArea>
          <DateWrapper>
            <IconButton onClick={handlePreviousWeek}>
              <StyledArrowLeftIcon />
            </IconButton>
            <Typography fontSize={28}>{selectedDateInfo.format("M월 D일")}</Typography>
            <IconButton onClick={handleNextWeek}>
              <StyledArrowRightIcon />
            </IconButton>
          </DateWrapper>
        </DateRenderingArea>
        <TextFiledArea>
          <StyledTextField
            id="outlined-textarea"
            label="Multiline"
            multiline
            rows={4}
            value={textValue} // 상태 값으로 설정
            onChange={handleTextChange} // onChange 핸들러 추가
          />
        </TextFiledArea>
        <SaveChipWrapper>
          <StyledSaveChip label="수정" onClick={handleUpdate} />
        </SaveChipWrapper>
      </NewsReviseWrapper>
    </Layout>
  )
}

const NewsReviseWrapper = styled(Stack)`
  width: 90vw;
  height: 90%;
  background-color: #b4dfc3;
  border: 1px solid #000000;
  border-radius: 13px;
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
const RenderingArea = styled(Stack)`
  width: 90%;
  height: 80%;
  background-color: #b4dfc3;
  border: 1px solid #000000;
  border-radius: 22px;
`
const DateRenderingArea = styled(Stack)`
  width: 100%;
  height: 20%;
`
const DateWrapper = styled(Stack)`
  flex-direction: row;
  align-items: center;
`
const TextFiledArea = styled(Stack)`
  flex-direction: center;
  align-items: center;
  width: 100%;
  height: 70%;
`
const StyledTextField = styled(TextField)`
  background-color: #fffcf6;
  border: 1px solid #000000;
  width: 80%;
  height: 95%;
  font-size: 35px;
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
export default NewsRevise
