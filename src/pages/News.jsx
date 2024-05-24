import { useState, useEffect } from "react"
import dayjs from "dayjs"
import "dayjs/locale/ko"
dayjs.locale("ko")
import styled from "@emotion/styled"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Chip from "@mui/material/Chip"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import IconButton from "@mui/material/IconButton"
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"

import Layout from "../components/Layout/Layout"
import { PlusButton } from "../components/shared/PlusButton"
import { getMcyNewsApi } from "../api/newsApi"
import { collection, deleteDoc, getDocs } from "firebase/firestore"
import { db } from "../firebase" // firebase 설정 파일을 임포트

const News = () => {
  const [newsData, setNewsData] = useState([])
  useEffect(() => {
    // 파이어베이스에서 News 콜레션에 있는 데이터를 가져옴.
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

  const currentDate = dayjs()
  const [selectedDate, setSelectedDate] = useState(currentDate)
  const selectedYear = selectedDate.year()
  const selectedMonth = selectedDate.month() + 1 // Day.js의 month()는 0부터 시작하므로 1을 더합니다.

  const handlePreviousMonth = () => {
    const newDate = selectedDate.subtract(1, "month")
    setSelectedDate(newDate)
  }

  const handleNextMonth = () => {
    const newDate = selectedDate.add(1, "month")
    setSelectedDate(newDate)
  }
  const handleDelete = async (itemId, itemYear, itemMonth, itemDay) => {
    try {
      // 클라이언트 측 데이터 삭제
      setNewsData(prevData => prevData.filter(item => item.id !== itemId))

      // 파이어베이스에서 해당 날짜와 일치하는 문서 삭제
      const querySnapshot = await getDocs(collection(db, "news"))
      querySnapshot.forEach(async doc => {
        const data = doc.data()
        if (data.year === itemYear && data.month === itemMonth && data.day === itemDay) {
          await deleteDoc(doc.ref)
        }
      })

      alert("Data deleted successfully!")
    } catch (error) {
      console.error("Error deleting data: ", error)
      alert("Error deleting data.")
    }
  }

  return (
    <Layout>
      <NewsWrapper>
        <SelectWrapper>
          <IconButton onClick={handlePreviousMonth}>
            <ArrowLeftIcon fontSize="large" />
          </IconButton>
          <DateWrapper>
            {selectedYear}년 {selectedMonth}월
          </DateWrapper>
          <IconButton onClick={handleNextMonth}>
            <ArrowRightIcon fontSize="large" />
          </IconButton>
          <StyledIconButton>
            <PlusButton />
          </StyledIconButton>
        </SelectWrapper>
        <RenderingArea>
          {newsData
            .filter(item => Number(item.year) === selectedYear && Number(item.month) === selectedMonth)
            .map(item => (
              <NewsListWrapper key={item.id}>
                <StyledAccordion>
                  <AccordionSummary expandIcon={<StyledArrowDropDownIcon />}>
                    <NewsItem>
                      {item.month}월 {item.day}일 광고
                    </NewsItem>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ChipWrapper>
                      <StyledChip label="수정" variant="outlined" />
                      <StyledChip label="삭제" variant="outlined" onClick={() => handleDelete(item.id, item.year, item.month, item.day)} />
                    </ChipWrapper>
                    <NewInfoDataWrapper key={item}>{item.content}</NewInfoDataWrapper>
                  </AccordionDetails>
                </StyledAccordion>
              </NewsListWrapper>
            ))}
        </RenderingArea>
      </NewsWrapper>
    </Layout>
  )
}

const NewsWrapper = styled(Stack)`
  width: 100vw;
  height: calc(100dvh - 180px);
  background-color: #fffcf6;
`

const SelectWrapper = styled(Stack)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 15%;
`
const StyledIconButton = styled(IconButton)`
  position: absolute;
  right: 1%;
`
const DateWrapper = styled(Typography)`
  font-size: 20px;
`

const RenderingArea = styled(Stack)`
  align-items: center;
  width: 100%;
  height: 600px;
  margin-top: 15px;
  overflow-y: auto; /* 스크롤이 있는 경우만 스크롤바를 표시 */
  &::-webkit-scrollbar {
    width: 0;
  }
`

const NewsListWrapper = styled(Stack)`
  justify-content: center;
  width: 90%;
  margin: 10px 0;
`
const StyledAccordion = styled(Accordion)`
  background-color: #f0f0f0;

  & .MuiButtonBase-root {
    justify-content: center;
    align-items: center;
    height: 120px;
  }

  &.MuiAccordion-rounded {
    border-radius: 22px;
    border: 1px solid #000000;
  }
`
const StyledArrowDropDownIcon = styled(ArrowDropDownIcon)`
  &.MuiSvgIcon-root {
    font-size: 50px;
  }
`

const NewsItem = styled(Stack)`
  justify-content: center;
  font-size: 25px;
  height: 60px;
  margin-left: 15px;
  font-weight: 700;
`
const ChipWrapper = styled(Stack)`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
`
const StyledChip = styled(Chip)`
  &.MuiChip-root {
    width: 73px;
    height: 30px;
  }
`

const NewInfoDataWrapper = styled(Typography)`
  white-space: pre-wrap; // 파이어베이스에서 데이터를 가져올때 줄 바꿈을 적용하기 위해
  padding: 2px;
  font-size: 14px;
`

export default News
