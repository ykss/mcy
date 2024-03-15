import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    h5: {
      fontFamily: "INTER",
      fontSize: "15px",
      fontWeight: "700",
      color: "#000",
    },
    h6: {
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
    primary: {
      main: "#FFFAEC",
    },
  },
});

export default theme;
