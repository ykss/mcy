import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

import Stack from "@mui/material/Stack"
import { styled } from "@mui/material"

import MenuDrawer from "./MenuDrawer"
import Header from "./Header"
import Footer from "./Footer"

const Layout = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const isUserSelectPage = location.pathname === "/" || location.pathname === "/login"

  return (
    <>
      <Header setIsDrawerOpen={setIsDrawerOpen} />
      <MenuDrawer open={isDrawerOpen} setOpen={setIsDrawerOpen} navigate={navigate} />
      <ContentWrapper isUserSelectPage={isUserSelectPage}>{children}</ContentWrapper>
      <Footer />
    </>
  )
}

const ContentWrapper = styled(Stack)(({ isUserSelectPage }) => ({
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  height: isUserSelectPage ? "calc(100dvh - 80px)" : "calc(100dvh - 160px)",
  backgroundColor: "#fffcf6",
}))

export default Layout
