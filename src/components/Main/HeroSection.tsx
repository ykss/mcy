import heroImage from "../../assets/images/Main/mainSlider1.webp"

const HeroSection = () => (
  <div className="relative w-full h-[520px] overflow-hidden group">
    <img
      src={heroImage}
      alt="목천교회 청년부"
      className="w-full h-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/70" />
    <div className="absolute bottom-0 left-0 right-0 px-6 pb-10">
      <span className="inline-block bg-[#F5C842] text-[#2C2722] text-xs font-semibold px-3 py-1 rounded-full mb-4">
        2024 하계수련회
      </span>
      <h1 className="text-white font-bold text-[42px] leading-[1.1] mb-2">
        목천교회
        <br />
        청년부
      </h1>
      <p className="text-white/60 text-xs tracking-[0.2em] font-medium">MOKCHUN CHURCH YOUTH</p>
    </div>
  </div>
)

export default HeroSection
