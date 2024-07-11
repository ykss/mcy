import { useState, useEffect } from "react"
import Stack from "@mui/material/Stack"
import { IconButton, styled } from "@mui/material"
import Typography from "@mui/material/Typography"
import Chip from "@mui/material/Chip"
import Grid from "@mui/material/Grid"
import dayjs from "dayjs"
import "dayjs/locale/ko"
dayjs.locale("ko")

import { BirthdayPlusButton } from "../components/shared/PlusButton"
import Layout from "../components/Layout/Layout"
import { McyBirthdayApi } from "../api/mcyBirthdayApi"

const BirthDay = () => {
  const [monthChipId, setMonthChipId] = useState(dayjs().month() + 1)
  const [birthDayData, setBirthDayData] = useState([]) // 파이어베이스 저장된 전체 생일 데이터
  const [selectedData, setSelectedData] = useState([]) // 선택된 해당 월 생일 데이터

  const fetchData = async () => {
    try {
      const data = await McyBirthdayApi()
      setBirthDayData(data)
    } catch (error) {
      console.error("Error fetching data: ", error)
    }
  }

  // 첫 렌더링시 파이어베이스에서 데이터 가져오기
  useEffect(() => {
    fetchData()
  }, [])

  // Chip 컴포넌트 클릭
  const handleChipClick = targetId => {
    setMonthChipId(targetId)
  }

  // Chip 아이디 값이 변경될때마다 필터를 통해 해당 월의 데이터만 추출
  useEffect(() => {

    const filteredData = birthDayData.filter(item => Number(dayjs(item.date).format("M")) === monthChipId).sort((a, b) => Number(dayjs(a.date).format("DD")) - Number(dayjs(b.date).format("DD")))

    setSelectedData(filteredData)
  }, [monthChipId, birthDayData])

  return (
    <Layout>
      <BirthdayWrapper>
        <SelectWrapper>
          <Typography fontSize={20}>월 선택</Typography>
          <IconButton>
            <BirthdayPlusButton />
          </IconButton>
        </SelectWrapper>
        <ChipWrapper>
          {Array.from(
            { length: 12 },
            (
              _,
              i, // 길이가 12인 배열을 생성후 배열의 각 인덱스 값으로 맵핑 합니다.
            ) => (
              <ChipDataWrapper key={i + 1} label={`${i + 1}월`} variant="outlined" onClick={() => handleChipClick(i + 1)} />
            ),
          )}
        </ChipWrapper>
        <RenderingPaper>
          <ListTitle>{monthChipId === 0 ? null : monthChipId}월 생일을 축하합니다!</ListTitle>
          <ListArea>
            <ListWrapper>
              {selectedData.map(item => (

                <List key={item.name}>
                  <Typography fontSize={14}>{dayjs(item.date).format("DD")}일</Typography>

               
                  <Typography fontSize={14}>{item.name}</Typography>
                </List>
              ))}
            </ListWrapper>
          </ListArea>
        </RenderingPaper>
      </BirthdayWrapper>
    </Layout>
  )
}

// 제목 및 아이콘
const BirthdayWrapper = styled(Stack)`
  width: 100vw;
  height: calc(100dvh - 180px);
`

const SelectWrapper = styled(Stack)`
  width: 90%;
  height: 15%;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
  align-items: center;
`

// MonthChip
const ChipWrapper = styled(Stack)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  height: 20%;
  margin: 0 auto;
  list-style: none;
`

const ChipDataWrapper = styled(Chip)`
  width: 14%;
  height: 50px;
  margin: 2px;
  background-color: #f0f0f0;
  color: #7c7c7c; // 글자 색상 변경
  border: none;
  font-size: 10px;
`

// 생일 명단
const RenderingPaper = styled(Stack)`
  width: 85%;
  height: 60%;
  background-color: #f3c5c5;
  border: 1px solid #000000;
  border-radius: 5%;
  margin: 30px auto 0;
`

const ListTitle = styled(Stack)`
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 17%;
  font-weight: bold;
  font-size: 20px;
  margin-left: 15px;
`

const ListArea = styled(Stack)`
  background-color: #f0f0f0;
  height: 77%;
  width: 90%;
  margin: 0 auto;
  border: 1px solid #000000;
  border-radius: 10px;
  position: relative; /* 부모 요소에 상대적 위치를 설정 */
  overflow-y: auto;
`

const List = styled(Stack)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 35px;
  border: 1px solid #000000;
  border-radius: 4px;
  background-color: #ffffff;
  margin: 10px 10%;
`

const ListWrapper = styled(Grid)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  width: 100%;
`

export default BirthDay
