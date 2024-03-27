//외부 컴포넌트
import { styled, Stack, Typography, Grid } from "@mui/material";
import CakeIcon from "@mui/icons-material/Cake";
import Chip from "@mui/material/Chip";
import React, { useEffect } from "react";

// 내부 컴포넌트
import Title from "../components/shared/Title";
import Layout from "../components/Layout/Layout";
import birthDayData from "../data/BirthdayList";

const BirthDay = () => {
  const [monthchipId, setMonthchipId] = React.useState(0);
  const [birthDayInfo, setBirthDayInfo] = React.useState(birthDayData[0]);
  const handleChipClick = (event) => {
    setMonthchipId(+event.target.parentElement.id);
  };

  useEffect(() => {
    setBirthDayInfo(birthDayData.filter((chip) => chip.id === monthchipId)[0]);
  }, [monthchipId]);

  return (
    <Layout>
      <BirthdayWrapper>
        <TitleWrapper>
          <CakeIcon sx={{ fontSize: 40 }} />
          <Title>생일!</Title>
        </TitleWrapper>
        <ChipWrapper>
          {birthDayData.map((data) => {
            return (
              <Chip
                key={data.id}
                id={data.id}
                sx={{
                  width: "14%",
                  height: "20%",
                  margin: "1%",
                  border: 2,
                  borderColor: "#986C6C",
                  fontSize: 10,
                }}
                label={data.label}
                variant="outlined"
                onClick={handleChipClick}
              />
            );
          })}
        </ChipWrapper>
        <BirthdayList>
          {/* 리스트 전체 레이아웃 영역 */}
          <RenderingPaper>
            {/* 제목 및 리스트 렌더링 영역 */}
            <ListTitle>{birthDayInfo.label} 생일자 축하합니다!</ListTitle>
            <ListArea>
              {/* 리스트만 렌더링 되는 영역 */}
              <ListWrapper>
                {/* 리스트 영역 */}
                {birthDayInfo.list.map((item) => (
                  <List key={item.id}>
                    <Typography fontSize={14} fontWeight={"bold"}>
                      {item.day}
                    </Typography>
                    <Typography fontSize={14} fontWeight={"bold"}>
                      {item.name}
                    </Typography>
                  </List>
                ))}
              </ListWrapper>
            </ListArea>
          </RenderingPaper>
        </BirthdayList>
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
  height: 60%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const ListTitle = styled(Stack)`
  font-weight: bold;
  font-size: 20px;
  height: 25%;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ListArea = styled(Stack)`
  height: 60%;
  width: 100%;
  flex-direction: row;
`;

const List = styled(Stack)`
  height: 100%;
  flex-direction: row;
  justify-content: center;
  gap: 20%;
`;
const RenderingPaper = styled(Stack)`
  background-color: #fffcf6;
  border: 2px solid #986c6c;
  height: 85%;
  width: 85%;
  border-radius: 5%;
`;

const ListWrapper = styled(Grid)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 30%;
  gap: 15px;
  width: 100%;
`;
export default BirthDay;
