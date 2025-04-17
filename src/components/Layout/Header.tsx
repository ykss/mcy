import { useNavigate } from "react-router-dom"
import PAGE_PATH from "../../constants/path"
import { Button } from "../ui/button"
import { Menu } from "lucide-react"
import { Typography } from "../../assets/theme/theme"

const Header = ({ setIsDrawerOpen }: { setIsDrawerOpen: (isDrawerOpen: boolean) => void }) => {
  const navigate = useNavigate()

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true)
  }

  const handleGoMain = () => {
    navigate(PAGE_PATH.MAIN)
  }

  return (
    <>
      <div className="w-full h-[80px] bg-[#FFFCF6]">
        <header className="flex flex-row items-center w-full h-[80px] bg-[#FFFCF6]">
          <div className="flex flex-row justify-center items-center w-full h-[60%] border-y-[1px] border-x-0 border-solid border-[#7c7c7c]">
            <Typography
              scroll-m-20
              text-base
              font-semibold
              tracking-tight
              className="w-[25%] text-center text-[20px] rounded-[15px] border-[1px] border-solid  border-black cursor-pointer"
              onClick={handleGoMain}>
              MCY
            </Typography>
            <div className="absolute translate-x-48">
              <Button
                variant="ghost"
                size="icon"
                className="text-black bg-transparent hover:bg-transparent hover:border-none focus:border-none focus:ring-0 active:border-none active:ring-0 outline-none border-0 [&_svg]:size-6"
                onClick={handleDrawerOpen}>
                <Menu className="h-7 w-7" />
              </Button>
            </div>
          </div>
        </header>
      </div>
    </>
  )
}

export default Header
