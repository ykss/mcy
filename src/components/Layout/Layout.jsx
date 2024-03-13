import { Stack, styled } from "@mui/material";
import React from "react";
import Drawer from "./Drawer";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  return (
    <div>
      <Header setIsDrawerOpen={setIsDrawerOpen} />
      <Drawer open={isDrawerOpen} setOpen={setIsDrawerOpen} />
      <ContentWrapper>{children}</ContentWrapper>
      <Footer />
    </div>
  );
};
const ContentWrapper = styled(Stack)`
  width: 100vw;
  height: calc(100dvh - 120px);
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export default Layout;
