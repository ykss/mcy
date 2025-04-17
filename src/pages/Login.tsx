import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import Footer from "../components/Layout/Footer"

const Login = () => {
  return (
    <div className="max-w-[450px] h-[100dvh] flex flex-col justify-center items-center">
      <div className="w-full h-full bg-[#FFFCF6] flex flex-col justify-center items-center">
        <div className="w-[40%] h-[20%]">
          <img src="/src/assets/images/Login/MCYICON.svg" alt="" className="w-full h-full" />
        </div>
        {/* 로그인 입력창 */}
        <div className="w-[70%] h-[47%] flex flex-col justify-between gap-5 mt-11">
          <Input
            placeholder="마스터 아이디"
            className="w-full h-[20%] border-1 border-solid border-black rounded-[17px] bg-[#F0F0F0] text-center focus:border-black focus:outline-none text-base placeholder:text-base p-0 m-0 box-border"
          />
          <Input
            placeholder="비밀번호"
            className="w-full h-[20%] border-1 border-solid border-black rounded-[17px] bg-[#F0F0F0] text-center focus:border-black focus:outline-none text-base placeholder:text-base p-0 m-0 box-border"
          />
          <Button className="w-full h-[20%] border-1 border-solid border-black rounded-[17px] bg-[#B4DFC3] text-center focus:border-black focus:outline-none text-base hover:bg-[#B4DFC3] active:bg-[#B4DFC3] hover:opacity-100 active:opacity-100 p-0 m-0 box-border">
            로그인
          </Button>
          <Button className="w-full h-[20%] border-1 border-solid border-black rounded-[17px] bg-white text-center focus:border-black focus:outline-none text-base hover:bg-white active:bg-white hover:opacity-100 active:opacity-100 p-0 m-0 box-border">
            GO MCY
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Login
