import CakeIcon from "@mui/icons-material/Cake";
import { styled, Stack, Typography } from "@mui/material";

import Layout from "../components/Layout/Layout";

const BirthDay = () => {
  return (
    <Layout>
      <BirthdayWrapper>
        <TitleWrapper>
          <CakeIcon sx={{ fontSize: 40 }} />
          <Typography fontSize="20px">생일!</Typography>
        </TitleWrapper>
        <MonthChip>
          <Typography>MonthChip</Typography>
        </MonthChip>
        <BirthdayList>
          <Typography>생일자 명단</Typography>
        </BirthdayList>
      </BirthdayWrapper>
    </Layout>
  );
};

const BirthdayWrapper = styled(Stack)`
  height: calc(100dvh - 120px);
  width: 100vw;
`;
const TitleWrapper = styled(Stack)`
  flex-direction: row;
  align-items: center;
  height: 10%;
  gap: 15px;
  padding: 0 10px;
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
