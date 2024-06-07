import Drawer from "@mui/material/Drawer"
import ClearIcon from "@mui/icons-material/Clear"
import { useState, useEffect } from "react"
import dayjs from "dayjs"
import "dayjs/locale/ko"
dayjs.locale("ko")
import { Stack, styled } from "@mui/system"
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"
import Chip from "@mui/material/Chip"
import TextField from "@mui/material/TextField"
import { IconButton, Typography } from "@mui/material"

import { getMcyNewsApi } from "../../api/newsApi"
import { db } from "../../firebase" // firebase 설정 파일을 임포트

import { collection, addDoc, updateDoc, query, where, getDocs } from "firebase/firestore"
import { nanoid } from "nanoid"

const NewsDrawer = ({ open, onClose, mode }) => {
  const toggleDrawer = () => {
    onClose(false)
  }
  const today = dayjs()
  const dayOfWeek = today.day() // 0은 일요일, 6은 토요일
  const lastSunday = today.subtract(dayOfWeek, "day")
  const [selectedDateInfo, setSelectedDateInfo] = useState(lastSunday)
  const [textValue, setTextValue] = useState("") // 텍스트 상태 추가
  const [newsData, setNewsData] = useState([]) // 파이어 베이스에 저장되어 있는 소식
  const [selectedDocId, setSelectedDocId] = useState(null) // 선택된 문서 ID 상태 추가

  // Firebase의 Firestore를 사용하여 데이터를 가져오는 예시
  const fetchData = async () => {
    try {
      const data = await getMcyNewsApi()
      setNewsData(data)
    } catch (error) {
      console.error("Error fetching data: ", error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    // selectedDateInfo가 변경될 때마다 데이터를 필터링하여 textValue를 설정합니다.
    const currentData = newsData.find(item => item.year === selectedDateInfo.year() && item.month === selectedDateInfo.month() + 1 && item.day === selectedDateInfo.date())
    // console.log(currentData.id)
    if (currentData) {
      setTextValue(currentData.content)
      setSelectedDocId(currentData.id)
    } else {
      setTextValue("")
      setSelectedDocId(null)
    }
  }, [selectedDateInfo, newsData])

  // 저번주 일요일 날짜 변경
  const handlePreviousWeek = () => {
    const newDateInfo = selectedDateInfo.subtract(7, "day")
    setSelectedDateInfo(newDateInfo)
  }

  // 다음주 일요일 날짜 변경
  const handleNextWeek = () => {
    const newDateInfo = selectedDateInfo.add(7, "day")
    setSelectedDateInfo(newDateInfo)
  }

  // 텍스트 필드에서 타이핑 할때 마다 TextValue 값 선언
  const handleTextChange = event => {
    console.log(event.target.value)
    setTextValue(event.target.value)
  }
  // 파이어 베이스 저장
  const handleSave = async () => {
    try {
      await addDoc(collection(db, "news"), {
        year: selectedDateInfo.year(),
        month: selectedDateInfo.month() + 1, // month()는 0부터 시작하므로 +1
        day: selectedDateInfo.date(),
        content: textValue,
        id: nanoid(10),
      })
      alert("Data saved successfully!")
      setTextValue("")
    } catch (e) {
      console.error("Error adding document: ", e)
      alert("Error saving data.")
    }
  }

  // 파이어 베이스 수정
  const handleUpdate = async () => {
    try {
      const collectionRef = collection(db, "news")
      const q = query(collectionRef, where("id", "==", selectedDocId))
      /* 필드 값으로 쿼리 정의 
      id 필드가  selectedDocId와 일치하는 문서를 찾기 위한 조건문 
      where 함수는 필드 이름, 비교 연산자, 값을 인자로 받아 조건을 설정한다.
      */
      const querySnapshot = await getDocs(q)
      //위에서 정의한 쿼리를 실행하여 해당 조건을 만족하는 모든 문서를 가져온다.
      if (!querySnapshot.empty) {
        querySnapshot.forEach(async docSnapshot => {
          const docRef = docSnapshot.ref
          await updateDoc(docRef, {
            content: textValue, // 새로운 값으로 업데이트
          })
          alert("Data updated successfully!")
          //   fetchData() // 업데이트 후 데이터 새로 가져오기
        })
      } else {
        alert("No document found to update.")
      }
    } catch (e) {
      console.error("Error updating document: ", e)
      alert("Error updating data.")
    }
  }

  const DrawerList = (
    <NewsAddWrapper rol="presentation">
      <ExitIcon onClick={toggleDrawer} />
      <DateRenderingArea>
        {mode === "add" ? (
          <DateWrapper>
            <IconButton onClick={handlePreviousWeek}>
              <StyledArrowLeftIcon />
            </IconButton>
            <Typography fontSize={28}>{selectedDateInfo.format("M월 D일")}</Typography>
            <IconButton onClick={handleNextWeek}>
              <StyledArrowRightIcon />
            </IconButton>
          </DateWrapper>
        ) : (
          <Typography sx={{ marginLeft: "68px" }} fontSize={28}>
            {selectedDateInfo.format("M월 D일")}
          </Typography>
        )}
      </DateRenderingArea>
      <TextFiledArea>
        <StyledTextField
          multiline
          rows={12}
          // value={mode === "add" ? "" : textValue} // 상태 값으로 설정
          value={textValue} // 상태 값으로 설정
          onChange={handleTextChange} // onChange 핸들러 추가
        />
      </TextFiledArea>
      <SaveChipWrapper>{mode === "add" ? <StyledSaveChip label="저장" onClick={handleSave} /> : <StyledSaveChip label="수정" onClick={handleUpdate} />}</SaveChipWrapper>
    </NewsAddWrapper>
  )

  return (
    <>
      <DrawerWrapper open={open} onClose={toggleDrawer} anchor="bottom">
        {DrawerList}
      </DrawerWrapper>
    </>
  )
}

const ExitIcon = styled(ClearIcon)`
  margin: auto 10px;
  font-size: 25px;
`

const DrawerWrapper = styled(Drawer)`
  .MuiDrawer-paper {
    width: 100%;
    height: 60%;
    background-color: #b4dfc3;
    border: 1px solid #000000;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
`
const NewsAddWrapper = styled(Stack)`
  width: 100%;
  height: 90%;
`
const DateRenderingArea = styled(Stack)`
  width: 100%;
  height: 13%;
`
const DateWrapper = styled(Stack)`
  flex-direction: row;
  align-items: center;
`
const TextFiledArea = styled(Stack)`
  flex-direction: center;
  align-items: center;
  width: 100%;
  height: 77%;
  margin-top: 10px;
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
const StyledTextField = styled(TextField)`
  background-color: #f0f0f0;
  border: 1px solid #000000;
  border-radius: 22px;
  width: 90%;
  height: 100%;
  & .MuiInputBase-root {
    font-size: 20px;
  }
`

const SaveChipWrapper = styled(Stack)`
  flex-direction: row;
  position: absolute;
  bottom: 10px;
  right: 5%;
  justify-content: right;
  align-items: center;
  gap: 13px;
`
const StyledSaveChip = styled(Chip)`
  width: 80px;
  height: 35px;
  background-color: #f0f0f0;
  border: 1px solid #000000;
`

export default NewsDrawer
