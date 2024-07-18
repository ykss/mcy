import Layout from "../components/Layout/Layout"
import loginLogo from "../assets/images/loginLogo.webp"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import { styled } from "@mui/material"
import Typography from "@mui/material/Typography"
import { useNavigate } from "react-router-dom"

const UserSelect = () => {
  const navigate = useNavigate()

  const handleNavigate = destination => {
    navigate(`/${destination}`)
  }

  return (
    <Layout>
      <LoginWrapper>
        <LoginBodyWrapper>
          <LogoImgWrapper src={loginLogo} />
          <SelectWrapper>
            <ButtonWrapper>
              <SelectButton onClick={() => handleNavigate("main")}>
                <SelectText>리더</SelectText>
              </SelectButton>
              <SelectButton onClick={() => handleNavigate("login")}>
                <SelectText>회장</SelectText>
              </SelectButton>
            </ButtonWrapper>
            <SelectInfoText>로그인 계정을 선택해주세요 </SelectInfoText>
          </SelectWrapper>
        </LoginBodyWrapper>
      </LoginWrapper>
    </Layout>
  )
}

export default UserSelect

const LoginWrapper = styled(Stack)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`

const LoginBodyWrapper = styled(Stack)`
  width: 80%;
  height: 90%;
  justify-content: center;
  gap: 50px;
`

const LogoImgWrapper = styled(`img`)`
  width: 45%;
  height: 25%;
  margin: 0px auto;
`

const SelectWrapper = styled(Stack)`
  width: 90%;
  height: 30%;
  flex-direction: column;
  margin: 0px auto;
  align-items: center;
  gap: 16px;
`

const ButtonWrapper = styled(Stack)`
  width: 90%;
  height: 100%;
  margin: 0px auto;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`

const SelectButton = styled(Button)`
  width: 50%;
  height: 90%;
  background-color: #f0f0f0;
  border: 1px solid #000;
  border-radius: 17px;
  margin: 0px auto;
  :hover {
    background-color: #f0f0f0;
    border: 1px solid #000;
    border-radius: 17px;
  }
`

const SelectText = styled(Typography)`
  font-size: 24px;
  font-weight: 600;
  font-family: "Noto Sans";
  color: #404040;
`

const SelectInfoText = styled(Typography)`
  font-size: 16px;
  font-weight: 600;
  font-family: "Noto Sans";
  color: #7c7c7c;
`
