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
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import React, { useEffect } from "react"

import Layout from "../components/Layout/Layout"
import Title from "../components/shared/Title"
import { NewsData } from "../data/NewsData"
const News = () => {
  // 연도와 월 데이터 추출하여 중복 제거
  const years = [...new Set(NewsData.map(item => item.year))]
  const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]

  const [selectedYear, setSelectedYear] = React.useState(years[0])
  const [selectedMonth, setSelectedMonth] = React.useState(months[0])

  const handlePreviousMonth = () => {
    const monthIndex = months.indexOf(selectedMonth)
    const previousMonth = monthIndex === 0 ? months[months.length - 1] : months[monthIndex - 1]
    setSelectedMonth(previousMonth)
    // 월 변경에 따라 연도 변경
    if (previousMonth === months[months.length - 1]) {
      // 이전 월이 12월인 경우 이전 연도로 변경
      const currentYearIndex = years.indexOf(selectedYear)
      const previousYear = currentYearIndex === 0 ? years[years.length - 1] : years[currentYearIndex - 1]
      setSelectedYear(previousYear)
    }
  }

  const handleNextMonth = () => {
    const monthIndex = months.indexOf(selectedMonth)
    const nextMonth = monthIndex === months.length - 1 ? months[0] : months[monthIndex + 1]
    setSelectedMonth(nextMonth)
    // 월 변경에 따라 연도 변경
    if (nextMonth === months[0]) {
      // 다음 월이 1월인 경우 다음 연도로 변경
      const currentYearIndex = years.indexOf(selectedYear)
      const nextYear = currentYearIndex === years.length - 1 ? years[0] : years[currentYearIndex + 1]
      setSelectedYear(nextYear)
    }
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
          {NewsData.filter(item => item.year === +selectedYear && item.month === selectedMonth).map(item => (
            <NewsListWrapper key={item.id}>
              <Accordion>
                <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                  <NewsItem fontSize={16} fontWeight={"bold"}>
                    {item.month}월 {item.date}일 광고
                  </NewsItem>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    {item.month}월 {item.date}일 소식입니다
                  </Typography>
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
