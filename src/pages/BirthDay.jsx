import Layout from "../components/Layout/Layout";
import CakeIcon from "@mui/icons-material/Cake";
import { styled, Stack, Typography } from "@mui/material";

const BirthDay = () => {
  return (
    <Layout>
      <BirthdayComponentWrapper>
        <TitleWrapper>
          <Title>
            <CakeIcon sx={{ fontSize: 40 }} />
            <Typography fontSize="20px">생일!</Typography>
          </Title>
        </TitleWrapper>
        <MonthChip>
          <Typography>MonthChip</Typography>
        </MonthChip>
        <BirthdayList>
          <Typography>생일자 명단</Typography>
        </BirthdayList>
      </BirthdayComponentWrapper>
    </Layout>
  );
};

const BirthdayComponentWrapper = styled(Stack)`
  height: calc(100dvh - 120px);
  width:100vw;
`;
const TitleWrapper = styled(Stack)`
  flex-direction: row;
  align-items: center;
  height: 15%;
`;
const Title = styled(Stack)`
  width: 35%;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-evenly;
`;
const MonthChip = styled(Stack)`
  height: 15%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
const BirthdayList = styled(Stack)`
  height: 70%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
export default BirthDay;
