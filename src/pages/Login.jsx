import { styled, Stack, Button } from "@mui/material"
import TextField from "@mui/material/TextField"
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google"
import { jwtDecode } from "jwt-decode" //토큰의 페이로드(payload) 부분에 포함된 정보를 읽을 수 있게 해준다

import { McyIcon } from "../components/shared/McyIcon"
import Footer from "../components/Layout/Footer"
const Login = () => {
  const clientId = "11557743503-tdft29ievm0nab6bljjchlf2eicrjjno.apps.googleusercontent.com"

  const onSuccess = response => {
    /* response는 유저 인증에 관한 다양한 정보를 담고 있고 credential이라는 JWT 토큰을 포함하고 있습니다. 
       이 토큰을 디코딩하여 유저의 이메일, 이름, 프로필 이미지 등의 정보를 추출할 수 있습니다.
    */
    console.log("로그인 성공:", response)

    // window.location.href = "http://localhost:5173/main" // 로그인 성공 시 리디렉션 URI로 이동
    const userInfo = jwtDecode(response.credential)
    const email = userInfo.email // 유저 이메일 정보
    const name = userInfo.name // 유저 이름
    const picture = userInfo.picture // 유저 프로필 사진

    console.log("Email:", email)
    console.log("Name:", name)
    console.log("Picture:", picture)
  }

  const onError = () => {
    console.log("로그인 실패")
    alert("로그인에 실패했습니다. 다시 시도해주세요.")
  }
  return (
    <>
      <LoginWrapper>
        <IconWrapper>
          <McyIcon />
        </IconWrapper>
        <IdTextField placeholder="아이디" variant="outlined" />
        <PasswordTextField placeholder="비밀번호" variant="outlined" type="password" />
        <LoginButton variant="contained">로그인</LoginButton>
        <GoogleLoginWrapper>
          <GoogleOAuthProvider clientId={clientId} scope="profile email">
            <GoogleLogin width="255" height="55" type="standard" shape="pill" onSuccess={onSuccess} onError={onError} />
          </GoogleOAuthProvider>
        </GoogleLoginWrapper>
        <Footer />
      </LoginWrapper>
    </>
  )
}
const LoginWrapper = styled(Stack)`
  width: 100vw;
  height: calc(100dvh - 100px);
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
const GoogleLoginWrapper = styled(Stack)`
  margin: 16px 0; // 원하는 margin 값 설정
  align-items: center;
  justify-content: center;
`

export default Login
