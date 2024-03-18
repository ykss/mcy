import { Stack } from "@mui/system";
import Typography from "@mui/material/Typography";
import { Chip, styled } from "@mui/material";
import Layout from "../components/Layout/Layout";
import CarouselSilder from "../components/shared/CarouselSilder";
import mainSlider1 from "../assets/images/mainSlider1.webp";
import mainSlider2 from "../assets/images/mainSlider2.webp";
import mainSlider3 from "../assets/images/mainSlider3.webp";

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
  ];

  return (
    <Layout>
      <MainWrapper>
        <CarouselWrapper>
          <CarouselSilder imageArray={McyImgs} />
        </CarouselWrapper>
        <ContentWrapper sx={{ height: "20%" }}>
          <Chip
            label="교육 표어"
            color="primary"
            sx={{
              fontFamily: "LINE SEED SANS KR",
              fontSize: "12px",
              fontWeight: "700",
              color: "#000",
            }}
          />
          <Typography variant="body1">
            예수그리스도의 영이 다시 살아나게 하소서
          </Typography>
          <Typography variant="overline">시 51:10, 출23:25, 슥4:6</Typography>
        </ContentWrapper>
        <ContentWrapper sx={{ height: "30%" }}>
          <Chip
            label="교육 목표"
            color="primary"
            sx={{
              fontFamily: "LINE SEED SANS KR",
              fontSize: "12px",
              fontWeight: "700",
              color: "#000",
            }}
          />
          <Typography variant="body1">
            1. 예배로 온전한 신앙을 회복하자.
          </Typography>
          <Typography variant="body1">
            2. 기도로 상한 마음을 회복하자.
          </Typography>
          <Typography variant="body1">
            3. 교제와 셀 모임을 통해 관계 회복하자.
          </Typography>
        </ContentWrapper>
      </MainWrapper>
    </Layout>
  );
};

const MainWrapper = styled(Stack)`
  width: 100vw;
  height: calc(100dvh - 120px);
  align-items: center;
`;

const CarouselWrapper = styled(Stack)`
  justify-content: center;
  align-items: center;
  height: 50%;
  width: 100%;
`;

const ContentWrapper = styled(Stack)`
  width: 80%;
  align-items: flex-start;
  justify-content: space-evenly;
`;

export default Main;
