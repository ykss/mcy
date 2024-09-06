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

import { handlePreviousWeek } from "../../utils/handlePreviousWeek"
import { handleNextWeek } from "../../utils/handleNextWeek"
import { handleSave, handleUpdate } from "../../api/mcyNewsApi"

const NewsDrawer = ({ fetchData, open, onClose, mode, targetData }) => {
  const toggleDrawer = () => {
    onClose(false)
  }

  const [textValue, setTextValue] = useState("") // 텍스트 상태 추가
  const today = dayjs()
  const dayOfWeek = today.day() // 0은 일요일, 6은 토요일
  const lastSunday = today.subtract(dayOfWeek, "day")
  const [selectedDateInfo, setSelectedDateInfo] = useState(lastSunday.format("YYYY-MM-DD"))

  useEffect(() => {
    // targetData 있을 경우 (mode = 추가) 해당 리스트의 데이터를 찾습니다.
    if (targetData) {
      setTextValue(targetData.content)
      setSelectedDateInfo(targetData.date)
    } else {
      // targetData가 null일 경우 (mode = 추가) 초기값으로 설정합니다.
      setSelectedDateInfo(lastSunday.format("YYYY-MM-DD"))
      setTextValue("")
    }
  }, [targetData])

  // 텍스트 필드에서 타이핑 할때 마다 TextValue 값 선언
  const handleTextChange = event => {
    setTextValue(event.target.value)
  }

  const DrawerList = (
    <NewsDrawerWrapper>
      <StyledExitButton onClick={toggleDrawer}>
        <ExitIcon />
      </StyledExitButton>
      {mode === "add" ? (
        <DateWrapper>
          <IconButton onClick={() => handlePreviousWeek(selectedDateInfo, setSelectedDateInfo)}>
            <StyledArrowLeftIcon />
          </IconButton>
          <Typography fontSize={25}>{dayjs(selectedDateInfo).format("M월 D일")}</Typography>
          <IconButton onClick={() => handleNextWeek(selectedDateInfo, setSelectedDateInfo)}>
            <StyledArrowRightIcon />
          </IconButton>
        </DateWrapper>
      ) : (
        <Typography sx={{ marginLeft: "68px" }} fontSize={25}>
          {dayjs(selectedDateInfo).format("M월 D일")}
        </Typography>
      )}
      <TextFiledArea>
        <StyledTextField
          multiline
          value={textValue} // 상태 값으로 설정
          onChange={handleTextChange} // onChange 핸들러 추가
        />
      </TextFiledArea>
      <SaveChipWrapper>
        {mode === "add" ? (
          <StyledSaveChip label="저장" onClick={() => handleSave(selectedDateInfo, setTextValue, textValue, fetchData, toggleDrawer)} />
        ) : (
          <StyledSaveChip label="수정" onClick={() => handleUpdate(selectedDateInfo, textValue, fetchData, toggleDrawer)} />
        )}
      </SaveChipWrapper>
    </NewsDrawerWrapper>
  )

  return (
    <>
      <DrawerWrapper open={open} onClose={toggleDrawer} anchor="bottom">
        {DrawerList}
      </DrawerWrapper>
    </>
  )
}

const DrawerWrapper = styled(Drawer)`
  .MuiDrawer-paper {
    width: 99%;
    height: 65%;
    margin: auto;
    background-color: #b4dfc3;
    border: 1px solid #000000;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
`

const NewsDrawerWrapper = styled(Stack)`
  width: 100%;
  height: 100%;
`

const StyledExitButton = styled(IconButton)`
  width: 100%;
  height: 5%;
`
const ExitIcon = styled(ClearIcon)`
  margin: auto 10px;
  font-size: 35px;
  position: absolute;
  top: 10px;
  right: 1%;
`

const DateWrapper = styled(Stack)`
  width: 100%;
  height: 10%;
  flex-direction: row;
  align-items: center;
`
const TextFiledArea = styled(Stack)`
  flex-direction: center;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 55%;
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
  width: 90%;
  height: 100%;
  background-color: #f0f0f0;
  border: 1px solid #000000;
  border-radius: 22px;

  & .MuiInputBase-root {
    font-size: 20px;
    border: none;
    overflow: hidden; // 스크롤바 숨기기
  }

  /* 텍스트 필드 활성화될 때 윤곽선 제거 */
  & .MuiOutlinedInput-root {
    & fieldset {
      border: none;
    }
  }
`

const SaveChipWrapper = styled(Stack)`
  height: 10%;
  margin-top: 8px;
  margin-right: 10px;
  flex-direction: row;
  justify-content: right;
`
const StyledSaveChip = styled(Chip)`
  width: 80px;
  height: 35px;
  background-color: #f0f0f0;
  border: 1px solid #000000;
`

export default NewsDrawer
