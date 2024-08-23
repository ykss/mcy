import Stack from "@mui/material/Stack"
import { styled } from "@mui/material"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import Button from "@mui/material/Button"
import ListItemText from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ClearIcon from "@mui/icons-material/Clear"
import { useEffect, useState } from "react"
// import { useState } from "react"

const MenuDrawer = ({ open, setOpen, navigate }) => {
  const [userInfo, setUserInfo] = useState([])
  useEffect(() => {
    const localData = localStorage.getItem("userInfo")
    if (localData) {
      setUserInfo(JSON.parse(localData))
    }
    console.log(userInfo)
  }, [])
  const toggleDrawer = () => {
    console.log(userInfo)
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
      <UserAreaWrapper onClick={() => handleNavigate("mypage")}>
        <UserProfileWrapper>
          <ProfileImage component="img" src={userInfo.picture} />
        </UserProfileWrapper>
        <UserInfoWrapper>
          <UserWrapper>{userInfo.name}</UserWrapper>
          <IdWrapper>{userInfo.email}</IdWrapper>
        </UserInfoWrapper>
      </UserAreaWrapper>
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
        {/* <LoginButton onClick={() => handleNavigate("login")}>로그인</LoginButton> */}
        <LogoutButton
          onClick={() => {
            handleNavigate("")
            setOpen(false)
          }}>
          로그아웃
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

const UserAreaWrapper = styled(Stack)`
  display: flex;
  flex-direction: row;
  gap: 17px;
  margin-left: 32px;
`

const UserProfileWrapper = styled(Stack)`
  width: 71px;
  height: 71px;
  border: 1px solid black;
  border-radius: 25px;
  overflow: hidden; // 이 부분을 추가하면 자식 요소가 부모의 border-radius를 따름.
`
const ProfileImage = styled(Box)`
  width: 100%;
  height: 100%;
`

const UserInfoWrapper = styled(Stack)`
  justify-content: center;
`

const UserWrapper = styled(Typography)`
  font-family: "noto Sans";
  font-size: 16px;
  font-weight: 600;
`

const IdWrapper = styled(Typography)`
  font-family: "noto Sans";
  font-size: 14px;
  font-weight: 600;
  color: #7c7c7c;
`

const ListAreaWrapper = styled(List)`
  width: 100%;
  margin-top: 63px;
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
