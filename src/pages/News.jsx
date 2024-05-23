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

const News = () => {
  const [newsData, setNewsData] = useState([])
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

  const currentDate = dayjs()
  const [selectedDate, setSelectedDate] = useState(currentDate)

  const handlePreviousMonth = () => {
    const newDate = selectedDate.subtract(1, "month")
    setSelectedDate(newDate)
  }

  const handleNextMonth = () => {
    const newDate = selectedDate.add(1, "month")
    setSelectedDate(newDate)
  }

  const selectedYear = selectedDate.year()
  const selectedMonth = selectedDate.month() + 1 // Day.js의 month()는 0부터 시작하므로 1을 더합니다.

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
                      <Chip label="수정" variant="outlined" />
                      <Chip label="삭제" variant="outlined" />
                    </ChipWrapper>
                    {item.content.map((news, index) => {
                      return (
                        <NewInfoDataWrapper key={item}>
                          {index + 1}. {news}
                        </NewInfoDataWrapper>
                      )
                    })}
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

const NewInfoDataWrapper = styled(Typography)`
  padding: 2px;
  font-size: 14px;
`

export default News
