import dayjs from "dayjs"
import Layout from "../components/Layout/Layout"
import useFadeIn from "../hooks/useFadeIn"

const CellManagement = () => {
  const ref = useFadeIn()
  const year = dayjs().year()

  return (
    <div className="w-full min-h-[100dvh] flex flex-col">
      <Layout>
        <section ref={ref} className="w-full flex flex-col px-5 pt-6 pb-32 gap-6">
          <div data-fade data-delay="0" className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-gray-400 font-medium tracking-widest">셀 편성 · ORGANIZE</span>
              <h1 className="text-[28px] font-bold tracking-tight text-gray-800">청년부 명단</h1>
            </div>
            <span className="mt-1 px-4 py-1.5 rounded-full bg-[#5B4FCF] text-white text-sm font-semibold">
              {year} 편성
            </span>
          </div>
        </section>
      </Layout>
    </div>
  )
}

export default CellManagement
