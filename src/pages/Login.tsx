import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import { useForm } from "react-hook-form"

import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { getMcyMasterIdApi } from "../api/mcyMasterIdApi"
import type { MasterAccount } from "../types/MasterAccount"
import PAGE_PATH from "../constants/path"
import Layout from "../components/Layout/Layout"
import Footer from "../components/Layout/Footer"
import mcyIcon from "../assets/images/Login/MCYICON.svg"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../components/ui/form"

type LoginFormData = {
  id: string
  password: string
}

const Login = () => {
  const navigate = useNavigate()

  const form = useForm<LoginFormData>({
    defaultValues: {
      id: "",
      password: "",
    },
  })

  const onSubmit = form.handleSubmit(data => {
    masterLogin(data)
  })

  const goToMain = (): void => {
    localStorage.setItem("admin", "false")
    navigate(PAGE_PATH.MAIN)
  }

  const masterLogin = async (data: LoginFormData): Promise<void> => {
    try {
      const storedData: MasterAccount | undefined = await getMcyMasterIdApi()

      if (!storedData) {
        toast.error("서버에서 계정 정보를 가져오지 못했습니다.")
        return
      }

      if (storedData.id !== data.id) {
        toast.error("아이디를 다시 확인해주세요")
        return
      }

      if (storedData.password !== data.password) {
        toast.error("비밀번호를 다시 확인해주세요")
        return
      }

      localStorage.setItem("admin", "true")
      toast.success("로그인 성공!")
      navigate(PAGE_PATH.MAIN)
    } catch (error) {
      toast.error("서버 오류가 발생했습니다.")
    }
  }

  return (
    <div className="w-full h-[100dvh]">
      <Layout>
        <div className="w-full max-w-[450px] h-full flex flex-col justify-center items-center gap-8">
          {/* 로고 이미지 */}
          <div className="w-[40%]">
            <img src={mcyIcon} alt="MCY 아이콘" className="w-full" />
          </div>
          {/* 로그인 입력창 */}
          <Form {...form}>
            <form onSubmit={onSubmit} className="w-full h-[40%] flex flex-col justify-between items-center box-border px-[10%]">
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem className="w-full h-[20%]">
                    <FormControl>
                      <Input
                        placeholder="마스터 아이디"
                        className="w-full h-full border-1 border-solid border-black rounded-[17px] bg-[#F0F0F0] text-center focus:border-black focus:outline-none text-base placeholder:text-base p-0 m-0 box-border ring-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full h-[20%]">
                    <FormControl>
                      <Input
                        placeholder="비밀번호"
                        type="password"
                        className="w-full h-full border-1 border-solid border-black rounded-[17px] bg-[#F0F0F0] text-center focus:border-black focus:outline-none text-base placeholder:text-base p-0 m-0 box-border ring-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full h-[20%] border-1 border-solid border-black rounded-[17px] bg-[#B4DFC3] text-center focus:border-black focus:outline-none text-base hover:bg-[#B4DFC3] active:bg-[#B4DFC3] hover:opacity-100 active:opacity-100 p-0 m-0 box-border">
                로그인
              </Button>
              <Button
                type="button"
                className="w-full h-[20%] border-1 border-solid border-black rounded-[17px] bg-white text-center focus:border-black focus:outline-none text-base hover:bg-white active:bg-white hover:opacity-100 active:opacity-100 p-0 m-0 box-border"
                onClick={goToMain}>
                GO MCY
              </Button>
            </form>
          </Form>
        </div>
        <Footer />
      </Layout>
    </div>
  )
}

export default Login
