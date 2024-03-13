import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFAEC",
    },
    text: {
      primary: "#000000",
    },
    typography: {
      fontSize: "14px",
      fontWeight: "700",
    },
    chip: {
      border: "1px solid #000",
    },
  },
});

export default theme;
