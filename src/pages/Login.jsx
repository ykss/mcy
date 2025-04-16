import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

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
      navigate("/main")
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
      navigate("/main")
    } catch (error) {
      console.error("Error fetching data: ", error)
    }
  }

  return (
    <>
      <Button variant="outline">Outline</Button>
      <div className="w-screen h-[calc(100dvh-80px)] bg-[#fffcf6] flex flex-col items-center justify-center">
        <div className="w-screen h-[40%] flex items-center justify-center">
          <McyIcon />
        </div>
        <div className="w-full   ">안녕하세요</div>
        <input type="text" placeholder="마스터 아이디" className="w-[255px] h-[55px] bg-[#f0f0f0] border border-black rounded-[17px] mt-5 text-center text-base" onChange={CurrentId} />
        <input type="password" placeholder="비밀번호" className="w-[20px] h-[55px] bg-[#f0f0f0] border border-black rounded-[17px] mt-5 text-center text-base" onChange={CurrentPassword} />
        <button onClick={masterLogin} className="w-[220px] h-[55px] bg-[#b4dfc3] border border-black rounded-[17px] mt-5 text-base">
          로그인
        </button>
        <button onClick={onSuccess} className="w-[255px] h-[55px] bg-white border border-black rounded-[17px] mt-5 text-base font-semibold">
          GO MCY
        </button>
      </div>
      <Footer />
    </>
  )
}

export default Login
