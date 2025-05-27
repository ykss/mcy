import { useEffect, useState } from "react"
import { Drawer, DrawerContent, DrawerHeader, DrawerFooter } from "../../components/ui/drawer"
import { MenuDrawerProps } from "../../types/MenuDrawer"
import PAGE_PATH from "../../constants/path"
import { X } from "lucide-react"

const MenuDrawer = ({ open, setOpen, navigate }: MenuDrawerProps) => {
  const [admin, setAdmin] = useState(false)

  useEffect(() => {
    setAdmin(localStorage.getItem("admin") === "true")
  }, [])

  const toggleDrawer = () => {
    setOpen(false)
  }

  const handleNavigate = (path: string) => {
    navigate(`/${path}`)
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="absolute right-1 top-3 text-black">
          <X className="text-[15px]" onClick={toggleDrawer} />
        </div>
        <DrawerHeader className="mt-[60px]">
          <div className="w-[100%]">
            <div className={"ml-[10px]"} onClick={() => handleNavigate(admin ? "attendance" : "attendanceStatus")}>
              <div className="flex flex-row w-[100%] gap-3">
                <div className="flex justify-center items-center w-[30%]">
                  <div className="w-[90%] h-[35%] bg-[#b4dfc3] border-[1px] border-solid border-black rounded-[22px]" />
                </div>
                <div className="w-[30%]">
                  <p className=" font-['Noto_Sans'] font-semibold text-[24px] ">출석</p>
                </div>
              </div>
            </div>
            <div className={"ml-[10px]"} onClick={() => handleNavigate(PAGE_PATH.BIRTHDAY)}>
              <div className="flex flex-row w-[100%] gap-3">
                <div className="flex justify-center items-center w-[30%]">
                  <div className="w-[90%] h-[30%] bg-[#f3c5c5] border-[1px] border-solid  border-black rounded-[22px]" />
                </div>
                <div className="w-[30%]">
                  <p className=" font-['Noto_Sans'] font-semibold text-[24px] ">생일</p>
                </div>
              </div>
            </div>
          </div>
        </DrawerHeader>

        <DrawerFooter className="flex flex-row justify-end gap-2 mr-[23px] mt-[160px]">
          <div
            className="font-['Noto_Sans'] font-semibold text-[16px] text-black"
            onClick={() => {
              handleNavigate("")
            }}>
            {admin ? "로그아웃" : "로그인"}
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default MenuDrawer
