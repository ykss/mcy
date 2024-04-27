import { useState, useEffect } from "react"

import Stack from "@mui/material/Stack"
import { styled } from "@mui/material"
import Typography from "@mui/material/Typography"
import Chip from "@mui/material/Chip"
import Grid from "@mui/material/Grid"
import CakeIcon from "@mui/icons-material/Cake"

import Title from "../components/shared/Title"
import Layout from "../components/Layout/Layout"
import { birthDayData } from "../data/BirthdayData"

const BirthDay = () => {
  const [monthChipId, setMonthChipId] = useState(0)
  const [birthDayInfo, setBirthDayInfo] = useState(birthDayData[0])

  const handleChipClick = event => {
    setMonthChipId(+event.target.parentElement.id)
  }

  useEffect(() => {
    setBirthDayInfo(birthDayData.filter(chip => chip.id === monthChipId)[0])
  }, [monthChipId])

  return (
    <Layout>
      <BirthdayWrapper>
        <TitleWrapper>
          <CakeIconWrapper />
          <Title>생일!</Title>
        </TitleWrapper>
        <ChipWrapper>
          {birthDayData.map(data => {
            return <ChipDataWrapper key={data.id} id={data.id} label={data.label} variant="outlined" onClick={handleChipClick} />
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
                {birthDayInfo.list.map(item => (
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
  )
}

// 제목 및 아이콘
const BirthdayWrapper = styled(Stack)`
  width: 100vw;
  height: calc(100dvh - 120px);
`

const TitleWrapper = styled(Stack)`
  flex-direction: row;
  align-items: center;
  gap: 15px;
  height: 10%;
  padding: 0 10px;
`

const CakeIconWrapper = styled(CakeIcon)`
  font-size: 40px;
`

// MonthChip

const ChipWrapper = styled(Stack)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  height: 20%;
  list-style: none;
`

const ChipDataWrapper = styled(Chip)`
  width: 14%;
  height: 20%;
  margin: 1%;
  border: 2px solid #986c6c;
  font-size: 10px;
`

// 생일 명단
const BirthdayList = styled(Stack)`
  align-items: center;
  justify-content: center;
  height: 60%;
  width: 100%;
`

const ListTitle = styled(Stack)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 25%;
  font-weight: bold;
  font-size: 20px;
`

const ListArea = styled(Stack)`
  flex-direction: row;
  height: 60%;
  width: 100%;
`

const List = styled(Stack)`
  flex-direction: row;
  justify-content: center;
  gap: 20%;
  height: 100%;
`

const RenderingPaper = styled(Stack)`
  width: 85%;
  height: 85%;
  background-color: #fffcf6;
  border: 2px solid #986c6c;
  border-radius: 5%;
`

const ListWrapper = styled(Grid)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  width: 100%;
  height: 30%;
`

export default BirthDay
