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
import { NewsPlusButton } from "../components/shared/PlusButton"
import { McyNewsApi } from "../api/mcyNewsApi"
import { db } from "../firebase" // firebase 설정 파일을 임포트
import NewsDrawer from "../components/shared/NewsDrawer"

import { doc, collection, deleteDoc, getDocs } from "firebase/firestore"

const News = () => {
  const [newsData, setNewsData] = useState([])
  const [targetData, setTargetData] = useState([])
  const [admin, setAdmin] = useState(false) // 초기 값 설정
  const [isNewsDrawerOpen, setIsNewsDrawerOpen] = useState(false)
  const [drawerMode, setDrawerMode] = useState("add") // "add" 또는 "modify"

  // 파이어베이스에서 News 콜렉션에 있는 데이터를 가져옴.
  const fetchData = async () => {
    try {
      const data = await McyNewsApi()
      setNewsData(data)
    } catch (error) {
      console.error("Error fetching data: ", error)
    }
  }

  // 첫 렌더링시 파이어베이스에서 데이터 가져오기
  useEffect(() => {
    fetchData()
    setAdmin(localStorage.getItem("admin") === "true")
  }, [])

  // 날짜 이동
  const currentDate = dayjs()
  const [selectedDate, setSelectedDate] = useState(currentDate)
  const selectedYearMonth = selectedDate.format("YYYY-MM")

  const handlePreviousMonth = () => {
    const newDate = selectedDate.subtract(1, "month")
    setSelectedDate(newDate)
  }

  const handleNextMonth = () => {
    const newDate = selectedDate.add(1, "month")
    setSelectedDate(newDate)
  }

  // 파이어베이스 및 페이지 소식 데이터 삭제
  const handleDelete = async targetId => {
    try {
      // 클라이언트 측 데이터 삭제
      setNewsData(prevData => prevData.filter(item => item.id !== targetId))

      // 파이어베이스에서 해당 문서 삭제
      const querySnapshot = await getDocs(collection(db, "news"))
      const newsList = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }))

      const targetDoc = newsList.find(item => item.id === targetId)
      if (targetDoc) {
        await deleteDoc(doc(db, "news", targetDoc.id))
        alert("Data deleted successfully!")
      } else {
        console.log("Document with the given ID not found.")
        alert("Document not found.")
      }
    } catch (error) {
      console.error("Error deleting data: ", error)
      alert("Error deleting data.")
    }
  }

  // 추가 및 수정 컴포넌트 오픈 및 데이터 전달
  const toggleNewsDrawer = (mode, targetData) => {
    setIsNewsDrawerOpen(!isNewsDrawerOpen)
    setTargetData(targetData)
    setDrawerMode(mode)
  }

  const handleDrawerClose = () => {
    setIsNewsDrawerOpen(false)
    fetchData() // 드로어가 닫힐 때 데이터 가져오기
  }
  return (
    <Layout>
      <NewsWrapper>
        <SelectWrapper>
          <IconButton onClick={handlePreviousMonth}>
            <ArrowLeftIcon fontSize="large" />
          </IconButton>
          <DateWrapper>{selectedDate.format("YYYY년 MM월")}</DateWrapper>
          <IconButton onClick={handleNextMonth}>
            <ArrowRightIcon fontSize="large" />
          </IconButton>
          <StyledIconButton onClick={() => toggleNewsDrawer("add", null)}>
            <NewsPlusButton />
          </StyledIconButton>
        </SelectWrapper>
        <RenderingArea>
          {newsData
            .filter(item => dayjs(item.date).format("YYYY-MM") === selectedYearMonth) // 'YYYY-MM' 형식으로 필터링
            .map(item => (
              <NewsListWrapper key={item.id}>
                <StyledAccordion>
                  <AccordionSummary expandIcon={<StyledArrowDropDownIcon />}>
                    <NewsItem>{dayjs(item.date).format("M월 D일")} 광고</NewsItem>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ChipWrapper>
                      <StyledChip label="삭제" variant="outlined" onClick={() => handleDelete(item.id)} />
                      <StyledChip label="수정" variant="outlined" onClick={() => toggleNewsDrawer("modify", item)} />
                    </ChipWrapper>
                    <NewInfoDataWrapper>{item.content}</NewInfoDataWrapper>
                  </AccordionDetails>
                </StyledAccordion>
              </NewsListWrapper>
            ))}
        </RenderingArea>
      </NewsWrapper>
      <NewsDrawer fetchData={fetchData} open={isNewsDrawerOpen} onClose={handleDrawerClose} mode={drawerMode} targetData={targetData} />
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
