import heroImage from "../../assets/images/Main/mainSlider1.webp"

const HeroSection = () => (
  <div className="relative w-full h-[520px] overflow-hidden group border-0">
    <img
      src={heroImage}
      alt="목천교회 청년부"
      className="w-full h-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-105 border-0"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FAF5EA] border-0" />
  </div>
)

export default HeroSection
