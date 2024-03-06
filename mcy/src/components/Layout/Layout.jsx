/* eslint-disable react/prop-types */

import { Stack, Typography, styled } from "@mui/material";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />

      <Footer />
    </>
  );
};

export default Layout;
