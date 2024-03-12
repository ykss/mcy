import { Stack } from "@mui/system";
import { styled } from "@mui/material";
import Typography from "@mui/material/Typography";
import Layout from "../components/Layout/Layout";
import CarouselSilder from "../components/component/CarouselSilder";

const Main = () => {
  return (
    <Layout>
      <Stack>
        <Stack>
          <CarouselSilder />
        </Stack>
        <ContentWrapper>
          <TitleOne>교육 표어</TitleOne>
          <Stack>
            <SemiContent>예수그리스도의 영이 다시 살아나게 하소서</SemiContent>
            <SemiSubContent>시 51:10, 출23:25, 슥4:6</SemiSubContent>
          </Stack>
          <TitleTwo>교육 목표</TitleTwo>
          <Stack>
            <SemiContent>1. 예배로 온전한 신앙을 회복하자</SemiContent>
            <SemiContent>2. 기도로 상한 마음을 회복하자</SemiContent>
            <SemiContent>3. 교제와 셀 모임을 통해 관계 회복하자.</SemiContent>
          </Stack>
        </ContentWrapper>
      </Stack>
    </Layout>
  );
};

const ContentWrapper = styled(Stack)`
  display: flex;
  flex-direction: column;
  margin-top: 19px;
`;

const TitleOne = styled(Typography)`
  width: 87px;
  height: 30px;
  background: #fffaec;
  border: 1px solid #000;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 900;
  font-family: LINE SEED SANS KR;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 9px;
`;

const TitleTwo = styled(Typography)`
  width: 87px;
  height: 30px;
  background: #fffaec;
  border: 1px solid #000;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 900;
  font-family: LINE SEED SANS KR;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 9px;
  margin-top: 26px;
`;

const SemiContent = styled(Stack)`
  font-family: Inter;
  font-size: 11px;
  font-weight: 700;
`;
const SemiSubContent = styled(Stack)`
  font-family: Inter;
  font-size: 8px;
  font-weight: 700;
`;
export default Main;
