import dayjs from "dayjs"
import "dayjs/locale/ko"
dayjs.locale("ko")
import styled from "@emotion/styled"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"
import { Button } from "@mui/material"
import { useState, useEffect } from "react"
import { Toaster } from "react-hot-toast"
import html2canvas from "html2canvas"

import Layout from "../components/Layout/Layout"
import { handleNextWeek } from "../utils/handleNextWeek"
import { handlePreviousWeek } from "../utils/handlePreviousWeek"
import { getAttendanceApi } from "../api/mcyAttendanceDataApi"
const AttendanceStatus = () => {
  const today = dayjs()
  const dayOfWeek = today.day() // 0은 일요일, 6은 토요일
  const lastSunday = today.subtract(dayOfWeek, "day")
  const [selectedDateInfo, setSelectedDateInfo] = useState(lastSunday.format("YYYY-MM-DD"))
  const [cellData, setCellData] = useState([])
  const [adultCount, setAdultCount] = useState()
  const [memberCount, setMemberCount] = useState()
  const [totalCount, setTotalCount] = useState()
  const fetchData = async () => {
    try {
      const data = await getAttendanceApi(selectedDateInfo)
      setCellData(data.cellData)
      setAdultCount(data.adultCount)
      setMemberCount(data.memberCount)
      setTotalCount(data.totalCount)
    } catch (error) {
      console.error("Error fetching data: ", error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [selectedDateInfo])

  const handleCapture = async () => {
    const target = document.getElementById("download")
    if (!target) {
      return alert("사진 저장에 실패했습니다.")
    }
    html2canvas(target).then(canvas => {
      const link = document.createElement("a")
      document.body.appendChild(link)
      link.href = canvas.toDataURL("image/png")
      link.download = "mcyAttendance.png" // 다운로드 이미지 파일 이름
      link.click()
      document.body.removeChild(link)
    })
  }

  return (
    <Layout>
      <Toaster position="top-center" reverseOrder={false} />
      <AttendanceStatusWrapper>
        <div id="download">
          <StatusPaper>
            <SelectWrapper>
              <IconButton onClick={() => handlePreviousWeek(selectedDateInfo, setSelectedDateInfo)}>
                <ArrowLeftIcon fontSize="large" />
              </IconButton>
              <DateWrapper>{dayjs(selectedDateInfo).format("YYYY.MM.DD")}</DateWrapper>
              <IconButton onClick={() => handleNextWeek(selectedDateInfo, setSelectedDateInfo)}>
                <ArrowRightIcon fontSize="large" />
              </IconButton>
            </SelectWrapper>
            <RenderingArea>
              {/* 셀 리스트 */}
              {cellData ? (
                cellData.map(item => (
                  <BoxWrapper key={item.cell}>
                    <CellNameBox>
                      <Typography fontSize={12}>{item.cell}</Typography>
                    </CellNameBox>
                    <MemberBox>
                      {item.checkedMember.map(member => (
                        <StyledTypography>{member}</StyledTypography>
                      ))}
                      {/* 다른 멤버들 */}
                    </MemberBox>
                    <CountBox>
                      <Typography fontSize={12}>{item.checkedMember.length}</Typography>
                    </CountBox>
                  </BoxWrapper>
                ))
              ) : (
                <BoxWrapper>
                  <CellNameBox>
                    <Typography fontSize={12}></Typography>
                  </CellNameBox>
                  <MemberBox>
                    <StyledTypography></StyledTypography>
                    {/* 다른 멤버들 */}
                  </MemberBox>
                  <CountBox>
                    <Typography fontSize={12}></Typography>
                  </CountBox>
                </BoxWrapper>
              )}
            </RenderingArea>
            <CountWrapper>
              <MemberCountWrapper>
                <Typography textAlign="center" sx={{ display: "flex", alignItems: "center" /* 수직 중앙 정렬 */, justifyContent: "center", borderRight: 1, borderBottom: 1 }}>
                  출석
                </Typography>
                <Typography textAlign="center" sx={{ display: "flex", alignItems: "center" /* 수직 중앙 정렬 */, justifyContent: "center", borderBottom: 1 }}>
                  {memberCount ? memberCount : 0}명
                </Typography>
                <Typography textAlign="center" sx={{ display: "flex", alignItems: "center" /* 수직 중앙 정렬 */, justifyContent: "center", borderRight: 1 }}>
                  기타
                </Typography>
                <Typography textAlign="center" sx={{ display: "flex", alignItems: "center" /* 수직 중앙 정렬 */, justifyContent: "center" }}>
                  {adultCount ? adultCount : 0}명
                </Typography>
              </MemberCountWrapper>
              <TotalCountWrapper>
                <Typography textAlign="center" sx={{ display: "flex", alignItems: "center" /* 수직 중앙 정렬 */, justifyContent: "center", borderRight: 1 }}>
                  총인원
                </Typography>
                <Typography textAlign="center" sx={{ display: "flex", alignItems: "center" /* 수직 중앙 정렬 */, justifyContent: "center" }}>
                  {totalCount ? totalCount : 0}명
                </Typography>
              </TotalCountWrapper>
            </CountWrapper>
            {/* 캡처 및 콘솔 출력 버튼 */}
            <SaveWrapper>
              <SaveButton variant="contained" color="primary" onClick={handleCapture}>
                저장하기
              </SaveButton>
            </SaveWrapper>
          </StatusPaper>
        </div>
      </AttendanceStatusWrapper>
    </Layout>
  )
}

const AttendanceStatusWrapper = styled(Stack)`
  width: 100vw;
  height: calc(100dvh - 180px);
  overflow-y: auto;
  background-color: #fffcf6;
`

const SelectWrapper = styled(Stack)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 15%;
`

const DateWrapper = styled(Typography)`
  font-size: 20px;
`

const StatusPaper = styled(Stack)`
  width: 90%;
  background-color: #f0f0f0;
  margin: 0 auto;
  border-radius: 25px;
  border: 1px solid #000000;
  padding-bottom: 25px;
`

const BoxWrapper = styled(Stack)`
  flex-direction: row;
  width: 95%;
  height: 75px;
  margin: 0 auto;
`
const CellNameBox = styled(Stack)`
  // 셀 이름
  width: 120px;
  height: 67px;
  justify-content: center;
  align-items: center;
  border: 1px solid #404040;
  background-color: #d9d9d9;
`
const CountBox = styled(Stack)`
  // 각 셀 출석현황
  width: 45px;
  height: 67px;
  justify-content: center;
  align-items: center;
  border: 1px solid #404040;
  background-color: #d9d9d9;
`
const MemberBox = styled(Stack)`
  // 출석한 셀원 리스트
  width: calc(100% - 165px);
  height: 67px;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 5px;
  border-top: 1px solid #404040;
  border-bottom: 1px solid #404040;
`

const StyledTypography = styled(Typography)`
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const RenderingArea = styled(Stack)`
  width: 100%;
`
const CountWrapper = styled(Stack)`
  width: 100%;
  height: 14%;
  margin: 0 auto;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`
const MemberCountWrapper = styled(Stack)`
  display: grid;
  grid-template-columns: 1fr 2fr;
  width: 45%;
  height: 60px;
  border: 1px solid #000000;
`
const TotalCountWrapper = styled(Stack)`
  display: grid;
  grid-template-columns: 2fr 3fr;
  width: 45%;
  height: 60px;
  border: 1px solid #000000;
`
const SaveWrapper = styled(Stack)`
  width: 95%;
  height: 13%;
  margin: 15px auto 0;
  align-items: flex-end;
  justify-content: center;
`

const SaveButton = styled(Button)`
  font-family: "Noto Sans";
  font-weight: 600;
  width: 100px;
  height: 45px;
  border: 1px solid #000;
  border-radius: 16px;
  background-color: #ede8ff;
`

export default AttendanceStatus
