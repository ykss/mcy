import { useState, useEffect } from "react"
import Stack from "@mui/material/Stack"
import { IconButton, styled } from "@mui/material"
import Typography from "@mui/material/Typography"
import Chip from "@mui/material/Chip"
import Grid from "@mui/material/Grid"
import Pagination from "@mui/material/Pagination"

import { BirthdayPlusButton } from "../components/shared/PlusButton"
import Layout from "../components/Layout/Layout"
import { McyBirthdayApi } from "../api/mcyBirthdayApi"

const BirthDay = () => {
  const [birthDayData, setBirthDayData] = useState([]) // 파이어베이스 저장된 전체 생일 데이터
  const [selectedData, setSelectedData] = useState([]) // 선택된 해당 월 생일 데이터
  const [page, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(0)
  const [monthChipId, setMonthChipId] = useState(0)
  const windowHeight = window.innerHeight

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
    updateItemsPerPage()
  }, [])

  // 미디어 크기에 따른 리스트 렌더링 수
  const updateItemsPerPage = () => {
    if (windowHeight < 740) {
      setItemsPerPage(4)
    } else if (windowHeight >= 740 && windowHeight < 845) {
      setItemsPerPage(6)
    } else {
      setItemsPerPage(8)
    }
  }
  // Chip 컴포넌트 클릭
  const handleChipClick = targetId => {
    setMonthChipId(targetId)
    setPage(1)
  }

  // Chip 아이디 값이 변경될때마다 필터를 통해 해당 월의 데이터만 추출
  useEffect(() => {
    const filteredData = birthDayData.filter(item => +item.month === monthChipId).sort((a, b) => Number(a.day) - Number(b.day))
    setSelectedData(filteredData)
  }, [monthChipId])

  /*Pagination 컴포넌트에서 onChange 핸들러는 event와 value 두 개의 매개변수를 필요로 하기 때문에   
  이벤트 핸들러가 정상적으로 작동하려면 이 두 인자를 받아야 합니다.*/
  const handlePageChange = (event, value) => {
    setPage(value)
  }

  /* 해당 페이지에 렌더링할 생일자 리스트 개수
  1.  ex) 현재 페이지 = 1일때 index 0번부터 itemsPerPage -1 번까지 
          현재 페이지 = 2일때 index itemsPerPage부터 2*itemsPerPage-1 까지

  2. useEffect 없이도 동작하는 이유 => React의 렌더링 방식
    React는 상태(state)나 프롭스(props)가 변경될 때마다 컴포넌트를 다시 렌더링합니다. 
    따라서 paginatedItems는 컴포넌트가 렌더링될 때마다 최신 상태(state)와 프롭스(props)를 기준으로 재계산됩니다.
  */
  const paginatedItems = selectedData.slice((page - 1) * itemsPerPage, page * itemsPerPage)

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
              {paginatedItems.map(item => (
                <List key={item.id}>
                  <Typography fontSize={14}>{item.day}일</Typography>
                  <Typography fontSize={14}>{item.name}</Typography>
                </List>
              ))}
            </ListWrapper>
            <PaginationWrapper>
              <PaginationWrapper>
                <Pagination count={monthChipId === 0 ? null : Math.ceil(selectedData.length / itemsPerPage)} page={page} onChange={handlePageChange} />
              </PaginationWrapper>
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
