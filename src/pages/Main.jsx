import Stack from "@mui/material/Stack"
import { styled } from "@mui/material"
import Typography from "@mui/material/Typography"

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
        <McyContentWrapper>
          <SquarePurpleWrapper />
          <TitleContentWrapper>
            <TitleWrapper>목천교회 청년부</TitleWrapper>
          </TitleContentWrapper>
        </McyContentWrapper>
        <EduGoalSloganWrapper>
          <EducationSloganContentWrapper>
            <EducationSloganWrapper>예수그리스도의 영이 다시 살아나게 하소서</EducationSloganWrapper>
            <EducationSloganWrapper>시 51:10, 출 23:25, 슥 4:6</EducationSloganWrapper>
          </EducationSloganContentWrapper>
        </EduGoalSloganWrapper>
        <GoalAreaWrapper>
          <GoalContentWrapper>
            <GoalsWrapper>1.예배로 온전한 신앙을 회복하자</GoalsWrapper>
            <GoalsWrapper>2.기도로 상한 마음을 회복하자</GoalsWrapper>
            <GoalsWrapper>3.교제와 셀 모임을 통해 관계 회복하자.</GoalsWrapper>
          </GoalContentWrapper>
          <SquareGreenWrapper />
        </GoalAreaWrapper>
      </MainWrapper>
    </Layout>
  )
}

const MainWrapper = styled(Stack)`
  align-items: center;
  gap: 10px;
  width: 100vw;
  height: calc(100dvh - 160px);
`

const CarouselWrapper = styled(Stack)`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 45%;
`

const McyContentWrapper = styled(Stack)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 13%;
  gap: 10px;
`

const SquarePurpleWrapper = styled(Stack)`
  width: 20%;
  height: 90%;
  background-color: #c7bdeb;
  border: 1px solid black;
  border-radius: 18px;
`

const TitleContentWrapper = styled(Stack)`
  width: 80%;
  height: 90%;
  background-color: #f0f0f0;
  border: 1px solid black;
  border-radius: 17px;
  justify-content: center;
`

const TitleWrapper = styled(Typography)`
  font-family: "Noto Sans";
  font-size: 20px;
  font-weight: 600;
  margin-left: 20px;
`

const EduGoalSloganWrapper = styled(Stack)`
  justify-content: space-evenly;
  align-items: center;
  width: 90%;
  height: 20%;
`

const EducationSloganContentWrapper = styled(Stack)`
  width: 100%;
  height: 90%;
  justify-content: center;
  background-color: #f8e6ba;
  border: 1px solid black;
  border-radius: 25px;
`

const EducationSloganWrapper = styled(Typography)`
  font-family: "Noto Sans";
  font-weight: 700;
  font-size: 14px;
  margin-left: 20px;
`

const GoalAreaWrapper = styled(Stack)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 20%;
  gap: 15px;
`

const GoalContentWrapper = styled(Stack)`
  width: 75%;
  height: 90%;
  background-color: #f3c5c5;
  border: 1px solid black;
  border-radius: 25px;
  justify-content: center;
`

const GoalsWrapper = styled(Typography)`
  font-family: "Noto Sans";
  font-weight: 700;
  font-size: 12px;
  margin-left: 20px;
`

const SquareGreenWrapper = styled(Stack)`
  width: 25%;
  height: 90%;
  background-color: #b4dfc3;
  border: 1px solid black;
  border-radius: 25px;
`

export default Main
