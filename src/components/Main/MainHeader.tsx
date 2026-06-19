import { useState, useEffect } from "react"

interface MainHeaderProps {
  onMenuClick: () => void
  solid?: boolean
}

const MainHeader = ({ onMenuClick, solid = false }: MainHeaderProps) => {
  const [scrolled, setScrolled] = useState(solid)

  useEffect(() => {
    if (solid) return
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [solid])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-16 border-0 ${scrolled ? "bg-[#FFFCF6]/90 backdrop-blur-md shadow-sm" : ""}`}
      style={scrolled ? undefined : { mixBlendMode: "difference" }}>
      <span className={`font-bold text-xl tracking-[0.15em] select-none border-0 ${scrolled ? "text-[#2C2722]" : "text-white"}`}>MCY</span>
      <button onClick={onMenuClick} aria-label="메뉴 열기" className="flex flex-col justify-center gap-[7px] w-6 h-10 bg-transparent border-0 p-0 cursor-pointer">
        <span className={`block h-[2px] w-full border-0 ${scrolled ? "bg-[#2C2722]" : "bg-white"}`} />
        <span className={`block h-[2px] w-full border-0 ${scrolled ? "bg-[#2C2722]" : "bg-white"}`} />
      </button>
    </header>
  )
}

export default MainHeader
