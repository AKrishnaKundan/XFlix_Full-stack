import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      // primary: "#212121",
      background: {
        default: "black",
        paper: "#212121",
      },
      text: {
        primary: '#fff',
        secondary: "grey",
      }
    }
  });
  
  export default darkTheme;