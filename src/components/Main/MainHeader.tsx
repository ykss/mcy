interface MainHeaderProps {
  onMenuClick: () => void
}

const MainHeader = ({ onMenuClick }: MainHeaderProps) => (
  <header
    className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-16 border-0"
    style={{ mixBlendMode: "difference" }}
  >
    <span className="text-white font-bold text-xl tracking-[0.15em] select-none border-0">MCY</span>
    <button
      onClick={onMenuClick}
      aria-label="메뉴 열기"
      className="flex flex-col justify-center gap-[7px] w-6 h-10 bg-transparent border-0 p-0 cursor-pointer"
    >
      <span className="block h-[2px] w-full bg-white border-0" />
      <span className="block h-[2px] w-full bg-white border-0" />
    </button>
  </header>
)

export default MainHeader
