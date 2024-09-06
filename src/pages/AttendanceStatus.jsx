import dayjs from "dayjs"
import "dayjs/locale/ko"
dayjs.locale("ko")
import styled from "@emotion/styled"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"
import html2canvas from "html2canvas"
import { Button } from "@mui/material"

import Layout from "../components/Layout/Layout"

const AttendanceStatus = () => {
  // const divRef = useRef < HTMLDivElement > null // 캡처할 영역을 참조

  const handleCapture = async () => {
    const target = document.getElementById("download")
    if (!target) {
      return alert("사진 저장에 실패했습니다.")
    }
    html2canvas(target).then(canvas => {
      const link = document.createElement("a")
      document.body.appendChild(link)
      link.href = canvas.toDataURL("image/png")
      link.download = "Haru4cut.png" // 다운로드 이미지 파일 이름
      link.click()
      document.body.removeChild(link)
    })
  }

  return (
    <div id="download">
      {/* 캡처할 영역 */}
      <Layout>
        <AttendanceStatusWrapper>
          <StatusPaper>
            <SelectWrapper>
              <IconButton>
                <ArrowLeftIcon fontSize="large" />
              </IconButton>
              <DateWrapper>2024.05.15</DateWrapper>
              <IconButton>
                <ArrowRightIcon fontSize="large" />
              </IconButton>
            </SelectWrapper>
            <RenderingArea>
              <BoxWrapper>
                <StyledBox>
                  <Typography fontSize={12}>신중석셀</Typography>
                </StyledBox>
                <MemberBox>
                  <StyledTypography>신중석</StyledTypography>
                  <StyledTypography>유경상</StyledTypography>
                  {/* 다른 멤버들 */}
                </MemberBox>
                <StyledBox>
                  <Typography fontSize={12}>15</Typography>
                </StyledBox>
              </BoxWrapper>
            </RenderingArea>
            <CountWrapper>
              <MemberCountWrapper>
                <Typography textAlign="center" sx={{ paddingTop: 1, borderRight: 1, borderBottom: 1 }}>
                  신중석
                </Typography>
                <Typography textAlign="center" sx={{ paddingTop: 1, borderBottom: 1 }}>
                  108명
                </Typography>
                <Typography textAlign="center" sx={{ paddingTop: 1, borderRight: 1 }}>
                  기타
                </Typography>
                <Typography textAlign="center" sx={{ paddingTop: 1 }}>
                  12명
                </Typography>
              </MemberCountWrapper>
              <TotalCountWrapper>
                <Typography textAlign="center" sx={{ borderRight: 1, paddingTop: 3 }}>
                  총인원
                </Typography>
                <Typography textAlign="center" sx={{ paddingTop: 3 }}>
                  12명
                </Typography>
              </TotalCountWrapper>
            </CountWrapper>
            {/* 캡처 및 콘솔 출력 버튼 */}
            <Button variant="contained" color="primary" onClick={handleCapture}>
              캡처 및 콘솔 출력
            </Button>
          </StatusPaper>
        </AttendanceStatusWrapper>
      </Layout>
    </div>
  )
}

const CountWrapper = styled(Stack)`
  width: 90%;
  height: 75px;
  margin: 0 auto;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
  // gap: 10px;
`
const MemberCountWrapper = styled(Stack)`
  display: grid;
  grid-template-columns: 1fr 2fr;
  width: 50%;
  height: 90%;
  border: 1px solid #000000;
`
const TotalCountWrapper = styled(Stack)`
  display: grid;
  grid-template-columns: 2fr 3fr;
  width: 40%;
  height: 90%;
  border: 1px solid #000000;
`

const RenderingArea = styled(Stack)`
  width: 100%;
  height: 55%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0;
  }
`

const AttendanceStatusWrapper = styled(Stack)`
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

const DateWrapper = styled(Typography)`
  font-size: 20px;
`

const StatusPaper = styled(Stack)`
  width: 90%;
  height: 99%;
  background-color: #f0f0f0;
  margin: 0 auto;
  border-radius: 25px;
  border: 1px solid #000000;
`

const BoxWrapper = styled(Stack)`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  width: 95%;
  height: 75px;
  margin: 0 auto;
`
const StyledBox = styled(Stack)`
  justify-content: center;
  align-items: center;
  border: 1px solid #404040;
  background-color: #d9d9d9;
`
const MemberBox = styled(Stack)`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  padding: 5px;
  border-top: 1px solid #404040;
  border-bottom: 1px solid #404040;
`

const StyledTypography = styled(Typography)`
  width: 20%;
`

export default AttendanceStatus
