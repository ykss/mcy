import { styled, Stack, Typography, Chip } from "@mui/material";
import CakeIcon from "@mui/icons-material/Cake";

import Layout from "../components/Layout/Layout";

const BirthDay = () => {
  return (
    <Layout>
      <BirthdayWrapper>
        <TitleWrapper>
          <CakeIcon sx={{ fontSize: 40 }} />
          <Typography fontSize="20px">생일!</Typography>
        </TitleWrapper>
        <ChipWrapper>
          {chipData.map((data) => {
            return (
              <ChipItem key={data.key}>
                <Chip
                  sx={{
                    width: "100%",
                    height: "80%",
                    px: 0,
                    border: 2,
                    borderColor: "#986C6C",
                    fontSize: 9,
                  }}
                  label={data.label}
                  variant="outlined"
                />
              </ChipItem>
            );
          })}
        </ChipWrapper>
        <BirthdayList></BirthdayList>
      </BirthdayWrapper>
    </Layout>
  );
};

// 제목 및 아이콘
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

// MonthChip
const chipData = [
  {
    key: 0,
    label: "1월",
  },
  {
    key: 1,
    label: "2월",
  },
  {
    key: 2,
    label: "3월",
  },
  {
    key: 3,
    label: "4월",
  },
  {
    key: 4,
    label: "5월",
  },
  {
    key: 5,
    label: "6월",
  },
  {
    key: 6,
    label: "7월",
  },
  {
    key: 7,
    label: "8월",
  },
  {
    key: 8,
    label: "9월",
  },
  {
    key: 9,
    label: "10월",
  },
  {
    key: 10,
    label: "11월",
  },
  {
    key: 11,
    label: "12월",
  },
];

const ChipItem = styled(Stack)`
  width: calc(100%/7);
  height: 25%;
  margin: 1%;
`;

const ChipWrapper = styled(Stack)`
  height: 20%;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  list-style: none;
`;

// 생일 명단
const BirthdayList = styled(Stack)`
  height: 50%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
export default BirthDay;
