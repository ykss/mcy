import { styled, Stack, Typography } from "@mui/material";
import CakeIcon from "@mui/icons-material/Cake";
import Chip from "@mui/material-next/Chip";


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
          <ChipsArray />
        </MonthChip>
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
const MonthChip = styled(Stack)`
  height: 90%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
  width: "calc(100%/7)",
  height: "60%",
}));

const ChipWrapper = styled(Stack)`
  height: 10%;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  list-style: none;
`;

const ChipsArray = () => {
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

  return (
    <>
      <ChipWrapper>
        {chipData.map((data) => {
          return (
            <ListItem key={data.key}>
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
            </ListItem>
          );
        })}
      </ChipWrapper>
      <BirthdayList></BirthdayList>
    </>
  );
};

// 생일 명단
const BirthdayList = styled(Stack)`
  height: 80%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
export default BirthDay;
