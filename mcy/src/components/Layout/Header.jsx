import { Stack, styled, Typography } from "@mui/material";
import Drawer from "./Drawer";

const Header = () => {
  return (
    <>
      <HeaderWrapper>
        <Typography fontWeight="bold">MCY</Typography>
      </HeaderWrapper>
      <MenuIconWrapper>
        <Drawer />
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

export default Header;
