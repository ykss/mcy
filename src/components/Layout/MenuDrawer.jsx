import Stack from "@mui/material/Stack"
import { styled } from "@mui/material"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import Button from "@mui/material/Button"
import ListItemText from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ClearIcon from "@mui/icons-material/Clear"
import { useEffect, useState } from "react"

const MenuDrawer = ({ open, setOpen, navigate }) => {
  const [admin, setAdmin] = useState(false) // 초기 값 설정
  useEffect(() => {
    setAdmin(localStorage.getItem("admin") === "true")
  }, [])

  const toggleDrawer = () => {
    setOpen(false)
  }

  const handleNavigate = destination => {
    navigate(`/${destination}`)
  }

  const DrawerList = (
    <BoxWrapper rol="presentation">
      <DrawerTop>
        <ExitIcon onClick={toggleDrawer} />
      </DrawerTop>
      <ListAreaWrapper>
        <ListButton onClick={() => handleNavigate("news")}>
          <MenuListWrapper>
            <SquareWrapper>
              <SquarePurpleWrapper />
            </SquareWrapper>
            <ListWrapper>
              <ListText>소식</ListText>
            </ListWrapper>
          </MenuListWrapper>
        </ListButton>
        <ListButton onClick={() => handleNavigate("attendance")}>
          <MenuListWrapper>
            <SquareWrapper>
              <SquareGreenWrapper />
            </SquareWrapper>
            <ListWrapper>
              <ListText>출석</ListText>
            </ListWrapper>
          </MenuListWrapper>
        </ListButton>
        <ListButton onClick={() => handleNavigate("birthday")}>
          <MenuListWrapper>
            <SquareWrapper>
              <SquarePinkWrapper />
            </SquareWrapper>
            <ListWrapper>
              <ListText>생일</ListText>
            </ListWrapper>
          </MenuListWrapper>
        </ListButton>
      </ListAreaWrapper>
      <ButtonWrapper>
        <LogoutButton
          onClick={() => {
            handleNavigate("")
            setOpen(false)
          }}>
          {admin ? "로그아웃" : "로그인"}
        </LogoutButton>
      </ButtonWrapper>
    </BoxWrapper>
  )

  return (
    <>
      <DrawerWrapper open={open} onClose={toggleDrawer} anchor="right">
        {DrawerList}
      </DrawerWrapper>
    </>
  )
}

const BoxWrapper = styled(Box)`
  height: 100%;
  background-color: #fffcf6;
`

const DrawerTop = styled(Stack)`
  flex-direction: row;
  justify-content: flex-end;
  gap: 12px;
  height: 8%;
`

const ExitIcon = styled(ClearIcon)`
  margin: auto 10px;
  font-size: 15px;
`

const ListAreaWrapper = styled(List)`
  width: 100%;
  margin-top: 45px;
`

const ListButton = styled(ListItemButton)`
  margin-left: 10px;
`

const MenuListWrapper = styled(Stack)`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`

const SquareWrapper = styled(Stack)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
`

const SquarePurpleWrapper = styled(Stack)`
  width: 90%;
  height: 45%;
  background-color: #c7bdeb;
  border: 1px solid black;
  border-radius: 22px;
`

const SquareGreenWrapper = styled(Stack)`
  width: 90%;
  height: 45%;
  background-color: #b4dfc3;
  border: 1px solid black;
  border-radius: 22px;
`

const SquarePinkWrapper = styled(Stack)`
  width: 90%;
  height: 45%;
  background-color: #f3c5c5;
  border: 1px solid black;
  border-radius: 22px;
`

const ListWrapper = styled(Stack)`
  width: 70%;
`

const ListText = styled(ListItemText)`
  width: 75%;
  margin: 5px;
  font-family: "Noto Sans";
  font-weight: 600;
  font-size: 24px;
`

const DrawerWrapper = styled(Drawer)`
  .MuiDrawer-paper {
    width: 80%;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }
`

const ButtonWrapper = styled(Stack)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 8px;
  margin-right: 23px;
  margin-top: 160px;
`

const LogoutButton = styled(Button)`
  font-family: "Noto Sans";
  font-weight: 600;
  font-size: 16px;
  color: #000;
`

export default MenuDrawer
