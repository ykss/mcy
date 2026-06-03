import { useState } from "react"
import { useNavigate } from "react-router-dom"
import MenuDrawer from "../components/Layout/MenuDrawer"
import MainHeader from "../components/Main/MainHeader"
import HeroSection from "../components/Main/HeroSection"
import MissionSection from "../components/Main/MissionSection"
import WeeklySection from "../components/Main/WeeklySection"
import MainFooter from "../components/Main/MainFooter"

const Main = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#D6CFC4] flex justify-center">
      <div className="w-full max-w-[390px] bg-[#FAF5EA] text-[#2C2722] min-h-screen relative shadow-[0_0_40px_rgba(0,0,0,0.15)]">
        <MainHeader onMenuClick={() => setIsDrawerOpen(true)} />
        <HeroSection />
        <MissionSection />
        <WeeklySection />
        <MainFooter />
        <MenuDrawer open={isDrawerOpen} setOpen={setIsDrawerOpen} navigate={navigate} />
      </div>
    </div>
  )
}

export default Main
