import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Stack, styled } from "@mui/material";
import Box from "@mui/material/Box";
import DrawerSlide from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import ClearIcon from "@mui/icons-material/Clear";

import DrawerCheck from "../../image/drawer_check.png";

const Drawer = () => {
  const [open, setOpen] = React.useState(false);
  const Navigate = useNavigate();

  const MenuList = ["소식", "출석", "생일"];

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const pageMove = (index) => {
    // switch (index) {
    //   case 0:
    //     Navigate("/news");
    //     break;
    //   case 1:
    //     Navigate("/attendance");
    //     break;
    //   case 2:
    //     Navigate("/birthDay");
    //     break;
    // }
    index % 3 === 0
      ? Navigate("/news")
      : index % 2 === 1
      ? Navigate("/attendance")
      : Navigate("/birthDay");
  };

  const DrawerList = (
    <DrawerWapper rol="presentation">
      <DrawerTop>
        <ExitIcon onClick={toggleDrawer(false)} />
      </DrawerTop>
      <List>
        {MenuList.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListButton onClick={() => pageMove(index)}>
              <ListIcon>
                <img src={DrawerCheck} style={{ width: "20px" }} />
              </ListIcon>
              <ListText primary={text} />
            </ListButton>
          </ListItem>
        ))}
      </List>
    </DrawerWapper>
  );

  return (
    <>
      <Button onClick={toggleDrawer(true)}>
        <MenuIcons />
      </Button>
      <DrawerSlide open={open} onClose={toggleDrawer(false)} anchor="right">
        {DrawerList}
      </DrawerSlide>
    </>
  );
};

const DrawerWapper = styled(Box)`
  width: 213px;
`;

const DrawerTop = styled(Stack)`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  height: 48px;

  margin-bottom: 12px;

  background-color: #fffcf6;

  box-sizing: border-box;
  box-shadow: 0px 5px 5px -1px rgba(0, 0, 0, 0.1);
`;

const ExitIcon = styled(ClearIcon)`
  margin: auto 10px;

  font-size: 25px;
`;

const ListButton = styled(ListItemButton)`
  margin-left: 10px;
`;

const ListIcon = styled(ListItemIcon)`
  min-width: 30px;
`;

const ListText = styled(ListItemText)`
  display: flex;

  .css-10hburv-MuiTypography-root {
    margin: 5px;

    font-family: Inter;
    font-weight: 700;
    font-size: 20px;
  }
`;

const MenuIcons = styled(MenuIcon)`
  color: #000;
`;

export default Drawer;
