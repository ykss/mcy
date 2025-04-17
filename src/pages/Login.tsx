import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast, Toaster } from "react-hot-toast"

import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import Footer from "../components/Layout/Footer"
import { getMcyMasterIdApi } from "../api/mcyMasterIdApi"
import type { MasterAccount } from "../types/MasterAccount"

const Login = () => {
  const [currentId, setCurrentId] = useState<string>("")
  const [currentPassword, setCurrentPassword] = useState<string>("")
  const navigate = useNavigate()

  // 일반 유저 로그인 성공시 main 페이지 이동
  const userLogin = async (): Promise<void> => {
    try {
      localStorage.setItem("admin", "false") //localStorage.setItem()은 문자열만 저장할 수 있으므로,
      toast.success("로그인 성공!")
      navigate("/main")
    } catch (error) {
      console.error("로그인 실패:", error)
      toast.error("로그인에 실패했습니다. 다시 시도해주세요.")
    }
  }

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCurrentId(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCurrentPassword(event.target.value)
  }

  //마스터 로그인
  const masterLogin = async (): Promise<void> => {
    try {
      // 저장된 계정 정보 가져오기
      const storedData: MasterAccount | undefined = await getMcyMasterIdApi()
      // 아이디 확인
      if (storedData && storedData.id !== currentId) {
        toast.error("아이디를 다시 확인해주세요")
        return
      }
      // 비밀번호 확인
      if (storedData && storedData.password !== currentPassword) {
        toast.error("비밀번호를 다시 확인해주세요")
        return
      }
      // 아이디와 비밀번호가 모두 일치하는 경우
      localStorage.setItem("admin", "true")
      toast.success("로그인 성공!")
      // navigate("/main")
    } catch (error) {
      console.error("Error fetching data: ", error)
      toast.error("서버 오류가 발생했습니다.")
    }
  }

  return (
    <div className="max-w-[450px] h-[100dvh] flex flex-col justify-center items-center">
      <Toaster />
      <div className="w-full h-full bg-[#FFFCF6] flex flex-col justify-center items-center">
        <div className="w-[40%] h-[20%]">
          <img src="/src/assets/images/Login/MCYICON.svg" alt="" className="w-full h-full" />
        </div>
        {/* 로그인 입력창 */}
        <div className="w-[70%] h-[47%] flex flex-col justify-between gap-5 mt-11">
          <Input
            placeholder="마스터 아이디"
            className="w-full h-[20%] border-1 border-solid border-black rounded-[17px] bg-[#F0F0F0] text-center focus:border-black focus:outline-none text-base placeholder:text-base p-0 m-0 box-border"
            onChange={handleIdChange}
            value={currentId}
          />
          <Input
            type="password"
            placeholder="비밀번호"
            className="w-full h-[20%] border-1 border-solid border-black rounded-[17px] bg-[#F0F0F0] text-center focus:border-black focus:outline-none text-base placeholder:text-base p-0 m-0 box-border"
            onChange={handlePasswordChange}
            value={currentPassword}
          />
          <Button
            className="w-full h-[20%] border-1 border-solid border-black rounded-[17px] bg-[#B4DFC3] text-center focus:border-black focus:outline-none text-base hover:bg-[#B4DFC3] active:bg-[#B4DFC3] hover:opacity-100 active:opacity-100 p-0 m-0 box-border"
            onClick={masterLogin}>
            로그인
          </Button>
          <Button
            className="w-full h-[20%] border-1 border-solid border-black rounded-[17px] bg-white text-center focus:border-black focus:outline-none text-base hover:bg-white active:bg-white hover:opacity-100 active:opacity-100 p-0 m-0 box-border"
            onClick={userLogin}>
            GO MCY
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Login
