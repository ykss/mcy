import React from "react";
import Drawer from "./Drawer";
import Header from "./Header";

const Layout = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Header setOpen={setOpen} />
      <Drawer open={open} setOpen={setOpen} />
    </div>
  );
};

export default Layout;
