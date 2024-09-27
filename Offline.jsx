import { styled, Typography, Stack } from "@mui/material"

import { McyIcon } from "./src/components/shared/McyIcon"
import Footer from "./src/components/Layout/Footer"

const Offline = () => {
  return (
    <>
      <OfflineWrapper>
        <IconWrapper>
          <McyIcon />
        </IconWrapper>
        <InfoText>연결이 좋지 않습니다 네트워크를 확인해주세요!</InfoText>
      </OfflineWrapper>
      <Footer />
    </>
  )
}

const OfflineWrapper = styled(Stack)`
  width: 100vw;
  height: calc(100dvh - 80px);
  background-color: #fffcf6;
  align-items: center;
  justify-content: center;
`
const IconWrapper = styled(Stack)`
  width: 100vw;
  height: 20%;
  align-items: center;
  justify-content: center;
`

const InfoText = styled(Typography)`
  font-size: 20px;
`

export default Offline
