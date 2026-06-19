import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1565C0",
    },
    secondary: {
      main: "#FFC107",
    },
    background: {
      default: "#F4F6F8",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#263238",
    },
  },

  typography: {
    fontFamily: "Roboto, Arial, sans-serif",

    h6: {
      fontWeight: 600,
    },
  },

  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1565C0",
        },
      },
    },
  },
});

export default theme;