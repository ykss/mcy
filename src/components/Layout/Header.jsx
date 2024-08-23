import { useNavigate } from "react-router-dom"

import Stack from "@mui/material/Stack"
import { styled } from "@mui/material"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"

const Header = ({ setIsDrawerOpen }) => {
  const Navigate = useNavigate()

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true)
  }

  const handleGoMain = () => {
    Navigate("/main")
  }

  return (
    <>
      <HeaderWrapper>
        <LogoWrapper>
          <TitleWrapper variant="h6" onClick={handleGoMain}>
            MCY
          </TitleWrapper>
          <MenuIconWrapper>
            <IconButton onClick={handleDrawerOpen}>
              <MenuIcons />
            </IconButton>
          </MenuIconWrapper>
        </LogoWrapper>
      </HeaderWrapper>
    </>
  )
}
const HeaderWrapper = styled(Stack)`
  flex-direction: row;
  align-items: center;
  width: 100vw;
  height: 80px;
  background-color: #fffcf6;
`
const LogoWrapper = styled(Stack)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 60%;
  border-top: 1px solid #7c7c7c;
  border-bottom: 1px solid #7c7c7c;
`

const TitleWrapper = styled(Typography)`
  width: 15%;
  text-align: center;
  font-size: 20px;
  border: 1px solid #000000;
  border-radius: 15px;
`

const MenuIconWrapper = styled(Stack)`
  position: absolute;
  top: 20px;
  right: 1%;
`

const MenuIcons = styled(MenuIcon)`
  color: #000;
`

export default Header
