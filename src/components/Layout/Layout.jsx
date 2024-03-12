import React from "react";
import Drawer from "./Drawer";
import Header from "./Header";
import Footer from "./Footer";
import { Stack, styled } from "@mui/material";

const Layout = ({ children }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Header setOpen={setOpen} />
      <Drawer open={open} setOpen={setOpen} />
      <ContentWrapper>{children}</ContentWrapper>
      <Footer />
    </>
  );
};

export default Layout;

const ContentWrapper = styled(Stack)`
  height: calc(100dvh - 120px);
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
