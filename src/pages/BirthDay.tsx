import Layout from "../components/Layout/Layout"
import { Button } from "../../components/ui/button"
import BirthDayList from "../components/BirthDay/BirthDayList"
import { useState, useEffect } from "react"

const BirthDay = () => {
  const [containerHeight, setContainerHeight] = useState("75%")

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerHeight >= 700) {
  //       setContainerHeight("75%")
  //     } else {
  //       setContainerHeight("75%")
  //     }
  //   }

  //   handleResize()
  //   window.addEventListener("resize", handleResize)

  //   return () => {
  //     window.removeEventListener("resize", handleResize)
  //   }
  // }, [])

  return (
    <Layout>
      <div className="w-full h-full flex flex-col justify-center">
        {/* 월 선택 버튼 */}
        <div className="w-[90%] h-[30%] mx-auto flex flex-col justify-center gap-[20px]">
          <div className="text-2xl font-bold">월 선택</div>
          <div className="grid grid-cols-6 gap-1">
            {Array.from({ length: 12 }, (_, i) => (
              <Button
                key={i}
                variant="outline"
                className={`p-0 w-full h-[50px] bg-[#F0F0F0] rounded-none ${i === 0 ? "rounded-tl-lg" : i === 5 ? "rounded-tr-lg" : i === 6 ? "rounded-bl-lg" : i === 11 ? "rounded-br-lg" : ""}`}>
                <div className="text-sm text-[#7C7C7C]">{i + 1}월</div>
              </Button>
            ))}
          </div>
        </div>

        {/* 생일 리스트 */}
        <div className="w-[90%] h-[60%] mt-[20px] mx-auto bg-[#F3C5C5] rounded-[17px] border border-solid border-black box-border flex flex-col justify-center ">
          <div className="w-[90%] h-[10%] mx-auto text-xl font-bold py-3">3월 생일을 축하합니다</div>
          <div
            className="bg-[#F0F0F0] w-[90%] h-[75%] mx-auto rounded-[17px] border border-solid border-black grid grid-cols-2 gap-6 justify-items-center items-center box-border p-4 py-6 overflow-y-scroll"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {Array.from({ length: 11 }, (_, i) => (
              <BirthDayList key={i} text={`${i + 1}일`} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default BirthDay
