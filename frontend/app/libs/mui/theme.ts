import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0070C7",
      light: "#a0b8e8",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#00c4cc",
      contrastText: "#FFFFFF",
    },
  },
});

export default theme;
