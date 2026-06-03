import useFadeIn from "../../hooks/useFadeIn"

interface ScheduleItem {
  name: string
  location: string
  day: string
  time: string
  color: string
}

const SCHEDULE: ScheduleItem[] = [
  { name: "청년예배", location: "본당 3층", day: "주일", time: "오후 2:00", color: "#C8DDF4" },
  { name: "셀 모임", location: "청년부실", day: "주일", time: "오후 3:30", color: "#C4E6CC" },
  { name: "수요 기도회", location: "소예배실", day: "수요", time: "오후 7:30", color: "#F6CCD0" },
]

const ScheduleRow = ({ item }: { item: ScheduleItem }) => (
  <div className="flex items-center gap-4 py-4">
    <div
      className="flex-shrink-0 flex flex-col items-center justify-center rounded-full px-3 py-2 min-w-[52px]"
      style={{ backgroundColor: item.color }}
    >
      <span className="text-[11px] font-semibold text-[#2C2722] leading-tight">{item.day}</span>
      <span className="text-[11px] font-semibold text-[#2C2722] leading-tight">{item.time.split(" ")[1]}</span>
    </div>
    <div className="flex-1">
      <p className="font-semibold text-[#2C2722] text-sm">{item.name}</p>
      <p className="text-xs text-[#6A6157] mt-0.5">{item.location}</p>
    </div>
    <span className="text-sm font-medium text-[#2C2722] flex-shrink-0">{item.time}</span>
  </div>
)

const WeeklySection = () => {
  const ref = useFadeIn()

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="w-full max-w-[390px] mx-auto px-6 py-8">
      <div data-fade data-delay="0" className="flex items-center justify-between mb-6">
        <h2 className="text-[clamp(20px,6.2vw,24px)] font-bold text-[#2C2722]">예배·모임 안내</h2>
        <p className="text-xs font-semibold tracking-[0.2em] text-[#6A6157] uppercase">WEEKLY</p>
      </div>
      <div className="flex flex-col divide-y divide-black/10">
        {SCHEDULE.map((item, index) => (
          <div key={index} data-fade data-delay={String(80 + index * 80)}>
            <ScheduleRow item={item} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default WeeklySection
