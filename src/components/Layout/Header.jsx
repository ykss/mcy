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
    Navigate("/")
  }

  return (
    <>
      <HeaderWrapper>
        <LogoWrapper>
          <TitleWrapper variant="h6" onClick={handleGoMain}>
            MCY
          </TitleWrapper>
        </LogoWrapper>
        <MenuIconWrapper>
          <IconButton onClick={handleDrawerOpen}>
            <MenuIcons />
          </IconButton>
        </MenuIconWrapper>
      </HeaderWrapper>
    </>
  )
}

const LogoWrapper = styled(Stack)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100vw;
`

const TitleWrapper = styled(Typography)`
  font-weight: bold;
`

const MenuIconWrapper = styled(Stack)`
  position: absolute;
  top: 5px;
  right: 1%;
`

const MenuIcons = styled(MenuIcon)`
  color: #000;
`

const HeaderWrapper = styled(Stack)`
  flex-direction: row;
  align-items: center;
  width: 100vw;
  height: 50px;
  background-color: #ffffff;
  border-bottom: 1px solid #feedcd;
`

export default Header
