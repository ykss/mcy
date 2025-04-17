import Layout from "../components/Layout/Layout"
import CarouselSlider from "../components/Main/CarouselSlider"
import mainSlider1 from "../assets/images/Main/mainSlider1.webp"
import mainSlider2 from "../assets/images/Main/mainSlider2.webp"
import mainSlider3 from "../assets/images/Main/mainSlider3.webp"

const Main = () => {
  const McyImgs = [
    {
      img: mainSlider1,
    },
    {
      img: mainSlider2,
    },
    {
      img: mainSlider3,
    },
  ]
  return (
    <Layout>
      <div className="flex flex-col items-center gap-2.5 w-full h-[calc(100dvh-160px)]">
        <div className="flex justify-center items-center w-full h-[45%]">
          <CarouselSlider
            imageArray={McyImgs.map((item, index) => ({
              ...item,
              content: "",
              index,
            }))}
          />
        </div>
        <div className="flex flex-row items-center justify-center w-[90%] h-[13%] gap-2.5">
          <div className="w-[20%] h-[90%] bg-[#c7bdeb] border-1 border-solid border-black rounded-[18px]" />
          <div className="flex flex-col justify-center w-[80%] h-[90%] bg-[#f0f0f0]border-1 border-solid border-black rounded-[17px]">
            <h2 className="font-['Noto_Sans'] text-xl font-semibold ml-5">목천교회 청년부</h2>
          </div>
        </div>

        <div className="flex justify-evenly items-center w-[90%] h-[20%]">
          <div className="flex flex-col justify-center w-full h-[90%] bg-[#f8e6ba] border-1 border-solid border-black rounded-[25px]">
            <p className="font-['Noto_Sans'] font-bold text-sm ml-5">예수그리스도의 영이 다시 살아나게 하소서</p>
            <p className="font-['Noto_Sans'] font-bold text-sm ml-5">시 51:10, 출 23:25, 슥 4:6</p>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center w-[90%] h-[20%] gap-4">
          <div className="flex flex-col justify-center w-[75%] h-[90%] bg-[#f3c5c5] border-1 border-solid border-black rounded-[25px]">
            <p className="font-['Noto_Sans'] font-bold text-xs ml-5">1.예배로 온전한 신앙을 회복하자</p>
            <p className="font-['Noto_Sans'] font-bold text-xs ml-5">2.기도로 상한 마음을 회복하자</p>
            <p className="font-['Noto_Sans'] font-bold text-xs ml-5">3.교제와 셀 모임을 통해 관계 회복하자.</p>
          </div>
          <div className="w-[25%] h-[90%] bg-[#b4dfc3] border border-1 border-solid border-black rounded-[25px]" />
        </div>
      </div>
    </Layout>
  )
}

export default Main
