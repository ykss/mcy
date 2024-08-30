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
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
  background-color: #fffcf6;
`

const FooterTitleWrapper = styled(Typography)`
  font-size: 12px;
`

const CopyRightWrapper = styled(Typography)`
  font-size: 12px;
`

export default Footer
