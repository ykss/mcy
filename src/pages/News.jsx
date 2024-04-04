import styled from "@emotion/styled"
import { Stack, Typography } from "@mui/material"
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import IconButton from "@mui/material/IconButton"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import React from "react"

import Layout from "../components/Layout/Layout"
import Title from "../components/shared/Title"
import { NewsData } from "../data/NewsData"

const News = () => {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth() + 1

  const [selectedYear, setSelectedYear] = React.useState(currentYear)
  const [selectedMonth, setSelectedMonth] = React.useState(currentMonth)
  
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
          <CampaignOutlinedIcon sx={{ fontSize: 40 }} />
          <Title>MCY 소식</Title>
        </TitleWrapper>
        <SelectWrapper>
          <IconButton onClick={handlePreviousMonth}>
            <ArrowBackIosIcon />
          </IconButton>
          <Typography fontSize={15}>
            {selectedYear}년 {selectedMonth}월
          </Typography>
          <IconButton onClick={handleNextMonth}>
            <ArrowForwardIosIcon />
          </IconButton>
        </SelectWrapper>
        <RenderingArea>
          {NewsData.filter(item => Number(item.year) === selectedYear && Number(item.month) === selectedMonth).map(item => (
            <NewsListWrapper key={item.id}>
              <Accordion>
                <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                  <NewsItem fontSize={16} fontWeight={"bold"}>
                    {item.month}월 {item.day}일 광고
                  </NewsItem>
                </AccordionSummary>
                <AccordionDetails>
                  {item.content.map((news,index) => {
                    return <Typography sx={{padding:2}}fontSize={14} key={item }>{index+1}. {news}</Typography>
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
  height: calc(100dvh - 120px);
  width: 100vw;
`

const TitleWrapper = styled(Stack)`
  flex-direction: row;
  align-items: center;
  height: 10%;
  gap: 15px;
  padding: 0 10px;
`

const SelectWrapper = styled(Stack)`
  height: 10%;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const RenderingArea = styled(Stack)`
  margin-top: 15px;
  height: 500px;
  width: 100%;
  align-items: center;
  overflow-y: auto; /* 스크롤이 있는 경우만 스크롤바를 표시 */
  &::-webkit-scrollbar {
    width: 0;
  }
`

const NewsListWrapper = styled(Stack)`
  width: 90%;
  margin: 10px 0;
  justify-content: center;
`
const NewsItem = styled(Stack)`
  height: 60px;
  margin-left: 2px;
  justify-content: center;
`
export default News
