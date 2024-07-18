import Layout from "../components/Layout/Layout"
import loginLogo from "../assets/images/loginLogo.webp"
import Stack from "@mui/material/Stack"
import { styled, TextField } from "@mui/material"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const navigate = useNavigate()
  const handleAdminLogin = () => {
    navigate("/main")
  }
  return (
    <Layout>
      <LoginWrapper>
        <LogoWrapper>
          <LogoImgWrapper src={loginLogo} />
          <LoginAreaWrapper>
            <UserWrapper>
              <UserInfoText placeholder="아이디" />
            </UserWrapper>
            <UserWrapper>
              <UserInfoText placeholder="비밀번호" />
            </UserWrapper>
            <LoginButton onClick={handleAdminLogin}>
              <LoginText>로그인</LoginText>
            </LoginButton>
          </LoginAreaWrapper>
        </LogoWrapper>
      </LoginWrapper>
    </Layout>
  )
}

export default Login

const LoginWrapper = styled(Stack)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`

const LogoWrapper = styled(Stack)`
  width: 80%;
  height: 90%;
  justify-content: center;
  align-items: center;
  gap: 30px;
`

const LogoImgWrapper = styled(`img`)`
  width: 45%;
  height: 25%;
`

const LoginAreaWrapper = styled(Stack)`
  gap: 15px;
  width: 90%;
  height: 40%;
`

const UserWrapper = styled(Stack)`
  border: 1px solid black;
  background-color: #f0f0f0;
  border-radius: 17px;
  justify-content: center;
  height: 25%;
`
const UserInfoText = styled(TextField)`
  & .MuiOutlinedInput-root {
    & fieldset {
      border: none;
    }
    & ::placeholder {
      font-size: 16px;
      font-weight: 600;
      font-family: "Noto Sans";
      text-align: center;
      color: #7c7c7c;
    }
    & input {
      font-size: 20px;
      color: #000;
      font-weight: 600;
      font-family: "Noto Sans";
    }
  }
`

const LoginButton = styled(Button)`
  border: 1px solid black;
  background-color: #b4dfc3;
  height: 25%;
  border-radius: 17px;
  :hover {
    background-color: #b4dfc3;
    border: 1px solid black;
  }
`

const LoginText = styled(Typography)`
  font-family: "Noto Sans";
  font-size: 16px;
  color: #000;
  font-weight: 600;
`
