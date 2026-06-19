import Layout from "../components/Layout/Layout"
import BirthDayBanner from "../components/BirthDay/BirthDayBanner"
import MonthChips from "../components/BirthDay/MonthChips"
import BirthDayCard from "../components/BirthDay/BirthDayCard"
import useBirthDay from "../hooks/useBirthDay"
import useFadeIn from "../hooks/useFadeIn"

const BirthDay = () => {
  const { selectedMonth, setSelectedMonth, selectedData } = useBirthDay()
  const ref = useFadeIn()

  return (
    <div className="w-full h-[100dvh]">
      <Layout>
        <section ref={ref} className="w-full h-full flex flex-col gap-6 px-[5%] py-6 box-border overflow-y-auto">
          <div data-fade data-delay="0">
            <BirthDayBanner month={selectedMonth} count={selectedData.length} />
          </div>
          <div data-fade data-delay="100">
            <MonthChips selectedMonth={selectedMonth} onSelect={setSelectedMonth} />
          </div>
          <div data-fade data-delay="200" className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[clamp(15px,4.5vw,20px)] font-bold">
                {selectedMonth}월 생일을 축하합니다
              </span>
              <span className="px-2.5 py-0.5 bg-[#FDEAEA] text-[#E07070] text-sm font-semibold rounded-full">
                {selectedData.length}명
              </span>
            </div>
            {selectedData.length === 0 ? (
              <div className="text-center text-[#999999] text-sm py-8">
                이번 달 생일인 멤버가 없어요
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-[3vw]">
                {selectedData.map((item, index) => (
                  <BirthDayCard key={index} name={item.name} date={item.date} />
                ))}
              </div>
            )}
          </div>
        </section>
      </Layout>
    </div>
  )
}

export default BirthDay
