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
          <div className="flex flex-col justify-center gap-1 w-full h-[90%] bg-[#f8e6ba] border-1 border-solid border-black rounded-[25px]">
            <div className="font-['Noto_Sans'] font-bold text-sm ml-5">용서, 사랑의 시작입니다.</div>
            <div className="font-['Noto_Sans'] font-bold text-sm ml-5">사 55:7, 엡 4:31-32</div>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center w-[90%] h-[20%] gap-4">
          <div className="flex flex-col justify-around  gap-1 w-[80%] h-[90%] bg-[#f3c5c5] border-1 border-solid border-black rounded-[25px] box-border p-2">
            <div className="font-['Noto_Sans'] font-bold text-[0.65rem] ml-4">1.예배를 통해 성령님의 임재를 깊이 체험한다.</div>
            <div className="font-['Noto_Sans'] font-bold text-[0.65rem] ml-4">2.기도를 통해 성령님의 함께하심을 경험하고, 그분의 인도하심을 따라간다.</div>
            <div className="font-['Noto_Sans'] font-bold text-[0.65rem] ml-4">3.모임을 통해 하나님의 말씀을 함께 나누고, 말씀을 붙들고 삶으로 나아간다.</div>
          </div>
          <div className="w-[20%] h-[90%] bg-[#b4dfc3] border border-1 border-solid border-black rounded-[25px]" />
        </div>
      </div>
    </Layout>
  )
}

export default Main
