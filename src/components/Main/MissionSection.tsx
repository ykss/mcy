import useFadeIn from "../../hooks/useFadeIn"

const MissionSection = () => {
  const ref = useFadeIn()

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="w-full max-w-[390px] mx-auto px-6 pt-10 pb-8 border-0">
      <p data-fade data-delay="0" className="text-xs font-semibold tracking-[0.2em] text-[#6A6157] uppercase mb-3 border-0">
        Vision
      </p>
      <h1 data-fade data-delay="80" className="text-[32px] font-bold leading-snug text-[#2C2722] mb-4 border-0">
        성령의 능력으로
        <br />
        부흥하는
        <br />
        청년교회
      </h1>
      <p data-fade data-delay="160" className="text-sm font-medium text-[#6A6157] border-0">
        겔 37:14 · 행 9:31
      </p>
    </section>
  )
}

export default MissionSection
