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
import { nanoid } from "nanoid"

import { db } from "../../firebase" // firebase 설정 파일

import { collection, addDoc, updateDoc, query, where, getDocs } from "firebase/firestore"

const NewsDrawer = ({ open, onClose, mode, targetData }) => {
  const toggleDrawer = () => {
    onClose(false)
  }
  const [textValue, setTextValue] = useState("") // 텍스트 상태 추가
  const today = dayjs()
  const dayOfWeek = today.day() // 0은 일요일, 6은 토요일
  const lastSunday = today.subtract(dayOfWeek, "day")
  const [selectedDateInfo, setSelectedDateInfo] = useState(lastSunday.format("YYYY-MM-DD"))
  const [selectedDocId, setSelectedDocId] = useState(null) // 선택된 문서 ID 상태 추가

  useEffect(() => {
    // targetData 있을 경우 (mode = 추가) 해당 리스트의 데이터를 찾습니다.
    if (targetData) {
      setTextValue(targetData.content)
      setSelectedDateInfo(targetData.date)
      setSelectedDocId(targetData.id) // selectedData.id로 수정
    } else {
      // targetData가 null일 경우 (mode = 추가) 초기값으로 설정합니다.
      setSelectedDateInfo(lastSunday.format("YYYY-MM-DD"))
      setTextValue("")
      setSelectedDocId(null)
    }
  }, [targetData])

  // 저번주 일요일 날짜 변경
  const handlePreviousWeek = () => {
    const newDateInfo = dayjs(selectedDateInfo).subtract(7, "day").format("YYYY-MM-DD")
    setSelectedDateInfo(newDateInfo)
  }

  // 다음주 일요일 날짜 변경
  const handleNextWeek = () => {
    const newDateInfo = dayjs(selectedDateInfo).add(7, "day").format("YYYY-MM-DD")
    setSelectedDateInfo(newDateInfo)
  }

  // 텍스트 필드에서 타이핑 할때 마다 TextValue 값 선언
  const handleTextChange = event => {
    setTextValue(event.target.value)
  }
  // 파이어 베이스 저장
  const handleSave = async () => {
    try {
      const dateString = selectedDateInfo // 날짜를 문자열로 변환
      await addDoc(collection(db, "news"), {
        date: dateString,
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
      id 필드가 selectedDocId와 일치하는 문서를 찾기 위한 조건문 
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
            <Typography fontSize={28}>{dayjs(selectedDateInfo).format("M월 D일")}</Typography>
            <IconButton onClick={handleNextWeek}>
              <StyledArrowRightIcon />
            </IconButton>
          </DateWrapper>
        ) : (
          <Typography sx={{ marginLeft: "68px" }} fontSize={28}>
            {dayjs(selectedDateInfo).format("M월 D일")}
          </Typography>
        )}
      </DateRenderingArea>
      <TextFiledArea>
        <StyledTextField
          multiline
          rows={12}
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
