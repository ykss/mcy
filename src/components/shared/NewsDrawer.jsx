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

  // 텍스트 필드에서 타이핑 할때 마다 TextValue 값 선언
  const handleTextChange = event => {
    setTextValue(event.target.value)
  }

  const DrawerList = (
    <NewsAddWrapper rol="presentation">
      <ExitIcon onClick={toggleDrawer} />
      <DateRenderingArea>
        {mode === "add" ? (
          <DateWrapper>
            <IconButton onClick={() => handlePreviousWeek(selectedDateInfo, setSelectedDateInfo)}>
              <StyledArrowLeftIcon />
            </IconButton>
            <Typography fontSize={28}>{dayjs(selectedDateInfo).format("M월 D일")}</Typography>
            <IconButton onClick={() => handleNextWeek(selectedDateInfo, setSelectedDateInfo)}>
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
      <SaveChipWrapper>
        {mode === "add" ? (
          <StyledSaveChip label="저장" onClick={() => handleSave(selectedDateInfo, setTextValue, textValue, fetchData)} />
        ) : (
          <StyledSaveChip label="수정" onClick={() => handleUpdate(selectedDocId, textValue, fetchData)} />
        )}
      </SaveChipWrapper>
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
const Wrapper = styled(Stack)`
  width: 100%;
  height: 10%;
  justify-content: center;
  align-items: center;
`
const DrawerWrapper = styled(Drawer)`
  .MuiDrawer-paper {
    width: 99%;
    height: 60%;
    margin: auto;
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
    border: none;
  }

  /* 텍스트 필드 활성화될 때 윤곽선 제거 */
  & .MuiOutlinedInput-root {
    & fieldset {
      border: none;
    }
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
