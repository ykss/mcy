import styled from "@emotion/styled"
import { Stack, Typography } from "@mui/material"
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import React, { useEffect } from "react"

import Layout from "../components/Layout/Layout"
import Title from "../components/shared/Title"
import { NewsData } from "../data/NewsData"
const News = () => {
  // 연도와 월 데이터 추출하여 중복 제거
  const years = [...new Set(NewsData.map(item => item.year))]
  const months = [...new Set(NewsData.map(item => item.month))]

  const [selectedYear, setSelectedYear] = React.useState(years[0])
  const [selectedMonth, setSelectedMonth] = React.useState(months[0])

  const handleYearChange = event => {
    setSelectedYear(event.target.value)
  }

  const handleMonthChange = event => {
    setSelectedMonth(event.target.value)
  }
  return (
    <Layout>
      <NewsWrapper>
        <TitleWrapper>
          <CampaignOutlinedIcon sx={{ fontSize: 40 }} />
          <Title>MCY 소식</Title>
        </TitleWrapper>
        <SelectWrapper>
          <SelectItem>
            <select value={selectedYear} onChange={handleYearChange}>
              {years.map((year, index) => (
                <option key={index} value={year}>
                  {year}년
                </option>
              ))}
            </select>
          </SelectItem>
          <SelectItem>
            <select value={selectedMonth} onChange={handleMonthChange}>
              {months.map((month, index) => (
                <option key={index} value={month}>
                  {month}월
                </option>
              ))}
            </select>
          </SelectItem>
        </SelectWrapper>
        <RenderingArea>
          {NewsData.filter(item => item.year === +selectedYear && item.month === selectedMonth).map(item => (
            <NewsListWrapper key={item.id}>
              <Accordion>
                <AccordionSummary expandIcon={<ArrowDropDownIcon />} aria-controls="panel2-content">
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
  width: 90%;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`

const SelectItem = styled(Stack)`
  width: 30%;
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
