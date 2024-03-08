/* eslint-disable no-unused-vars */
import React from "react";
import { styled } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

// eslint-disable-next-line react/prop-types
const Header = ({ setOpen }) => {
  return (
    <>
      <HeaderWrapper>
        <Typography fontWeight="bold">MCY</Typography>
      </HeaderWrapper>
      <MenuIconWrapper>
        <IconButton onClick={() => setOpen(true)}>
          <MenuIcons />
        </IconButton>
      </MenuIconWrapper>
    </>
  );
};

const HeaderWrapper = styled(Stack)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100vw;
  position: fixed;
  top: 0;
  border-bottom: 1px solid #000;
  padding: 5px;
`;

const MenuIconWrapper = styled(Stack)`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100vw;
  position: fixed;
  top: 0;
`;

const MenuIcons = styled(MenuIcon)`
  color: #000;
`;

export default Header;
