import Stack from "@mui/material/Stack"
import { styled } from "@mui/material"
import Typography from "@mui/material/Typography"

const Footer = () => {
  return (
    <>
      <FooterWrapper>
        <FooterTitleWrapper>MCY</FooterTitleWrapper>
        <CopyRightWrapper>Copyright 2024. MCY all rights reserved.</CopyRightWrapper>
      </FooterWrapper>
    </>
  )
}

const FooterWrapper = styled(Stack)`
  position: fixed;
  bottom: 0;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 70px;
  background-color: #f4f1e9;
`

const FooterTitleWrapper = styled(Typography)`
  font-size: 12px;
`

const CopyRightWrapper = styled(Typography)`
  font-size: 12px;
`

export default Footer
