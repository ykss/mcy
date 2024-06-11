import { useState } from "react"
import { useNavigate } from "react-router-dom"

import Stack from "@mui/material/Stack"
import { styled } from "@mui/material"

import MenuDrawer from "./MenuDrawer"
import Header from "./Header"
import Footer from "./Footer"

const Layout = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <>
      <Header setIsDrawerOpen={setIsDrawerOpen} />
      <MenuDrawer open={isDrawerOpen} setOpen={setIsDrawerOpen} navigate={navigate} />
      <ContentWrapper>{children}</ContentWrapper>
      <Footer />
    </>
  )
}

const ContentWrapper = styled(Stack)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: calc(100dvh - 160px);
  background-color: #fffcf6;
`

export default Layout
