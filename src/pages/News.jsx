import { useState } from "react"

import styled from "@emotion/styled"

import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import IconButton from "@mui/material/IconButton"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"

import Layout from "../components/Layout/Layout"
import Title from "../components/shared/Title"
import { NewsData } from "../data/NewsData"

const News = () => {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth() + 1

  const [selectedYear, setSelectedYear] = useState(currentYear)
  const [selectedMonth, setSelectedMonth] = useState(currentMonth)

  const handlePreviousMonth = () => {
    let newYear = selectedYear
    let newMonth = selectedMonth - 1
    if (newMonth === 0) {
      newMonth = 12
      newYear--
    }
    setSelectedYear(newYear)
    setSelectedMonth(newMonth)
  }

  const handleNextMonth = () => {
    let newYear = selectedYear
    let newMonth = selectedMonth + 1
    if (newMonth === 13) {
      newMonth = 1
      newYear++
    }
    setSelectedYear(newYear)
    setSelectedMonth(newMonth)
  }

  return (
    <Layout>
      <NewsWrapper>
        <TitleWrapper>
          <CampaignOutlinedIconWrapper />
          <Title>MCY 소식</Title>
        </TitleWrapper>
        <SelectWrapper>
          <IconButton onClick={handlePreviousMonth}>
            <ArrowBackIosIcon />
          </IconButton>
          <DateWrapper>
            {selectedYear}년 {selectedMonth}월
          </DateWrapper>
          <IconButton onClick={handleNextMonth}>
            <ArrowForwardIosIcon />
          </IconButton>
        </SelectWrapper>
        <RenderingArea>
          {NewsData.filter(item => Number(item.year) === selectedYear && Number(item.month) === selectedMonth).map(item => (
            <NewsListWrapper key={item.id}>
              <Accordion>
                <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                  <NewsItem>
                    {item.month}월 {item.day}일 광고
                  </NewsItem>
                </AccordionSummary>
                <AccordionDetails>
                  {item.content.map((news, index) => {
                    return (
                      <NewInfoDataWrapper key={item}>
                        {index + 1}. {news}
                      </NewInfoDataWrapper>
                    )
                  })}
                </AccordionDetails>
              </Accordion>
            </NewsListWrapper>
          ))}
        </RenderingArea>
      </NewsWrapper>
    </Layout>
  )
}

const NewsWrapper = styled(Stack)`
  width: 100vw;
  height: calc(100dvh - 120px);
`

const TitleWrapper = styled(Stack)`
  flex-direction: row;
  align-items: center;
  gap: 15px;
  height: 10%;
  padding: 0 10px;
`

const CampaignOutlinedIconWrapper = styled(CampaignOutlinedIcon)`
  font-size: 40px;
`

const SelectWrapper = styled(Stack)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 10%;
`

const DateWrapper = styled(Typography)`
  font-size: 15px;
`

const RenderingArea = styled(Stack)`
  align-items: center;
  width: 100%;
  height: 500px;
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

const NewsItem = styled(Stack)`
  justify-content: center;
  height: 60px;
  margin-left: 2px;
  font-size: 16px;
  font-weight: 700;
`

const NewInfoDataWrapper = styled(Typography)`
  padding: 2px;
  font-size: 14px;
`

export default News
