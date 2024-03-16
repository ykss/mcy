import { Stack } from "@mui/system";
import { ThemeProvider } from "@mui/material/styles";
import { Chip, styled } from "@mui/material";
import Layout from "../components/Layout/Layout";
import CarouselSilder from "../components/shared/CarouselSilder";
import theme from "../components/shared/Theme";
import {
  Typography,
  Slogan,
  SubSlogan,
} from "../components/shared/TypographyStyle";

const Main = () => {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <MainWrapper>
          <CarouselWrapper>
            <CarouselSilder />
          </CarouselWrapper>
          <ContentWrapper sx={{ height: "20%" }}>
            <Chip
              label="교육 표어"
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.text.primary,
                border: theme.palette.chip.border,
                fontSize: theme.palette.typography.fontSize,
                fontWeight: theme.palette.typography.fontWeight,
              }}
            />
            <Typography {...Slogan}>
              예수그리스도의 영이 다시 살아나게 하소서
            </Typography>
            <Typography {...SubSlogan}>시 51:10, 출23:25, 슥4:6</Typography>
          </ContentWrapper>
          <ContentWrapper sx={{ height: "30%" }}>
            <Chip
              label="교육 목표"
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.text.primary,
                border: theme.palette.chip.border,
                fontSize: theme.palette.typography.fontSize,
                fontWeight: theme.palette.typography.fontWeight,
              }}
            />
            <Typography {...Slogan}>
              1. 예배로 온전한 신앙을 회복하자.
            </Typography>
            <Typography {...Slogan}>2. 기도로 상한 마음을 회복하자.</Typography>
            <Typography {...Slogan}>
              3. 교제와 셀 모임을 통해 관계 회복하자.
            </Typography>
          </ContentWrapper>
        </MainWrapper>
      </Layout>
    </ThemeProvider>
  );
};

const MainWrapper = styled(Stack)`
  width: 100vw;
  height: calc(90dvh - 120px);
  align-items: center;
`;

const CarouselWrapper = styled(Stack)`
  justify-content: center;
  align-items: center;
  height: 50%;
  width: 100%;
`;
// 감싸는 것은 Wrapper Stack
const ContentWrapper = styled(Stack)`
  width: 80%;
  align-items: flex-start;
  justify-content: space-evenly;
`;

export default Main;
