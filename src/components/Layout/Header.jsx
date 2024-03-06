import { styled } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

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
  background-color: #FFFFFF;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0;
  border-bottom: 1px solid #FEEDCD;
`;

const MenuIconWrapper = styled(Stack)`
  position: fixed;
  top: 5px;
  right: 1%;
`;

const MenuIcons = styled(MenuIcon)`
  color: #000;
`;

export default Header;
