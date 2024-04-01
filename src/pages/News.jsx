import styled from "@emotion/styled"
import Layout from "../components/Layout/Layout"
import {Stack, Typography } from "@mui/material"
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined"

import Title from "../components/shared/Title"
import { NewsData } from "../data/NewsData"
const News = () => {
  return (
    <Layout>
      <NewsWrapper>
        <TitleWrapper>
          <CampaignOutlinedIcon sx={{ fontSize: 40 }} />
          <Title>MCY 소식</Title>
        </TitleWrapper>
        {/* <NewsListWrapper> */}
        <RenderingArea>
          {NewsData.map(item => {
            return (
              <NewsList key={item.id}>
                <NewsContent fontSize={14}>
                  {item.month}월 {item.date}일 광고
                </NewsContent>
              </NewsList>
            )
          })}
        </RenderingArea>
        {/* </NewsListWrapper> */}
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

const RenderingArea = styled(Stack)`
  margin-top 10px;
  height: 700px;
  width: 100%;
  align-items: center;
  overflow-y: auto; /* 스크롤이 있는 경우만 스크롤바를 표시 */
  &::-webkit-scrollbar {
    width: 0; 
  }
`

const NewsList = styled(Stack)`
  width: 100%;
  border-bottom: 2px solid #986c6c;
  justify-content: center;
`
const NewsContent = styled(Stack)`
  height: 50px;
  margin-left: 10px;
  justify-content: center;
`
export default News
