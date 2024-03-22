import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFAEC",
    },
    secondary: {
      main: "#c27979",
    },
    info: {
      main: "#fff",
    },
  },
  typography: {
    h4: {
      fontFamily: "INTER",
      fontSize: "20px",
      fontWeight: "700",
      color: "#000",
    },
    h5: {
      fontFamily: "LINE SEED SANS KR",
      fontSize: "12px",
      fontWeight: "700",
      color: "#000",
    },
    body1: {
      fontFamily: "INTER",
      fontSize: "11px",
      fontWeight: "600",
      color: "#000",
    },
    overline: {
      fontFamily: "INTER",
      fontSize: "8px",
      fontWeight: "600",
      color: "#000",
    },
  },
});

export default theme;
