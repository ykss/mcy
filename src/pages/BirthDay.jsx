//외부 컴포넌트 
import { styled, Stack, Typography, Grid } from "@mui/material";
import CakeIcon from "@mui/icons-material/Cake";
import Chip from "@mui/material/Chip";
import React, { useEffect } from "react";

// 내부 컴포넌트 
import Title from "../components/shared/Title";
import Layout from "../components/Layout/Layout";

const chipData = [
  {
    id: 0,
    label: "1월",
    list: [
      {
        day: "04일",
        name: "권  율",
      },
      {
        day: "11일",
        name: "박동진",
      },
      {
        day: "14일",
        name: "신이서",
      },
      {
        day: "15일",
        name: "최세현",
      },
      {
        day: "16일",
        name: "이유진",
      },
      {
        day: "17일",
        name: "류지연",
      },
      {
        day: "22일",
        name: "김아영",
      },
      {
        day: "27일",
        name: "박기열",
      },
      {
        day: "28일",
        name: "정영운",
      },
    ],
  },
  {
    id: 1,
    label: "2월",
    list: [
      {
        day: "03일",
        name: "이화승",
      },
      {
        day: "07일",
        name: "한지선",
      },
      {
        day: "12일",
        name: "한명수",
      },
      {
        day: "22일",
        name: "전혜현",
      },
    ],
  },
  {
    id: 2,
    label: "3월",
    list: [
      {
        day: "04일",
        name: "김예찬",
      },
      {
        day: "06일",
        name: "이예진",
      },
      {
        day: "09일",
        name: "황주연",
      },
      {
        day: "22일",
        name: "류지애",
      },
    ],
  },
  {
    id: 3,
    label: "4월",
    list: [
      {
        day: "03일",
        name: "박준배",
      },
      {
        day: "04일",
        name: "서도원",
      },
      {
        day: "05일",
        name: "진서윤",
      },
      {
        day: "06일",
        name: "박천진",
      },
      {
        day: "10일",
        name: "최지혜",
      },
      {
        day: "20일",
        name: "신이슬",
      },
      {
        day: "25일",
        name: "김성용",
      },
      {
        day: "26일",
        name: "이유미",
      },
      {
        day: "28일",
        name: "유경상",
      },
    ],
  },
  {
    id: 4,
    label: "5월",
    list: [
      {
        day: "03일",
        name: "이채영",
      },
      {
        day: "03일",
        name: "전한나",
      },
      {
        day: "06일",
        name: "최정완",
      },
      {
        day: "08일",
        name: "이경원",
      },
      {
        day: "10일",
        name: "이선화",
      },

      {
        day: "16일",
        name: "정 현",
      },
      {
        day: "16일",
        name: "정 빈",
      },
      {
        day: "23일",
        name: "오예솔",
      },
      {
        day: "27일",
        name: "황윤표",
      },
      {
        day: "29일",
        name: "박찬주",
      },
    ],
  },
  {
    id: 5,
    label: "6월",
    list: [
      {
        day: "02일",
        name: "최현빈",
      },
      {
        day: "23일",
        name: "박유리",
      },
      {
        day: "29일",
        name: "하유진",
      },
      {
        day: "30일",
        name: "국다혜",
      },
    ],
  },
  {
    id: 6,
    label: "7월",
    list: [
      {
        day: "02일",
        name: "유지원",
      },
      {
        day: "03일",
        name: "선승훈",
      },
      {
        day: "06일",
        name: "윤태호",
      },
      {
        day: "07일",
        name: "윤동하",
      },
      {
        day: "10일",
        name: "이재연",
      },
      {
        day: "20일",
        name: "신중석",
      },
      {
        day: "21일",
        name: "박한빈",
      },
      {
        day: "28일",
        name: "윤지원",
      },
    ],
  },
  {
    id: 7,
    label: "8월",
    list: [
      {
        day: "03일",
        name: "윤소영",
      },
      {
        day: "12일",
        name: "정지민",
      },
      {
        day: "13일",
        name: "김승찬",
      },
      {
        day: "16일",
        name: "백승도",
      },
      {
        day: "21일",
        name: "전대현",
      },
      {
        day: "27일",
        name: "김민준",
      },
      {
        day: "28일",
        name: "차미진",
      },
    ],
  },
  {
    id: 8,
    label: "9월",
    list: [
      {
        day: "04일",
        name: "김태균",
      },
      {
        day: "04일",
        name: "신중범",
      },
      {
        day: "18일",
        name: "김다은",
      },
      {
        day: "21일",
        name: "김예빈",
      },
      {
        day: "25일",
        name: "윤동주",
      },
      {
        day: "28일",
        name: "마관영",
      },
    ],
  },
  {
    id: 9,
    label: "10월",
    list: [
      {
        day: "04일",
        name: "정구연",
      },
      {
        day: "17일",
        name: "최대한",
      },
      {
        day: "22일",
        name: "김옥주",
      },
      {
        day: "26일",
        name: "황수정",
      },
      {
        day: "31일",
        name: "김윤주",
      },
    ],
  },
  {
    id: 10,
    label: "11월",
    list: [
      {
        day: "07일",
        name: "정지혁",
      },
      {
        day: "11일",
        name: "서다현",
      },
      {
        day: "13일",
        name: "황명표",
      },
      {
        day: "20일",
        name: "김태경",
      },
      {
        day: "21일",
        name: "이규영",
      },
      {
        day: "22일",
        name: "정한슬",
      },
    ],
  },
  {
    id: 11,
    label: "12월",
    list: [
      {
        day: "13일",
        name: "구민경",
      },
      {
        day: "22일",
        name: "김예슬",
      },
    ],
  },
];

const BirthDay = () => {
  const [showListId, setShowListId] = React.useState(0);
  const [showList, setShowList] = React.useState(chipData);

  const handleChipClick = (event) => {
    setShowListId(+event.target.parentElement.id);
  };

  useEffect(() => {
    setShowList(chipData.filter((chip) => chip.id === showListId));
  }, [showListId]);

  return (
    <Layout>
      <BirthdayWrapper>
        <TitleWrapper>
          <CakeIcon sx={{ fontSize: 40 }} />
          <Title>생일!</Title>
        </TitleWrapper>
        <ChipWrapper>
          {chipData.map((data) => {
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
            <ListTitle>{showList[0].label} 생일자 축하합니다!</ListTitle>
            <ListArea>
              {/* 리스트만 렌더링 되는 영역 */}
              <ListWrapper>
                {/* 리스트 영역 */}
                {showList[0].list.map((item) => (
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
