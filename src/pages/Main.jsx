import Stack from "@mui/material/Stack"
import { styled } from "@mui/material"
import Typography from "@mui/material/Typography"
import Chip from "@mui/material/Chip"

import Layout from "../components/Layout/Layout"
import CarouselSlider from "../components/shared/CarouselSlider"
import mainSlider1 from "../assets/images/mainSlider1.webp"
import mainSlider2 from "../assets/images/mainSlider2.webp"
import mainSlider3 from "../assets/images/mainSlider3.webp"

const Main = () => {
  const McyImgs = [
    {
      img: mainSlider1,
    },
    {
      img: mainSlider2,
    },
    {
      img: mainSlider3,
    },
  ]

  return (
    <Layout>
      <MainWrapper>
        <CarouselWrapper>
          <CarouselSlider imageArray={McyImgs} />
        </CarouselWrapper>
        <ContentWrapper>
          <EducationSloganWrapper label="교육 표어" color="primary" />
          <Typography variant="body1">예수그리스도의 영이 다시 살아나게 하소서</Typography>
          <Typography variant="overline">시 51:10, 출23:25, 슥4:6</Typography>
        </ContentWrapper>
        <ContentWrapper>
          <EducationGoalsWrapper label="교육 목표" color="primary" />
          <Typography variant="body1">1. 예배로 온전한 신앙을 회복하자.</Typography>
          <Typography variant="body1">2. 기도로 상한 마음을 회복하자.</Typography>
          <Typography variant="body1">3. 교제와 셀 모임을 통해 관계 회복하자.</Typography>
        </ContentWrapper>
      </MainWrapper>
    </Layout>
  )
}

const EducationSloganWrapper = styled(Chip)`
  font-family: "LINE SEED SANS KR";
  font-size: 12px;
  font-weight: 700;
  color: #000;
`

const MainWrapper = styled(Stack)`
  align-items: center;
  width: 100vw;
  height: calc(100dvh - 120px);
`

const CarouselWrapper = styled(Stack)`
  justify-content: center;
  align-items: center;
  height: 50%;
  width: 100%;
`

const ContentWrapper = styled(Stack)`
  align-items: flex-start;
  justify-content: space-evenly;
  width: 80%;
  height: 30%;
`

const EducationGoalsWrapper = styled(Chip)`
  font-family: "LINE SEED SANS KR";
  font-size: 12px;
  font-weight: 700;
  color: #000;
`

export default Main
