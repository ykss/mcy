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
          <TitleAreaWrapper>
            <SquarePurpleWrapper />
            <TitleContentWrapper>
              <TitleWrapper>목천교회 청년부</TitleWrapper>
            </TitleContentWrapper>
          </TitleAreaWrapper>
        </McyContentWrapper>
        <EduGoalSloganWrapper>
          <EducationSloganAreaWrapper>
            <EducationSloganContentWrapper>
              <EducationSloganWrapper>예수그리스도의 영이 다시 살아나게 하소서</EducationSloganWrapper>
              <EducationSloganWrapper>시 51:10, 출 23:25, 슥 4:6</EducationSloganWrapper>
            </EducationSloganContentWrapper>
          </EducationSloganAreaWrapper>
        </EduGoalSloganWrapper>
        <GoalAreaWrapper>
          <GoalContentAreaWrapper>
            <GoalContentWrapper>
              <GoalsWrapper>1.예배로 온전한 신앙을 회복하자</GoalsWrapper>
              <GoalsWrapper>2.기도로 상한 마음을 회복하자</GoalsWrapper>
              <GoalsWrapper>3.교제와 셀 모임을 통해 관계 회복하자.</GoalsWrapper>
            </GoalContentWrapper>
            <SquareGreenWrapper />
          </GoalContentAreaWrapper>
        </GoalAreaWrapper>
      </MainWrapper>
    </Layout>
  )
}

const MainWrapper = styled(Stack)`
  align-items: center;
  gap: 10px;
  width: 100vw;
`

const CarouselWrapper = styled(Stack)`
  justify-content: center;
  align-items: center;
  width: 100%;
`

const McyContentWrapper = styled(Stack)`
  align-items: center;
  width: 100%;
`

const TitleAreaWrapper = styled(Stack)`
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 90%;
`

const SquarePurpleWrapper = styled(Stack)`
  width: 20%;
  background-color: #c7bdeb;
  border: 1px solid black;
  border-radius: 18px;
`

const TitleContentWrapper = styled(Stack)`
  width: 80%;
  background-color: #f0f0f0;
  border: 1px solid black;
  border-radius: 17px;
`

const TitleWrapper = styled(Typography)`
  padding: 13px;
  font-family: "Noto Sans";
  font-size: 20px;
  font-weight: 600;
`

const EduGoalSloganWrapper = styled(Stack)`
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`

const EducationSloganAreaWrapper = styled(Stack)`
  width: 90%;
  background-color: #f8e6ba;
  border: 1px solid black;
  border-radius: 25px;
`

const EducationSloganContentWrapper = styled(Stack)`
  padding: 20px;
`

const EducationSloganWrapper = styled(Typography)`
  font-family: "Noto Sans";
  font-weight: 700;
  font-size: 14px;
`

const GoalAreaWrapper = styled(Stack)`
  align-items: center;
  width: 100%;
`

const GoalContentAreaWrapper = styled(Stack)`
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 90%;
`

const GoalContentWrapper = styled(Stack)`
  width: 75%;
  padding: 15px;
  background-color: #f3c5c5;
  border: 1px solid black;
  border-radius: 25px;
`

const GoalsWrapper = styled(Typography)`
  font-family: "Noto Sans";
  font-weight: 700;
  font-size: 12px;
`

const SquareGreenWrapper = styled(Stack)`
  width: 25%;
  background-color: #b4dfc3;
  border: 1px solid black;
  border-radius: 25px;
`

export default Main
