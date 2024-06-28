import { useState, useEffect } from "react"
import Stack from "@mui/material/Stack"
import { IconButton, styled } from "@mui/material"
import Typography from "@mui/material/Typography"
import Chip from "@mui/material/Chip"
import Grid from "@mui/material/Grid"
import Pagination from "@mui/material/Pagination"

import { BirthdayPlusButton } from "../components/shared/PlusButton"
import Layout from "../components/Layout/Layout"
import { birthDayData } from "../data/BirthdayData"

const BirthDay = () => {
  const [monthChipId, setMonthChipId] = useState(0)
  const [birthDayInfo, setBirthDayInfo] = useState(birthDayData[0])
  const [page, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(6)
  // const itemsPerPage = 6

  const updateItemsPerPage = () => {
    const height = window.innerHeight
    if (height < 740) {
      setItemsPerPage(4)
    } else if (height >= 740 && height < 840) {
      setItemsPerPage(6)
    } else {
      setItemsPerPage(8)
    }
  }

  useEffect(() => {
    updateItemsPerPage()
    window.addEventListener("resize", updateItemsPerPage)

    return () => {
      window.removeEventListener("resize", updateItemsPerPage)
    }
  }, [])

  // Chip 컴포넌트 클릭
  const handleChipClick = targetId => {
    setMonthChipId(targetId)
    setPage(1)
  }
  // Chip 아이디 값이 변경될때마다 필터를 통해 해당 월의 데이터만 추출
  useEffect(() => {
    setBirthDayInfo(birthDayData.filter(chip => chip.id === monthChipId)[0])
  }, [monthChipId])

  // 페이지 변경
  const handlePageChange = (event, value) => {
    setPage(value)
  }

  /*Pagination 컴포넌트에서 onChange 핸들러는 event와 value 두 개의 매개변수를 필요로 하기 때문에   
  이벤트 핸들러가 정상적으로 작동하려면 이 두 인자를 받아야 합니다.*/

  const paginatedItems = birthDayInfo.list.slice((page - 1) * itemsPerPage, page * itemsPerPage)

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
          {birthDayData.map(data => (
            <ChipDataWrapper key={data.id} id={data.id} label={data.label} variant="outlined" onClick={() => handleChipClick(data.id)} />
          ))}
        </ChipWrapper>
        <RenderingPaper>
          <ListTitle>{birthDayInfo.label} 생일을 축하합니다!</ListTitle>
          <ListArea>
            <ListWrapper>
              {paginatedItems.map(item => (
                <List key={item.id}>
                  <Typography fontSize={14}>{item.day}</Typography>
                  <Typography fontSize={14}>{item.name}</Typography>
                </List>
              ))}
            </ListWrapper>
            <PaginationWrapper>
              <Pagination count={Math.ceil(birthDayInfo.list.length / itemsPerPage)} page={page} onChange={handlePageChange} />
            </PaginationWrapper>
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
  margin: 18px 10% 0;
`

const ListWrapper = styled(Grid)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  width: 100%;
`

const PaginationWrapper = styled(Stack)`
  position: absolute; /* 부모 요소에 절대적 위치를 설정 */
  bottom: 13px;
  width: 100%;
  align-items: center; /* 가운데 정렬 */
`

export default BirthDay
