import useFadeIn from "../../hooks/useFadeIn"

const GOALS = [
  { num: 1, title: "예배", desc: "온전한 신앙을 회복하자", color: "#F9C5C8" },
  { num: 2, title: "기도", desc: "상한 마음을 회복하자", color: "#DCD5F7" },
  { num: 3, title: "교제", desc: "셀 모임으로 관계를 회복하자", color: "#C4E6CC" },
]

const REFS = "시 51:10 / 겔 23:25 / 슥 4:6"

const MissionSection = () => {
  const ref = useFadeIn()

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="w-full max-w-[390px] mx-auto px-6 pt-20 pb-8">
      <div data-fade data-delay="0" className="flex items-center gap-[clamp(8px,3.1vw,16px)] mb-[clamp(12px,5.1vw,20px)]">
        <div className="flex-1 h-px bg-black/15" />
        <p className="text-[clamp(10px,3.1vw,12px)] font-semibold tracking-[0.15em] text-[#C08A3E]">오늘의 말씀</p>
        <div className="flex-1 h-px bg-black/15" />
      </div>

      <h2 data-fade data-delay="80" className="text-center text-[clamp(18px,5.6vw,22px)] font-bold text-[#2C2722] leading-snug mb-5">
        예수그리스도의 영이
        <br />
        다시 살아나게 하소서
      </h2>

      <p data-fade data-delay="160" className="text-center text-[11px] text-[#6A6157] mb-8">
        {REFS}
      </p>

      <div className="flex flex-col gap-3">
        {GOALS.map((goal, i) => (
          <div key={i} data-fade data-delay={String(240 + i * 80)} className="flex items-stretch rounded-2xl border border-black/10 bg-white overflow-hidden">
            <div className="flex-shrink-0 w-14 flex items-center justify-center font-bold text-xl text-[#2C2722]" style={{ backgroundColor: goal.color }}>
              {goal.num}
            </div>
            <div className="min-w-0 flex-1 px-4 py-3.5">
              <p className="text-xs text-[#6A6157]">{goal.title}</p>
              <p className="font-semibold text-sm text-[#2C2722]">{goal.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default MissionSection
