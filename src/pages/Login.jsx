import { styled, Stack, Button } from "@mui/material"
import TextField from "@mui/material/TextField"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { McyIcon } from "../components/shared/McyIcon"
import Footer from "../components/Layout/Footer"
import { getMcyMasterIdApi } from "../api/mcyMasterIdApi"

const Login = () => {
  const [currentId, setCurrentId] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const navigate = useNavigate()
  // 일반 유저 로그인 성공시 main 페이지 이동
  const onSuccess = async () => {
    try {
      localStorage.setItem("admin", false)
      // window.location.href = "/main" // 로그인 성공 시 리디렉션 URI로 이동
      navigate("/main") // 로그인 성공 시 리디렉션 URI로 이동
    } catch (error) {
      console.error("로그인 실패:", error)
      alert("로그인에 실패했습니다. 다시 시도해주세요.")
    }
  }

  const CurrentId = event => {
    setCurrentId(event.target.value)
  }

  const CurrentPassword = event => {
    setCurrentPassword(event.target.value)
  }

  //마스터 로그인
  const masterLogin = async () => {
    try {
      // 저장된 계정 정보 가져오기
      const storedData = await getMcyMasterIdApi()

      // 아이디 확인
      if (storedData.id !== currentId) {
        alert("아이디를 다시 확인해주세요")
        return
      }
      // 비밀번호 확인
      if (storedData.password !== currentPassword) {
        alert("비밀번호를 다시 확인해주세요")
        return
      }
      // 아이디와 비밀번호가 모두 일치하는 경우
      localStorage.setItem("admin", true)
      navigate("/main") // 로그인 성공 시 리디렉션 URI로 이동// 로그인 성공 시 리디렉션 URI로 이동
    } catch (error) {
      console.error("Error fetching data: ", error)
    }
  }

  return (
    <>
      <LoginWrapper>
        <IconWrapper>
          <McyIcon />
        </IconWrapper>
        <IdTextField placeholder="아이디" variant="outlined" onChange={CurrentId} />
        <PasswordTextField placeholder="비밀번호" variant="outlined" type="password" onChange={CurrentPassword} />
        <LoginButton variant="contained" onClick={masterLogin}>
          로그인
        </LoginButton>
        <StyledGoogleButton onClick={onSuccess} variant="contained">
          GO MCY
        </StyledGoogleButton>
      </LoginWrapper>
      <Footer />
    </>
  )
}

const LoginWrapper = styled(Stack)`
  width: 100vw;
  height: calc(100dvh - 80px);
  background-color: #fffcf6;
  align-items: center;
  justify-content: center;
`
const IconWrapper = styled(Stack)`
  width: 100vw;
  height: 40%;
  align-items: center;
  justify-content: center;
`

const IdTextField = styled(TextField)`
  width: 255px;
  height: 55px;
  background-color: #f0f0f0;
  border: 1px solid #000000;
  border-radius: 17px;
  margin: 20px 0 0;
  & .MuiInputBase-root {
    font-size: 16px;
  }

  /* 텍스트 필드 활성화될 때 윤곽선 제거 */
  & .MuiOutlinedInput-root {
    & fieldset {
      border: none;
      background-color: none;
    }
  }
  & .MuiInputBase-input {
    text-align: center;
  }
`
const PasswordTextField = styled(TextField)`
  width: 255px;
  height: 55px;
  background-color: #f0f0f0;
  border: 1px solid #000000;
  border-radius: 17px;
  margin: 20px 0 0;
  & .MuiInputBase-root {
    font-size: 16px;
  }

  /* 텍스트 필드 활성화될 때 윤곽선 제거 */
  & .MuiOutlinedInput-root {
    & fieldset {
      border: none;
    }
  }
  & .MuiInputBase-input {
    text-align: center;
  }
`

const LoginButton = styled(Button)`
  width: 255px;
  height: 55px;
  background-color: #b4dfc3;
  border: 1px solid #000000;
  border-radius: 17px;
  margin: 20px 0 0;
  font-size: 16px;
`

const StyledGoogleButton = styled(Button)`
  width: 255px;
  height: 55px;
  background-color: #ffffff;
  border: 1px solid #000000;
  border-radius: 17px;
  margin: 20px 0 0;
  font-weight: 600;
`

export default Login
