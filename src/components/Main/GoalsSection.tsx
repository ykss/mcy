import { useState } from "react"
import useFadeIn from "../../hooks/useFadeIn"

interface GoalCardProps {
  title: string
  description: string
  color: string
}

const GoalCard = ({ title, description, color }: GoalCardProps) => {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ backgroundColor: hovered ? color : "transparent" }}
      className={`rounded-3xl border border-black/10 p-6 cursor-default transition-all duration-300 ${
        hovered ? "-translate-y-1 shadow-lg shadow-black/5" : ""
      }`}
    >
      <p className="text-xs font-medium text-[#6A6157] border-0">{description}</p>
      <h3 className="mt-1 text-base font-bold text-[#2C2722] border-0">{title}</h3>
    </div>
  )
}

const GOALS: GoalCardProps[] = [
  { description: "위로 하나님을 경배하는", title: "거룩한 예배공동체", color: "#DCD5F7" },
  { description: "안으로 예수님을 닮아가는", title: "말씀 실천의 제자공동체", color: "#F6E4A4" },
  { description: "밖으로 성령님을 의지하는", title: "사랑의 섬김공동체", color: "#C4E6CC" },
]

const GoalsSection = () => {
  const ref = useFadeIn()

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="w-full max-w-[390px] mx-auto px-6 py-8 border-0">
      <div data-fade data-delay="0" className="mb-6 border-0">
        <p className="text-xs font-semibold tracking-[0.2em] text-[#6A6157] uppercase border-0">Our Mission</p>
        <h2 className="mt-1 text-2xl font-bold text-[#2C2722] border-0">세 가지 목표</h2>
      </div>
      <div className="flex flex-col gap-3 border-0">
        {GOALS.map((goal, index) => (
          <div key={index} data-fade data-delay={String(80 + index * 80)} className="border-0">
            <GoalCard {...goal} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default GoalsSection
