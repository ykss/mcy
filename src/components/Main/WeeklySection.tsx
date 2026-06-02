import { useState } from "react"
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
  { name: "수요 기도회", location: "소예배실", day: "수요일", time: "오후 7:30", color: "#F6CCD0" },
]

const ScheduleRow = ({ item }: { item: ScheduleItem }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`flex items-center gap-4 rounded-2xl border border-black/10 px-4 py-3.5 transition-all duration-200 cursor-default ${
        hovered ? "border-black/25 translate-x-1" : ""
      }`}
    >
      <div
        className="flex-shrink-0 flex flex-col items-center justify-center rounded-full px-3 py-2 min-w-[68px] border-0"
        style={{ backgroundColor: item.color }}
      >
        <span className="text-[11px] font-semibold text-[#2C2722] leading-snug border-0">{item.day}</span>
        <span className="text-[11px] font-semibold text-[#2C2722] leading-snug border-0">{item.time}</span>
      </div>
      <div className="flex-1 border-0">
        <p className="font-semibold text-[#2C2722] text-sm border-0">{item.name}</p>
        <p className="text-xs text-[#6A6157] mt-0.5 border-0">{item.location}</p>
      </div>
    </div>
  )
}

const WeeklySection = () => {
  const ref = useFadeIn()

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="w-full max-w-[390px] mx-auto px-6 py-8 border-0">
      <div data-fade data-delay="0" className="mb-6 border-0">
        <p className="text-xs font-semibold tracking-[0.2em] text-[#6A6157] uppercase border-0">Weekly</p>
        <h2 className="mt-1 text-2xl font-bold text-[#2C2722] border-0">예배·모임 안내</h2>
      </div>
      <div className="flex flex-col gap-3 border-0">
        {SCHEDULE.map((item, index) => (
          <div key={index} data-fade data-delay={String(80 + index * 80)} className="border-0">
            <ScheduleRow item={item} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default WeeklySection
